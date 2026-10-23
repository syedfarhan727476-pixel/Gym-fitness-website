export interface PlanConfig {
  id: string;
  name: string;
  durationMonths: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  tagline: string;
  features: string[];
}

export interface TrainerConfig {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string[];
  certifications: string;
  bio: string;
  image: string;
  instagram: string;
}

export interface ClassScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  title: string;
  trainer: string;
  duration: string;
  intensity: 'Medium' | 'High' | 'Extreme';
  category: 'Strength' | 'HIIT' | 'Conditioning' | 'Mobility' | 'Combat';
  slots: number;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const GYM_CONFIG = {
  name: "IronForge Gym",
  shortName: "IronForge",
  tagline: "Desi Josh, Global Standards. Pure Strength, Zero Excuses.",
  heroHeading: "FORGE UNSTOPPABLE STRENGTH & A SHREDDED PHYSIQUE.",
  heroSubheading: "Bengaluru's premier high-performance strength arena. Olympic barbells, bio-metric access, certified master coaches, and a community that pushes you past your limits. No bakwaas, sirf solid workout.",
  currency: "₹",
  phone: "+91 80 4920 8899",
  whatsappNumber: "919876543210", // standard international format for wa.me links
  email: "crew@ironforgegym.in",
  address: "Plot 42, 100 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560038",
  city: "Bengaluru",
  hours: {
    weekdays: "5:30 AM – 10:30 PM",
    saturday: "6:00 AM – 10:00 PM",
    sunday: "7:00 AM – 8:00 PM",
  },
  stats: [
    { label: "Active Iron Clan Members", value: 1450, suffix: "+", subtext: "Consistent lifters" },
    { label: "Floor Area", value: 12000, suffix: " sq.ft", subtext: "Spanning 3 levels" },
    { label: "Certified Master Coaches", value: 18, suffix: "+", subtext: "CSCS & K11 Certified" },
    { label: "Transformation Success", value: 98, suffix: "%", subtext: "Goal achievement rate" },
  ],
  plans: [
    {
      id: "monthly",
      name: "Monthly Starter",
      durationMonths: 1,
      price: 2499,
      originalPrice: 2999,
      popular: false,
      tagline: "Best for beginners testing the waters",
      features: [
        "Full gym floor & cardio deck access",
        "1 Free Fitness & InBody 570 Assessment",
        "Locker & hot shower facilities",
        "Mobile app access for attendance tracking",
        "Standard workout plan template",
      ],
    },
    {
      id: "quarterly",
      name: "3 Months Shred",
      durationMonths: 3,
      price: 5999,
      originalPrice: 7499,
      popular: true,
      tagline: "Bhai ka favourite! Solid transformation window",
      features: [
        "Everything in Monthly Starter",
        "2 Free 1-on-1 Personal Trainer Sessions",
        "Bi-weekly InBody body-fat trackings",
        "Custom high-protein Indian diet blueprint",
        "Unlimited group classes (HIIT, Boxing, MetCon)",
        "15 Days membership freeze option",
      ],
    },
    {
      id: "half_yearly",
      name: "6 Months Beast Mode",
      durationMonths: 6,
      price: 9999,
      originalPrice: 13999,
      popular: false,
      tagline: "Serious gains & guaranteed lifestyle overhaul",
      features: [
        "Everything in 3 Months Shred",
        "4 Personal Trainer Sessions included",
        "Contrast therapy (Finnish Sauna & Steam bath)",
        "Nutritional coaching & supplement guidance",
        "IronForge Gym Athlete T-Shirt & Shaker bottle",
        "30 Days membership freeze allowed",
      ],
    },
    {
      id: "yearly",
      name: "1 Year Iron Legend",
      durationMonths: 12,
      price: 15999,
      originalPrice: 24999,
      popular: false,
      tagline: "Unbeatable value at just ₹1,333/month",
      features: [
        "All-Inclusive VIP Floor & Class Pass",
        "8 Personal Trainer Coaching sessions",
        "Unlimited Steam, Sauna & Recovery Lounge access",
        "Priority locker with permanent gear storage",
        "2 Free Guest passes every single month",
        "60 Days total flexible freeze allowance",
        "Exclusive IronForge gym duffle bag & swag kit",
      ],
    },
  ] as PlanConfig[],

  trainers: [
    {
      id: "coach_vikram",
      name: "Vikram 'Rathore' Singh",
      role: "Head Strength & Conditioning Coach",
      experience: "11+ Years Experience",
      specialty: ["Powerlifting", "Hypertrophy", "Olympic Lifts"],
      certifications: "CSCS®, K11 Master Trainer, National Powerlifting Gold 2021",
      bio: "Former state powerlifter. Believes in heavy compound movements and relentless discipline. No shortcuts, just progressive overload.",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=700&q=80",
      instagram: "@vikram_ironforge",
    },
    {
      id: "coach_ananya",
      name: "Ananya Deshmukh",
      role: "CrossFit L3 & Functional Movement Specialist",
      experience: "8+ Years Experience",
      specialty: ["CrossFit MetCon", "HIIT Endurance", "Mobility Rehab"],
      certifications: "CrossFit Level 3 Trainer, ACE Certified, Animal Flow L2",
      bio: "High octane energy coach! She specializes in explosive athletic performance, cardiovascular stamina, and core stabilization.",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80",
      instagram: "@ananya_fitforge",
    },
    {
      id: "coach_kabir",
      name: "Kabir 'The Machine' Menon",
      role: "Body Sculpting & Calisthenics Coach",
      experience: "7+ Years Experience",
      specialty: ["Body Composition", "Calisthenics", "Desi Akhada Drills"],
      certifications: "ISSA Master Fitness Coach, FMS Certified",
      bio: "Expert at body recomposition and pure bodyweight mastery. Helps members shred fat while packing lean muscle with Indian dietary realities.",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80",
      instagram: "@kabir_ironmenon",
    },
    {
      id: "coach_dr_priya",
      name: "Dr. Priya Sundaram (PT)",
      role: "Sports Physiotherapist & Posture Specialist",
      experience: "9+ Years Experience",
      specialty: ["Injury Rehab", "Spine & Joint Health", "Corrective Exercise"],
      certifications: "MPT Sports Sciences, Dry Needling & Kinesio Taping Certified",
      bio: "Ensures you lift pain-free for life. Resolves shoulder impingements, lower back tightness, and knee tracking issues before they slow you down.",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=80",
      instagram: "@drpriya_sportsphysio",
    },
  ] as TrainerConfig[],

  schedule: [
    {
      id: "s1",
      day: "Monday",
      time: "06:30 AM - 07:30 AM",
      title: "Desi Akhada & Core MetCon",
      trainer: "Coach Kabir Menon",
      duration: "60 mins",
      intensity: "High",
      category: "Conditioning",
      slots: 16,
    },
    {
      id: "s2",
      day: "Monday",
      time: "07:00 PM - 08:00 PM",
      title: "Barbell Squat & Deadlift Clinic",
      trainer: "Coach Vikram Singh",
      duration: "60 mins",
      intensity: "Extreme",
      category: "Strength",
      slots: 12,
    },
    {
      id: "s3",
      day: "Tuesday",
      time: "07:00 AM - 08:00 AM",
      title: "CrossFit WOD & Kettlebell Blast",
      trainer: "Coach Ananya Deshmukh",
      duration: "60 mins",
      intensity: "Extreme",
      category: "HIIT",
      slots: 18,
    },
    {
      id: "s4",
      day: "Tuesday",
      time: "06:30 PM - 07:30 PM",
      title: "Boxing Footwork & Heavy Bag Rounds",
      trainer: "Coach Kabir Menon",
      duration: "60 mins",
      intensity: "High",
      category: "Combat",
      slots: 14,
    },
    {
      id: "s5",
      day: "Wednesday",
      time: "06:30 AM - 07:30 AM",
      title: "Power Hypertrophy Upper Body",
      trainer: "Coach Vikram Singh",
      duration: "60 mins",
      intensity: "High",
      category: "Strength",
      slots: 15,
    },
    {
      id: "s6",
      day: "Wednesday",
      time: "07:30 PM - 08:30 PM",
      title: "Spine & Hip Mobility Protocol",
      trainer: "Dr. Priya Sundaram",
      duration: "60 mins",
      intensity: "Medium",
      category: "Mobility",
      slots: 20,
    },
    {
      id: "s7",
      day: "Thursday",
      time: "07:00 AM - 08:00 AM",
      title: "Tabata Heart-Rate Shred",
      trainer: "Coach Ananya Deshmukh",
      duration: "60 mins",
      intensity: "Extreme",
      category: "HIIT",
      slots: 18,
    },
    {
      id: "s8",
      day: "Thursday",
      time: "07:00 PM - 08:00 PM",
      title: "Olympic Clean & Jerk Workshop",
      trainer: "Coach Vikram Singh",
      duration: "60 mins",
      intensity: "Extreme",
      category: "Strength",
      slots: 10,
    },
    {
      id: "s9",
      day: "Friday",
      time: "06:30 AM - 07:30 AM",
      title: "Glutes & Core Torch",
      trainer: "Coach Ananya Deshmukh",
      duration: "60 mins",
      intensity: "High",
      category: "Conditioning",
      slots: 18,
    },
    {
      id: "s10",
      day: "Friday",
      time: "06:30 PM - 07:30 PM",
      title: "Friday Night Sparring & Fight Fit",
      trainer: "Coach Kabir Menon",
      duration: "60 mins",
      intensity: "High",
      category: "Combat",
      slots: 16,
    },
    {
      id: "s11",
      day: "Saturday",
      time: "08:00 AM - 09:30 AM",
      title: "IronForge Community Strongman & Prowler Push",
      trainer: "Coach Vikram & Coach Ananya",
      duration: "90 mins",
      intensity: "Extreme",
      category: "Strength",
      slots: 25,
    },
    {
      id: "s12",
      day: "Sunday",
      time: "08:30 AM - 09:30 AM",
      title: "Decompress & Foam Rolling Restoration",
      trainer: "Dr. Priya Sundaram",
      duration: "60 mins",
      intensity: "Medium",
      category: "Mobility",
      slots: 22,
    },
  ] as ClassScheduleItem[],

  facilities: [
    {
      id: "f1",
      title: "Olympic Lifting & Power Racks",
      description: "6 heavy-duty squat racks, calibrated competition plates, Eleiko barbells and deadlift lifting platforms with shock absorption.",
      icon: "Dumbbell",
      tag: "Heavy Iron",
    },
    {
      id: "f2",
      title: "Finnish Pine Sauna & Steam",
      description: "Detoxify and optimize recovery with authentic wood sauna and high-humidity eucalyptus steam suites for peak blood circulation.",
      icon: "Flame",
      tag: "Recovery",
    },
    {
      id: "f3",
      title: "Cardio Deck & Sled Turf Track",
      description: "Woodway curved treadmills, Concept2 SkiErgs, assault air-bikes, and a 25-meter indoor prowler sprint turf.",
      icon: "Activity",
      tag: "Conditioning",
    },
    {
      id: "f4",
      title: "MuscleFuel Shake & Protein Cafe",
      description: "Post-workout whey shakes, raw BCAA slushies, cold brew coffee, boiled egg bowls, and high-protein snack boxes.",
      icon: "Coffee",
      tag: "Nutrition",
    },
    {
      id: "f5",
      title: "InBody 570 Body Composition",
      description: "Medical-grade bio-impedance scanner tracking visceral fat, skeletal muscle mass, segmental water balance, and BMR.",
      icon: "Scale",
      tag: "Diagnostics",
    },
    {
      id: "f6",
      title: "Biometric 24/7 Smart Access",
      description: "Seamless facial recognition & RFID turnstiles with luxury rain showers, individual digital lockers, and vanity mirrors.",
      icon: "ShieldCheck",
      tag: "Convenience",
    },
  ] as FacilityItem[],

  faqs: [
    {
      question: "Can I take a free trial workout before paying?",
      answer: "Haan bilkul! We offer 1 complimentary full-access day pass for Bengaluru residents. You get to test all machines, steam/sauna, and experience our community vibes. Just hit 'Book Free Trial' or message us on WhatsApp.",
    },
    {
      question: "What happens if I travel or fall sick? Can I freeze my membership?",
      answer: "Bina kisi jhanjhat ke! Depending on your plan (Quarterly: 15 days, Half-yearly: 30 days, Yearly: 60 days), you can pause your membership anytime via our front desk or WhatsApp with zero penalty fees.",
    },
    {
      question: "Are trainers included or do I have to pay extra for personal training?",
      answer: "Our floor coaches are always active on the floor to check your form, spot your bench presses, and ensure safety at no extra cost. For dedicated 1-on-1 progressive coaching, we have certified personal training packages tailored to your goals.",
    },
    {
      question: "What payment modes do you accept?",
      answer: "We accept all Indian UPI apps (Google Pay, PhonePe, Paytm, CRED), NetBanking, Credit/Debit cards (Visa, Mastercard, RuPay), and Cash at the front desk with instant GST invoices.",
    },
    {
      question: "I am a total beginner and haven't touched a barbell. Is IronForge too intense for me?",
      answer: "Arre tension mat lo! Everyone started at square one. Every newcomer gets a complimentary 1-on-1 induction session where our trainers break down fundamental movements, correct posture, and set up a beginner-friendly routine.",
    },
    {
      question: "Are locker rooms and showers available?",
      answer: "Yes, fully sanitized premium locker rooms with high-pressure hot water rain showers, hair dryers, and complimentary keyless digital lockers are provided.",
    },
  ] as FaqItem[],
};
