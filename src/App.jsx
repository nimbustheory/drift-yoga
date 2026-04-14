import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react";
import {
  Home, Calendar, TrendingUp, Users, CreditCard, CalendarDays,
  Menu, X, Bell, Settings, Shield, ChevronRight, ChevronDown, Clock,
  ArrowUpRight, ArrowDownRight, Award, DollarSign, LayoutDashboard,
  UserCheck, Megaphone, LogOut, Plus, Edit3, Send, Check, Search, Info,
  CircleCheck, UserPlus, Heart, Flame, Star, Sun, Moon, Wind, Sparkles,
  Mountain, Leaf, Music, Gift, Share2, MapPin, Trash2, Volume2,
  Headphones, Eye, Waves, RefreshCw, Zap, Move, Coffee
} from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const STUDIO_CONFIG = {
  name: "DRIFT",
  subtitle: "YOGA + JUICE BAR",
  tagline: "Step onto the mat. Drift away to serenity.",
  logoMark: "D",
  description: "Olson Kundig-designed yoga studio, organic juice bar, and retail in South Lake Union. Non-heated. Reserve your mat. Free Manduka mats and props.",
  heroLine1: "DRIFT",
  heroLine2: "AWAY",
  address: { street: "1251 Harrison St", city: "Seattle", state: "WA", zip: "98109" },
  phone: "(206) 618-3928",
  email: "flowwithus@driftyogajuicebar.com",
  neighborhood: "South Lake Union, Seattle",
  website: "https://www.driftyogajuicebar.com",
  social: { instagram: "@driftyogaseattle" },
  locations: [{ name: "DRIFT Studio", type: "yoga" }],
  theme: {
    accent:     { h: 40,  s: 45, l: 52 },
    accentAlt:  { h: 155, s: 30, l: 32 },
    warning:    { h: 15,  s: 55, l: 50 },
    primary:    { h: 35,  s: 18, l: 10 },
    surface:    { h: 38,  s: 15, l: 97 },
    surfaceDim: { h: 35,  s: 12, l: 93 },
  },
  features: {
    workshops: true, retreats: true, soundBaths: false, teacherTrainings: true,
    practiceTracking: true, communityFeed: true, guestPasses: true, milestones: true,
    multiLocation: false, juiceBar: true, retail: true, reserveMat: true,
  },
  classCapacity: 30,
  specialtyCapacity: 15,
};

const SQ = "https://images.squarespace-cdn.com/content/v1/5e6e92382af6d508e3489c1e/";
const STUDIO_IMAGES = {
  home: SQ + "1da459d2-664c-475b-8e96-e4c5a9c3e725/19054_00_N14_high300.jpg?format=1500w",
  classes: SQ + "44955694-2273-40d3-8b46-9fb46e3caf26/010-DRIFT-STUDIO6281.jpg?format=1500w",
  schedule: SQ + "1726807684267-7ZBCCJ70X5KD27KZZY3J/DriftYoga_092024-466.jpg?format=1500w",
  practice: SQ + "b4f2eef7-2281-4736-a6ac-6e6a448ad1b6/hand+on+heart+facing+.jpg?format=1500w",
  community: SQ + "1726807764343-XL7UEZNP6AHBZBWT61JK/DriftYoga_092024-430.jpg?format=1500w",
  teachers: SQ + "1724123790486-TXL0DQF6N0BLPXSLAHYA/DRIFT2024-6656-Edit.jpg?format=1500w",
  events: SQ + "1726424625804-OFPSNWAYQ4DGROSOSN1T/DriftYoga_082024-411.jpg?format=1500w",
  membership: SQ + "988b0172-3ffe-4897-b654-565ccb07691c/19054_00_N12_high300.jpg?format=1500w",
};

const GRADIENTS = {
  home: `linear-gradient(135deg, hsl(40,45%,30%) 0%, hsl(35,18%,14%) 100%)`,
  classes: `linear-gradient(135deg, hsl(155,30%,24%) 0%, hsl(40,30%,18%) 100%)`,
  schedule: `linear-gradient(135deg, hsl(35,25%,22%) 0%, hsl(40,45%,20%) 100%)`,
  practice: `linear-gradient(135deg, hsl(40,35%,28%) 0%, hsl(155,20%,16%) 100%)`,
  community: `linear-gradient(135deg, hsl(15,55%,30%) 0%, hsl(35,18%,14%) 100%)`,
  teachers: `linear-gradient(135deg, hsl(40,45%,26%) 0%, hsl(35,18%,14%) 100%)`,
  events: `linear-gradient(135deg, hsl(155,30%,28%) 0%, hsl(40,25%,18%) 100%)`,
  membership: `linear-gradient(135deg, hsl(40,45%,24%) 0%, hsl(15,30%,20%) 100%)`,
};

const hsl = (c, a) => a !== undefined ? `hsla(${c.h},${c.s}%,${c.l}%,${a})` : `hsl(${c.h},${c.s}%,${c.l}%)`;
const hslShift = (c, lShift) => `hsl(${c.h},${c.s}%,${Math.max(0, Math.min(100, c.l + lShift))}%)`;

const T = {
  accent: hsl(STUDIO_CONFIG.theme.accent), accentDark: hslShift(STUDIO_CONFIG.theme.accent, -12),
  accentLight: hslShift(STUDIO_CONFIG.theme.accent, 30), accentGhost: hsl(STUDIO_CONFIG.theme.accent, 0.08),
  accentBorder: hsl(STUDIO_CONFIG.theme.accent, 0.18), success: hsl(STUDIO_CONFIG.theme.accentAlt),
  successGhost: hsl(STUDIO_CONFIG.theme.accentAlt, 0.08), successBorder: hsl(STUDIO_CONFIG.theme.accentAlt, 0.18),
  warning: hsl(STUDIO_CONFIG.theme.warning), warningGhost: hsl(STUDIO_CONFIG.theme.warning, 0.08),
  warningBorder: hsl(STUDIO_CONFIG.theme.warning, 0.2), bg: hsl(STUDIO_CONFIG.theme.primary),
  bgCard: hsl(STUDIO_CONFIG.theme.surface), bgDim: hsl(STUDIO_CONFIG.theme.surfaceDim),
  text: "#221e14", textMuted: "#786848", textFaint: "#a89470",
  border: "#e4dcc8", borderLight: "#f0ebe0",
};

const A = {
  bg: "#f3f1ec", card: "#ffffff", cardBorder: "#e0dcd4", sidebar: "#ffffff",
  sidebarBorder: "#e8e4dc", text: "#221e14", textSecondary: "#4b5563",
  textMuted: "#6b7280", input: "#f8f6f2", inputBorder: "#e0dcd4",
  divider: "#e8e4dc", chartGrid: "#e0dcd4",
  tooltipBg: "#ffffff", tooltipBorder: "#e0dcd4",
};

const today = new Date().toISOString().split('T')[0];
const offsetDate = (d) => { const dt = new Date(); dt.setDate(dt.getDate() + d); return dt.toISOString().split('T')[0]; };
const formatDateShort = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); };
const formatDateLong = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }); };
const fmtTime = (t) => { const [h, m] = t.split(":"); const hr = +h; return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`; };

const TEACHERS = [
  { id: "t1", firstName: "Vivian", lastName: "Obong-Duelli", role: "Owner & Founder", certs: ["RYT-200", "Retreat Leader"], specialties: ["Power Vinyasa", "Vinyasa", "DRIFT Escapes"], yearsTeaching: 8, bio: "Vivian opened DRIFT in 2020 to share the ways yoga has helped her. She created a magical and inclusive space in an Olson Kundig-designed studio with a juice bar and retail shop. She leads DRIFT Escape retreats to destinations like Iceland.", photo: "" },
  { id: "t2", firstName: "Nancy", lastName: "Lea", role: "Senior Teacher", certs: ["E-RYT 500"], specialties: ["Power Vinyasa", "Vinyasa", "Retreats"], yearsTeaching: 14, bio: "Nancy is DRIFT resident yoga instructor and retreat co-leader. Her classes are athletic and creative with expert cueing and thoughtful sequences that challenge and inspire.", photo: "" },
  { id: "t3", firstName: "Sarah", lastName: "Mitchell", role: "Teacher", certs: ["RYT-200", "Yoga Nidra Certified"], specialties: ["Yoga Nidra", "Restorative", "Slow Flow"], yearsTeaching: 7, bio: "Sarah teaches DRIFT restorative sessions including Yoga Nidra. Students describe her Sunday night classes as the reason they bought a membership. Deeply healing, deeply restful.", photo: "" },
  { id: "t4", firstName: "McKenzie", lastName: "Hart", role: "Teacher", certs: ["RYT-200", "Bhakti Yoga"], specialties: ["Bhakti Flow", "Vinyasa", "Devotional Practice"], yearsTeaching: 6, bio: "McKenzie guides soulful Bhakti Flow practices with movement and music. Her classes awaken body, mind, and spirit through heart-opening asanas and mindful transitions infused with intention and grace.", photo: "" },
  { id: "t5", firstName: "Susan", lastName: "Caputo", role: "Teacher", certs: ["RYT-500"], specialties: ["Hatha", "Slow Flow", "Flow + Roll"], yearsTeaching: 10, bio: "Susan brings precision and calm to her Hatha and Slow Flow classes. Her Flow + Roll sessions combining vinyasa with myofascial release therapy balls are a student favorite for deep tension release.", photo: "" },
  { id: "t6", firstName: "Meghan", lastName: "Park", role: "Teacher & Musician", certs: ["RYT-200", "Harmonium"], specialties: ["Bhakti Flow", "Sound Healing", "Live Music"], yearsTeaching: 5, bio: "Meghan plays harmonium alongside McKenzie during Bhakti Flow classes, creating an enchanting harmony of movement and music. Her live musical accompaniment transforms every class into a devotional experience.", photo: "" },
];

const TODAYS_FOCUS = {
  id: "focus-today", date: today, name: "DRIFT 60: Power Vinyasa", type: "POWER", style: "Power Vinyasa", temp: "75\u00b0F (non-heated)", duration: 60,
  description: "A full 60-minute power vinyasa to challenge the body and mind. The wooden box design provides an oasis from the outside world. Your reserved Manduka mat is waiting at your chosen spot.",
  intention: "Escape the hustle. Find your center. Drift.",
  teacherTip: "The studio is non-heated at a comfortable 75 degrees. Free Manduka mat, props, and towel are at your reserved spot. Just bring yourself and water.",
};

const PAST_PRACTICES = [
  { id: "p-y1", date: offsetDate(-1), name: "DRIFT 45: Slow Flow", type: "SLOW", style: "Slow Flow", temp: "75\u00b0F", duration: 45, description: "A 45-minute slow flow to move the body and calm the mind. Energizing yet relaxing. Perfect for fitting into your SLU schedule.", intention: "Less time, more presence." },
  { id: "p-y2", date: offsetDate(-2), name: "DRIFT 60: Yoga Nidra", type: "NIDRA", style: "Yoga Nidra", temp: "75\u00b0F", duration: 60, description: "Yogic sleep. A guided journey through consciousness that leaves you feeling more rested than hours of sleep. Sunday night magic at DRIFT.", intention: "Between waking and dreaming, the body heals." },
  { id: "p-y3", date: offsetDate(-3), name: "DRIFT 60: Hatha", type: "HATHA", style: "Hatha", temp: "75\u00b0F", duration: 60, description: "Building strength, flexibility, and balance at a steady pace. Each posture explored with care and alignment. Excellent for all levels.", intention: "Quality over quantity. Awareness over ambition." },
];

const UPCOMING_PRACTICE = { id: "p-tmrw", date: offsetDate(1), name: "DRIFT 45: Flow + Roll", type: "ROLL", style: "Flow + Roll", temp: "75\u00b0F", duration: 45, description: "Vinyasa flow combined with myofascial release using therapy balls. Moving to release tension, then rolling to restore. Self-care in 45 focused minutes.", intention: "Flow to find it. Roll to release it." };

const CLASSES_TODAY = [
  { id: "cl1", time: "07:00", type: "DRIFT 45: Power Vinyasa", coach: "Nancy Lea", capacity: 30, registered: 24, waitlist: 0 },
  { id: "cl2", time: "09:00", type: "DRIFT 60: Vinyasa", coach: "Vivian Obong-Duelli", capacity: 30, registered: 28, waitlist: 2 },
  { id: "cl3", time: "10:30", type: "DRIFT 45: Hatha", coach: "Susan Caputo", capacity: 30, registered: 18, waitlist: 0 },
  { id: "cl4", time: "12:00", type: "DRIFT 45: Slow Flow", coach: "Sarah Mitchell", capacity: 30, registered: 14, waitlist: 0 },
  { id: "cl5", time: "17:00", type: "DRIFT 60: Power Vinyasa", coach: "Nancy Lea", capacity: 30, registered: 30, waitlist: 4 },
  { id: "cl6", time: "18:30", type: "DRIFT 60: Slow Flow (Silent)", coach: "McKenzie Hart", capacity: 30, registered: 22, waitlist: 0 },
];

const WEEKLY_SCHEDULE = [
  { day: "Monday", classes: [{ time: "07:00", type: "DRIFT 45: Power Vinyasa", coach: "Nancy" }, { time: "09:00", type: "DRIFT 60: Vinyasa", coach: "Vivian" }, { time: "10:30", type: "DRIFT 45: Hatha", coach: "Susan" }, { time: "12:00", type: "DRIFT 45: Slow Flow", coach: "Sarah" }, { time: "17:00", type: "DRIFT 60: Power Vinyasa", coach: "Nancy" }, { time: "18:30", type: "DRIFT 60: Slow Flow", coach: "McKenzie" }] },
  { day: "Tuesday", classes: [{ time: "07:00", type: "DRIFT 45: Power Vinyasa", coach: "Nancy" }, { time: "09:00", type: "DRIFT 60: Vinyasa", coach: "Vivian" }, { time: "10:30", type: "DRIFT 45: Hatha", coach: "Susan" }, { time: "12:00", type: "DRIFT 45: Slow Flow", coach: "Sarah" }, { time: "17:00", type: "DRIFT 60: Power Vinyasa", coach: "Nancy" }, { time: "18:30", type: "DRIFT 60: Slow Flow", coach: "McKenzie" }] },
  { day: "Wednesday", classes: [{ time: "07:00", type: "DRIFT 45: Power Vinyasa", coach: "Nancy" }, { time: "09:00", type: "DRIFT 60: Vinyasa", coach: "Vivian" }, { time: "10:30", type: "DRIFT 45: Hatha", coach: "Susan" }, { time: "12:00", type: "DRIFT 45: Slow Flow", coach: "Sarah" }, { time: "17:00", type: "DRIFT 60: Power Vinyasa", coach: "Nancy" }, { time: "18:30", type: "DRIFT 60: Slow Flow", coach: "McKenzie" }] },
  { day: "Thursday", classes: [{ time: "07:00", type: "DRIFT 45: Power Vinyasa", coach: "Nancy" }, { time: "09:00", type: "DRIFT 60: Vinyasa", coach: "Vivian" }, { time: "10:30", type: "DRIFT 45: Hatha", coach: "Susan" }, { time: "12:00", type: "DRIFT 45: Slow Flow", coach: "Sarah" }, { time: "17:00", type: "DRIFT 60: Power Vinyasa", coach: "Nancy" }, { time: "18:30", type: "DRIFT 60: Slow Flow", coach: "McKenzie" }] },
  { day: "Friday", classes: [{ time: "07:00", type: "DRIFT 45: Power Vinyasa", coach: "Nancy" }, { time: "09:00", type: "DRIFT 60: Vinyasa", coach: "Vivian" }, { time: "10:30", type: "DRIFT 45: Flow + Roll", coach: "Susan" }, { time: "17:00", type: "One of a Kind: Theme Flow", coach: "McKenzie" }] },
  { day: "Saturday", classes: [{ time: "09:00", type: "DRIFT 60: Power Vinyasa", coach: "Vivian" }, { time: "10:30", type: "DRIFT 45: Hatha", coach: "Susan" }, { time: "12:00", type: "DRIFT 45: Slow Flow", coach: "Sarah" }] },
  { day: "Sunday", classes: [{ time: "09:00", type: "DRIFT 60: Power Vinyasa", coach: "Vivian" }, { time: "10:30", type: "DRIFT 45: Hatha", coach: "Susan" }, { time: "12:00", type: "DRIFT 45: Slow Flow", coach: "Sarah" }] },
];

const COMMUNITY_FEED = [
  { id: "cf1", user: "Shannon S.", milestone: "50 Classes", message: "Fifty drifts. This is the most beautiful studio I have ever practiced in. The wooden box is meditation before meditation.", date: today, celebrations: 22 },
  { id: "cf2", user: "Priya K.", milestone: "30-Day Streak", message: "Thirty days at DRIFT. The 7am crew, the Manduka mat waiting for me, the juice bar after. This is my morning ritual.", date: today, celebrations: 18 },
  { id: "cf3", user: "Marcus L.", milestone: "First Yoga Nidra", message: "Sarah guided me into the deepest rest I have experienced in years. I did not sleep. I did not wake. I just... drifted.", date: offsetDate(-1), celebrations: 28 },
  { id: "cf4", user: "Jess R.", milestone: "1 Year Member", message: "One year as a Warrior 3 member. Vivian built something special here. The studio, the juice, the people. SLU needed this.", date: offsetDate(-2), celebrations: 34 },
];

const MILESTONE_BADGES = {
  "First DRIFT": { icon: Leaf, color: T.accent },
  "10 Classes": { icon: Wind, color: T.accent },
  "50 Classes": { icon: Mountain, color: T.accent },
  "100 Classes": { icon: Star, color: T.success },
  "7-Day Streak": { icon: Flame, color: T.warning },
  "30-Day Streak": { icon: Sparkles, color: T.warning },
  "Early Riser (7am)": { icon: Sun, color: "#f59e0b" },
  "First Yoga Nidra": { icon: Moon, color: "#8b5cf6" },
  "Juice Bar Regular": { icon: Coffee, color: "#3b82f6" },
  "1 Year Member": { icon: Award, color: T.success },
};

const EVENTS = [
  { id: "ev1", name: "Bhakti Flow with McKenzie & Meghan", date: "2026-05-11", startTime: "17:00", type: "Special Class", description: "A journey of devotion. Movement and music as Meghan plays harmonium while McKenzie guides you through a soulful flow. Heart-opening asanas infused with intention and grace.", fee: 40, maxParticipants: 30, registered: 22, status: "Registration Open" },
  { id: "ev2", name: "DRIFT Escape: Bali Retreat", date: "2026-10-18", startTime: "09:00", type: "Retreat", description: "Seven days of yoga, adventure, and transformation in Bali with Vivian and Nancy Lea. Two practices a day, cultural immersion, nourishing meals, and community.", fee: 3200, maxParticipants: 16, registered: 10, status: "Early Bird" },
  { id: "ev3", name: "One of a Kind: Silent Practice Friday", date: offsetDate(3), startTime: "17:00", type: "Theme Class", description: "No music. No cueing after the first sun salutation. Just you, your breath, and the wooden box. A meditative vinyasa in complete silence.", fee: 30, maxParticipants: 30, registered: 18, status: "Open" },
];

const MEMBERSHIP_TIERS = [
  { id: "m0", name: "New: Any 3 Classes", type: "intro", price: 45, period: "3 classes", features: ["Try 3 classes in 30 days", "DRIFT 45 or DRIFT 60", "Free Manduka mat and props", "New students only"], popular: false },
  { id: "m1", name: "Drop-In (45 min)", type: "drop-in", price: 25, period: "per class", features: ["Single 45-minute class", "Reserve your mat", "Free Manduka mat and towel"], popular: false },
  { id: "m2", name: "Drop-In (60 min)", type: "drop-in", price: 30, period: "per class", features: ["Single 60-minute class", "Reserve your mat", "Free Manduka mat and towel"], popular: false },
  { id: "m3", name: "10 Class Pack", type: "pack", price: 250, period: "10 classes", features: ["Any class on the daily schedule", "12-month expiration", "Reserve your mat", "Best value for 1-2x/week"], popular: false },
  { id: "m4", name: "Warrior 3 Membership", type: "unlimited", price: 165, period: "/month", features: ["Unlimited DRIFT 45 and 60 classes", "10% off One of a Kind workshops", "1 guest pass per month", "10% off Juice Bar and DRIFT Closet", "3-month auto-renew commitment"], popular: true },
  { id: "m5", name: "30-Day Unlimited", type: "unlimited", price: 185, period: "30 days", features: ["Unlimited classes for 30 days", "No commitment, non-renewing", "All class types", "Great for visitors or trial"], popular: false },
];

const ANNOUNCEMENTS = [
  { id: "a1", title: "New Student: Any 3 Classes for $45", message: "Experience the wooden box. Try DRIFT 45, DRIFT 60, or both. Free Manduka mat and props at your reserved spot.", type: "celebration", pinned: true },
  { id: "a2", title: "DRIFT Escape: Bali October 2026", message: "Seven days of yoga and adventure with Vivian and Nancy Lea. Early bird pricing available now.", type: "info", pinned: false },
  { id: "a3", title: "Juice Bar: Saturdays and Sundays 9am-1pm", message: "Organic pressed juices, alternative milks, and vegan baked goods made in-house daily. Pre-order from the website.", type: "info", pinned: false },
];

const MEMBERS_DATA = [
  { id: "mem1", name: "Shannon Sato", email: "shannon@email.com", membership: "Warrior 3", status: "active", joined: "2024-03-01", checkIns: 186, lastVisit: today },
  { id: "mem2", name: "Priya Kumar", email: "priya@email.com", membership: "Warrior 3", status: "active", joined: "2024-08-15", checkIns: 142, lastVisit: offsetDate(-1) },
  { id: "mem3", name: "Marcus Lee", email: "marcus@email.com", membership: "10 Class Pack", status: "active", joined: "2026-01-10", checkIns: 6, lastVisit: offsetDate(-3) },
  { id: "mem4", name: "Jess Rivera", email: "jess@email.com", membership: "Warrior 3", status: "active", joined: "2025-04-01", checkIns: 128, lastVisit: today },
  { id: "mem5", name: "Kai Tanaka", email: "kai@email.com", membership: "7am Warrior", status: "active", joined: "2025-09-01", checkIns: 96, lastVisit: offsetDate(-1) },
  { id: "mem6", name: "Noor Ahmed", email: "noor@email.com", membership: "New: 3 Classes", status: "active", joined: "2026-04-06", checkIns: 2, lastVisit: offsetDate(-2) },
];

const ADMIN_METRICS = { activeMembers: 138, memberChange: 8, todayCheckIns: 44, weekCheckIns: 268, monthlyRevenue: 22600, revenueChange: 9.4, renewalRate: 89.2, workshopRevenue: 3400 };

const ADMIN_CHARTS = {
  attendance: [
    { day: "Mon", total: 46, avg: 8 }, { day: "Tue", total: 42, avg: 7 },
    { day: "Wed", total: 40, avg: 7 }, { day: "Thu", total: 44, avg: 7 },
    { day: "Fri", total: 34, avg: 9 }, { day: "Sat", total: 38, avg: 13 },
    { day: "Sun", total: 32, avg: 11 },
  ],
  revenue: [
    { month: "Sep", revenue: 17200 }, { month: "Oct", revenue: 18400 },
    { month: "Nov", revenue: 19200 }, { month: "Dec", revenue: 17800 },
    { month: "Jan", revenue: 20600 }, { month: "Feb", revenue: 21400 },
    { month: "Mar", revenue: 22600 },
  ],
  classPopularity: [
    { name: "7:00 AM", pct: 82 }, { name: "9:00 AM", pct: 94 },
    { name: "10:30 AM", pct: 62 }, { name: "12:00 PM", pct: 48 },
    { name: "5:00 PM", pct: 98 }, { name: "6:30 PM", pct: 74 },
  ],
  membershipBreakdown: [
    { name: "Warrior 3", value: 52, color: T.accent },
    { name: "7am Unlimited", value: 18, color: T.success },
    { name: "30-Day Unlimited", value: 14, color: T.warning },
    { name: "10 Class Pack", value: 28, color: T.textMuted },
    { name: "Drop-In / Intro", value: 26, color: "#8b5cf6" },
  ],
};

const AppContext = createContext(null);

function PageHero({ image, title, subtitle, fallbackGradient }) {
  const [imgFailed, setImgFailed] = useState(false);
  const isUrl = image && image.startsWith("http");
  const useImage = isUrl && !imgFailed;
  const bgFallback = fallbackGradient || `linear-gradient(135deg, hsl(40,45%,30%) 0%, hsl(35,18%,14%) 100%)`;
  return (
    <div style={{ position: "relative", minHeight: 240, overflow: "hidden", marginBottom: 16 }}>
      {useImage && <img src={image} alt="" onError={() => setImgFailed(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} loading="lazy" />}
      {!useImage && <div style={{ position: "absolute", inset: 0, background: bgFallback }} />}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.45) 0%, rgba(0,0,0,.05) 50%, rgba(0,0,0,.15) 100%)" }} />
      <div style={{ position: "relative", padding: "80px 20px 24px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 240 }}>
        <h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 34, fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.1 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: "rgba(255,255,255,.75)", margin: "6px 0 0", maxWidth: 280 }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function TeacherAvatar({ teacher, size = 56 }) {
  const [imgError, setImgError] = useState(false);
  if (teacher.photo && !imgError) {
    return <img src={teacher.photo} alt={`${teacher.firstName} ${teacher.lastName}`} onError={() => setImgError(true)} style={{ width: size, height: size, borderRadius: size > 48 ? 14 : 10, objectFit: "cover", flexShrink: 0 }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: size > 48 ? 14 : 10, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Crimson Pro', serif", fontSize: size * 0.38, color: "#fff", flexShrink: 0, fontWeight: 600 }}>
      {teacher.firstName[0]}{teacher.lastName[0]}
    </div>
  );
}

function SectionHeader({ title, linkText, linkPage }) {
  const { setPage } = useContext(AppContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "0 16px" }}>
      <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 24, margin: 0, fontWeight: 600 }}>{title}</h2>
      {linkText && <button onClick={() => setPage(linkPage)} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: T.accent, background: "none", border: "none", cursor: "pointer" }}>{linkText} <ChevronRight size={16} /></button>}
    </div>
  );
}

function QuickAction({ icon: Icon, label, page, color }) {
  const { setPage } = useContext(AppContext);
  return (
    <button onClick={() => setPage(page)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", background: T.bgCard, borderRadius: 12, border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={20} color="#fff" /></div>
      <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{label}</span>
    </button>
  );
}

function PracticeCard({ practice, variant, expanded, onToggle }) {
  const isFeatured = variant === "featured";
  const isExpanded = expanded !== undefined ? expanded : isFeatured;
  const typeColors = { VINYASA: T.accent, YIN: "#8b5cf6", RESTORATIVE: T.success, LSD: "#8b5cf6", INVERSIONS: "#3b82f6", MELLOW: T.success, RESTORE: T.warning, SPECIAL: T.success };
  return (
    <div onClick={onToggle} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderLeft: `4px solid ${typeColors[practice.type] || T.accent}`, borderRadius: 12, padding: isFeatured ? "18px 18px" : "14px 16px", cursor: onToggle ? "pointer" : "default" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isExpanded ? 10 : 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            {practice.date === today ? <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: T.accentGhost, color: T.accent }}>TODAY</span> : <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 600 }}>{formatDateShort(practice.date)}</span>}
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: `${typeColors[practice.type] || T.accent}12`, color: typeColors[practice.type] || T.accent }}>{practice.style}</span>
            {practice.duration && <span style={{ fontSize: 11, color: T.textFaint }}>{practice.duration} min</span>}
          </div>
          <h3 style={{ fontFamily: "'Crimson Pro', serif", fontSize: isFeatured ? 26 : 20, margin: 0, color: T.text, fontWeight: 600 }}>{practice.name}</h3>
        </div>
        {onToggle && <ChevronDown size={18} color={T.textFaint} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />}
      </div>
      {isExpanded && (
        <div>
          {practice.temp && <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><Sun size={14} color={T.success} /><span style={{ fontSize: 12, fontWeight: 600, color: T.success }}>{practice.temp}</span></div>}
          <p style={{ fontSize: 14, color: "#5a5040", lineHeight: 1.6, margin: "0 0 12px" }}>{practice.description}</p>
          {practice.intention && <div style={{ padding: "10px 12px", background: T.accentGhost, borderRadius: 8, marginBottom: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>Intention</span><p style={{ fontSize: 13, color: "#5a5040", margin: "4px 0 0", lineHeight: 1.5, fontStyle: "italic" }}>{practice.intention}</p></div>}
          {practice.teacherTip && <div style={{ padding: "10px 12px", background: T.successGhost, borderRadius: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: T.success, textTransform: "uppercase", letterSpacing: "0.05em" }}>Teacher Note</span><p style={{ fontSize: 13, color: "#5a5040", margin: "4px 0 0", lineHeight: 1.5 }}>{practice.teacherTip}</p></div>}
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, multiline }) {
  const style = { width: "100%", padding: "10px 12px", background: T.bgDim, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 14, color: T.text, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {multiline ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...style, resize: "vertical" }} /> : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />}
    </div>
  );
}

function EmptyState({ icon: Icon, message, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
      <Icon size={36} color={T.textFaint} style={{ margin: "0 auto 8px" }} /><p style={{ color: T.textMuted, margin: 0 }}>{message}</p>
      {sub && <p style={{ fontSize: 13, color: T.accent, margin: "6px 0 0" }}>{sub}</p>}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{ background: T.bgDim, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 2px" }}>{label}</p>
      <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: 22, color: T.text, margin: 0, fontWeight: 700 }}>{value}</p>
    </div>
  );
}

function AdminCard({ title, children }) {
  return (
    <div style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: 12, padding: 18 }}>
      <h3 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 18, color: A.text, margin: "0 0 14px", fontWeight: 600 }}>{title}</h3>
      {children}
    </div>
  );
}

function CrudBar({ onAdd, addLabel = "Add New" }) {
  return (
    <button onClick={onAdd} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
      <Plus size={16} /> {addLabel}
    </button>
  );
}

function CrudActions() {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <button style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${A.cardBorder}`, background: "transparent", color: A.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit3 size={14} /></button>
      <button style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${A.cardBorder}`, background: "transparent", color: A.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CONSUMER PAGES
// ═══════════════════════════════════════════════════════════════

function HomePage() {
  const { classRegistrations, openReservation, feedCelebrations, celebrateFeed } = useContext(AppContext);
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const upcoming = CLASSES_TODAY.filter(c => c.time >= currentTime).slice(0, 4);

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.home} fallbackGradient={GRADIENTS.home} title={<>{STUDIO_CONFIG.heroLine1}<br/><span style={{ color: T.accent, fontStyle: "italic" }}>{STUDIO_CONFIG.heroLine2}</span></>} subtitle={STUDIO_CONFIG.description} />

      <section style={{ padding: "0 16px", marginTop: -16, position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            { icon: Calendar, label: "Reserve", page: "schedule", color: T.accent },
            { icon: Flame, label: "Practice", page: "practice", color: T.success },
            { icon: Heart, label: "Community", page: "community", color: T.warning },
            { icon: Users, label: "Teachers", page: "teachers", color: T.textMuted },
          ].map(a => <QuickAction key={a.label} {...a} />)}
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <SectionHeader title="Today's Practice" linkText="All Classes" linkPage="classes" />
        <div style={{ padding: "0 16px" }}><PracticeCard practice={TODAYS_FOCUS} variant="featured" /></div>
      </section>

      <section style={{ marginTop: 28 }}>
        <SectionHeader title="Upcoming Classes" linkText="Full Schedule" linkPage="schedule" />
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.length > 0 ? upcoming.map(c => {
            const regs = (classRegistrations[c.id] || 0);
            const totalReg = c.registered + regs;
            const isFull = totalReg >= c.capacity;
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ textAlign: "center", minWidth: 48 }}>
                  <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: 22, color: T.text, fontWeight: 600 }}>{fmtTime(c.time).split(":")[0]}</span>
                  <span style={{ display: "block", fontSize: 10, color: T.textMuted }}>{fmtTime(c.time).slice(-5)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: T.text, fontSize: 14, margin: 0 }}>{c.type}</p>
                  <p style={{ fontSize: 11, color: T.textMuted, margin: "2px 0 0" }}>{c.coach.split(" ")[0]} — DRIFT Studio</p>
                </div>
                <div style={{ textAlign: "right", marginRight: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: isFull ? T.warning : totalReg >= c.capacity * 0.8 ? T.success : T.accent }}>{totalReg}/{c.capacity}</span>
                  {c.waitlist > 0 && <span style={{ display: "block", fontSize: 10, color: T.textFaint }}>+{c.waitlist} waitlist</span>}
                </div>
                <button onClick={() => openReservation({ ...c, date: today })} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: isFull ? T.bgDim : T.accent, color: isFull ? T.textMuted : "#fff" }}>
                  {isFull ? "Waitlist" : "Reserve"}
                </button>
              </div>
            );
          }) : <EmptyState icon={Moon} message="No more classes today" sub="See tomorrow's schedule" />}
        </div>
      </section>

      {STUDIO_CONFIG.features.communityFeed && (
        <section style={{ marginTop: 28 }}>
          <SectionHeader title="Community" linkText="View All" linkPage="community" />
          <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {COMMUNITY_FEED.slice(0, 3).map(item => {
              const myC = feedCelebrations[item.id] || 0;
              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: `linear-gradient(135deg, ${T.successGhost}, transparent)`, border: `1px solid ${T.successBorder}`, borderRadius: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.success, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Sparkles size={18} color="#fff" /></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, color: T.text, margin: 0 }}>{item.user} <span style={{ color: T.success }}>{item.milestone}</span></p>
                    <p style={{ fontSize: 11, color: "#6b6050", margin: "2px 0 0" }}>{item.message.length > 55 ? item.message.slice(0, 55) + "..." : item.message}</p>
                  </div>
                  <button onClick={() => celebrateFeed(item.id)} style={{ padding: 8, borderRadius: 8, border: "none", background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <Heart size={16} color={T.success} fill={myC > 0 ? T.success : "none"} /><span style={{ fontSize: 11, fontWeight: 600, color: T.success }}>{item.celebrations + myC}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {ANNOUNCEMENTS.length > 0 && (
        <section style={{ marginTop: 28, padding: "0 16px" }}>
          <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 24, margin: "0 0 12px", fontWeight: 600 }}>Announcements</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ANNOUNCEMENTS.map(a => (
              <div key={a.id} style={{ padding: "14px 16px", borderRadius: 12, borderLeft: `4px solid ${a.type === "celebration" ? T.accent : T.textMuted}`, background: a.type === "celebration" ? T.accentGhost : T.bgDim }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: 0 }}>{a.title}</h3>
                    <p style={{ fontSize: 12, color: "#6b6050", margin: "4px 0 0" }}>{a.message}</p>
                  </div>
                  {a.pinned && <span style={{ fontSize: 10, fontWeight: 600, color: T.accent, background: T.accentGhost, padding: "2px 8px", borderRadius: 99 }}>Pinned</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ padding: "16px 16px 8px", marginTop: 20 }}>
        <div style={{ background: `linear-gradient(165deg, ${T.bg}, hsl(30,20%,14%))`, borderRadius: 16, padding: "24px 20px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.03, background: "radial-gradient(circle at 80% 30%, rgba(255,255,255,.4) 0%, transparent 50%)" }} />
          <div style={{ position: "relative" }}>
            <h3 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 24, margin: "0 0 6px", fontWeight: 600 }}>New to DRIFT Yoga?</h3>
            <p style={{ fontSize: 13, color: "#b8a898", margin: "0 0 16px", lineHeight: 1.5 }}>Try any 3 classes for just $45. Free Manduka mat and props. Reserve your spot.</p>
            <button onClick={() => {}} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontFamily: "'Crimson Pro', serif", fontSize: 15, cursor: "pointer", fontWeight: 600 }}>View Memberships <ChevronRight size={16} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ClassesPage() {
  const [exp, setExp] = useState(null);
  const all = [TODAYS_FOCUS, ...PAST_PRACTICES, UPCOMING_PRACTICE].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.classes} fallbackGradient={GRADIENTS.classes} title="Classes" subtitle="DRIFT 45, DRIFT 60, Power Vinyasa, Yoga Nidra, and more" />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {all.map(p => <PracticeCard key={p.id} practice={p} expanded={exp === p.id} onToggle={() => setExp(exp === p.id ? null : p.id)} />)}
      </div>
    </div>
  );
}

function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const { openReservation } = useContext(AppContext);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.schedule} fallbackGradient={GRADIENTS.schedule} title="Schedule" subtitle="Reserve your spot — classes fill up fast" />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {days.map((d, i) => (
            <button key={d} onClick={() => setSelectedDay(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: selectedDay === i ? T.accent : T.bgDim, color: selectedDay === i ? "#fff" : T.textMuted }}>{d}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {WEEKLY_SCHEDULE[selectedDay]?.classes.map((cls, i) => {
            const isSpecial = cls.type.includes("Nidra") || cls.type.includes("Roll") || cls.type.includes("Bhakti") || cls.type.includes("One of a Kind") || cls.type.includes("Silent");
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ textAlign: "center", minWidth: 54 }}>
                  <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: 16, color: T.text, fontWeight: 600 }}>{fmtTime(cls.time)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, color: T.text, margin: 0 }}>{cls.type}</p>
                    {isSpecial && <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", padding: "1px 5px", borderRadius: 4, background: T.warningGhost, color: T.warning }}>Special</span>}
                  </div>
                  <p style={{ fontSize: 11, color: T.textMuted, margin: "2px 0 0" }}>{cls.coach} — DRIFT Studio</p>
                </div>
                <button onClick={() => openReservation({ id: `sched-${selectedDay}-${i}`, time: cls.time, type: cls.type, coach: cls.coach || "TBD", location: cls.location, capacity: isSpecial ? STUDIO_CONFIG.specialtyCapacity : STUDIO_CONFIG.classCapacity, registered: Math.floor(Math.random() * 10) + 15, waitlist: 0, dayLabel: dayNames[selectedDay] })} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: T.accent, color: "#fff" }}>Reserve</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PracticePage() {
  const [activeTab, setActiveTab] = useState("log");
  const [reflection, setReflection] = useState({ energy: 4, focus: 4, notes: "" });
  const [saved, setSaved] = useState(null);
  const streakDays = 18; const totalClasses = 142;

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.practice} fallbackGradient={GRADIENTS.practice} title="My Practice" subtitle="Track your journey and celebrate growth" />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[
            { icon: Flame, val: streakDays, label: "Day Streak", color: T.accent, ghost: T.accentGhost, bdr: T.accentBorder },
            { icon: Star, val: totalClasses, label: "Total Classes", color: T.success, ghost: T.successGhost, bdr: T.successBorder },
            { icon: Mountain, val: 8, label: "Milestones", color: T.warning, ghost: T.warningGhost, bdr: T.warningBorder },
          ].map((s, i) => (
            <div key={i} style={{ background: s.ghost, border: `1px solid ${s.bdr}`, borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
              <s.icon size={20} color={s.color} style={{ margin: "0 auto 4px" }} />
              <div style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, fontWeight: 700, color: T.text }}>{s.val}</div>
              <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: T.bgDim, borderRadius: 10, padding: 4 }}>
          {[{ id: "log", label: "Reflection" }, { id: "milestones", label: "Milestones" }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: activeTab === tab.id ? T.bgCard : "transparent", color: activeTab === tab.id ? T.text : T.textMuted, boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,.06)" : "none" }}>{tab.label}</button>
          ))}
        </div>

        {activeTab === "log" && (
          <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><Leaf size={18} color={T.accent} /><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Post-Practice Reflection</h3></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Energy Level</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setReflection({...reflection, energy: n})} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${reflection.energy >= n ? T.accent : T.border}`, background: reflection.energy >= n ? T.accentGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {n <= 2 ? <Moon size={18} color={reflection.energy >= n ? T.accent : T.textFaint} /> : n <= 4 ? <Sun size={18} color={reflection.energy >= n ? T.accent : T.textFaint} /> : <Sparkles size={18} color={reflection.energy >= n ? T.accent : T.textFaint} />}
                    </button>
                  ))}
                </div>
              </div>
              <InputField label="Notes / Gratitude" value={reflection.notes} onChange={v => setReflection({...reflection, notes: v})} placeholder="What arose during practice today?" multiline />
              <button onClick={() => { setSaved(true); setTimeout(() => setSaved(null), 2000); setReflection({ energy: 4, focus: 4, notes: "" }); }} style={{ padding: "12px 0", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", background: T.accent, color: "#fff", fontFamily: "'Crimson Pro', serif", fontSize: 17 }}>
                {saved ? <><Check size={16} style={{ display: "inline", verticalAlign: "middle" }} /> Saved</> : "Save Reflection"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "milestones" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Object.entries(MILESTONE_BADGES).map(([name, badge], i) => {
              const earned = i < 8;
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: earned ? T.bgCard : T.bgDim, border: `1px solid ${earned ? T.border : T.borderLight}`, borderRadius: 12, opacity: earned ? 1 : 0.5 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: earned ? `${badge.color}15` : T.bgDim, display: "flex", alignItems: "center", justifyContent: "center" }}><badge.icon size={22} color={earned ? badge.color : T.textFaint} /></div>
                  <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.text }}>{name}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{earned ? "Earned" : "Keep practicing!"}</p></div>
                  {earned && <CircleCheck size={18} color={T.accent} />}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 22, margin: "0 0 12px", fontWeight: 600 }}>Recent Practice</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { date: today, name: "Warm Vinyasa Flow", result: "60 min", badge: "hot", icon: Sun, color: T.warning, ghost: T.warningGhost },
              { date: offsetDate(-1), name: "Yin Sound Bath", result: "75 min", badge: "sound", icon: Headphones, color: "#8b5cf6", ghost: "#8b5cf610" },
              { date: offsetDate(-2), name: "Restorative Yoga", result: "60 min", badge: "rest", icon: Moon, color: T.accent, ghost: T.accentGhost },
            ].map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: h.ghost, display: "flex", alignItems: "center", justifyContent: "center" }}><h.icon size={16} color={h.color} /></div>
                <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.text }}>{h.name}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{formatDateShort(h.date)}</p></div>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.textMuted }}>{h.result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityPage() {
  const { feedCelebrations, celebrateFeed } = useContext(AppContext);
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.community} fallbackGradient={GRADIENTS.community} title="Community" subtitle="Celebrate each other's practice" />
      <div style={{ padding: "16px 16px 0" }}>
        {STUDIO_CONFIG.features.guestPasses && (
          <div style={{ background: `linear-gradient(135deg, ${T.bg}, hsl(30,20%,14%))`, borderRadius: 14, padding: "18px", marginBottom: 20, color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}><Gift size={20} color={T.accent} /><h3 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 18, margin: 0, fontWeight: 600 }}>Guest Passes</h3></div>
            <p style={{ fontSize: 13, color: "#b8a898", margin: "0 0 14px", lineHeight: 1.5 }}>You have <span style={{ color: T.accent, fontWeight: 700 }}>2 guest passes</span> this month. Share the gift of practice.</p>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}><Share2 size={16} /> Share a Guest Pass</button>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {COMMUNITY_FEED.map(item => {
            const myC = feedCelebrations[item.id] || 0;
            return (
              <div key={item.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Crimson Pro', serif", fontSize: 16, color: "#fff", fontWeight: 700, flexShrink: 0 }}>{item.user[0]}</div>
                  <div><p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: T.text }}>{item.user}</p><p style={{ fontSize: 11, color: T.textMuted }}>{formatDateShort(item.date)}</p></div>
                  <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: T.successGhost, color: T.success }}>{item.milestone}</span>
                </div>
                <p style={{ fontSize: 13, color: "#4a4030", lineHeight: 1.5, margin: "0 0 12px" }}>{item.message}</p>
                <button onClick={() => celebrateFeed(item.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, border: `1px solid ${myC > 0 ? T.successBorder : T.border}`, background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer" }}>
                  <Heart size={16} color={T.success} fill={myC > 0 ? T.success : "none"} /><span style={{ fontSize: 13, fontWeight: 600, color: T.success }}>{item.celebrations + myC}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TeachersPage() {
  const [expandedTeacher, setExpandedTeacher] = useState(null);
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.teachers} fallbackGradient={GRADIENTS.teachers} title="Teachers" subtitle="Experienced instructors in an Olson Kundig-designed studio" />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {TEACHERS.map(teacher => {
          const expanded = expandedTeacher === teacher.id;
          return (
            <div key={teacher.id} onClick={() => setExpandedTeacher(expanded ? null : teacher.id)} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
                <TeacherAvatar teacher={teacher} size={56} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: T.text }}>{teacher.firstName} {teacher.lastName}</h3>
                  <p style={{ fontSize: 13, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{teacher.role}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{teacher.yearsTeaching}+ years</p>
                </div>
                <ChevronDown size={18} color={T.textFaint} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </div>
              {expanded && (
                <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${T.borderLight}`, paddingTop: 14 }}>
                  <p style={{ fontSize: 13, color: "#5a5040", lineHeight: 1.6, margin: "0 0 12px" }}>{teacher.bio}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {teacher.specialties.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.accentGhost, color: T.accent }}>{s}</span>)}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {teacher.certs.map(c => <span key={c} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.bgDim, color: T.textMuted }}>{c}</span>)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MembershipPage() {
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.membership} fallbackGradient={GRADIENTS.membership} title="Membership" subtitle="Find your path to practice" />
      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: T.bgCard, border: `1px solid ${tier.popular ? T.accent : T.border}`, borderRadius: 14, padding: "20px 18px", position: "relative", overflow: "hidden" }}>
            {tier.popular && <div style={{ position: "absolute", top: 12, right: -28, background: T.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 32px", transform: "rotate(45deg)", textTransform: "uppercase" }}>Popular</div>}
            <h3 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 22, margin: "0 0 4px", color: T.text, fontWeight: 600 }}>{tier.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
              <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: 38, color: T.accent, fontWeight: 700 }}>${tier.price}</span>
              <span style={{ fontSize: 13, color: T.textMuted }}>{tier.period}</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
              {tier.features.map((f, i) => <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 13, color: "#5a5040" }}><CircleCheck size={14} color={T.accent} style={{ flexShrink: 0 }} />{f}</li>)}
            </ul>
            <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Crimson Pro', serif", background: tier.popular ? T.accent : T.bg, color: "#fff" }}>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.events} fallbackGradient={GRADIENTS.events} title="Events" subtitle="Workshops, retreats, trainings, and special offerings" />
      <div style={{ padding: "16px 16px 0" }}>
        {EVENTS.map(ev => (
          <div key={ev.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ background: `linear-gradient(135deg, ${T.bg}, hsl(30,20%,14%))`, padding: "20px 18px", color: "#fff" }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.accent }}>{ev.type}</span>
              <h3 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 20, margin: "6px 0 4px", fontWeight: 600 }}>{ev.name}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#b8a898" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={14} /> {formatDateShort(ev.date)}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={14} /> {fmtTime(ev.startTime)}</span>
              </div>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <p style={{ fontSize: 13, color: "#5a5040", lineHeight: 1.6, margin: "0 0 14px" }}>{ev.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                <StatBox label="Price" value={ev.fee >= 1000 ? `$${(ev.fee/1000).toFixed(1)}k` : `$${ev.fee}`} />
                <StatBox label="Spots" value={`${ev.registered}/${ev.maxParticipants}`} />
              </div>
              <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Crimson Pro', serif", background: T.accent, color: "#fff" }}>Register Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ADMIN PAGES
// ═══════════════════════════════════════════════════════════════

function AdminDashboard() {
  const metrics = [
    { label: "Active Members", value: ADMIN_METRICS.activeMembers, change: `+${ADMIN_METRICS.memberChange}`, positive: true, icon: Users, color: T.accent },
    { label: "Today's Check-ins", value: ADMIN_METRICS.todayCheckIns, change: `${ADMIN_METRICS.weekCheckIns}/wk`, positive: true, icon: Calendar, color: T.success },
    { label: "Monthly Revenue", value: `$${ADMIN_METRICS.monthlyRevenue.toLocaleString()}`, change: `+${ADMIN_METRICS.revenueChange}%`, positive: true, icon: DollarSign, color: T.warning },
    { label: "Workshop Revenue", value: `$${ADMIN_METRICS.workshopRevenue.toLocaleString()}`, change: "+16 registrations", positive: true, icon: Award, color: "#8b5cf6" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div><h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, color: A.text, margin: 0, fontWeight: 600 }}>Dashboard</h1><p style={{ fontSize: 13, color: A.textMuted, margin: "4px 0 0" }}>Welcome back. Here is what is happening at DRIFT Yoga.</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: 12, padding: 18 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}><m.icon size={18} color={m.color} /></div>
            <div style={{ fontFamily: "'Crimson Pro', serif", fontSize: 30, color: A.text, fontWeight: 700 }}>{m.value}</div>
            <span style={{ display: "flex", alignItems: "center", fontSize: 12, fontWeight: 600, color: m.positive ? "#16a34a" : "#dc2626", marginTop: 4 }}>{m.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {m.change}</span>
            <p style={{ fontSize: 13, color: A.textMuted, margin: "6px 0 0" }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <AdminCard title="Weekly Attendance"><div style={{ height: 220 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={ADMIN_CHARTS.attendance}><CartesianGrid strokeDasharray="3 3" stroke={A.chartGrid} /><XAxis dataKey="day" stroke={A.textMuted} fontSize={12} /><YAxis stroke={A.textMuted} fontSize={12} /><Tooltip contentStyle={{ backgroundColor: A.tooltipBg, border: `1px solid ${A.tooltipBorder}`, borderRadius: 8, color: A.text }} /><Bar dataKey="total" fill={T.accent} radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></AdminCard>
        <AdminCard title="Revenue Trend"><div style={{ height: 220 }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={ADMIN_CHARTS.revenue}><CartesianGrid strokeDasharray="3 3" stroke={A.chartGrid} /><XAxis dataKey="month" stroke={A.textMuted} fontSize={12} /><YAxis stroke={A.textMuted} fontSize={12} tickFormatter={v => `$${v / 1000}k`} /><Tooltip contentStyle={{ backgroundColor: A.tooltipBg, border: `1px solid ${A.tooltipBorder}`, borderRadius: 8, color: A.text }} formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} /><defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.accent} stopOpacity={0.3} /><stop offset="100%" stopColor={T.accent} stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="revenue" stroke={T.accent} fill="url(#revGrad)" /></AreaChart></ResponsiveContainer></div></AdminCard>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        <AdminCard title="Membership Breakdown">
          <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={ADMIN_CHARTS.membershipBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>{ADMIN_CHARTS.membershipBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: A.tooltipBg, border: `1px solid ${A.tooltipBorder}`, borderRadius: 8, color: A.text }} /></PieChart></ResponsiveContainer></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>{ADMIN_CHARTS.membershipBreakdown.map((e, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: e.color }} /><span style={{ fontSize: 11, color: A.textMuted }}>{e.name} ({e.value})</span></div>)}</div>
        </AdminCard>
        <AdminCard title="Class Popularity (% Capacity)"><div style={{ height: 210 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={ADMIN_CHARTS.classPopularity} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke={A.chartGrid} horizontal={false} /><XAxis type="number" stroke={A.textMuted} fontSize={12} domain={[0, 100]} /><YAxis type="category" dataKey="name" stroke={A.textMuted} fontSize={11} width={60} /><Tooltip contentStyle={{ backgroundColor: A.tooltipBg, border: `1px solid ${A.tooltipBorder}`, borderRadius: 8, color: A.text }} formatter={v => [`${v}%`, "Capacity"]} /><Bar dataKey="pct" fill={T.accent} radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></div></AdminCard>
        <AdminCard title="Recent Activity">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ text: "New member signup", detail: "Noor Ahmed - New 3 Classes", time: "5 min ago", color: T.accent },{ text: "Workshop registration", detail: "Bhakti Flow - Marcus L.", time: "12 min ago", color: "#8b5cf6" },{ text: "Class waitlist full", detail: "5:00 PM DRIFT 60 Power Vinyasa", time: "18 min ago", color: T.success },{ text: "Payment received", detail: "Warrior 3 - Shannon Sato", time: "25 min ago", color: T.warning },{ text: "Guest pass redeemed", detail: "Shannon Sato's guest", time: "1 hr ago", color: "#3b82f6" }].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0" }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 6, flexShrink: 0 }} /><div style={{ flex: 1 }}><p style={{ fontSize: 13, color: A.textSecondary, margin: 0 }}>{a.text}</p><p style={{ fontSize: 12, color: A.textMuted, margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.detail}</p></div><span style={{ fontSize: 11, color: A.textMuted, whiteSpace: "nowrap" }}>{a.time}</span></div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

function AdminMembersPage() {
  const [search, setSearch] = useState(""); const [filter, setFilter] = useState("all");
  const filtered = MEMBERS_DATA.filter(m => { if (filter !== "all" && m.status !== filter) return false; if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false; return true; });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, color: A.text, margin: 0, fontWeight: 600 }}>Members</h1><CrudBar addLabel="Add Member" /></div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, position: "relative" }}><Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: A.textMuted }} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." style={{ width: "100%", padding: "10px 12px 10px 36px", background: A.input, border: `1px solid ${A.inputBorder}`, borderRadius: 8, color: A.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} /></div>
        <div style={{ display: "flex", gap: 4 }}>{["all", "active", "frozen"].map(f => <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: filter === f ? T.accent : A.input, color: filter === f ? "#fff" : A.textMuted }}>{f}</button>)}</div>
      </div>
      <div style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: `1px solid ${A.divider}` }}>{["Member", "Plan", "Status", "Classes", "Actions"].map(h => <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: A.textMuted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}</tr></thead>
          <tbody>{filtered.map(m => (
            <tr key={m.id} style={{ borderBottom: `1px solid ${A.divider}` }}>
              <td style={{ padding: "12px 16px" }}><p style={{ color: A.text, fontWeight: 600, margin: 0 }}>{m.name}</p><p style={{ color: A.textMuted, fontSize: 12, margin: "2px 0 0" }}>{m.email}</p></td>
              <td style={{ padding: "12px 16px", color: A.textSecondary, fontSize: 12 }}>{m.membership}</td>
              <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textTransform: "capitalize", background: m.status === "active" ? `${T.accent}20` : `${T.warning}20`, color: m.status === "active" ? T.accent : T.warning }}>{m.status}</span></td>
              <td style={{ padding: "12px 16px", color: A.textSecondary, fontFamily: "monospace" }}>{m.checkIns}</td>
              <td style={{ padding: "12px 16px" }}><CrudActions /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminSchedulePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, color: A.text, margin: 0, fontWeight: 600 }}>Schedule</h1><CrudBar addLabel="Add Class" /></div>
      <div style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: `1px solid ${A.divider}` }}>{["Time", "Class", "Teacher", "Studio", "Capacity", "Actions"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: A.textMuted, fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>{CLASSES_TODAY.map(c => (
            <tr key={c.id} style={{ borderBottom: `1px solid ${A.divider}` }}>
              <td style={{ padding: "12px 14px", color: A.text, fontFamily: "monospace" }}>{fmtTime(c.time)}</td>
              <td style={{ padding: "12px 14px", color: A.textSecondary, fontWeight: 600 }}>{c.type}</td>
              <td style={{ padding: "12px 14px", color: A.textSecondary }}>{c.coach}</td>
              <td style={{ padding: "12px 14px", color: A.textMuted, fontSize: 12 }}>DRIFT Studio</td>
              <td style={{ padding: "12px 14px" }}><span style={{ fontFamily: "monospace", fontWeight: 600, color: c.registered >= c.capacity ? T.warning : T.accent }}>{c.registered}/{c.capacity}</span></td>
              <td style={{ padding: "12px 14px" }}><CrudActions /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminTeachersPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, color: A.text, margin: 0, fontWeight: 600 }}>Teachers</h1><CrudBar addLabel="Add Teacher" /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {TEACHERS.map(t => (
          <div key={t.id} style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <TeacherAvatar teacher={t} size={48} />
              <div><h3 style={{ fontSize: 15, fontWeight: 700, color: A.text, margin: 0 }}>{t.firstName} {t.lastName}</h3><p style={{ fontSize: 12, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{t.role}</p></div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>{t.certs.slice(0,3).map(c => <span key={c} style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: A.input, color: A.textMuted }}>{c}</span>)}</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: `1px solid ${A.cardBorder}`, background: "transparent", color: A.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: `1px solid ${A.cardBorder}`, background: "transparent", color: A.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Schedule</button>
              <button style={{ width: 36, padding: "8px 0", borderRadius: 6, border: `1px solid ${A.cardBorder}`, background: "transparent", color: A.textMuted, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminEventsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, color: A.text, margin: 0, fontWeight: 600 }}>Events & Workshops</h1><CrudBar addLabel="New Event" /></div>
      {EVENTS.map(ev => (
        <div key={ev.id} style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: 12, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: `${T.accent}20`, color: T.accent }}>{ev.status}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: A.text, margin: "8px 0 4px" }}>{ev.name}</h3>
              <p style={{ fontSize: 13, color: A.textMuted }}>{formatDateShort(ev.date)} — {ev.type} — ${ev.fee}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div style={{ textAlign: "right" }}><div style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, color: T.accent, fontWeight: 700 }}>{ev.registered}</div><p style={{ fontSize: 11, color: A.textMuted }}>of {ev.maxParticipants}</p></div>
              <CrudActions />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminPricingPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, color: A.text, margin: 0, fontWeight: 600 }}>Pricing & Memberships</h1><CrudBar addLabel="Add Tier" /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: A.card, border: `1px solid ${tier.popular ? T.accent : A.cardBorder}`, borderRadius: 12, padding: 18 }}>
            {tier.popular && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: T.accentGhost, color: T.accent, marginBottom: 8, display: "inline-block" }}>POPULAR</span>}
            <h3 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 20, color: A.text, margin: "0 0 4px", fontWeight: 600 }}>{tier.name}</h3>
            <div style={{ fontFamily: "'Crimson Pro', serif", fontSize: 32, color: T.accent, fontWeight: 700 }}>${tier.price}<span style={{ fontSize: 14, color: A.textMuted, fontWeight: 400 }}> {tier.period}</span></div>
            <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: `1px solid ${A.cardBorder}`, background: "transparent", color: A.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
              <button style={{ width: 36, padding: "8px 0", borderRadius: 6, border: `1px solid ${A.cardBorder}`, background: "transparent", color: A.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminBroadcastPage() {
  const [message, setMessage] = useState(""); const [audience, setAudience] = useState("all");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, color: A.text, margin: 0, fontWeight: 600 }}>Broadcast</h1>
      <div style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: 12, padding: 18 }}>
        <h3 style={{ color: A.text, fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>New Broadcast</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder="Title" style={{ padding: "10px 14px", background: A.input, border: `1px solid ${A.inputBorder}`, borderRadius: 8, color: A.text, fontSize: 13, outline: "none" }} />
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message..." rows={4} style={{ padding: "10px 14px", background: A.input, border: `1px solid ${A.inputBorder}`, borderRadius: 8, color: A.text, fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
          <div style={{ display: "flex", gap: 6 }}>{["all", "unlimited", "class cards", "teachers"].map(a => <button key={a} onClick={() => setAudience(a)} style={{ padding: "6px 12px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: audience === a ? T.accent : A.input, color: audience === a ? "#fff" : A.textMuted }}>{a}</button>)}</div>
          <button style={{ padding: "10px 0", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Send size={16} /> Send Broadcast</button>
        </div>
      </div>
      <div><h3 style={{ color: A.text, fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>Sent</h3>{ANNOUNCEMENTS.map(a => <div key={a.id} style={{ background: A.card, border: `1px solid ${A.cardBorder}`, borderRadius: 10, padding: 14, marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between" }}><h4 style={{ color: A.text, margin: 0, fontSize: 14, fontWeight: 600 }}>{a.title}</h4><CrudActions /></div><p style={{ fontSize: 12, color: A.textMuted, margin: "4px 0 0" }}>{a.message}</p></div>)}</div>
    </div>
  );
}

function AdminSettingsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, color: A.text, margin: 0, fontWeight: 600 }}>Studio Settings</h1>
      <AdminCard title="Studio Information">
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[{ label: "Studio Name", value: STUDIO_CONFIG.name }, { label: "Address", value: STUDIO_CONFIG.address.street + ", " + STUDIO_CONFIG.address.city }, { label: "Phone", value: STUDIO_CONFIG.phone }, { label: "Email", value: STUDIO_CONFIG.email }].map((f, i) => (
            <div key={i}><label style={{ display: "block", fontSize: 11, fontWeight: 600, color: A.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}</label><input defaultValue={f.value} style={{ width: "100%", padding: "10px 12px", background: A.input, border: `1px solid ${A.inputBorder}`, borderRadius: 8, color: A.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} /></div>
          ))}
          <button style={{ padding: "10px 0", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Save Changes</button>
        </div>
      </AdminCard>
      <AdminCard title="Integrations">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["MindBody API", "Stripe Payments", "Mailchimp", "Google Calendar"].map((name, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: A.input, borderRadius: 8 }}>
              <span style={{ fontSize: 13, color: A.textSecondary, fontWeight: 600 }}>{name}</span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: i < 2 ? `${T.accent}20` : A.input, color: i < 2 ? T.accent : A.textMuted }}>{i < 2 ? "Connected" : "Connect"}</span>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════════════════════════

function ReservationModal({ classData, onConfirm, onClose }) {
  const [confirmed, setConfirmed] = useState(false);
  const [addedCal, setAddedCal] = useState(false);
  const isFull = classData.registered >= classData.capacity;
  const spotsLeft = classData.capacity - classData.registered;
  const dateLabel = classData.date ? formatDateShort(classData.date) : classData.dayLabel || "This week";

  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, padding: "24px 20px 36px", animation: "slideUp 0.25s ease-out" }}>
        {!confirmed ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 24, margin: 0, color: T.text, fontWeight: 600 }}>Confirm Reservation</h2>
              <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} color={T.textMuted} /></button>
            </div>
            <div style={{ background: T.bgDim, borderRadius: 14, padding: "18px 16px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Calendar size={24} color="#fff" /></div>
                <div style={{ flex: 1 }}><h3 style={{ fontSize: 17, fontWeight: 700, color: T.text, margin: "0 0 3px" }}>{classData.type}</h3><p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>{classData.coach}</p></div>
              </div>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Clock size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>{fmtTime(classData.time)}</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><CalendarDays size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>{dateLabel}</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Waves size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>DRIFT Studio</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Users size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: isFull ? T.warning : spotsLeft <= 5 ? T.success : T.text }}>{isFull ? "Full - join the waitlist" : `${spotsLeft} spot${spotsLeft !== 1 ? "s" : ""} remaining`}</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><MapPin size={16} color={T.textMuted} /><span style={{ fontSize: 14, color: T.text }}>1251 Harrison St, South Lake Union</span></div>
              </div>
            </div>
            <div style={{ background: T.accentGhost, border: `1px solid ${T.accentBorder}`, borderRadius: 10, padding: "12px 14px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><Info size={16} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.accent }}>Reminders</span></div>
              <p style={{ fontSize: 12, color: "#5a5040", margin: "0 0 4px", lineHeight: 1.4 }}>Arrive 10-15 minutes early. Doors close when class begins.</p>
              <p style={{ fontSize: 12, color: "#5a5040", margin: "0 0 4px", lineHeight: 1.4 }}>Cancel 12+ hours before class. Late cancels forfeit credit.. Cancel at least 12 hours before class to avoid fees.</p>
              <p style={{ fontSize: 12, color: "#5a5040", margin: 0, lineHeight: 1.4 }}>Non-heated (75 deg). Free Manduka mat, props, towel at your reserved spot..</p>
            </div>
            <button onClick={() => { setConfirmed(true); onConfirm(classData.id); }} style={{ width: "100%", padding: "14px 0", borderRadius: 10, border: "none", fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "'Crimson Pro', serif", background: isFull ? T.success : T.accent, color: "#fff", marginBottom: 8 }}>{isFull ? "Join Waitlist" : "Confirm Reservation"}</button>
            <button onClick={onClose} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", fontSize: 14, fontWeight: 600, cursor: "pointer", color: T.textMuted }}>Cancel</button>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: T.accentGhost, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Check size={32} color={T.accent} /></div>
            <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 24, margin: "0 0 4px", color: T.text, fontWeight: 600 }}>{isFull ? "Added to Waitlist" : "You're In!"}</h2>
            <p style={{ fontSize: 14, color: T.textMuted, margin: "0 0 20px" }}>{classData.type} with {classData.coach.split(" ")[0]} at {fmtTime(classData.time)}. See you on the mat!</p>
            <div style={{ background: T.bgDim, borderRadius: 12, padding: "14px 16px", marginBottom: 16, textAlign: "left" }}>
              {[["Class", classData.type], ["Teacher", classData.coach], ["Time", fmtTime(classData.time)], ["Date", dateLabel]].map(([l, v], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 3 ? 8 : 0 }}><span style={{ fontSize: 13, color: T.textMuted }}>{l}</span><span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{v}</span></div>)}
            </div>
            <button onClick={() => setAddedCal(true)} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: `1px solid ${addedCal ? T.accentBorder : T.border}`, background: addedCal ? T.accentGhost : "transparent", fontSize: 14, fontWeight: 600, cursor: "pointer", color: addedCal ? T.accent : T.textMuted, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>{addedCal ? <><Check size={16} /> Added to Calendar</> : <><CalendarDays size={16} /> Add to Calendar</>}</button>
            <button onClick={onClose} style={{ width: "100%", padding: "14px 0", borderRadius: 10, border: "none", fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "'Crimson Pro', serif", background: T.accent, color: "#fff" }}>Done</button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}

function SettingsModal({ onClose }) {
  const [notifClass, setNotifClass] = useState(true); const [notifCommunity, setNotifCommunity] = useState(true); const [notifEvents, setNotifEvents] = useState(true);
  const Toggle = ({ active, onClick }) => <button onClick={onClick} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: active ? T.accent : T.border, position: "relative" }}><div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: active ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,.15)" }} /></button>;
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, maxHeight: "85vh", overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 26, margin: 0, fontWeight: 600 }}>Settings</h2><button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button></div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Profile</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Crimson Pro', serif", fontSize: 20, color: "#fff", fontWeight: 700 }}>SS</div>
            <div><p style={{ fontWeight: 700, margin: 0, fontSize: 15 }}>Shannon Sato</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>Warrior 3 — Since Mar 2024</p></div>
          </div>
        </div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Notifications</h3>
          {[{ label: "Class Reminders", active: notifClass, toggle: () => setNotifClass(!notifClass) }, { label: "Community Milestones", active: notifCommunity, toggle: () => setNotifCommunity(!notifCommunity) }, { label: "Events & Workshops", active: notifEvents, toggle: () => setNotifEvents(!notifEvents) }].map(n => <div key={n.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}><span style={{ fontSize: 14, color: T.text }}>{n.label}</span><Toggle active={n.active} onClick={n.toggle} /></div>)}
        </div>
        <div style={{ padding: "14px 0" }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>About</h3>
          <p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>{STUDIO_CONFIG.name} App v1.0</p>
          <p style={{ fontSize: 12, color: T.textFaint, margin: "4px 0 0" }}>Built by LUMI — LumiClass.app</p>
        </div>
        <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.accent, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 }}>Sign Out</button>
      </div>
    </div>
  );
}

function NotificationsModal({ onClose }) {
  const notifications = [
    { id: 1, title: "Tomorrow: DRIFT 45 Flow + Roll", message: "Vinyasa flow meets myofascial release. Self-care in 45 min.", type: "class", time: "2 hours ago", read: false },
    { id: 2, title: "New Milestone!", message: "Priya K. hit 30-day streak. Celebrate together!", type: "community", time: "4 hours ago", read: false },
    { id: 3, title: "Class Reminder", message: "Reserved for 5:00 PM DRIFT 60 Power Vinyasa with Nicole.", type: "class", time: "6 hours ago", read: true },
    { id: 4, title: "DRIFT Escape: Bali", message: "Seven days of yoga and adventure. Early bird pricing now.", type: "event", time: "1 day ago", read: true },
  ];
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, maxHeight: "80vh", overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 26, margin: 0, fontWeight: 600 }}>Notifications</h2><button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {notifications.map(n => (
            <div key={n.id} style={{ display: "flex", gap: 12, padding: "12px 14px", background: n.read ? "transparent" : T.accentGhost, border: `1px solid ${n.read ? T.borderLight : T.accentBorder}`, borderRadius: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: n.type === "class" ? T.accentGhost : n.type === "community" ? T.successGhost : T.warningGhost, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n.type === "class" ? <Calendar size={16} color={T.accent} /> : n.type === "community" ? <Heart size={16} color={T.success} /> : <CalendarDays size={16} color={T.warning} />}</div>
              <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: n.read ? 500 : 700, color: T.text, margin: 0 }}>{n.title}</p><p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{n.message}</p><p style={{ fontSize: 11, color: T.textFaint, margin: "4px 0 0" }}>{n.time}</p></div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.accent, marginTop: 4, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App({ onAdminChange, initialAdmin = false }) {
  const [page, setPage] = useState(initialAdmin ? "admin-dashboard" : "home");
  const [isAdmin, setIsAdmin] = useState(initialAdmin);
  const [showMore, setShowMore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [classRegistrations, setClassRegistrations] = useState({});
  const [feedCelebrations, setFeedCelebrations] = useState({});
  const [reservationClass, setReservationClass] = useState(null);
  const contentRef = useRef(null);

  const registerForClass = useCallback((classId) => { setClassRegistrations(prev => ({ ...prev, [classId]: (prev[classId] || 0) + 1 })); setReservationClass(null); }, []);
  const openReservation = useCallback((classData) => { setReservationClass(classData); }, []);
  const celebrateFeed = useCallback((feedId) => { setFeedCelebrations(prev => ({ ...prev, [feedId]: (prev[feedId] || 0) + 1 })); }, []);

  useEffect(() => {
    if (onAdminChange) onAdminChange(isAdmin);
  }, [isAdmin, onAdminChange]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [page]);

  const mainTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "classes", label: "Classes", icon: Wind },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "practice", label: "Practice", icon: TrendingUp },
    { id: "more", label: "More", icon: Menu },
  ];
  const moreItems = [
    { id: "community", label: "Community", icon: Heart },
    { id: "teachers", label: "Teachers", icon: Users },
    { id: "membership", label: "Membership", icon: CreditCard },
    { id: "events", label: "Events", icon: CalendarDays },
  ];
  const adminTabs = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "admin-schedule", label: "Schedule", icon: Calendar },
    { id: "admin-members", label: "Members", icon: Users },
    { id: "admin-teachers", label: "Teachers", icon: UserCheck },
    { id: "admin-events", label: "Events", icon: CalendarDays },
    { id: "admin-pricing", label: "Pricing", icon: DollarSign },
    { id: "admin-broadcast", label: "Broadcast", icon: Megaphone },
    { id: "admin-settings", label: "Settings", icon: Settings },
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "classes": return <ClassesPage />;
      case "schedule": return <SchedulePage />;
      case "practice": return <PracticePage />;
      case "community": return <CommunityPage />;
      case "teachers": return <TeachersPage />;
      case "membership": return <MembershipPage />;
      case "events": return <EventsPage />;
      case "admin-dashboard": return <AdminDashboard />;
      case "admin-schedule": return <AdminSchedulePage />;
      case "admin-members": return <AdminMembersPage />;
      case "admin-teachers": return <AdminTeachersPage />;
      case "admin-events": return <AdminEventsPage />;
      case "admin-pricing": return <AdminPricingPage />;
      case "admin-broadcast": return <AdminBroadcastPage />;
      case "admin-settings": return <AdminSettingsPage />;
      default: return <HomePage />;
    }
  };

  const isMoreActive = moreItems.some(item => item.id === page);
  const unreadCount = 2;

  if (isAdmin) {
    return (
      <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed }}>
        <div style={{ display: "flex", height: "100%", fontFamily: "'Nunito Sans', system-ui, sans-serif", background: A.bg }}>
          <aside style={{ width: 240, background: A.sidebar, borderRight: `1px solid ${A.sidebarBorder}`, color: A.text, display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "16px 14px", borderBottom: `1px solid ${A.sidebarBorder}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Crimson Pro', serif", fontSize: 14, color: "#fff", fontWeight: 700 }}>{STUDIO_CONFIG.logoMark}</div>
                <div><span style={{ fontFamily: "'Crimson Pro', serif", fontSize: 16, display: "block", lineHeight: 1, fontWeight: 600, color: A.text }}>{STUDIO_CONFIG.name}</span><span style={{ fontSize: 8, color: A.textMuted, textTransform: "uppercase", letterSpacing: "0.15em" }}>Admin</span></div>
              </div>
            </div>
            <nav style={{ flex: 1, padding: "8px 6px", overflow: "auto" }}>
              {adminTabs.map(tab => {
                const active = page === tab.id;
                return <button key={tab.id} onClick={() => setPage(tab.id)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", background: active ? T.accent : "transparent", color: active ? "#fff" : A.textMuted, fontSize: 12, fontWeight: active ? 600 : 400, cursor: "pointer", marginBottom: 2, textAlign: "left" }}><tab.icon size={16} /><span>{tab.label}</span></button>;
              })}
            </nav>
            <div style={{ borderTop: `1px solid ${A.sidebarBorder}`, padding: "8px 6px" }}>
              <button onClick={() => { setIsAdmin(false); setPage("home"); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", background: "transparent", color: A.textMuted, fontSize: 12, cursor: "pointer", textAlign: "left" }}><LogOut size={16} /><span>Exit Admin</span></button>
            </div>
          </aside>
          <main style={{ flex: 1, padding: 20, overflow: "auto" }}>{renderPage()}</main>
        </div>
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed }}>
      <div style={{ position: "relative", height: "100%", overflow: "hidden", background: T.bgDim, fontFamily: "'Nunito Sans', system-ui, sans-serif" }}>

        <div ref={contentRef} style={{ overflowY: "auto", height: "calc(100% - 64px)", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          <header style={{ background: T.bg, color: "#fff", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 30 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Crimson Pro', serif", fontSize: 14, color: "#fff", fontWeight: 700 }}>{STUDIO_CONFIG.logoMark}</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: 18, lineHeight: 1, fontWeight: 600 }}>{STUDIO_CONFIG.name}</span>
                <span style={{ fontSize: 8, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em" }}>{STUDIO_CONFIG.subtitle}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button onClick={() => { setIsAdmin(true); setPage("admin-dashboard"); }} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: T.accent }}><Shield size={20} /></button>
              <button onClick={() => setShowNotifications(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff", position: "relative" }}><Bell size={20} />{unreadCount > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 14, height: 14, borderRadius: "50%", background: T.accent, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>{unreadCount}</span>}</button>
              <button onClick={() => setShowSettings(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff" }}><Settings size={20} /></button>
            </div>
          </header>
          {renderPage()}
        </div>

        <nav style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 64, background: T.bgCard, borderTop: `1px solid ${T.border}`, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 4px" }}>
          {mainTabs.map(tab => {
            const active = tab.id === "more" ? (isMoreActive || showMore) : page === tab.id;
            return (
              <button key={tab.id} onClick={() => tab.id === "more" ? setShowMore(true) : setPage(tab.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 12px", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", color: active ? T.accent : T.textFaint }}>
                <tab.icon size={20} strokeWidth={active ? 2.5 : 2} /><span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {showMore && (
          <div onClick={() => setShowMore(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 40 }}>
            <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: 68, left: 16, right: 16, background: T.bgCard, borderRadius: 16, padding: "14px 12px", boxShadow: "0 8px 32px rgba(0,0,0,.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 6px 8px" }}><span style={{ fontFamily: "'Crimson Pro', serif", fontSize: 20, fontWeight: 600 }}>More</span><button onClick={() => setShowMore(false)} style={{ padding: 4, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer" }}><X size={18} color={T.textMuted} /></button></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {moreItems.map(item => {
                  const active = page === item.id;
                  return <button key={item.id} onClick={() => { setPage(item.id); setShowMore(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? T.accentGhost : T.bgDim, color: active ? T.accent : T.textMuted }}><item.icon size={22} /><span style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</span></button>;
                })}
              </div>
            </div>
          </div>
        )}

        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        {showNotifications && <NotificationsModal onClose={() => setShowNotifications(false)} />}
        {reservationClass && <ReservationModal classData={reservationClass} onConfirm={registerForClass} onClose={() => setReservationClass(null)} />}
        <style>{`
          *::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </AppContext.Provider>
  );
}
