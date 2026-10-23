import { Member, PaymentRecord, AttendanceRecord, ProgressEntry, MemberStatus, PaymentMode } from '../types';
import { GYM_CONFIG } from '../config/gymConfig';

const STORAGE_KEYS = {
  MEMBERS: 'ironforge_members_v1',
  PAYMENTS: 'ironforge_payments_v1',
  ATTENDANCE: 'ironforge_attendance_v1',
  PROGRESS: 'ironforge_progress_v1',
  INITIALIZED: 'ironforge_initialized_v1',
};

// Date helper to get string 'YYYY-MM-DD'
export function formatYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function getDaysRemaining(expiryDateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, m, d] = expiryDateStr.split('-').map(Number);
  const exp = new Date(y, m - 1, d);
  exp.setHours(0, 0, 0, 0);
  const diffTime = exp.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function computeMemberStatus(expiryDateStr: string): MemberStatus {
  const days = getDaysRemaining(expiryDateStr);
  if (days < 0) return 'Expired';
  if (days <= 7) return 'Expiring Soon';
  return 'Active';
}

// Format currency
export function formatRupees(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Generate rich, realistic seed data dynamically anchored to current date
function generateSeedData() {
  const today = new Date();

  // 15 realistic Indian gym members
  const seedMembers: Member[] = [
    {
      id: "mem_1",
      name: "Rohan 'Beast' Sharma",
      phone: "+91 98450 12345",
      email: "rohan.sharma@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      planId: "quarterly",
      planName: "3 Months Shred",
      durationMonths: 3,
      startDate: formatYMD(addDays(today, -88)),
      expiryDate: formatYMD(addDays(today, 2)), // Expiring in 2 days!
      status: 'Expiring Soon',
      paymentMode: 'UPI',
      amountPaid: 5999,
      notes: "Heavy deadlifter, aiming for 200kg PR. Remind him about knee wraps.",
      currentWeightKg: 84.5,
      goalWeightKg: 78.0,
      emergencyPhone: "+91 98450 99999",
      createdAt: formatYMD(addDays(today, -88)),
    },
    {
      id: "mem_2",
      name: "Priya Patel",
      phone: "+91 98201 67890",
      email: "priya.patel@outlook.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      planId: "yearly",
      planName: "1 Year Iron Legend",
      durationMonths: 12,
      startDate: formatYMD(addDays(today, -110)),
      expiryDate: formatYMD(addDays(today, 255)), // Active
      status: 'Active',
      paymentMode: 'Card',
      amountPaid: 15999,
      notes: "Regular in 7 AM morning HIIT and Mobility. Consistent track record.",
      currentWeightKg: 59.2,
      goalWeightKg: 56.0,
      emergencyPhone: "+91 98201 00000",
      createdAt: formatYMD(addDays(today, -110)),
    },
    {
      id: "mem_3",
      name: "Kabir Mehta",
      phone: "+91 99100 44321",
      email: "kabir.mehta@techcorp.in",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      planId: "monthly",
      planName: "Monthly Starter",
      durationMonths: 1,
      startDate: formatYMD(addDays(today, -29)),
      expiryDate: formatYMD(addDays(today, 1)), // Expiring tomorrow!
      status: 'Expiring Soon',
      paymentMode: 'UPI',
      amountPaid: 2499,
      notes: "Tech lead working night shifts. Wants to upgrade to quarterly.",
      currentWeightKg: 76.0,
      goalWeightKg: 72.0,
      emergencyPhone: "+91 99100 88888",
      createdAt: formatYMD(addDays(today, -29)),
    },
    {
      id: "mem_4",
      name: "Vikram Malhotra",
      phone: "+91 98712 33456",
      email: "v.malhotra@yahoo.co.in",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      planId: "quarterly",
      planName: "3 Months Shred",
      durationMonths: 3,
      startDate: formatYMD(addDays(today, -95)),
      expiryDate: formatYMD(addDays(today, -5)), // Expired 5 days ago!
      status: 'Expired',
      paymentMode: 'Cash',
      amountPaid: 5999,
      notes: "Out of town for family function, promised to renew when back this week.",
      currentWeightKg: 81.0,
      goalWeightKg: 75.0,
      emergencyPhone: "+91 98712 11111",
      createdAt: formatYMD(addDays(today, -95)),
    },
    {
      id: "mem_5",
      name: "Ananya Iyer",
      phone: "+91 97400 98765",
      email: "ananya.iyer@gmail.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      planId: "half_yearly",
      planName: "6 Months Beast Mode",
      durationMonths: 6,
      startDate: formatYMD(addDays(today, -75)),
      expiryDate: formatYMD(addDays(today, 105)), // Active
      status: 'Active',
      paymentMode: 'UPI',
      amountPaid: 9999,
      notes: "CrossFit enthusiast and marathon runner. Focus on VO2 max and core stability.",
      currentWeightKg: 54.8,
      goalWeightKg: 53.0,
      emergencyPhone: "+91 97400 22222",
      createdAt: formatYMD(addDays(today, -75)),
    },
    {
      id: "mem_6",
      name: "Arjun Singhania",
      phone: "+91 98860 55432",
      email: "arjun.singhania@finserve.com",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      planId: "yearly",
      planName: "1 Year Iron Legend",
      durationMonths: 12,
      startDate: formatYMD(addDays(today, -45)),
      expiryDate: formatYMD(addDays(today, 320)), // Active
      status: 'Active',
      paymentMode: 'Card',
      amountPaid: 15999,
      notes: "Joined with corporate wellness voucher. Prefers late evening 8 PM lifting.",
      currentWeightKg: 88.0,
      goalWeightKg: 80.0,
      emergencyPhone: "+91 98860 33333",
      createdAt: formatYMD(addDays(today, -45)),
    },
    {
      id: "mem_7",
      name: "Neha Kapoor",
      phone: "+91 98111 22345",
      email: "neha.k@studiofit.in",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      planId: "quarterly",
      planName: "3 Months Shred",
      durationMonths: 3,
      startDate: formatYMD(addDays(today, -86)),
      expiryDate: formatYMD(addDays(today, 4)), // Expiring in 4 days!
      status: 'Expiring Soon',
      paymentMode: 'UPI',
      amountPaid: 5999,
      notes: "Working with Dr. Priya for post-patellar recovery. Steady progress.",
      currentWeightKg: 62.4,
      goalWeightKg: 58.0,
      emergencyPhone: "+91 98111 44444",
      createdAt: formatYMD(addDays(today, -86)),
    },
    {
      id: "mem_8",
      name: "Rajesh Kumar",
      phone: "+91 94480 11223",
      email: "rajesh.kumar77@rediffmail.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      planId: "monthly",
      planName: "Monthly Starter",
      durationMonths: 1,
      startDate: formatYMD(addDays(today, -42)),
      expiryDate: formatYMD(addDays(today, -12)), // Expired 12 days ago!
      status: 'Expired',
      paymentMode: 'Cash',
      amountPaid: 2499,
      notes: "Senior member. Focus on cardiovascular health and joint mobilization.",
      currentWeightKg: 79.5,
      goalWeightKg: 74.0,
      emergencyPhone: "+91 94480 55555",
      createdAt: formatYMD(addDays(today, -42)),
    },
    {
      id: "mem_9",
      name: "Tanvi Verma",
      phone: "+91 96540 88990",
      email: "tanvi.verma@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      planId: "half_yearly",
      planName: "6 Months Beast Mode",
      durationMonths: 6,
      startDate: formatYMD(addDays(today, -174)),
      expiryDate: formatYMD(addDays(today, 6)), // Expiring in 6 days!
      status: 'Expiring Soon',
      paymentMode: 'UPI',
      amountPaid: 9999,
      notes: "Lost 9kg already! Super motivated to renew for the 1-year plan.",
      currentWeightKg: 64.0,
      goalWeightKg: 60.0,
      emergencyPhone: "+91 96540 66666",
      createdAt: formatYMD(addDays(today, -174)),
    },
    {
      id: "mem_10",
      name: "Devendra Patil",
      phone: "+91 98220 77112",
      email: "devendra.patil@maratha.org",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      planId: "yearly",
      planName: "1 Year Iron Legend",
      durationMonths: 12,
      startDate: formatYMD(addDays(today, -60)),
      expiryDate: formatYMD(addDays(today, 305)), // Active
      status: 'Active',
      paymentMode: 'UPI',
      amountPaid: 15999,
      notes: "Desi akhada style wrestler. Exceptional grip and core strength.",
      currentWeightKg: 92.0,
      goalWeightKg: 88.0,
      emergencyPhone: "+91 98220 88888",
      createdAt: formatYMD(addDays(today, -60)),
    },
    {
      id: "mem_11",
      name: "Ayesha Khan",
      phone: "+91 98900 33221",
      email: "ayesha.k@creativehub.in",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
      planId: "quarterly",
      planName: "3 Months Shred",
      durationMonths: 3,
      startDate: formatYMD(addDays(today, -30)),
      expiryDate: formatYMD(addDays(today, 60)), // Active
      status: 'Active',
      paymentMode: 'UPI',
      amountPaid: 5999,
      notes: "Graphic designer, wants posture correction and upper back strength.",
      currentWeightKg: 57.0,
      goalWeightKg: 54.0,
      emergencyPhone: "+91 98900 99999",
      createdAt: formatYMD(addDays(today, -30)),
    },
    {
      id: "mem_12",
      name: "Sameer Joshi",
      phone: "+91 97654 11234",
      email: "sam.joshi@infosys.com",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
      planId: "monthly",
      planName: "Monthly Starter",
      durationMonths: 1,
      startDate: formatYMD(addDays(today, -32)),
      expiryDate: formatYMD(addDays(today, -2)), // Expired 2 days ago!
      status: 'Expired',
      paymentMode: 'UPI',
      amountPaid: 2499,
      notes: "Messaged on WhatsApp yesterday, will pay on weekend check-in.",
      currentWeightKg: 73.5,
      goalWeightKg: 70.0,
      emergencyPhone: "+91 97654 00000",
      createdAt: formatYMD(addDays(today, -32)),
    },
    {
      id: "mem_13",
      name: "Pooja Nair",
      phone: "+91 94470 55667",
      email: "pooja.nair@biocon.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      planId: "quarterly",
      planName: "3 Months Shred",
      durationMonths: 3,
      startDate: formatYMD(addDays(today, -87)),
      expiryDate: formatYMD(addDays(today, 3)), // Expiring in 3 days!
      status: 'Expiring Soon',
      paymentMode: 'NetBanking',
      amountPaid: 5999,
      notes: "Loves the Finnish sauna after barbell squats. Very regular.",
      currentWeightKg: 61.2,
      goalWeightKg: 57.0,
      emergencyPhone: "+91 94470 12121",
      createdAt: formatYMD(addDays(today, -87)),
    },
    {
      id: "mem_14",
      name: "Rahul Deshmukh",
      phone: "+91 98230 44556",
      email: "rahul.desh@startup.io",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80",
      planId: "half_yearly",
      planName: "6 Months Beast Mode",
      durationMonths: 6,
      startDate: formatYMD(addDays(today, -50)),
      expiryDate: formatYMD(addDays(today, 130)), // Active
      status: 'Active',
      paymentMode: 'UPI',
      amountPaid: 9999,
      notes: "Training for state bodybuilding physique category. Strict macro tracking.",
      currentWeightKg: 80.2,
      goalWeightKg: 75.0,
      emergencyPhone: "+91 98230 77777",
      createdAt: formatYMD(addDays(today, -50)),
    },
    {
      id: "mem_15",
      name: "Simran Kaur",
      phone: "+91 98140 66778",
      email: "simran.kaur@uber.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      planId: "yearly",
      planName: "1 Year Iron Legend",
      durationMonths: 12,
      startDate: formatYMD(addDays(today, -15)),
      expiryDate: formatYMD(addDays(today, 350)), // Active
      status: 'Active',
      paymentMode: 'UPI',
      amountPaid: 15999,
      notes: "Newly joined! Attending evening boxing drills and kettlebell WODs.",
      currentWeightKg: 65.0,
      goalWeightKg: 59.0,
      emergencyPhone: "+91 98140 88888",
      createdAt: formatYMD(addDays(today, -15)),
    },
  ];

  // Recalculate status accurately based on today
  const normalizedMembers = seedMembers.map(m => ({
    ...m,
    status: computeMemberStatus(m.expiryDate),
  }));

  // Initial Payments
  const seedPayments: PaymentRecord[] = [
    {
      id: "pay_1",
      receiptNo: "REC-2026-1042",
      memberId: "mem_15",
      memberName: "Simran Kaur",
      memberPhone: "+91 98140 66778",
      planName: "1 Year Iron Legend",
      durationMonths: 12,
      amount: 15999,
      paymentMode: "UPI",
      date: formatYMD(addDays(today, -15)),
      time: "18:24",
      notes: "New annual admission with welcome kit",
    },
    {
      id: "pay_2",
      receiptNo: "REC-2026-1041",
      memberId: "mem_11",
      memberName: "Ayesha Khan",
      memberPhone: "+91 98900 33221",
      planName: "3 Months Shred",
      durationMonths: 3,
      amount: 5999,
      paymentMode: "UPI",
      date: formatYMD(addDays(today, -30)),
      time: "11:15",
      notes: "Quarterly renewal",
    },
    {
      id: "pay_3",
      receiptNo: "REC-2026-1040",
      memberId: "mem_6",
      memberName: "Arjun Singhania",
      memberPhone: "+91 98860 55432",
      planName: "1 Year Iron Legend",
      durationMonths: 12,
      amount: 15999,
      paymentMode: "Card",
      date: formatYMD(addDays(today, -45)),
      time: "19:40",
      notes: "Credit Card swipe at desk",
    },
    {
      id: "pay_4",
      receiptNo: "REC-2026-1039",
      memberId: "mem_14",
      memberName: "Rahul Deshmukh",
      memberPhone: "+91 98230 44556",
      planName: "6 Months Beast Mode",
      durationMonths: 6,
      amount: 9999,
      paymentMode: "UPI",
      date: formatYMD(addDays(today, -50)),
      time: "07:30",
      notes: "Half-yearly subscription",
    },
    {
      id: "pay_5",
      receiptNo: "REC-2026-1038",
      memberId: "mem_10",
      memberName: "Devendra Patil",
      memberPhone: "+91 98220 77112",
      planName: "1 Year Iron Legend",
      durationMonths: 12,
      amount: 15999,
      paymentMode: "UPI",
      date: formatYMD(addDays(today, -60)),
      time: "06:10",
      notes: "Annual membership paid via GPay",
    },
    {
      id: "pay_6",
      receiptNo: "REC-2026-1037",
      memberId: "mem_5",
      memberName: "Ananya Iyer",
      memberPhone: "+91 97400 98765",
      planName: "6 Months Beast Mode",
      durationMonths: 6,
      amount: 9999,
      paymentMode: "UPI",
      date: formatYMD(addDays(today, -75)),
      time: "17:05",
      notes: "6-month combo plan",
    },
    {
      id: "pay_7",
      receiptNo: "REC-2026-1036",
      memberId: "mem_2",
      memberName: "Priya Patel",
      memberPhone: "+91 98201 67890",
      planName: "1 Year Iron Legend",
      durationMonths: 12,
      amount: 15999,
      paymentMode: "Card",
      date: formatYMD(addDays(today, -110)),
      time: "12:50",
      notes: "Annual renewal",
    },
  ];

  // Seed attendance for today & recent days
  const seedAttendance: AttendanceRecord[] = [
    {
      id: "att_1",
      memberId: "mem_1",
      memberName: "Rohan 'Beast' Sharma",
      memberPhone: "+91 98450 12345",
      planName: "3 Months Shred",
      date: formatYMD(today),
      checkInTime: "06:15 AM",
      status: "Expiring Soon",
    },
    {
      id: "att_2",
      memberId: "mem_2",
      memberName: "Priya Patel",
      memberPhone: "+91 98201 67890",
      planName: "1 Year Iron Legend",
      date: formatYMD(today),
      checkInTime: "06:45 AM",
      status: "Active",
    },
    {
      id: "att_3",
      memberId: "mem_5",
      memberName: "Ananya Iyer",
      memberPhone: "+91 97400 98765",
      planName: "6 Months Beast Mode",
      date: formatYMD(today),
      checkInTime: "07:10 AM",
      status: "Active",
    },
    {
      id: "att_4",
      memberId: "mem_10",
      memberName: "Devendra Patil",
      memberPhone: "+91 98220 77112",
      planName: "1 Year Iron Legend",
      date: formatYMD(today),
      checkInTime: "07:40 AM",
      status: "Active",
    },
    {
      id: "att_5",
      memberId: "mem_14",
      memberName: "Rahul Deshmukh",
      memberPhone: "+91 98230 44556",
      planName: "6 Months Beast Mode",
      date: formatYMD(today),
      checkInTime: "08:05 AM",
      status: "Active",
    },
    {
      id: "att_6",
      memberId: "mem_7",
      memberName: "Neha Kapoor",
      memberPhone: "+91 98111 22345",
      planName: "3 Months Shred",
      date: formatYMD(today),
      checkInTime: "08:30 AM",
      status: "Expiring Soon",
    },
  ];

  // Seed progress logs for transformation tracking (e.g., Rohan Sharma, Priya Patel, Tanvi Verma)
  const seedProgress: ProgressEntry[] = [
    {
      id: "prog_1",
      memberId: "mem_1", // Rohan Sharma
      date: formatYMD(addDays(today, -85)),
      weightKg: 89.2,
      bodyFatPercent: 24.5,
      chestInches: 42,
      waistInches: 37,
      armsInches: 15.2,
      trainerNotes: "Baseline measurement. Good muscle base, excess abdominal fat.",
    },
    {
      id: "prog_2",
      memberId: "mem_1",
      date: formatYMD(addDays(today, -55)),
      weightKg: 87.4,
      bodyFatPercent: 22.0,
      chestInches: 42.5,
      waistInches: 35.5,
      armsInches: 15.5,
      trainerNotes: "Strong bench press improvement. Waist trimmed by 1.5 inches.",
    },
    {
      id: "prog_3",
      memberId: "mem_1",
      date: formatYMD(addDays(today, -25)),
      weightKg: 85.8,
      bodyFatPercent: 19.8,
      chestInches: 43.0,
      waistInches: 34.0,
      armsInches: 15.8,
      trainerNotes: "Visible upper abs emerging. Deadlift hit 185kg easily.",
    },
    {
      id: "prog_4",
      memberId: "mem_1",
      date: formatYMD(addDays(today, -3)),
      weightKg: 84.5,
      bodyFatPercent: 18.2,
      chestInches: 43.5,
      waistInches: 33.0,
      armsInches: 16.0,
      trainerNotes: "Outstanding consistency! Down nearly 5kg, arms gained size. Desi transformation!",
    },
    // Priya Patel progress
    {
      id: "prog_5",
      memberId: "mem_2",
      date: formatYMD(addDays(today, -90)),
      weightKg: 64.0,
      bodyFatPercent: 29.0,
      chestInches: 36,
      waistInches: 31,
      armsInches: 11.5,
      trainerNotes: "Initial consultation. Goal: toned shoulders, core endurance.",
    },
    {
      id: "prog_6",
      memberId: "mem_2",
      date: formatYMD(addDays(today, -45)),
      weightKg: 61.5,
      bodyFatPercent: 26.5,
      chestInches: 35.5,
      waistInches: 29.5,
      armsInches: 11.8,
      trainerNotes: "High endurance in morning HIIT. Diet adherence is 90%+.",
    },
    {
      id: "prog_7",
      memberId: "mem_2",
      date: formatYMD(addDays(today, -7)),
      weightKg: 59.2,
      bodyFatPercent: 23.8,
      chestInches: 35.0,
      waistInches: 28.0,
      armsInches: 12.0,
      trainerNotes: "Close to goal weight (56kg). Back squats form is pristine.",
    },
    // Tanvi Verma progress
    {
      id: "prog_8",
      memberId: "mem_9",
      date: formatYMD(addDays(today, -160)),
      weightKg: 73.0,
      bodyFatPercent: 33.0,
      chestInches: 38,
      waistInches: 34,
      armsInches: 12.5,
      trainerNotes: "Targeting fat loss and knee pain prevention with Dr. Priya.",
    },
    {
      id: "prog_9",
      memberId: "mem_9",
      date: formatYMD(addDays(today, -80)),
      weightKg: 68.2,
      bodyFatPercent: 28.5,
      chestInches: 36.5,
      waistInches: 31.0,
      armsInches: 12.0,
      trainerNotes: "Knee discomfort completely gone. Running 5k comfortably.",
    },
    {
      id: "prog_10",
      memberId: "mem_9",
      date: formatYMD(addDays(today, -10)),
      weightKg: 64.0,
      bodyFatPercent: 25.0,
      chestInches: 35.0,
      waistInches: 29.0,
      armsInches: 11.8,
      trainerNotes: "Lost 9kg total! Super inspiring transformation.",
    },
  ];

  return {
    members: normalizedMembers,
    payments: seedPayments,
    attendance: seedAttendance,
    progress: seedProgress,
  };
}

export const StorageService = {
  initialize() {
    if (typeof window === 'undefined') return;
    const isInit = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!isInit) {
      this.resetDemoData();
    }
  },

  resetDemoData() {
    const data = generateSeedData();
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(data.members));
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(data.payments));
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(data.attendance));
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data.progress));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    return data;
  },

  getMembers(): Member[] {
    if (typeof window === 'undefined') return [];
    this.initialize();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      if (!data) return [];
      const members: Member[] = JSON.parse(data);
      // Re-evaluate dynamic status on load
      const updated = members.map(m => ({
        ...m,
        status: computeMemberStatus(m.expiryDate),
      }));
      return updated;
    } catch {
      return [];
    }
  },

  saveMember(memberData: Partial<Member> & { name: string; phone: string; planId: string }): Member {
    const members = this.getMembers();
    const plan = GYM_CONFIG.plans.find(p => p.id === memberData.planId) || GYM_CONFIG.plans[0];
    const today = new Date();

    let savedMember: Member;

    if (memberData.id) {
      // Editing existing member
      const index = members.findIndex(m => m.id === memberData.id);
      const existing = members[index];
      const expiryDate = memberData.expiryDate || existing.expiryDate;
      const status = computeMemberStatus(expiryDate);

      savedMember = {
        ...existing,
        ...memberData,
        planName: plan.name,
        durationMonths: plan.durationMonths,
        status,
      } as Member;

      if (index !== -1) {
        members[index] = savedMember;
      } else {
        members.unshift(savedMember);
      }
    } else {
      // Adding new member
      const startDate = memberData.startDate || formatYMD(today);
      const startDateObj = new Date(startDate);
      const expiryDateObj = addMonths(startDateObj, plan.durationMonths);
      const expiryDate = memberData.expiryDate || formatYMD(expiryDateObj);
      const status = computeMemberStatus(expiryDate);

      savedMember = {
        id: `mem_${Date.now()}`,
        name: memberData.name.trim(),
        phone: memberData.phone.trim(),
        email: memberData.email?.trim() || `${memberData.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        avatar: memberData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`,
        planId: plan.id,
        planName: plan.name,
        durationMonths: plan.durationMonths,
        startDate,
        expiryDate,
        status,
        paymentMode: memberData.paymentMode || 'UPI',
        amountPaid: memberData.amountPaid ?? plan.price,
        notes: memberData.notes || '',
        currentWeightKg: memberData.currentWeightKg || 72,
        goalWeightKg: memberData.goalWeightKg || 68,
        emergencyPhone: memberData.emergencyPhone || '',
        createdAt: formatYMD(today),
      };

      members.unshift(savedMember);

      // Record first payment
      this.recordPayment({
        memberId: savedMember.id,
        memberName: savedMember.name,
        memberPhone: savedMember.phone,
        planName: savedMember.planName,
        durationMonths: savedMember.durationMonths,
        amount: savedMember.amountPaid,
        paymentMode: savedMember.paymentMode,
        notes: `New admission - ${plan.name}`,
      });
    }

    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    return savedMember;
  },

  deleteMember(id: string): boolean {
    const members = this.getMembers().filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    return true;
  },

  renewMember(
    id: string,
    planId: string,
    paymentMode: PaymentMode,
    amount: number,
    notes?: string
  ): { member: Member; payment: PaymentRecord } | null {
    const members = this.getMembers();
    const memberIndex = members.findIndex(m => m.id === id);
    if (memberIndex === -1) return null;

    const existing = members[memberIndex];
    const plan = GYM_CONFIG.plans.find(p => p.id === planId) || GYM_CONFIG.plans[0];
    const today = new Date();

    // If currently expired, start from today. If currently active, extend from current expiry date.
    let baseDate: Date;
    const currentDays = getDaysRemaining(existing.expiryDate);
    if (currentDays > 0) {
      const [y, m, d] = existing.expiryDate.split('-').map(Number);
      baseDate = new Date(y, m - 1, d);
    } else {
      baseDate = new Date(today);
    }

    const newExpiryObj = addMonths(baseDate, plan.durationMonths);
    const newExpiryDate = formatYMD(newExpiryObj);
    const newStatus = computeMemberStatus(newExpiryDate);

    const updatedMember: Member = {
      ...existing,
      planId: plan.id,
      planName: plan.name,
      durationMonths: plan.durationMonths,
      expiryDate: newExpiryDate,
      status: newStatus,
      paymentMode,
      amountPaid: amount,
      notes: notes ? `${existing.notes || ''} | Renewed: ${notes}` : existing.notes,
    };

    members[memberIndex] = updatedMember;
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));

    // Record receipt
    const payment = this.recordPayment({
      memberId: updatedMember.id,
      memberName: updatedMember.name,
      memberPhone: updatedMember.phone,
      planName: plan.name,
      durationMonths: plan.durationMonths,
      amount,
      paymentMode,
      notes: notes || `Membership Renewal for ${plan.name}`,
    });

    return { member: updatedMember, payment };
  },

  getPayments(): PaymentRecord[] {
    if (typeof window === 'undefined') return [];
    this.initialize();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  recordPayment(data: {
    memberId: string;
    memberName: string;
    memberPhone: string;
    planName: string;
    durationMonths: number;
    amount: number;
    paymentMode: PaymentMode;
    notes?: string;
  }): PaymentRecord {
    const payments = this.getPayments();
    const today = new Date();
    const timeStr = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const receiptNo = `REC-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayment: PaymentRecord = {
      id: `pay_${Date.now()}`,
      receiptNo,
      memberId: data.memberId,
      memberName: data.memberName,
      memberPhone: data.memberPhone,
      planName: data.planName,
      durationMonths: data.durationMonths,
      amount: data.amount,
      paymentMode: data.paymentMode,
      date: formatYMD(today),
      time: timeStr,
      notes: data.notes,
    };

    payments.unshift(newPayment);
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
    return newPayment;
  },

  getAttendance(): AttendanceRecord[] {
    if (typeof window === 'undefined') return [];
    this.initialize();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  checkInMember(memberIdOrPhone: string): { success: boolean; message: string; record?: AttendanceRecord } {
    const members = this.getMembers();
    const query = memberIdOrPhone.trim().toLowerCase();
    const member = members.find(
      m => m.id === memberIdOrPhone ||
           m.phone.toLowerCase().includes(query) ||
           m.name.toLowerCase().includes(query)
    );

    if (!member) {
      return { success: false, message: "Member nahi mila! Please check name or phone number." };
    }

    const todayStr = formatYMD(new Date());
    const attendance = this.getAttendance();

    // Check if already checked in today
    const alreadyCheckedIn = attendance.find(a => a.memberId === member.id && a.date === todayStr);
    if (alreadyCheckedIn) {
      return {
        success: false,
        message: `${member.name} is already checked in today at ${alreadyCheckedIn.checkInTime}! Ek session per day done boss.`,
      };
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRecord: AttendanceRecord = {
      id: `att_${Date.now()}`,
      memberId: member.id,
      memberName: member.name,
      memberPhone: member.phone,
      planName: member.planName,
      date: todayStr,
      checkInTime: timeStr,
      status: member.status,
    };

    attendance.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));

    return {
      success: true,
      message: `Swagat hai! ${member.name} checked in at ${timeStr}. Solid workout karo!`,
      record: newRecord,
    };
  },

  getProgress(memberId?: string): ProgressEntry[] {
    if (typeof window === 'undefined') return [];
    this.initialize();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      const all: ProgressEntry[] = data ? JSON.parse(data) : [];
      if (!memberId) return all;
      return all
        .filter(p => p.memberId === memberId)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch {
      return [];
    }
  },

  saveProgressEntry(entryData: Omit<ProgressEntry, 'id'>): ProgressEntry {
    const progressList = this.getProgress();
    const newEntry: ProgressEntry = {
      ...entryData,
      id: `prog_${Date.now()}`,
    };
    progressList.push(newEntry);
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressList));

    // Also update member's current weight
    const members = this.getMembers();
    const mIdx = members.findIndex(m => m.id === entryData.memberId);
    if (mIdx !== -1) {
      members[mIdx].currentWeightKg = entryData.weightKg;
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    }

    return newEntry;
  },

  deleteProgressEntry(id: string): void {
    const progressList = this.getProgress().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressList));
  },

  // WhatsApp Reminder Generator with friendly Hinglish microcopy
  getWhatsAppReminderUrl(member: Member): string {
    const cleanPhone = member.phone.replace(/[^0-9]/g, '');
    const days = getDaysRemaining(member.expiryDate);
    const gym = GYM_CONFIG.name;

    let text = "";
    if (days < 0) {
      text = `Namaste ${member.name} ji! 🙏\n\nAapka *${gym}* membership *${Math.abs(days)} din pehle (${member.expiryDate})* expire ho chuka hai.\n\nFitness streak break mat hone do boss! Aaj hi renew karein aur workout continue karein. Exclusive renewal benefits ke liye revert karein ya counter pe milein! 💪🔥\n\n- Team ${gym}`;
    } else if (days === 0) {
      text = `Hey ${member.name}! ⚠️\n\nAapka *${gym}* membership *AAJ (${member.expiryDate})* expire ho raha hai!\n\nWorkout flow mat roko. UPI se instant renew karne ke liye batayein. Let's keep those gains coming! 🏋️‍♂️\n\n- Team ${gym}`;
    } else {
      text = `Namaste ${member.name} ji! ⚡\n\nReminder from *${gym}*: Aapka membership agle *${days} dino mein (${member.expiryDate})* expire hone wala hai.\n\nAdvance renewal pe special discounts & locker perks reserved hain. Renew karne ke liye reply karein ya reception pe QR scan karein!\n\nStay fit, stay strong! 🚀\n- Team ${gym}`;
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  },

  // Export CSVs
  exportMembersCSV(): void {
    const members = this.getMembers();
    if (!members.length) return;

    const headers = ["Member ID", "Name", "Phone", "Email", "Plan", "Duration (Months)", "Start Date", "Expiry Date", "Days Remaining", "Status", "Amount Paid (₹)", "Payment Mode", "Notes"];
    const rows = members.map(m => [
      m.id,
      `"${m.name.replace(/"/g, '""')}"`,
      m.phone,
      m.email,
      `"${m.planName}"`,
      m.durationMonths,
      m.startDate,
      m.expiryDate,
      getDaysRemaining(m.expiryDate),
      m.status,
      m.amountPaid,
      m.paymentMode,
      `"${(m.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ironforge_members_${formatYMD(new Date())}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  exportPaymentsCSV(): void {
    const payments = this.getPayments();
    if (!payments.length) return;

    const headers = ["Receipt No", "Date", "Time", "Member Name", "Phone", "Plan", "Amount (₹)", "Payment Mode", "Notes"];
    const rows = payments.map(p => [
      p.receiptNo,
      p.date,
      p.time,
      `"${p.memberName.replace(/"/g, '""')}"`,
      p.memberPhone,
      `"${p.planName}"`,
      p.amount,
      p.paymentMode,
      `"${(p.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ironforge_payments_${formatYMD(new Date())}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
