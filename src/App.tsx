import React, { useState, useEffect } from 'react';
import { GYM_CONFIG } from './config/gymConfig';
import { Member, PaymentRecord, AttendanceRecord, MemberStatus, PaymentMode } from './types';
import { StorageService } from './services/storageService';

// Public Components
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { StatsStrip } from './components/public/StatsStrip';
import { MembershipPlans } from './components/public/MembershipPlans';
import { ClassSchedule } from './components/public/ClassSchedule';
import { TrainersSection } from './components/public/TrainersSection';
import { FacilitiesGrid } from './components/public/FacilitiesGrid';
import { FaqAccordion } from './components/public/FaqAccordion';
import { ContactSection } from './components/public/ContactSection';
import { JoinModal } from './components/public/JoinModal';
import { Footer } from './components/public/Footer';

// Admin Components
import { AdminHeader, AdminTab } from './components/admin/AdminHeader';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminOverview } from './components/admin/AdminOverview';
import { MembersManagement } from './components/admin/MembersManagement';
import { MemberModal } from './components/admin/MemberModal';
import { RenewalModal } from './components/admin/RenewalModal';
import { ExpiringSoonDrawer } from './components/admin/ExpiringSoonDrawer';
import { AttendanceTracker } from './components/admin/AttendanceTracker';
import { PaymentsLog } from './components/admin/PaymentsLog';
import { MemberProgressModal } from './components/admin/MemberProgressModal';

export default function App() {
  // App view: 'website' vs 'admin'
  const [view, setView] = useState<'website' | 'admin'>('website');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // Modals
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedPlanForJoin, setSelectedPlanForJoin] = useState<string>('quarterly');

  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [renewalModalOpen, setRenewalModalOpen] = useState(false);
  const [renewingMember, setRenewingMember] = useState<Member | null>(null);

  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [selectedProgressMember, setSelectedProgressMember] = useState<Member | null>(null);

  // Data states from LocalStorage
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  // Initialize and load data on mount
  useEffect(() => {
    StorageService.initialize();
    loadAllData();

    // Check if URL hash is #admin or /admin
    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      setView('admin');
    }
  }, []);

  const loadAllData = () => {
    setMembers(StorageService.getMembers());
    setPayments(StorageService.getPayments());
    setAttendance(StorageService.getAttendance());
  };

  const handleResetData = () => {
    if (confirm('Reset all demo members, attendance, and receipts to default seed data?')) {
      StorageService.resetDemoData();
      loadAllData();
    }
  };

  // Member CRUD Handlers
  const handleSaveMember = (memberData: Partial<Member> & { name: string; phone: string; planId: string }) => {
    StorageService.saveMember(memberData);
    loadAllData();
  };

  const handleDeleteMember = (id: string) => {
    StorageService.deleteMember(id);
    loadAllData();
  };

  const handleConfirmRenewal = (
    memberId: string,
    planId: string,
    paymentMode: PaymentMode,
    amount: number,
    notes?: string
  ) => {
    StorageService.renewMember(memberId, planId, paymentMode, amount, notes);
    loadAllData();
  };

  const handleAttendanceCheckIn = (idOrPhone: string) => {
    const result = StorageService.checkInMember(idOrPhone);
    if (result.success) {
      loadAllData();
    }
    return result;
  };

  const expiringCount = members.filter((m) => m.status === 'Expiring Soon').length;
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayAttendanceCount = attendance.filter((a) => a.date === todayStr).length;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 flex flex-col font-sans selection:bg-[#E31B23] selection:text-white">
      {view === 'website' ? (
        /* ==================== PUBLIC WEBSITE ==================== */
        <>
          <Navbar
            onOpenJoinModal={(planId) => {
              if (planId) setSelectedPlanForJoin(planId);
              setJoinModalOpen(true);
            }}
            onNavigateToAdmin={() => setView('admin')}
            isAdminActive={false}
          />

          <main className="flex-1">
            <HeroSection
              onOpenJoinModal={(planId) => {
                if (planId) setSelectedPlanForJoin(planId);
                setJoinModalOpen(true);
              }}
              onNavigateToAdmin={() => setView('admin')}
            />

            <StatsStrip />

            <MembershipPlans
              onSelectPlan={(planId) => {
                setSelectedPlanForJoin(planId);
                setJoinModalOpen(true);
              }}
            />

            <ClassSchedule />

            <TrainersSection />

            <FacilitiesGrid />

            <FaqAccordion />

            <ContactSection />
          </main>

          <Footer onNavigateToAdmin={() => setView('admin')} />

          {/* Join / Trial Modal */}
          <JoinModal
            isOpen={joinModalOpen}
            onClose={() => setJoinModalOpen(false)}
            selectedPlanId={selectedPlanForJoin}
            onSuccess={() => loadAllData()}
          />
        </>
      ) : (
        /* ==================== ADMIN DASHBOARD ==================== */
        <>
          {!isAdminAuthenticated ? (
            <AdminLogin
              onLoginSuccess={() => setIsAdminAuthenticated(true)}
              onBackToWebsite={() => setView('website')}
            />
          ) : (
            <div className="flex-1 flex flex-col">
              <AdminHeader
                currentTab={adminTab}
                onSelectTab={setAdminTab}
                onExitAdmin={() => setView('website')}
                onResetData={handleResetData}
                expiringCount={expiringCount}
                todayAttendanceCount={todayAttendanceCount}
                onExportMembersCSV={() => StorageService.exportMembersCSV()}
              />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
                {adminTab === 'overview' && (
                  <AdminOverview
                    members={members}
                    payments={payments}
                    attendance={attendance}
                    onOpenAddMember={() => {
                      setEditingMember(null);
                      setMemberModalOpen(true);
                    }}
                    onNavigateToAttendance={() => setAdminTab('attendance')}
                    onNavigateToExpiring={() => setAdminTab('expiring')}
                    onNavigateToMembers={() => setAdminTab('members')}
                    onExportCSV={() => StorageService.exportMembersCSV()}
                  />
                )}

                {adminTab === 'members' && (
                  <MembersManagement
                    members={members}
                    onOpenAddMember={() => {
                      setEditingMember(null);
                      setMemberModalOpen(true);
                    }}
                    onOpenEditMember={(member) => {
                      setEditingMember(member);
                      setMemberModalOpen(true);
                    }}
                    onOpenRenewMember={(member) => {
                      setRenewingMember(member);
                      setRenewalModalOpen(true);
                    }}
                    onOpenProgressModal={(member) => {
                      setSelectedProgressMember(member);
                      setProgressModalOpen(true);
                    }}
                    onDeleteMember={handleDeleteMember}
                  />
                )}

                {adminTab === 'attendance' && (
                  <AttendanceTracker
                    members={members}
                    attendance={attendance}
                    onCheckIn={handleAttendanceCheckIn}
                  />
                )}

                {adminTab === 'expiring' && (
                  <ExpiringSoonDrawer
                    members={members}
                    onOpenRenewMember={(member) => {
                      setRenewingMember(member);
                      setRenewalModalOpen(true);
                    }}
                  />
                )}

                {adminTab === 'payments' && (
                  <PaymentsLog
                    payments={payments}
                    onExportCSV={() => StorageService.exportPaymentsCSV()}
                  />
                )}
              </div>
            </div>
          )}

          {/* Member Add/Edit Modal */}
          <MemberModal
            isOpen={memberModalOpen}
            initialMember={editingMember}
            onClose={() => {
              setMemberModalOpen(false);
              setEditingMember(null);
            }}
            onSave={handleSaveMember}
          />

          {/* Member Renewal Modal */}
          <RenewalModal
            isOpen={renewalModalOpen}
            member={renewingMember}
            onClose={() => {
              setRenewalModalOpen(false);
              setRenewingMember(null);
            }}
            onConfirmRenewal={handleConfirmRenewal}
          />

          {/* Member Transformation Progress Modal */}
          <MemberProgressModal
            isOpen={progressModalOpen}
            member={selectedProgressMember}
            onClose={() => {
              setProgressModalOpen(false);
              setSelectedProgressMember(null);
            }}
            onRefreshMembers={loadAllData}
          />
        </>
      )}
    </div>
  );
}
