export type PriorityLevel = 'URGENT' | 'IMPORTANT' | 'INFORMATIONAL' | 'LOW_PRIORITY';

export type ThreadStatus = 'WAITING_FOR_USER' | 'WAITING_FOR_OTHERS' | 'RESOLVED' | 'ESCALATED' | 'INFORMATIONAL';

export type TimeframeOption = 'YESTERDAY' | 'LAST_3_DAYS' | 'LAST_7_DAYS' | 'CUSTOM';

export interface Email {
  id: string;
  threadId: string;
  sender: string;
  senderEmail: string;
  senderRole?: string;
  senderAvatar?: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
  timeAgo: string;
  isUnread: boolean;
  category: 'CLIENT' | 'MANAGER' | 'HR' | 'PROJECT' | 'MEETING' | 'NEWSLETTER' | 'PROMO' | 'SYSTEM';
  evidenceHighlight?: string;
}

export interface ThreadChange {
  id: string;
  threadId: string;
  topic: string;
  field: 'DEADLINE' | 'MEETING_TIME' | 'REQUIREMENT' | 'PRICING' | 'SCOPE';
  previousValue: string;
  newValue: string;
  sourceEmailId: string;
  confidence: number;
  detectedAt: string;
  urgency: PriorityLevel;
}

export interface ActionItem {
  id: string;
  threadId: string;
  title: string;
  sender: string;
  senderEmail: string;
  senderRole: string;
  deadline: string;
  formattedDeadline: string;
  priority: PriorityLevel;
  status: ThreadStatus;
  sourceEmailId: string;
  suggestedReply: string;
}

export interface DeadlineItem {
  id: string;
  threadId: string;
  title: string;
  deadlineDate: string;
  relativeTime: string;
  sender: string;
  priority: PriorityLevel;
  sourceEmailId: string;
}

export interface Thread {
  id: string;
  subject: string;
  participants: string[];
  messageCount: number;
  lastUpdated: string;
  priority: PriorityLevel;
  status: ThreadStatus;
  summary: string;
  nextAction?: string;
  messages: Email[];
  changes?: ThreadChange[];
}

export interface BiggestThingMissed {
  title: string;
  threadId: string;
  sourceEmailId: string;
  previousValue: string;
  newValue: string;
  description: string;
  status: ThreadStatus;
  urgentNote: string;
}

export interface AICatchupBriefing {
  timeframe: TimeframeOption;
  totalEmails: number;
  urgentCount: number;
  importantCount: number;
  infoCount: number;
  lowPriorityCount: number;
  briefingText: string;
  biggestMissed: BiggestThingMissed;
}
