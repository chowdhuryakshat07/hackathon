import { Email, AICatchupBriefing, ActionItem, ThreadChange, DeadlineItem, TimeframeOption } from '../types/inbox';

export class GeminiAiService {
  /**
   * Analyzes real emails using Google Gemini API
   */
  static async analyzeRealInbox(
    emails: Email[],
    geminiApiKey?: string
  ): Promise<{
    briefing: AICatchupBriefing;
    actionItems: ActionItem[];
    changes: ThreadChange[];
    deadlines: DeadlineItem[];
  }> {
    if (!emails || emails.length === 0) {
      return this.getEmptyAnalysis();
    }

    // If Gemini API Key is provided, call Gemini 2.5 Flash API
    if (geminiApiKey && geminiApiKey.trim().length > 10) {
      try {
        return await this.callGeminiApi(emails, geminiApiKey.trim());
      } catch (err) {
        console.warn('Gemini API call failed, falling back to intelligent client parser:', err);
      }
    }

    // Heuristic intelligent fallback when no Gemini API key is entered
    return this.fallbackHeuristicAnalysis(emails);
  }

  private static async callGeminiApi(emails: Email[], apiKey: string) {
    const emailSummaries = emails.slice(0, 15).map(e => `
ID: ${e.id}
From: ${e.sender} <${e.senderEmail}>
Date: ${e.timestamp}
Subject: ${e.subject}
Body: ${e.body.slice(0, 300)}
---`).join('\n');

    const prompt = `You are ICU (I See You), an AI inbox lifesaver. Analyze these ${emails.length} emails:
${emailSummaries}

Provide structured JSON with:
1. "briefingText": ~80-100 word executive summary of what happened.
2. "biggestMissed": { "title", "previousValue", "newValue", "description", "urgentNote", "sourceEmailId" }
3. "actionItems": array of { "id", "title", "sender", "deadline", "priority" ("URGENT"|"IMPORTANT"), "suggestedReply", "sourceEmailId" }
4. "changes": array of { "id", "topic", "field", "previousValue", "newValue", "detectedAt", "sourceEmailId" }
5. "deadlines": array of { "id", "title", "relativeTime", "sender", "priority", "sourceEmailId" }

Return raw valid JSON only.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API HTTP Error ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(text);

    const urgentCount = parsed.actionItems?.filter((a: any) => a.priority === 'URGENT').length || 1;
    const importantCount = parsed.actionItems?.length || 2;
    const lowCount = emails.filter(e => e.category === 'NEWSLETTER' || e.category === 'PROMO' || e.category === 'SYSTEM').length;
    const infoCount = Math.max(0, emails.length - (urgentCount + importantCount + lowCount));

    return {
      briefing: {
        timeframe: 'LAST_3_DAYS' as TimeframeOption,
        totalEmails: emails.length,
        urgentCount,
        importantCount,
        infoCount,
        lowPriorityCount: lowCount,
        briefingText: parsed.briefingText || 'ICU analyzed your connected Gmail inbox. Important developments found below.',
        biggestMissed: parsed.biggestMissed || {
          title: 'Action Item Detected',
          threadId: emails[0].threadId,
          sourceEmailId: emails[0].id,
          previousValue: 'Pending',
          newValue: 'Requires Response',
          description: emails[0].subject,
          status: 'WAITING_FOR_USER',
          urgentNote: 'Check source email for complete context.'
        }
      },
      actionItems: parsed.actionItems || [],
      changes: parsed.changes || [],
      deadlines: parsed.deadlines || []
    };
  }

  private static fallbackHeuristicAnalysis(emails: Email[]) {
    const actionItems: ActionItem[] = [];
    const changes: ThreadChange[] = [];
    const deadlines: DeadlineItem[] = [];

    emails.forEach((e, idx) => {
      const text = (e.subject + ' ' + e.body).toLowerCase();
      
      if (text.includes('urgent') || text.includes('deadline') || text.includes('asap') || text.includes('please reply') || text.includes('follow up')) {
        actionItems.push({
          id: `action-real-${idx}`,
          threadId: e.threadId,
          title: `Respond to: ${e.subject}`,
          sender: e.sender,
          senderEmail: e.senderEmail,
          senderRole: 'Gmail Sender',
          deadline: 'Within 24 Hours',
          formattedDeadline: 'Urgent Response Requested',
          priority: text.includes('urgent') || text.includes('asap') ? 'URGENT' : 'IMPORTANT',
          status: 'WAITING_FOR_USER',
          sourceEmailId: e.id,
          suggestedReply: `Hi ${e.sender.split(' ')[0]},\n\nThanks for reaching out regarding "${e.subject}". I have received your email and will follow up shortly.\n\nBest regards`
        });
      }

      if (text.includes('moved') || text.includes('rescheduled') || text.includes('updated') || text.includes('changed')) {
        changes.push({
          id: `change-real-${idx}`,
          threadId: e.threadId,
          topic: e.subject,
          field: text.includes('meeting') ? 'MEETING_TIME' : 'DEADLINE',
          previousValue: 'Original Schedule',
          newValue: 'Updated Schedule',
          sourceEmailId: e.id,
          confidence: 0.95,
          detectedAt: e.timeAgo,
          urgency: 'IMPORTANT'
        });
      }

      if (text.includes('by ') || text.includes('due') || text.includes('deadline')) {
        deadlines.push({
          id: `dl-real-${idx}`,
          threadId: e.threadId,
          title: e.subject,
          deadlineDate: new Date().toISOString().split('T')[0],
          relativeTime: 'Upcoming Deadline',
          sender: e.sender,
          priority: 'IMPORTANT',
          sourceEmailId: e.id
        });
      }
    });

    const urgentCount = actionItems.filter(a => a.priority === 'URGENT').length;
    const importantCount = actionItems.filter(a => a.priority === 'IMPORTANT').length;
    const lowCount = emails.filter(e => e.category === 'NEWSLETTER' || e.category === 'PROMO' || e.category === 'SYSTEM').length;
    const infoCount = Math.max(0, emails.length - (urgentCount + importantCount + lowCount));

    return {
      briefing: {
        timeframe: 'LAST_3_DAYS' as TimeframeOption,
        totalEmails: emails.length,
        urgentCount,
        importantCount,
        infoCount,
        lowPriorityCount: lowCount,
        briefingText: `ICU scanned ${emails.length} real messages from your connected Gmail account. We detected ${actionItems.length} items requiring your response, ${changes.length} schedule updates, and ${lowCount} low-priority newsletters.`,
        biggestMissed: {
          title: actionItems[0]?.title || 'Inbox Intelligence Active',
          threadId: emails[0]?.threadId || 'thread-1',
          sourceEmailId: emails[0]?.id || 'email-1',
          previousValue: 'Unread Messages',
          newValue: `${actionItems.length} Actions Found`,
          description: emails[0]?.subject || 'Your real Gmail inbox has been synchronized and analyzed by ICU.',
          status: 'WAITING_FOR_USER',
          urgentNote: 'Review the extracted action items below.'
        }
      },
      actionItems,
      changes,
      deadlines
    };
  }

  private static getEmptyAnalysis() {
    return {
      briefing: {
        timeframe: 'LAST_3_DAYS' as TimeframeOption,
        totalEmails: 0,
        urgentCount: 0,
        importantCount: 0,
        infoCount: 0,
        lowPriorityCount: 0,
        briefingText: 'No emails were found in the selected timeframe.',
        biggestMissed: {
          title: 'All caught up!',
          threadId: 'none',
          sourceEmailId: 'none',
          previousValue: '-',
          newValue: '-',
          description: 'No unread or urgent messages were detected in your inbox.',
          status: 'RESOLVED',
          urgentNote: 'You are all clear.'
        }
      },
      actionItems: [],
      changes: [],
      deadlines: []
    };
  }
}
