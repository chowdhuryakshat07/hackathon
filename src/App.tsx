import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navigation/Navbar';
import { Sidebar } from './components/Navigation/Sidebar';
import { LandingPage } from './components/Landing/LandingPage';
import { CatchUpDashboard } from './components/Dashboard/CatchUpDashboard';
import { WhatNeedsMeView } from './components/Views/WhatNeedsMeView';
import { DeadlineRadarView } from './components/Views/DeadlineRadarView';
import { WhatChangedView } from './components/Views/WhatChangedView';
import { ImportantConversationsView } from './components/Views/ImportantConversationsView';
import { LowPriorityView } from './components/Views/LowPriorityView';
import { SettingsView } from './components/Views/SettingsView';
import { DemoScanningModal } from './components/Demo/DemoScanningModal';
import { SourceEmailModal } from './components/Modals/SourceEmailModal';
import { ReplyDraftModal } from './components/Modals/ReplyDraftModal';
import { GmailConnectModal } from './components/Modals/GmailConnectModal';
import { AIIntelligenceEngine } from './services/aiIntelligenceEngine';
import { TimeframeOption, ActionItem, Email } from './types/inbox';

export function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [timeframe, setTimeframe] = useState<TimeframeOption>('LAST_3_DAYS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [selectedSourceEmailId, setSelectedSourceEmailId] = useState<string | null>(null);
  const [selectedReplyAction, setSelectedReplyAction] = useState<ActionItem | null>(null);
  const [isGmailModalOpen, setIsGmailModalOpen] = useState<boolean>(false);
  const [isGmailConnected, setIsGmailConnected] = useState<boolean>(false);

  // Intelligence Data
  const briefing = useMemo(() => AIIntelligenceEngine.getBriefing(timeframe), [timeframe]);
  const actionItems = useMemo(() => AIIntelligenceEngine.getActionItems(), []);
  const deadlines = useMemo(() => AIIntelligenceEngine.getDeadlines(), []);
  const changes = useMemo(() => AIIntelligenceEngine.getThreadChanges(), []);
  const threads = useMemo(() => AIIntelligenceEngine.getThreads(), []);
  const lowPriorityEmails = useMemo(() => AIIntelligenceEngine.getLowPriorityEmails(), []);

  // Search Results
  const searchResults = useMemo(() => {
    return AIIntelligenceEngine.search(searchQuery);
  }, [searchQuery]);

  const activeSourceEmail = useMemo(() => {
    if (!selectedSourceEmailId) return undefined;
    return AIIntelligenceEngine.getEmailById(selectedSourceEmailId);
  }, [selectedSourceEmailId]);

  const handleStartDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handleCompleteDemo = (selectedTf: TimeframeOption) => {
    setTimeframe(selectedTf);
    setCurrentView('dashboard');
    setIsDemoModalOpen(false);
  };

  const handleResetDemo = () => {
    setTimeframe('LAST_3_DAYS');
    setSearchQuery('');
    setCurrentView('dashboard');
  };

  const isLanding = currentView === 'landing';

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* NAVBAR */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenGmailModal={() => setIsGmailModalOpen(true)}
        onStartDemo={handleStartDemo}
        isGmailConnected={isGmailConnected}
      />

      {/* MAIN CONTAINER */}
      {isLanding ? (
        <main className="flex-1">
          <LandingPage
            onStartDemo={handleStartDemo}
            onOpenGmailModal={() => setIsGmailModalOpen(true)}
          />
        </main>
      ) : (
        <div className="flex-1 max-w-7xl w-full mx-auto flex">
          {/* SIDEBAR */}
          <Sidebar
            currentView={currentView}
            onNavigate={setCurrentView}
            urgentCount={briefing.urgentCount}
            actionCount={actionItems.length}
            changeCount={changes.length}
          />

          {/* PAGE CONTENT WORKSPACE */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
            
            {/* SEARCH BANNER IF SEARCH QUERY PRESENT */}
            {searchQuery && (
              <div className="mb-6 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 text-xs text-indigo-200 flex items-center justify-between">
                <span>Filtering intelligence matching query: <strong className="text-white">"{searchQuery}"</strong> ({searchResults.emails.length} results found)</span>
                <button onClick={() => setSearchQuery('')} className="font-bold underline text-cyan-400">Clear Search</button>
              </div>
            )}

            {currentView === 'dashboard' && (
              <CatchUpDashboard
                briefing={briefing}
                actionItems={searchQuery ? searchResults.actions : actionItems}
                deadlines={searchQuery ? searchResults.deadlines : deadlines}
                changes={searchQuery ? searchResults.changes : changes}
                onNavigate={setCurrentView}
                onOpenSourceModal={setSelectedSourceEmailId}
                onOpenReplyModal={setSelectedReplyAction}
                onSelectCategoryFilter={() => {}}
              />
            )}

            {currentView === 'actions' && (
              <WhatNeedsMeView
                actionItems={searchQuery ? searchResults.actions : actionItems}
                onOpenSourceModal={setSelectedSourceEmailId}
                onOpenReplyModal={setSelectedReplyAction}
              />
            )}

            {currentView === 'deadlines' && (
              <DeadlineRadarView
                deadlines={searchQuery ? searchResults.deadlines : deadlines}
                onOpenSourceModal={setSelectedSourceEmailId}
              />
            )}

            {currentView === 'changes' && (
              <WhatChangedView
                changes={searchQuery ? searchResults.changes : changes}
                onOpenSourceModal={setSelectedSourceEmailId}
              />
            )}

            {currentView === 'conversations' && (
              <ImportantConversationsView
                threads={threads}
                actionItems={actionItems}
                onOpenSourceModal={setSelectedSourceEmailId}
                onOpenReplyModal={setSelectedReplyAction}
              />
            )}

            {currentView === 'low-priority' && (
              <LowPriorityView
                lowPriorityEmails={lowPriorityEmails}
                onOpenSourceModal={setSelectedSourceEmailId}
              />
            )}

            {currentView === 'settings' && (
              <SettingsView
                isGmailConnected={isGmailConnected}
                onOpenGmailModal={() => setIsGmailModalOpen(true)}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                onResetDemo={handleResetDemo}
              />
            )}

          </main>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#080c14] py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-display font-bold text-white">ICU — I See You</span>
            <span>•</span>
            <span>AI Professional Inbox Lifesaver</span>
          </div>
          <p>© 2026 ICU Technologies. Built for BIMTECH Hackathon.</p>
        </div>
      </footer>

      {/* MODALS */}
      <DemoScanningModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onComplete={handleCompleteDemo}
      />

      <SourceEmailModal
        email={activeSourceEmail}
        onClose={() => setSelectedSourceEmailId(null)}
      />

      <ReplyDraftModal
        action={selectedReplyAction}
        onClose={() => setSelectedReplyAction(null)}
      />

      <GmailConnectModal
        isOpen={isGmailModalOpen}
        onClose={() => setIsGmailModalOpen(false)}
        isGmailConnected={isGmailConnected}
        onToggleConnect={() => setIsGmailConnected(prev => !prev)}
      />

    </div>
  );
}

export default App;
