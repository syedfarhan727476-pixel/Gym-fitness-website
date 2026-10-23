export type MemberStatus = 'Active' | 'Expiring Soon' | 'Expired';
export type PaymentMode = 'UPI' | 'Cash' | 'Card' | 'NetBanking';

export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  planId: string;
  planName: string;
  durationMonths: number;
  startDate: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  status: MemberStatus;
  paymentMode: PaymentMode;
  amountPaid: number;
  notes?: string;
  currentWeightKg?: number;
  goalWeightKg?: number;
  emergencyPhone?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  receiptNo: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  planName: string;
  durationMonths: number;
  amount: number;
  paymentMode: PaymentMode;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  planName: string;
  date: string; // YYYY-MM-DD
  checkInTime: string; // HH:mm:ss
  status: MemberStatus;
}

export interface ProgressEntry {
  id: string;
  memberId: string;
  date: string; // YYYY-MM-DD
  weightKg: number;
  bodyFatPercent?: number;
  chestInches?: number;
  waistInches?: number;
  armsInches?: number;
  trainerNotes?: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  expiringSoonMembers: number;
  expiredMembers: number;
  thisMonthRevenue: number;
  todayAttendance: number;
}
