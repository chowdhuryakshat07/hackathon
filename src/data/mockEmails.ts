import { Email, Thread, ThreadChange, ActionItem, DeadlineItem, AICatchupBriefing } from '../types/inbox';

export const MOCK_EMAILS: Email[] = [
  // --- SCENARIO 1: PROJECT ALPHA DEADLINE CHANGE (URGENT) ---
  {
    id: 'email-101',
    threadId: 'thread-alpha',
    sender: 'Rahul Sharma',
    senderEmail: 'rahul.sharma@clientcorp.com',
    senderRole: 'Lead Product Manager at ClientCorp',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    recipient: 'rachit@company.com',
    subject: 'Project Alpha Final Submission Schedule Update',
    body: `Hi Rachit,\n\nFollowing up on our initial project plan where we slated final delivery for August 20. Due to an upcoming executive review with the steering committee, we need to expedite the final submission.\n\nPlease submit the revised final version by August 18 at 5:00 PM EST.\n\nLet me know if your team needs any clarification.\n\nBest,\nRahul`,
    timestamp: '2026-08-15T14:30:00Z',
    timeAgo: '4 hours ago',
    isUnread: true,
    category: 'PROJECT',
    evidenceHighlight: 'Please submit the revised final version by August 18 at 5:00 PM EST.'
  },
  {
    id: 'email-100',
    threadId: 'thread-alpha',
    sender: 'Rahul Sharma',
    senderEmail: 'rahul.sharma@clientcorp.com',
    senderRole: 'Lead Product Manager at ClientCorp',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    recipient: 'rachit@company.com',
    subject: 'Project Alpha Timeline Confirmation',
    body: `Hi Rachit,\n\nJust confirming that Project Alpha final submission deadline is August 20. Everything is looking good on our end.\n\nRegards,\nRahul`,
    timestamp: '2026-08-13T09:15:00Z',
    timeAgo: '2 days ago',
    isUnread: false,
    category: 'PROJECT'
  },

  // --- SCENARIO 2: MANAGER FOLLOW-UP (URGENT) ---
  {
    id: 'email-202',
    threadId: 'thread-manager-report',
    sender: 'Vikram Malhotra',
    senderEmail: 'vikram.m@company.com',
    senderRole: 'VP of Engineering (Your Manager)',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    recipient: 'rachit@company.com',
    subject: 'URGENT: Monthly Performance Report Status',
    body: `Hi Rachit,\n\nJust following up on the monthly performance report. The leadership team meeting is tomorrow morning and I need this report to prepare the quarterly deck.\n\nPlease share the completed report as soon as you see this.\n\nThanks,\nVikram`,
    timestamp: '2026-08-15T16:45:00Z',
    timeAgo: '2 hours ago',
    isUnread: true,
    category: 'MANAGER',
    evidenceHighlight: 'Just following up on the monthly performance report... Please share the completed report as soon as you see this.'
  },
  {
    id: 'email-201',
    threadId: 'thread-manager-report',
    sender: 'Vikram Malhotra',
    senderEmail: 'vikram.m@company.com',
    senderRole: 'VP of Engineering (Your Manager)',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    recipient: 'rachit@company.com',
    subject: 'Monthly Performance Report Request',
    body: `Hi Rachit,\n\nPlease share the monthly report by August 18.\n\nRegards,\nVikram`,
    timestamp: '2026-08-12T11:00:00Z',
    timeAgo: '3 days ago',
    isUnread: false,
    category: 'MANAGER'
  },

  // --- SCENARIO 3: MEETING TIME CHANGE (IMPORTANT) ---
  {
    id: 'email-302',
    threadId: 'thread-client-meeting',
    sender: 'Sarah Jenkins',
    senderEmail: 'sarah.jenkins@acme.io',
    senderRole: 'Director of Partnerships at Acme Inc',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    recipient: 'rachit@company.com',
    subject: 'UPDATED: Client Strategy Sync - Time Rescheduled',
    body: `Hi Team,\n\nDue to a scheduling conflict with our executive team, we need to push back today's client sync meeting.\n\nThe meeting originally scheduled for 3:00 PM has been moved to 5:00 PM today. Updated calendar invite sent.\n\nApologies for the last-minute change!\n\nBest,\nSarah`,
    timestamp: '2026-08-15T12:10:00Z',
    timeAgo: '6 hours ago',
    isUnread: true,
    category: 'MEETING',
    evidenceHighlight: 'The meeting originally scheduled for 3:00 PM has been moved to 5:00 PM today.'
  },
  {
    id: 'email-301',
    threadId: 'thread-client-meeting',
    sender: 'Sarah Jenkins',
    senderEmail: 'sarah.jenkins@acme.io',
    senderRole: 'Director of Partnerships at Acme Inc',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    recipient: 'rachit@company.com',
    subject: 'Client Strategy Sync - Calendar Invite',
    body: `Hi Rachit,\n\nConfirming our partnership strategy session scheduled for today at 3:00 PM.\n\nSee you then,\nSarah`,
    timestamp: '2026-08-14T15:00:00Z',
    timeAgo: '1 day ago',
    isUnread: false,
    category: 'MEETING'
  },

  // --- SCENARIO 4 & 6: HR DOCUMENTATION MANDATORY & DEADLINE (IMPORTANT) ---
  {
    id: 'email-402',
    threadId: 'thread-hr-docs',
    sender: 'Priya Nambiar',
    senderEmail: 'priya.hr@company.com',
    senderRole: 'People Operations Lead',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
    recipient: 'all-employees@company.com',
    subject: 'IMPORTANT: Annual Employee Compliance & Tax Verification Required',
    body: `Dear Team,\n\nPlease note an important compliance update: submitting your annual tax and employee verification documentation is now REQUIRED for all active personnel.\n\nPlease complete your employee documentation by Friday, August 19.\n\nAccess the internal HR portal to submit signed PDFs.\n\nRegards,\nPriya Nambiar | HR Operations`,
    timestamp: '2026-08-14T09:30:00Z',
    timeAgo: '1 day ago',
    isUnread: true,
    category: 'HR',
    evidenceHighlight: 'submitting your annual tax and employee verification documentation is now REQUIRED... Please complete your employee documentation by Friday, August 19.'
  },

  // --- SCENARIO 5: REVISED QUOTATION ACTION (URGENT) ---
  {
    id: 'email-501',
    threadId: 'thread-quotation',
    sender: 'Amitav Roy',
    senderEmail: 'a.roy@enterprise.org',
    senderRole: 'Procurement Manager at Enterprise Corp',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    recipient: 'rachit@company.com',
    subject: 'Request for Revised Enterprise License Proposal',
    body: `Hi Rachit,\n\nWe reviewed your initial enterprise quote. Based on our revised seat count (250 users), could you please send the revised quotation by tomorrow?\n\nOur procurement committee meets on Monday morning, so having the updated quote by tomorrow EOD is critical.\n\nThanks,\nAmitav Roy`,
    timestamp: '2026-08-15T15:20:00Z',
    timeAgo: '3 hours ago',
    isUnread: true,
    category: 'CLIENT',
    evidenceHighlight: 'could you please send the revised quotation by tomorrow? Our procurement committee meets on Monday morning...'
  },

  // --- ADDITIONAL REALISTIC CONVERSATIONS & NOISE (35+ ITEMS) ---
  {
    id: 'email-601',
    threadId: 'thread-survey',
    sender: 'Internal Comms Team',
    senderEmail: 'comms@company.com',
    senderRole: 'Company Communications',
    recipient: 'team@company.com',
    subject: 'Q3 Team Feedback Survey',
    body: `Hi Everyone,\n\nWe value your opinion! Please take 5 minutes to complete the Q3 workplace survey by August 25.\n\nThank you!`,
    timestamp: '2026-08-14T11:00:00Z',
    timeAgo: '1 day ago',
    isUnread: false,
    category: 'PROJECT'
  },
  {
    id: 'email-701',
    threadId: 'thread-aws-bill',
    sender: 'AWS Billing',
    senderEmail: 'no-reply@amazon.com',
    senderRole: 'Automated Billing Service',
    recipient: 'dev-billing@company.com',
    subject: 'AWS Invoice Available - August 2026',
    body: `Your monthly AWS invoice for $342.18 is now available in your management console.`,
    timestamp: '2026-08-15T02:00:00Z',
    timeAgo: '17 hours ago',
    isUnread: true,
    category: 'SYSTEM'
  },
  {
    id: 'email-702',
    threadId: 'thread-github-actions',
    sender: 'GitHub',
    senderEmail: 'notifications@github.com',
    senderRole: 'Automated CI/CD System',
    recipient: 'rachit@company.com',
    subject: '[CI/CD] Build #4821 succeeded on branch main',
    body: `Build #4821 finished successfully in 2m 14s. Deployment to staging complete.`,
    timestamp: '2026-08-15T13:40:00Z',
    timeAgo: '5 hours ago',
    isUnread: false,
    category: 'SYSTEM'
  },

  // --- GENERATED PROMOTIONS / NEWSLETTERS / LOW PRIORITY NOISE (30 items) ---
  ...Array.from({ length: 30 }, (_, index) => ({
    id: `email-promo-${index + 1}`,
    threadId: `thread-promo-${index + 1}`,
    sender: [
      'TechCrunch Daily',
      'Superhuman Pulse',
      'Figma Weekly Digest',
      'Medium Daily Digest',
      'Cloudflare Updates',
      'Linear Product News',
      'Vercel Changelog',
      'Stripe Press',
      'Notion Insiders',
      'Substack Reads'
    ][index % 10],
    senderEmail: `newsletter-${index + 1}@updates.io`,
    senderRole: 'Subscription / Newsletter',
    recipient: 'rachit@company.com',
    subject: [
      '🚀 Top 10 AI startups scaling fast in 2026',
      'New Figma Auto-layout capabilities launched!',
      'Vercel Next.js 15 preview feature announcement',
      'The secret to high-throughput microservices',
      'Weekend Special: 20% discount on Enterprise plans',
      'Weekly Industry Digest: Engineering Trends',
      'How modern teams build design systems',
      'Security patch notice for third-party SDKs',
      'Invitation to Product Design Masterclass Webcast',
      'Your monthly subscriber metrics summary'
    ][index % 10] + ` #${index + 1}`,
    body: `This is an automated low-priority update or promotional email sent to your inbox. No immediate action required. You can safely ignore or read at your convenience.`,
    timestamp: new Date(Date.now() - (index + 1) * 3600000 * 2).toISOString(),
    timeAgo: `${index + 1}h ago`,
    isUnread: index % 2 === 0,
    category: index % 3 === 0 ? 'NEWSLETTER' : 'PROMO'
  })) as Email[]
];

export const MOCK_THREAD_CHANGES: ThreadChange[] = [
  {
    id: 'change-1',
    threadId: 'thread-alpha',
    topic: 'Project Alpha Final Submission',
    field: 'DEADLINE',
    previousValue: 'August 20',
    newValue: 'August 18',
    sourceEmailId: 'email-101',
    confidence: 0.98,
    detectedAt: '4 hours ago',
    urgency: 'URGENT'
  },
  {
    id: 'change-2',
    threadId: 'thread-client-meeting',
    topic: 'Client Strategy Sync Meeting',
    field: 'MEETING_TIME',
    previousValue: '3:00 PM',
    newValue: '5:00 PM Today',
    sourceEmailId: 'email-302',
    confidence: 0.96,
    detectedAt: '6 hours ago',
    urgency: 'IMPORTANT'
  },
  {
    id: 'change-3',
    threadId: 'thread-hr-docs',
    topic: 'Annual HR Tax & Compliance Verification',
    field: 'REQUIREMENT',
    previousValue: 'Optional Submission',
    newValue: 'Required (Mandatory by Aug 19)',
    sourceEmailId: 'email-402',
    confidence: 0.95,
    detectedAt: '1 day ago',
    urgency: 'IMPORTANT'
  }
];

export const MOCK_ACTION_ITEMS: ActionItem[] = [
  {
    id: 'action-1',
    threadId: 'thread-quotation',
    title: 'Send Revised Enterprise Quotation (250 seats)',
    sender: 'Amitav Roy',
    senderEmail: 'a.roy@enterprise.org',
    senderRole: 'Procurement Manager at Enterprise Corp',
    deadline: '2026-08-16T17:00:00Z',
    formattedDeadline: 'Tomorrow EOD',
    priority: 'URGENT',
    status: 'WAITING_FOR_USER',
    sourceEmailId: 'email-501',
    suggestedReply: `Hi Amitav,\n\nThanks for reaching out! I've updated our pricing proposal based on the 250 seat requirement.\n\nPlease find the attached revised quotation for your committee review on Monday.\n\nBest regards,\nRachit`
  },
  {
    id: 'action-2',
    threadId: 'thread-manager-report',
    title: 'Send Monthly Performance Report to Manager',
    sender: 'Vikram Malhotra',
    senderEmail: 'vikram.m@company.com',
    senderRole: 'VP of Engineering (Your Manager)',
    deadline: '2026-08-16T09:00:00Z',
    formattedDeadline: 'Immediate (Before Leadership Sync)',
    priority: 'URGENT',
    status: 'WAITING_FOR_USER',
    sourceEmailId: 'email-202',
    suggestedReply: `Hi Vikram,\n\nApologies for the delay! Here is the finalized monthly performance report attached for tomorrow morning's executive deck.\n\nLet me know if you'd like me to highlight specific metrics.\n\nThanks,\nRachit`
  },
  {
    id: 'action-3',
    threadId: 'thread-alpha',
    title: 'Confirm Expedition of Project Alpha Delivery to Aug 18',
    sender: 'Rahul Sharma',
    senderEmail: 'rahul.sharma@clientcorp.com',
    senderRole: 'Lead Product Manager at ClientCorp',
    deadline: '2026-08-18T17:00:00Z',
    formattedDeadline: 'August 18 (2 days earlier)',
    priority: 'URGENT',
    status: 'WAITING_FOR_USER',
    sourceEmailId: 'email-101',
    suggestedReply: `Hi Rahul,\n\nReceived your message regarding the shifted deadline. We have adjusted our sprint scope to ensure the final submission is ready by August 18 at 5:00 PM.\n\nBest,\nRachit`
  },
  {
    id: 'action-4',
    threadId: 'thread-hr-docs',
    title: 'Complete Signed Employee Compliance Documentation',
    sender: 'Priya Nambiar',
    senderEmail: 'priya.hr@company.com',
    senderRole: 'People Operations Lead',
    deadline: '2026-08-19T23:59:00Z',
    formattedDeadline: 'Friday, August 19',
    priority: 'IMPORTANT',
    status: 'WAITING_FOR_USER',
    sourceEmailId: 'email-402',
    suggestedReply: `Hi Priya,\n\nI have uploaded my signed tax and compliance verification PDFs to the HR portal.\n\nThanks,\nRachit`
  }
];

export const MOCK_DEADLINES: DeadlineItem[] = [
  {
    id: 'dl-1',
    threadId: 'thread-quotation',
    title: 'Submit Revised Quotation to Enterprise Corp',
    deadlineDate: '2026-08-16',
    relativeTime: 'Tomorrow',
    sender: 'Amitav Roy',
    priority: 'URGENT',
    sourceEmailId: 'email-501'
  },
  {
    id: 'dl-2',
    threadId: 'thread-alpha',
    title: 'Project Alpha Final Deliverables Submission',
    deadlineDate: '2026-08-18',
    relativeTime: 'August 18 (Moved from Aug 20)',
    sender: 'Rahul Sharma',
    priority: 'URGENT',
    sourceEmailId: 'email-101'
  },
  {
    id: 'dl-3',
    threadId: 'thread-hr-docs',
    title: 'Annual HR Employee Tax Verification',
    deadlineDate: '2026-08-19',
    relativeTime: 'Friday, August 19',
    sender: 'Priya Nambiar',
    priority: 'IMPORTANT',
    sourceEmailId: 'email-402'
  },
  {
    id: 'dl-4',
    threadId: 'thread-survey',
    title: 'Internal Q3 Team Feedback Survey',
    deadlineDate: '2026-08-25',
    relativeTime: 'August 25',
    sender: 'Internal Comms',
    priority: 'INFORMATIONAL',
    sourceEmailId: 'email-601'
  }
];

export const MOCK_BRIEFING: AICatchupBriefing = {
  timeframe: 'LAST_3_DAYS',
  totalEmails: 47,
  urgentCount: 3,
  importantCount: 5,
  infoCount: 9,
  lowPriorityCount: 30,
  briefingText: `You missed three critical developments while away. First, ClientCorp moved the Project Alpha final delivery deadline two days earlier (from August 20 to August 18). Second, your manager Vikram sent a follow-up requesting the monthly performance report for tomorrow's executive deck. Third, today's client sync meeting moved from 3:00 PM to 5:00 PM. Additionally, mandatory HR tax documentation is due Friday. Remaining messages are routine newsletters and notifications.`,
  biggestMissed: {
    title: 'Project Alpha Deadline Expedited',
    threadId: 'thread-alpha',
    sourceEmailId: 'email-101',
    previousValue: 'August 20',
    newValue: 'August 18',
    description: 'Rahul Sharma (Lead PM at ClientCorp) moved the submission date 2 days earlier due to an upcoming executive review with steering committee.',
    status: 'WAITING_FOR_USER',
    urgentNote: 'Client is waiting for confirmation of the updated delivery date.'
  }
};
