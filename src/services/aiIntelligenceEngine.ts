import { MOCK_EMAILS, MOCK_THREAD_CHANGES, MOCK_ACTION_ITEMS, MOCK_DEADLINES, MOCK_BRIEFING } from '../data/mockEmails';
import { Email, Thread, ThreadChange, ActionItem, DeadlineItem, AICatchupBriefing, TimeframeOption } from '../types/inbox';

export class AIIntelligenceEngine {
  static getBriefing(timeframe: TimeframeOption = 'LAST_3_DAYS'): AICatchupBriefing {
    if (timeframe === 'YESTERDAY') {
      return {
        ...MOCK_BRIEFING,
        timeframe: 'YESTERDAY',
        totalEmails: 24,
        urgentCount: 2,
        importantCount: 3,
        infoCount: 5,
        lowPriorityCount: 14,
        briefingText: `Over the past 24 hours, your manager requested an urgent performance report, and today's client sync was moved from 3:00 PM to 5:00 PM. A revised quotation was also requested by Enterprise Corp.`
      };
    }
    if (timeframe === 'LAST_7_DAYS') {
      return {
        ...MOCK_BRIEFING,
        timeframe: 'LAST_7_DAYS',
        totalEmails: 92,
        urgentCount: 5,
        importantCount: 9,
        infoCount: 18,
        lowPriorityCount: 60,
        briefingText: `Over the past week, 92 emails arrived across 18 active threads. Top developments include Project Alpha deadline acceleration to August 18, manager follow-ups on monthly performance, HR compliance policy changes, and 3 client proposal requests.`
      };
    }
    return MOCK_BRIEFING;
  }

  static getActionItems(): ActionItem[] {
    return MOCK_ACTION_ITEMS;
  }

  static getThreadChanges(): ThreadChange[] {
    return MOCK_THREAD_CHANGES;
  }

  static getDeadlines(): DeadlineItem[] {
    return MOCK_DEADLINES;
  }

  static getEmails(): Email[] {
    return MOCK_EMAILS;
  }

  static getEmailById(emailId: string): Email | undefined {
    return MOCK_EMAILS.find(e => e.id === emailId);
  }

  static getLowPriorityEmails(): Email[] {
    return MOCK_EMAILS.filter(e => e.category === 'NEWSLETTER' || e.category === 'PROMO' || e.category === 'SYSTEM');
  }

  static getThreads(): Thread[] {
    const threadMap = new Map<string, Email[]>();
    MOCK_EMAILS.forEach(email => {
      if (!threadMap.has(email.threadId)) {
        threadMap.set(email.threadId, []);
      }
      threadMap.get(email.threadId)!.push(email);
    });

    const threads: Thread[] = [];
    threadMap.forEach((messages, threadId) => {
      const latestMessage = messages[0];
      const changes = MOCK_THREAD_CHANGES.filter(c => c.threadId === threadId);
      const action = MOCK_ACTION_ITEMS.find(a => a.threadId === threadId);

      let priority = 'LOW_PRIORITY' as any;
      if (changes.some(c => c.urgency === 'URGENT') || action?.priority === 'URGENT') {
        priority = 'URGENT';
      } else if (changes.some(c => c.urgency === 'IMPORTANT') || action?.priority === 'IMPORTANT') {
        priority = 'IMPORTANT';
      } else if (latestMessage.category === 'PROJECT' || latestMessage.category === 'MEETING') {
        priority = 'INFORMATIONAL';
      }

      threads.push({
        id: threadId,
        subject: latestMessage.subject.replace(/^(UPDATED:|URGENT:|IMPORTANT:|\[CI\/CD\])\s*/i, ''),
        participants: Array.from(new Set(messages.map(m => m.sender))),
        messageCount: messages.length,
        lastUpdated: latestMessage.timeAgo,
        priority,
        status: action ? action.status : 'INFORMATIONAL',
        summary: latestMessage.body.slice(0, 140) + '...',
        nextAction: action?.title,
        messages,
        changes
      });
    });

    return threads;
  }

  static search(query: string): {
    emails: Email[];
    actions: ActionItem[];
    changes: ThreadChange[];
    deadlines: DeadlineItem[];
  } {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        emails: MOCK_EMAILS,
        actions: MOCK_ACTION_ITEMS,
        changes: MOCK_THREAD_CHANGES,
        deadlines: MOCK_DEADLINES
      };
    }

    const filteredEmails = MOCK_EMAILS.filter(e => 
      e.subject.toLowerCase().includes(q) ||
      e.sender.toLowerCase().includes(q) ||
      e.body.toLowerCase().includes(q)
    );

    const filteredActions = MOCK_ACTION_ITEMS.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.sender.toLowerCase().includes(q)
    );

    const filteredChanges = MOCK_THREAD_CHANGES.filter(c =>
      c.topic.toLowerCase().includes(q) ||
      c.previousValue.toLowerCase().includes(q) ||
      c.newValue.toLowerCase().includes(q)
    );

    const filteredDeadlines = MOCK_DEADLINES.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.sender.toLowerCase().includes(q)
    );

    return {
      emails: filteredEmails,
      actions: filteredActions,
      changes: filteredChanges,
      deadlines: filteredDeadlines
    };
  }
}
