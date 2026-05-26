import { useState, useEffect, useCallback } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg: "#1a1208", surface: "#2a1e0f", card: "#362818",
  accent: "#d4853a", accentLight: "#e8a55a",
  green: "#4caf78", red: "#e05a4a", blue: "#4a90d9", purple: "#9b72d4",
  text: "#f5ead8", textMuted: "#a89070", border: "#4a3520",
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${T.bg};color:${T.text};font-family:'DM Sans',sans-serif;min-height:100vh;max-width:430px;margin:0 auto;}
  .app{display:flex;flex-direction:column;min-height:100vh;}

  .header{background:${T.surface};border-bottom:1px solid ${T.border};padding:14px 18px;position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;}
  .header-title{font-family:'Playfair Display',serif;font-size:22px;color:${T.accent};}
  .header-sub{font-size:10px;color:${T.textMuted};margin-top:1px;letter-spacing:.6px;text-transform:uppercase;}
  .badge{background:${T.accent};color:${T.bg};font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;}

  .nav{display:flex;background:${T.surface};border-top:1px solid ${T.border};position:sticky;bottom:0;z-index:100;}
  .nav-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:10px 4px 12px;cursor:pointer;border:none;background:transparent;color:${T.textMuted};font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;gap:4px;transition:color .2s;letter-spacing:.3px;}
  .nav-item.active{color:${T.accent};}
  .nav-item svg{width:21px;height:21px;}

  .content{flex:1;padding:18px 15px;overflow-y:auto;}
  .section-title{font-family:'Playfair Display',serif;font-size:18px;color:${T.text};margin-bottom:14px;}
  .section-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}

  .card{background:${T.card};border:1px solid ${T.border};border-radius:14px;padding:15px;margin-bottom:11px;}
  .card-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;}
  .card-title{font-weight:600;font-size:15px;color:${T.text};}
  .card-sub{font-size:12px;color:${T.textMuted};margin-top:2px;}

  .pill{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.3px;}
  .pill-green{background:rgba(76,175,120,.15);color:${T.green};}
  .pill-red{background:rgba(224,90,74,.15);color:${T.red};}
  .pill-amber{background:rgba(212,133,58,.15);color:${T.accent};}
  .pill-blue{background:rgba(74,144,217,.15);color:${T.blue};}
  .pill-purple{background:rgba(155,114,212,.15);color:${T.purple};}

  .btn{display:flex;align-items:center;justify-content:center;gap:6px;border:none;border-radius:12px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;padding:12px 20px;}
  .btn-primary{background:${T.accent};color:${T.bg};width:100%;margin-bottom:9px;}
  .btn-primary:hover{background:${T.accentLight};}
  .btn-primary:disabled{opacity:.5;cursor:not-allowed;}
  .btn-ghost{background:${T.surface};color:${T.text};border:1px solid ${T.border};width:100%;margin-bottom:9px;}
  .btn-sm{padding:7px 14px;font-size:12px;border-radius:9px;}

  .input{width:100%;background:${T.surface};border:1px solid ${T.border};border-radius:10px;padding:11px 13px;color:${T.text};font-family:'DM Sans',sans-serif;font-size:14px;margin-bottom:9px;outline:none;}
  .input:focus{border-color:${T.accent};}
  .input::placeholder{color:${T.textMuted};}
  .input-label{font-size:11px;font-weight:600;color:${T.textMuted};letter-spacing:.5px;text-transform:uppercase;margin-bottom:4px;}
  .input-row{display:flex;gap:8px;}
  .input-row .input-wrap{flex:1;}

  .select{width:100%;background:${T.surface};border:1px solid ${T.border};border-radius:10px;padding:11px 13px;color:${T.text};font-family:'DM Sans',sans-serif;font-size:14px;margin-bottom:9px;outline:none;appearance:none;}

  .progress-bar{height:6px;background:${T.surface};border-radius:3px;overflow:hidden;margin-top:8px;}
  .progress-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,${T.accent},${T.accentLight});transition:width .5s ease;}
  .progress-fill-green{background:linear-gradient(90deg,${T.green},#7de0a0);}

  .member-row{display:flex;align-items:center;gap:11px;padding:10px 0;border-bottom:1px solid ${T.border};}
  .member-row:last-child{border-bottom:none;}
  .avatar{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;flex-shrink:0;}
  .member-info{flex:1;}
  .member-name{font-weight:500;font-size:14px;}
  .member-role{font-size:11px;color:${T.textMuted};margin-top:1px;}
  .member-amount{font-family:'Playfair Display',serif;font-size:15px;color:${T.accentLight};font-weight:700;}

  .loan-row{display:flex;justify-content:space-between;align-items:center;margin-top:4px;}

  .meeting-item{display:flex;gap:13px;padding:12px 0;border-bottom:1px solid ${T.border};align-items:flex-start;}
  .meeting-item:last-child{border-bottom:none;}
  .meeting-date-box{background:${T.surface};border-radius:10px;padding:8px 10px;text-align:center;min-width:46px;}
  .meeting-day{font-family:'Playfair Display',serif;font-size:22px;color:${T.accent};line-height:1;}
  .meeting-month{font-size:10px;color:${T.textMuted};text-transform:uppercase;letter-spacing:.5px;}
  .meeting-title{font-weight:600;font-size:14px;}
  .meeting-meta{font-size:12px;color:${T.textMuted};margin-top:3px;}

  .activity-item{display:flex;gap:11px;align-items:flex-start;padding:10px 0;border-bottom:1px solid ${T.border};}
  .activity-item:last-child{border-bottom:none;}
  .activity-dot{width:10px;height:10px;border-radius:50%;margin-top:4px;flex-shrink:0;}
  .activity-text{font-size:13px;color:${T.text};line-height:1.4;}
  .activity-time{font-size:11px;color:${T.textMuted};margin-top:2px;}

  .overview-hero{background:linear-gradient(135deg,#3d2410 0%,#2a1e0f 100%);border:1px solid ${T.border};border-radius:18px;padding:20px;margin-bottom:14px;position:relative;overflow:hidden;}
  .overview-hero::before{content:'';position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:rgba(212,133,58,.08);}
  .hero-amount{font-family:'Playfair Display',serif;font-size:34px;color:${T.accentLight};font-weight:700;line-height:1;}
  .hero-label{font-size:11px;color:${T.textMuted};text-transform:uppercase;letter-spacing:.8px;margin-bottom:7px;}

  .quick-stats{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:14px;}
  .quick-stat-card{background:${T.card};border:1px solid ${T.border};border-radius:13px;padding:13px;}
  .quick-stat-icon{font-size:20px;margin-bottom:5px;}
  .quick-stat-val{font-family:'Playfair Display',serif;font-size:19px;color:${T.text};font-weight:700;}
  .quick-stat-label{font-size:10px;color:${T.textMuted};margin-top:2px;}

  .summary-chip{display:inline-flex;align-items:center;gap:4px;background:${T.surface};border:1px solid ${T.border};border-radius:8px;padding:5px 9px;font-size:12px;color:${T.textMuted};margin:3px;}
  .chip-val{color:${T.text};font-weight:600;}

  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:200;display:flex;align-items:flex-end;}
  .modal{background:${T.surface};border-radius:20px 20px 0 0;padding:22px 18px 36px;width:100%;border-top:1px solid ${T.border};max-height:88vh;overflow-y:auto;}
  .modal-handle{width:40px;height:4px;background:${T.border};border-radius:2px;margin:0 auto 18px;}
  .modal-title{font-family:'Playfair Display',serif;font-size:20px;margin-bottom:18px;}

  .fab{position:fixed;bottom:80px;right:18px;width:52px;height:52px;border-radius:50%;background:${T.accent};color:${T.bg};border:none;font-size:26px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(212,133,58,.4);z-index:90;transition:transform .2s;}
  .fab:hover{transform:scale(1.08);}

  .toast{position:fixed;bottom:88px;left:50%;transform:translateX(-50%);background:${T.green};color:white;padding:10px 20px;border-radius:30px;font-size:13px;font-weight:600;z-index:300;white-space:nowrap;animation:toastIn .3s ease;}
  @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}

  .ai-box{background:linear-gradient(135deg,#1e1340,#2a1e0f);border:1px solid rgba(155,114,212,.3);border-radius:14px;padding:16px;margin-bottom:11px;}
  .ai-header{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
  .ai-title{font-weight:600;font-size:14px;color:${T.purple};}
  .ai-body{font-size:13px;color:${T.text};line-height:1.65;}
  .ai-loading{display:flex;gap:5px;align-items:center;}
  .ai-dot{width:7px;height:7px;border-radius:50%;background:${T.purple};animation:pulse 1.2s ease infinite;}
  .ai-dot:nth-child(2){animation-delay:.2s;}
  .ai-dot:nth-child(3){animation-delay:.4s;}
  @keyframes pulse{0%,100%{opacity:.3;}50%{opacity:1;}}

  .fine-badge{background:rgba(224,90,74,.15);color:${T.red};border-radius:8px;padding:3px 8px;font-size:11px;font-weight:600;}
  .divider{height:1px;background:${T.border};margin:13px 0;}

  .calc-box{background:${T.bg};border:1px solid ${T.border};border-radius:12px;padding:14px;margin-top:10px;}
  .calc-row{display:flex;justify-content:space-between;font-size:13px;padding:4px 0;}
  .calc-total{font-weight:700;font-size:15px;color:${T.accentLight};border-top:1px solid ${T.border};margin-top:8px;padding-top:8px;}

  .tab-pills{display:flex;background:${T.bg};border-radius:10px;padding:3px;margin-bottom:14px;}
  .tab-pill{flex:1;padding:7px;text-align:center;font-size:12px;font-weight:600;border-radius:8px;cursor:pointer;border:none;background:transparent;color:${T.textMuted};transition:all .2s;}
  .tab-pill.active{background:${T.card};color:${T.text};border:1px solid ${T.border};}

  .dividend-card{background:linear-gradient(135deg,#1a2e1a,#2a1e0f);border:1px solid rgba(76,175,120,.25);border-radius:14px;padding:16px;margin-bottom:11px;}

  .import-zone{border:2px dashed ${T.border};border-radius:16px;padding:32px 20px;text-align:center;cursor:pointer;transition:all .2s;background:${T.bg};margin-bottom:14px;}
  .import-zone:hover,.import-zone.drag{border-color:${T.accent};background:rgba(212,133,58,.05);}
  .import-zone-icon{font-size:40px;margin-bottom:10px;}
  .import-zone-title{font-size:15px;font-weight:600;color:${T.text};margin-bottom:4px;}
  .import-zone-sub{font-size:12px;color:${T.textMuted};}
  .import-step{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid ${T.border};}
  .import-step:last-child{border-bottom:none;}
  .import-step-num{width:24px;height:24px;border-radius:50%;background:${T.accent};color:${T.bg};font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
  .import-step-text{font-size:13px;color:${T.text};line-height:1.5;}
  .import-step-sub{font-size:11px;color:${T.textMuted};margin-top:2px;}
  .preview-section{margin-bottom:14px;}
  .preview-tag{display:inline-flex;align-items:center;gap:5px;background:${T.surface};border:1px solid ${T.border};border-radius:8px;padding:4px 10px;font-size:12px;margin:3px;}
  .import-progress{background:${T.surface};border-radius:12px;padding:16px;margin-bottom:14px;text-align:center;}
  .import-progress-text{font-size:13px;color:${T.text};margin-top:10px;}
  .import-progress-sub{font-size:11px;color:${T.textMuted};margin-top:4px;}

  .apply-hero{background:linear-gradient(135deg,#1a2535,#2a1e0f);border:1px solid rgba(74,144,217,.25);border-radius:18px;padding:18px;margin-bottom:14px;}
  .schedule-table{width:100%;border-collapse:collapse;font-size:12px;}
  .schedule-table th{color:${T.textMuted};font-weight:600;text-align:left;padding:6px 0;border-bottom:1px solid ${T.border};letter-spacing:.4px;text-transform:uppercase;font-size:10px;}
  .schedule-table td{padding:8px 0;border-bottom:1px solid ${T.border};color:${T.text};}
  .schedule-table tr:last-child td{border-bottom:none;}
  .schedule-table .highlight{color:${T.accentLight};font-weight:600;}
  .app-status-pending{background:rgba(74,144,217,.12);border:1px solid rgba(74,144,217,.25);border-radius:12px;padding:12px 14px;margin-bottom:10px;}
  .app-status-approved{background:rgba(76,175,120,.1);border:1px solid rgba(76,175,120,.2);border-radius:12px;padding:12px 14px;margin-bottom:10px;}
  .app-status-rejected{background:rgba(224,90,74,.1);border:1px solid rgba(224,90,74,.2);border-radius:12px;padding:12px 14px;margin-bottom:10px;}
  .action-row{display:flex;gap:8px;margin-top:10px;}
  .action-row .btn{margin-bottom:0;flex:1;}
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = n => `K${(n / 1000).toFixed(0)}k`;
const fmtFull = n => `K${Number(n).toLocaleString()}`;
const initials = name => name.split(" ").map(w => w[0]).join("").slice(0, 2);
const avatarColors = ["#d4853a","#4caf78","#4a90d9","#c97dd4","#e05a4a","#f0c040"];
const today = () => new Date().toISOString().slice(0, 10);
const STORAGE_KEY = "chilimba_v2";

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const INIT = {
  groupName: "Kabulonga Chilimba",
  interestRate: 5,
  fineAmount: 20000,
  savingsTarget: 1000000,
  members: [
    { id: 1, name: "Grace Mwansa", role: "Chairperson", savings: 850000, fines: 0, color: avatarColors[0] },
    { id: 2, name: "Mutale Banda", role: "Treasurer", savings: 720000, fines: 0, color: avatarColors[1] },
    { id: 3, name: "Bwalya Phiri", role: "Secretary", savings: 650000, fines: 0, color: avatarColors[2] },
    { id: 4, name: "Chanda Tembo", role: "Member", savings: 600000, fines: 40000, color: avatarColors[3] },
    { id: 5, name: "Mwape Lungu", role: "Member", savings: 500000, fines: 20000, color: avatarColors[4] },
    { id: 6, name: "Naomi Zulu", role: "Member", savings: 480000, fines: 0, color: avatarColors[5] },
  ],
  loans: [
    { id: 1, memberId: 4, amount: 500000, balance: 320000, interest: 5, status: "active", purpose: "School fees", disbursed: "2026-04-10", dueDate: "2026-07-10" },
    { id: 2, memberId: 5, amount: 300000, balance: 0, interest: 5, status: "repaid", purpose: "Small business", disbursed: "2026-02-01", dueDate: "2026-05-01" },
    { id: 3, memberId: 6, amount: 200000, balance: 140000, interest: 5, status: "active", purpose: "Medical", disbursed: "2026-05-01", dueDate: "2026-08-01" },
  ],
  meetings: [
    { id: 1, date: "2026-05-15", title: "Monthly Review", notes: "Reviewed savings targets. Approved loan for Naomi Zulu. Discussed new member applications.", attendees: [1,2,3,4,5,6], type: "regular" },
    { id: 2, date: "2026-04-15", title: "April Meeting", notes: "Elected new committee members. Approved Chanda's school fees loan. All members present.", attendees: [1,2,3,4,5], type: "regular" },
    { id: 3, date: "2026-06-15", title: "June Meeting", notes: "", attendees: [], type: "upcoming" },
  ],
  activity: [
    { text: "Naomi Zulu deposited K200,000", time: "Today, 10:23am", color: T.green },
    { text: "Loan approved for Naomi Zulu — K200,000", time: "Yesterday, 2:14pm", color: T.blue },
    { text: "Grace Mwansa deposited K150,000", time: "May 20, 9:00am", color: T.green },
    { text: "May meeting minutes recorded", time: "May 15, 4:30pm", color: T.accent },
    { text: "Chanda Tembo repaid K180,000", time: "May 10, 11:00am", color: T.green },
  ],
  applications: [
    { id: 901, memberId: 3, amount: 400000, purpose: "Business stock", months: 4, reason: "I need to restock my shop before the school term starts.", status: "pending", appliedDate: "2026-05-22" },
  ],
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = {
  Home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
  Members: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M16 3.13a4 4 0 010 7.75"/><path d="M21 21v-2a4 4 0 00-3-3.87"/></svg>,
  Loans: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  Meetings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  AI: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const [data, setData] = useState(() => {
    try {
      const saved = window.storage && typeof window.storage.get === "function" ? null : localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INIT;
    } catch { return INIT; }
  });
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({});
  const [aiInsight, setAiInsight] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [loanSubTab, setLoanSubTab] = useState("active");
  const [calcResult, setCalcResult] = useState(null);
  const [appForm, setAppForm] = useState({});
  const [importState, setImportState] = useState("idle"); // idle | parsing | analyzing | preview | done | error
  const [importPreview, setImportPreview] = useState(null);
  const [importError, setImportError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Persist to storage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
    // Also try artifact storage
    if (window.storage && typeof window.storage.set === "function") {
      window.storage.set(STORAGE_KEY, JSON.stringify(data)).catch(() => {});
    }
  }, [data]);

  // Load from artifact storage on mount
  useEffect(() => {
    if (window.storage && typeof window.storage.get === "function") {
      window.storage.get(STORAGE_KEY).then(res => {
        if (res?.value) { try { setData(JSON.parse(res.value)); } catch {} }
      }).catch(() => {});
    }
  }, []);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2800); };
  const openModal = (type) => { setModal(type); setForm({}); setCalcResult(null); };
  const closeModal = () => { setModal(null); setForm({}); setCalcResult(null); };
  const getMember = id => data.members.find(m => m.id === id);

  // ── COMPUTED ────────────────────────────────────────────────────────────────
  const totalSavings = data.members.reduce((s, m) => s + m.savings, 0);
  const totalFines = data.members.reduce((s, m) => s + (m.fines || 0), 0);
  const activeLoans = data.loans.filter(l => l.status === "active");
  const totalLent = activeLoans.reduce((s, l) => s + l.amount, 0);
  const totalBalance = activeLoans.reduce((s, l) => s + l.balance, 0);
  const totalInterestEarned = data.loans
    .filter(l => l.status === "repaid")
    .reduce((s, l) => s + Math.round(l.amount * l.interest / 100), 0);
  const poolValue = totalSavings + totalFines + totalInterestEarned - totalBalance;
  const dividendPerMember = data.members.length > 0 ? Math.round(poolValue / data.members.length) : 0;

  // ── HANDLERS ────────────────────────────────────────────────────────────────
  const addActivity = (text, color) => ({ text, time: "Just now", color });

  const handleAddMember = () => {
    if (!form.name || !form.role) return;
    const m = { id: Date.now(), name: form.name, role: form.role, savings: 0, fines: 0, color: avatarColors[data.members.length % avatarColors.length] };
    setData(d => ({ ...d, members: [...d.members, m], activity: [addActivity(`${form.name} joined the group`, T.blue), ...d.activity.slice(0,9)] }));
    showToast(`${form.name} added`);
    closeModal();
  };

  const handleDeposit = () => {
    if (!form.memberId || !form.amount) return;
    const amt = parseInt(form.amount);
    const name = getMember(parseInt(form.memberId))?.name;
    setData(d => ({
      ...d,
      members: d.members.map(m => m.id === parseInt(form.memberId) ? { ...m, savings: m.savings + amt } : m),
      activity: [addActivity(`${name} deposited ${fmtFull(amt)}`, T.green), ...d.activity.slice(0,9)]
    }));
    showToast("Deposit recorded ✓");
    closeModal();
  };

  const handleFine = () => {
    if (!form.memberId) return;
    const amt = parseInt(form.amount) || data.fineAmount;
    const name = getMember(parseInt(form.memberId))?.name;
    setData(d => ({
      ...d,
      members: d.members.map(m => m.id === parseInt(form.memberId) ? { ...m, fines: (m.fines || 0) + amt } : m),
      activity: [addActivity(`Fine of ${fmtFull(amt)} issued to ${name}`, T.red), ...d.activity.slice(0,9)]
    }));
    showToast("Fine recorded");
    closeModal();
  };

  const handleLoan = () => {
    if (!form.memberId || !form.amount || !form.purpose || !form.dueDate) return;
    const amt = parseInt(form.amount);
    const rate = parseInt(form.interestRate) || data.interestRate;
    const member = getMember(parseInt(form.memberId));
    const newLoan = { id: Date.now(), memberId: parseInt(form.memberId), amount: amt, balance: amt + Math.round(amt * rate / 100), interest: rate, status: "active", purpose: form.purpose, disbursed: today(), dueDate: form.dueDate };
    setData(d => ({
      ...d, loans: [newLoan, ...d.loans],
      activity: [addActivity(`Loan of ${fmtFull(amt)} approved for ${member?.name}`, T.blue), ...d.activity.slice(0,9)]
    }));
    showToast("Loan recorded ✓");
    closeModal();
  };

  const handleRepayment = () => {
    if (!form.loanId || !form.amount) return;
    const amt = parseInt(form.amount);
    setData(d => ({
      ...d,
      loans: d.loans.map(l => l.id === parseInt(form.loanId)
        ? { ...l, balance: Math.max(0, l.balance - amt), status: l.balance - amt <= 0 ? "repaid" : "active" }
        : l),
      activity: [addActivity(`Loan repayment of ${fmtFull(amt)} received`, T.green), ...d.activity.slice(0,9)]
    }));
    showToast("Repayment recorded ✓");
    closeModal();
  };

  const handleMeeting = () => {
    if (!form.title || !form.notes) return;
    const m = { id: Date.now(), date: today(), title: form.title, notes: form.notes, attendees: form.attendees || [], type: "regular" };
    setData(d => ({
      ...d,
      meetings: [m, ...d.meetings.filter(x => x.type !== "upcoming")].concat(d.meetings.filter(x => x.type === "upcoming")),
      activity: [addActivity(`Meeting recorded: ${form.title}`, T.accent), ...d.activity.slice(0,9)]
    }));
    showToast("Meeting saved ✓");
    closeModal();
  };

  // ── LOAN APPLICATIONS ──────────────────────────────────────────────────────
  const buildSchedule = (amount, interestRate, months) => {
    const interest = Math.round(amount * interestRate / 100);
    const total = amount + interest;
    const monthly = Math.round(total / months);
    const startDate = new Date();
    return Array.from({ length: months }, (_, i) => {
      const due = new Date(startDate);
      due.setMonth(due.getMonth() + i + 1);
      const isLast = i === months - 1;
      const payment = isLast ? total - monthly * (months - 1) : monthly;
      return { month: i + 1, due: due.toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" }), payment, balance: Math.max(0, total - monthly * (i + 1)) };
    });
  };

  const handleSubmitApplication = () => {
    if (!appForm.memberId || !appForm.amount || !appForm.purpose || !appForm.months) return;
    const existing = (data.applications || []).find(a => a.memberId === parseInt(appForm.memberId) && a.status === "pending");
    if (existing) { showToast("Member already has a pending application"); return; }
    const newApp = { id: Date.now(), memberId: parseInt(appForm.memberId), amount: parseInt(appForm.amount), purpose: appForm.purpose, months: parseInt(appForm.months), reason: appForm.reason || "", status: "pending", appliedDate: today() };
    setData(d => ({ ...d, applications: [newApp, ...(d.applications || [])], activity: [addActivity(`Loan application submitted by ${getMember(parseInt(appForm.memberId))?.name}`, T.blue), ...d.activity.slice(0,9)] }));
    setAppForm({});
    showToast("Application submitted ✓");
  };

  const handleApproveApp = (appId) => {
    const app = (data.applications || []).find(a => a.id === appId);
    if (!app) return;
    const rate = data.interestRate;
    const interest = Math.round(app.amount * rate / 100);
    const newLoan = { id: Date.now(), memberId: app.memberId, amount: app.amount, balance: app.amount + interest, interest: rate, status: "active", purpose: app.purpose, disbursed: today(), dueDate: (() => { const d = new Date(); d.setMonth(d.getMonth() + app.months); return d.toISOString().slice(0,10); })() };
    setData(d => ({ ...d, loans: [newLoan, ...d.loans], applications: (d.applications||[]).map(a => a.id === appId ? { ...a, status: "approved" } : a), activity: [addActivity(`Loan of ${fmtFull(app.amount)} approved for ${getMember(app.memberId)?.name}`, T.green), ...d.activity.slice(0,9)] }));
    showToast("Loan approved and disbursed ✓");
  };

  const handleRejectApp = (appId) => {
    setData(d => ({ ...d, applications: (d.applications||[]).map(a => a.id === appId ? { ...a, status: "rejected" } : a), activity: [addActivity(`Loan application rejected`, T.red), ...d.activity.slice(0,9)] }));
    showToast("Application rejected");
  };

  const calcLoan = () => {
    const amt = parseInt(form.calcAmount) || 0;
    const rate = parseFloat(form.calcRate) || data.interestRate;
    const months = parseInt(form.calcMonths) || 3;
    const interest = Math.round(amt * rate / 100);
    const total = amt + interest;
    const monthly = Math.round(total / months);
    setCalcResult({ interest, total, monthly, months });
  };

  // ── EXCEL IMPORT ─────────────────────────────────────────────────────────────
  const parseExcelToText = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const XLSX = window.XLSX;
          const wb = XLSX.read(e.target.result, { type: "array" });
          let text = "";
          wb.SheetNames.forEach(name => {
            const ws = wb.Sheets[name];
            const csv = XLSX.utils.sheet_to_csv(ws);
            if (csv.trim()) text += `\n\n=== Sheet: ${name} ===\n${csv}`;
          });
          resolve(text.trim());
        } catch (err) { reject(err); }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleImportFile = async (file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["xlsx","xls","csv"].includes(ext)) {
      setImportError("Please upload an Excel (.xlsx, .xls) or CSV file.");
      setImportState("error");
      return;
    }
    setImportState("parsing");
    setImportError("");
    setImportPreview(null);
    try {
      let text = "";
      if (ext === "csv") {
        text = await file.text();
      } else {
        if (!window.XLSX) {
          // Load SheetJS dynamically
          await new Promise((res, rej) => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
            s.onload = res; s.onerror = rej;
            document.head.appendChild(s);
          });
        }
        text = await parseExcelToText(file);
      }
      setImportState("analyzing");
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a data extraction assistant for a village banking (chilimba) app in Zambia. Extract structured data from spreadsheet content and return ONLY valid JSON, no explanation, no markdown fences.

Return this exact structure:
{
  "groupName": "string or null",
  "interestRate": number or null,
  "savingsTarget": number or null,
  "members": [{"name":"string","role":"Member|Chairperson|Treasurer|Secretary","savings":number,"fines":number}],
  "loans": [{"memberName":"string","amount":number,"balance":number,"interest":number,"status":"active|repaid","purpose":"string","disbursed":"YYYY-MM-DD","dueDate":"YYYY-MM-DD"}],
  "meetings": [{"date":"YYYY-MM-DD","title":"string","notes":"string","type":"regular|upcoming"}],
  "confidence": "high|medium|low",
  "notes": "any important observations about the data"
}

Rules:
- All monetary values in ZMW as plain numbers (no currency symbols)
- If a field is missing, use null for strings, 0 for numbers, [] for arrays
- Infer roles from context (e.g. "chairlady" → Chairperson)
- For loans, if balance is missing assume full amount is outstanding
- If dates are ambiguous, use YYYY-MM-DD format with best guess
- memberName in loans must match a name in members array`,
          messages: [{ role: "user", content: `Extract village banking data from this spreadsheet:\n\n${text.slice(0, 8000)}` }]
        })
      });
      const json = await res.json();
      const raw = json.content?.[0]?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setImportPreview(parsed);
      setImportState("preview");
    } catch (err) {
      setImportError("Could not read or analyse the file. Please check the format and try again.");
      setImportState("error");
    }
  };

  const applyImport = () => {
    if (!importPreview) return;
    const colors = avatarColors;
    const members = (importPreview.members || []).map((m, i) => ({
      id: Date.now() + i,
      name: m.name,
      role: m.role || "Member",
      savings: m.savings || 0,
      fines: m.fines || 0,
      color: colors[i % colors.length],
    }));
    const findMemberId = (name) => {
      const m = members.find(m => m.name.toLowerCase().includes((name||"").toLowerCase().split(" ")[0]));
      return m?.id || members[0]?.id;
    };
    const loans = (importPreview.loans || []).map((l, i) => ({
      id: Date.now() + 1000 + i,
      memberId: findMemberId(l.memberName),
      amount: l.amount || 0,
      balance: l.balance ?? l.amount ?? 0,
      interest: l.interest || importPreview.interestRate || data.interestRate,
      status: l.status || "active",
      purpose: l.purpose || "General",
      disbursed: l.disbursed || today(),
      dueDate: l.dueDate || "",
    }));
    const meetings = (importPreview.meetings || []).map((m, i) => ({
      id: Date.now() + 2000 + i,
      date: m.date || today(),
      title: m.title || "Meeting",
      notes: m.notes || "",
      attendees: [],
      type: m.type || "regular",
    }));
    setData(d => ({
      ...d,
      ...(importPreview.groupName ? { groupName: importPreview.groupName } : {}),
      ...(importPreview.interestRate ? { interestRate: importPreview.interestRate } : {}),
      ...(importPreview.savingsTarget ? { savingsTarget: importPreview.savingsTarget } : {}),
      members: members.length > 0 ? members : d.members,
      loans: loans.length > 0 ? [...loans, ...d.loans] : d.loans,
      meetings: meetings.length > 0 ? [...meetings, ...d.meetings] : d.meetings,
      activity: [addActivity(`Imported data from spreadsheet (${members.length} members, ${loans.length} loans, ${meetings.length} meetings)`, T.purple), ...d.activity.slice(0,9)],
    }));
    setImportState("done");
    showToast("Data imported successfully ✓");
  };

  // ── AI INSIGHTS ─────────────────────────────────────────────────────────────
  const fetchAiInsight = useCallback(async () => {
    setAiLoading(true);
    setAiInsight(null);
    const summary = {
      group: data.groupName,
      members: data.members.length,
      totalSavings: fmtFull(totalSavings),
      activeLoans: activeLoans.length,
      totalOutstanding: fmtFull(totalBalance),
      interestEarned: fmtFull(totalInterestEarned),
      totalFines: fmtFull(totalFines),
      poolValue: fmtFull(poolValue),
      dividendPerMember: fmtFull(dividendPerMember),
      memberSavings: data.members.map(m => ({ name: m.name, savings: m.savings, fines: m.fines || 0 })),
      loanSummary: data.loans.map(l => ({ member: getMember(l.memberId)?.name, amount: l.amount, balance: l.balance, status: l.status, dueDate: l.dueDate })),
    };
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a friendly financial advisor for village banking groups (chilimba) in Zambia. Analyze the group data and give 3-4 short, practical, encouraging insights. Be specific with numbers. Use simple language. Format as short paragraphs, not bullet points. Mention members by name when relevant. Keep total response under 200 words.`,
          messages: [{ role: "user", content: `Analyze this chilimba group data and give me key insights:\n${JSON.stringify(summary, null, 2)}` }]
        })
      });
      const json = await res.json();
      setAiInsight(json.content?.[0]?.text || "Unable to load insights.");
    } catch {
      setAiInsight("Connect to the internet to load AI insights.");
    }
    setAiLoading(false);
  }, [data, totalSavings, totalBalance, totalInterestEarned, totalFines, poolValue, dividendPerMember]);

  // ── WHATSAPP EXPORT ──────────────────────────────────────────────────────────
  const shareWhatsApp = (type) => {
    let text = "";
    if (type === "summary") {
      text = `📊 *${data.groupName} — Monthly Summary*\n\n`;
      text += `💰 Total Savings: ${fmtFull(totalSavings)}\n`;
      text += `🏦 Active Loans: ${activeLoans.length} (${fmtFull(totalBalance)} outstanding)\n`;
      text += `⚠️ Fines Collected: ${fmtFull(totalFines)}\n`;
      text += `📈 Interest Earned: ${fmtFull(totalInterestEarned)}\n`;
      text += `💵 Pool Value: ${fmtFull(poolValue)}\n`;
      text += `\n👥 *Member Savings*\n`;
      data.members.forEach(m => { text += `• ${m.name}: ${fmtFull(m.savings)}${m.fines ? ` (fines: ${fmtFull(m.fines)})` : ""}\n`; });
      text += `\n_Sent from Chilimba App_`;
    } else if (type === "meeting") {
      const last = data.meetings.filter(m => m.type === "regular")[0];
      if (!last) return;
      text = `📋 *${last.title} — Minutes*\n📅 ${last.date}\n\n${last.notes}\n\n_${last.attendees.length} members attended_\n_Sent from Chilimba App_`;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  // ── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* HEADER */}
        <div className="header">
          <div>
            <div className="header-title">Chilimba</div>
          </div>
          <span className="badge">{data.members.length} Members</span>
        </div>

        {/* CONTENT */}
        <div className="content">

          {/* ── HOME ── */}
          {tab === "home" && <>
            <div className="overview-hero">
              <div className="hero-label">Total Pool Value</div>
              <div className="hero-amount">{fmtFull(poolValue)}</div>
              <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap" }}>
                <span className="summary-chip">💰 <span className="chip-val">{fmtFull(totalSavings)}</span> saved</span>
                <span className="summary-chip">📋 <span className="chip-val">{activeLoans.length}</span> loans</span>
                <span className="summary-chip">📈 <span className="chip-val">{fmtFull(totalInterestEarned)}</span> interest</span>
              </div>
            </div>

            <div className="quick-stats">
              {[
                { icon:"💵", val: fmt(totalLent), label:"Total Disbursed" },
                { icon:"🔄", val: fmt(totalLent - totalBalance), label:"Recovered" },
                { icon:"⚠️", val: fmtFull(totalFines), label:"Fines Collected" },
                { icon:"🎁", val: fmt(dividendPerMember), label:"Est. Dividend/Member" },
              ].map((s, i) => (
                <div className="quick-stat-card" key={i}>
                  <div className="quick-stat-icon">{s.icon}</div>
                  <div className="quick-stat-val">{s.val}</div>
                  <div className="quick-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Savings target progress */}
            <div className="card" style={{ marginBottom: 11 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:13, fontWeight:600 }}>Savings Target Progress</span>
                <span style={{ fontSize:12, color: T.accentLight }}>{Math.round((totalSavings/data.savingsTarget)*100)}%</span>
              </div>
              <div className="progress-bar" style={{ height: 8 }}>
                <div className="progress-fill" style={{ width:`${Math.min(100, Math.round((totalSavings/data.savingsTarget)*100))}%` }} />
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
                <span style={{ fontSize:11, color: T.textMuted }}>{fmtFull(totalSavings)} saved</span>
                <span style={{ fontSize:11, color: T.textMuted }}>Target: {fmtFull(data.savingsTarget)}</span>
              </div>
            </div>

            {/* Dividend calculator */}
            <div className="dividend-card">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:11, color: T.green, textTransform:"uppercase", letterSpacing:".6px", marginBottom:4 }}>Estimated Dividend</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color: T.text }}>{fmtFull(dividendPerMember)}</div>
                  <div style={{ fontSize:11, color: T.textMuted, marginTop:2 }}>per member · {data.members.length} members</div>
                </div>
                <div style={{ fontSize:32 }}>🎁</div>
              </div>
              <div style={{ fontSize:11, color: T.textMuted, marginTop:10, lineHeight:1.5 }}>
                Based on pool value of {fmtFull(poolValue)} ÷ {data.members.length} members. Actual dividends approved at year-end meeting.
              </div>
            </div>

            <div className="section-title">Recent Activity</div>
            <div className="card">
              {data.activity.slice(0,6).map((a, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-dot" style={{ background: a.color }} />
                  <div>
                    <div className="activity-text">{a.text}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary" onClick={() => openModal("deposit")}>+ Record Savings Deposit</button>
            <button className="btn btn-ghost" onClick={() => openModal("repayment")}>↩ Record Loan Repayment</button>
            <button className="btn btn-ghost" onClick={() => shareWhatsApp("summary")}>📤 Share Summary on WhatsApp</button>
          </>}

          {/* ── MEMBERS ── */}
          {tab === "members" && <>
            <div className="section-title">Members ({data.members.length})</div>
            <div className="card">
              {data.members.map(m => (
                <div className="member-row" key={m.id}>
                  <div className="avatar" style={{ background: m.color + "33", color: m.color }}>{initials(m.name)}</div>
                  <div className="member-info">
                    <div className="member-name">{m.name}</div>
                    <div className="member-role">{m.role}{m.fines > 0 ? <span className="fine-badge" style={{ marginLeft:6 }}>Fine: {fmt(m.fines)}</span> : null}</div>
                  </div>
                  <div className="member-amount">{fmt(m.savings)}</div>
                </div>
              ))}
            </div>

            <div className="section-title">Contribution Share</div>
            <div className="card">
              {data.members.map(m => {
                const pct = totalSavings > 0 ? Math.round((m.savings / totalSavings) * 100) : 0;
                return (
                  <div key={m.id} style={{ marginBottom:13 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:13 }}>{m.name}</span>
                      <span style={{ fontSize:13, color: T.accentLight }}>{fmt(m.savings)} <span style={{ color: T.textMuted, fontSize:11 }}>({pct}%)</span></span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width:`${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {totalFines > 0 && <>
              <div className="section-title">Fines</div>
              <div className="card">
                {data.members.filter(m => m.fines > 0).map(m => (
                  <div className="loan-row" key={m.id} style={{ padding:"8px 0", borderBottom:`1px solid ${T.border}` }}>
                    <span style={{ fontSize:14 }}>{m.name}</span>
                    <span style={{ fontSize:14, color: T.red, fontWeight:600 }}>{fmtFull(m.fines)}</span>
                  </div>
                ))}
                <div className="loan-row" style={{ paddingTop:10, fontWeight:700 }}>
                  <span>Total</span>
                  <span style={{ color: T.accentLight }}>{fmtFull(totalFines)}</span>
                </div>
              </div>
            </>}

            <button className="btn btn-primary" onClick={() => openModal("addMember")}>+ Add New Member</button>
            <button className="btn btn-ghost" onClick={() => openModal("fine")}>⚠️ Issue Fine</button>
          </>}

          {/* ── LOANS ── */}
          {tab === "loans" && <>
            <div className="tab-pills">
              {[["active","Active"],["apply","Apply"],["applications","Review"],["repaid","Repaid"],["calculator","Calc"]].map(([t,label]) => (
                <button key={t} className={`tab-pill ${loanSubTab===t?"active":""}`} onClick={() => setLoanSubTab(t)}>
                  {label}{t==="applications" && (data.applications||[]).filter(a=>a.status==="pending").length > 0 ? ` (${(data.applications||[]).filter(a=>a.status==="pending").length})` : ""}
                </button>
              ))}
            </div>

            {loanSubTab === "active" && <>
              {activeLoans.length === 0 && <div className="card" style={{ textAlign:"center", color: T.textMuted, fontSize:14 }}>No active loans</div>}
              {activeLoans.map(loan => {
                const member = getMember(loan.memberId);
                const repaid = loan.amount - loan.balance;
                const pct = Math.round((repaid / (loan.amount + Math.round(loan.amount * loan.interest/100))) * 100);
                const isOverdue = loan.dueDate && loan.dueDate < today();
                return (
                  <div className="card" key={loan.id}>
                    <div className="card-header">
                      <div>
                        <div className="card-title">{member?.name}</div>
                        <div className="card-sub">{loan.purpose} · Due {loan.dueDate}</div>
                      </div>
                      <span className={`pill ${isOverdue ? "pill-red" : "pill-amber"}`}>{isOverdue ? "Overdue" : "Active"}</span>
                    </div>
                    <div className="loan-row"><span style={{fontSize:13,color:T.textMuted}}>Principal</span><span style={{fontSize:14,fontWeight:600}}>{fmtFull(loan.amount)}</span></div>
                    <div className="loan-row"><span style={{fontSize:13,color:T.textMuted}}>Interest ({loan.interest}%)</span><span style={{fontSize:14,color:T.green}}>+{fmtFull(Math.round(loan.amount*loan.interest/100))}</span></div>
                    <div className="loan-row"><span style={{fontSize:13,color:T.textMuted}}>Outstanding</span><span style={{fontSize:14,fontWeight:700,color:T.red}}>{fmtFull(loan.balance)}</span></div>
                    <div className="progress-bar"><div className="progress-fill progress-fill-green" style={{ width:`${pct}%` }} /></div>
                    <div style={{fontSize:11,color:T.textMuted,marginTop:4}}>{pct}% repaid</div>
                  </div>
                );
              })}
              <button className="btn btn-primary" onClick={() => openModal("loan")}>+ Record New Loan</button>
              <button className="btn btn-ghost" onClick={() => openModal("repayment")}>↩ Record Repayment</button>
            </>}

            {loanSubTab === "repaid" && <>
              {data.loans.filter(l=>l.status==="repaid").map(loan => {
                const member = getMember(loan.memberId);
                return (
                  <div className="card" key={loan.id}>
                    <div className="card-header">
                      <div><div className="card-title">{member?.name}</div><div className="card-sub">{loan.purpose} · {loan.disbursed}</div></div>
                      <span className="pill pill-green">Repaid</span>
                    </div>
                    <div className="loan-row"><span style={{fontSize:13,color:T.textMuted}}>Principal</span><span style={{fontSize:14,fontWeight:600}}>{fmtFull(loan.amount)}</span></div>
                    <div className="loan-row"><span style={{fontSize:13,color:T.textMuted}}>Interest earned</span><span style={{fontSize:14,color:T.green}}>+{fmtFull(Math.round(loan.amount*loan.interest/100))}</span></div>
                  </div>
                );
              })}
              {data.loans.filter(l=>l.status==="repaid").length === 0 && <div className="card" style={{textAlign:"center",color:T.textMuted,fontSize:14}}>No repaid loans yet</div>}
            </>}

            {loanSubTab === "calculator" && <>
              <div className="card">
                <div className="card-title" style={{marginBottom:14}}>Loan Interest Calculator</div>
                <div className="input-label">Loan Amount (ZMW)</div>
                <input className="input" type="number" placeholder="e.g. 500000" value={form.calcAmount||""} onChange={e=>setForm(f=>({...f,calcAmount:e.target.value}))} />
                <div className="input-row">
                  <div className="input-wrap">
                    <div className="input-label">Interest Rate (%)</div>
                    <input className="input" type="number" placeholder={data.interestRate} value={form.calcRate||""} onChange={e=>setForm(f=>({...f,calcRate:e.target.value}))} />
                  </div>
                  <div className="input-wrap">
                    <div className="input-label">Months</div>
                    <input className="input" type="number" placeholder="3" value={form.calcMonths||""} onChange={e=>setForm(f=>({...f,calcMonths:e.target.value}))} />
                  </div>
                </div>
                <button className="btn btn-primary" onClick={calcLoan}>Calculate</button>
                {calcResult && (
                  <div className="calc-box">
                    <div className="calc-row"><span style={{color:T.textMuted}}>Principal</span><span>{fmtFull(parseInt(form.calcAmount)||0)}</span></div>
                    <div className="calc-row"><span style={{color:T.textMuted}}>Interest</span><span style={{color:T.green}}>+{fmtFull(calcResult.interest)}</span></div>
                    <div className="calc-row calc-total"><span>Total Repayable</span><span style={{color:T.accentLight}}>{fmtFull(calcResult.total)}</span></div>
                    <div className="calc-row" style={{marginTop:8}}><span style={{color:T.textMuted}}>Monthly ({calcResult.months} months)</span><span style={{fontWeight:600}}>{fmtFull(calcResult.monthly)}/mo</span></div>
                  </div>
                )}
              </div>
              <div className="card">
                <div style={{fontSize:13,color:T.textMuted,marginBottom:8}}>Group default rate</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:T.text}}>{data.interestRate}% per loan</div>
                <div style={{fontSize:12,color:T.textMuted,marginTop:4}}>Flat rate · Interest stays in the group pool</div>
              </div>
            </>}

            {/* ── APPLY FOR LOAN ── */}
            {loanSubTab === "apply" && <>
              <div className="apply-hero">
                <div style={{fontSize:11,color:T.blue,textTransform:"uppercase",letterSpacing:".6px",marginBottom:6}}>Loan Application</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:T.text,marginBottom:4}}>Apply for a Group Loan</div>
                <div style={{fontSize:12,color:T.textMuted,lineHeight:1.5}}>Submit your request below. The group treasurer will review and approve. You will see your full repayment schedule before submitting.</div>
              </div>

              <div className="card">
                <div className="input-label">Your Name</div>
                <select className="select" value={appForm.memberId||""} onChange={e=>setAppForm(f=>({...f,memberId:e.target.value}))}>
                  <option value="">Select your name…</option>
                  {data.members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
                </select>

                <div className="input-row">
                  <div className="input-wrap">
                    <div className="input-label">Amount (ZMW)</div>
                    <input className="input" type="number" placeholder="e.g. 500000" value={appForm.amount||""} onChange={e=>setAppForm(f=>({...f,amount:e.target.value}))} />
                  </div>
                  <div className="input-wrap">
                    <div className="input-label">Months</div>
                    <select className="select" style={{marginBottom:0}} value={appForm.months||""} onChange={e=>setAppForm(f=>({...f,months:e.target.value}))}>
                      <option value="">Select…</option>
                      {[1,2,3,4,5,6,9,12].map(n=><option key={n} value={n}>{n} {n===1?"month":"months"}</option>)}
                    </select>
                  </div>
                </div>

                <div className="input-label">Purpose</div>
                <input className="input" placeholder="e.g. School fees, Business stock, Medical" value={appForm.purpose||""} onChange={e=>setAppForm(f=>({...f,purpose:e.target.value}))} />

                <div className="input-label">Reason / Motivation</div>
                <textarea className="input" rows={3} placeholder="Briefly explain why you need this loan…" value={appForm.reason||""} onChange={e=>setAppForm(f=>({...f,reason:e.target.value}))} style={{resize:"none"}} />

                {/* Live repayment schedule */}
                {appForm.amount && appForm.months && parseInt(appForm.amount) > 0 && (() => {
                  const schedule = buildSchedule(parseInt(appForm.amount), data.interestRate, parseInt(appForm.months));
                  const total = schedule.reduce((s,r)=>s+r.payment,0);
                  return (
                    <div style={{marginTop:4,marginBottom:12}}>
                      <div style={{fontSize:12,fontWeight:600,color:T.accent,marginBottom:10,textTransform:"uppercase",letterSpacing:".5px"}}>Repayment Schedule</div>
                      <div style={{background:T.bg,borderRadius:12,padding:"12px 14px",border:`1px solid ${T.border}`}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${T.border}`}}>
                          <div><div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:".5px"}}>Total Repayable</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:T.accentLight}}>{fmtFull(total)}</div></div>
                          <div style={{textAlign:"right"}}><div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:".5px"}}>Per Month</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:T.text}}>{fmtFull(schedule[0]?.payment)}</div></div>
                        </div>
                        <table className="schedule-table">
                          <thead><tr><th>Month</th><th>Due Date</th><th>Payment</th><th>Balance</th></tr></thead>
                          <tbody>
                            {schedule.map(row=>(
                              <tr key={row.month}>
                                <td>{row.month}</td>
                                <td style={{color:T.textMuted}}>{row.due}</td>
                                <td className="highlight">{fmtFull(row.payment)}</td>
                                <td style={{color: row.balance===0 ? T.green : T.textMuted}}>{row.balance===0?"✓ Paid":fmtFull(row.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div style={{marginTop:10,fontSize:11,color:T.textMuted}}>Interest: {data.interestRate}% flat · Principal: {fmtFull(parseInt(appForm.amount))} · Interest: {fmtFull(Math.round(parseInt(appForm.amount)*data.interestRate/100))}</div>
                      </div>
                    </div>
                  );
                })()}

                <button className="btn btn-primary" onClick={handleSubmitApplication} disabled={!appForm.memberId||!appForm.amount||!appForm.purpose||!appForm.months}>Submit Application</button>
              </div>
            </>}

            {/* ── REVIEW APPLICATIONS ── */}
            {loanSubTab === "applications" && <>
              <div className="section-title">Loan Applications</div>
              {(data.applications||[]).length === 0 && <div className="card" style={{textAlign:"center",color:T.textMuted,fontSize:14}}>No applications yet</div>}
              {(data.applications||[]).map(app => {
                const member = getMember(app.memberId);
                const schedule = buildSchedule(app.amount, data.interestRate, app.months);
                const total = schedule.reduce((s,r)=>s+r.payment,0);
                return (
                  <div key={app.id} className={`app-status-${app.status}`}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:15}}>{member?.name}</div>
                        <div style={{fontSize:12,color:T.textMuted,marginTop:2}}>{app.purpose} · Applied {app.appliedDate}</div>
                      </div>
                      <span className={`pill ${app.status==="pending"?"pill-blue":app.status==="approved"?"pill-green":"pill-red"}`}>{app.status.charAt(0).toUpperCase()+app.status.slice(1)}</span>
                    </div>
                    <div style={{display:"flex",gap:12,marginBottom:8}}>
                      <div><div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:".4px"}}>Requested</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:T.text}}>{fmtFull(app.amount)}</div></div>
                      <div><div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:".4px"}}>Repay over</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:T.text}}>{app.months} months</div></div>
                      <div><div style={{fontSize:10,color:T.textMuted,textTransform:"uppercase",letterSpacing:".4px"}}>Monthly</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:T.accentLight}}>{fmtFull(schedule[0]?.payment)}</div></div>
                    </div>
                    {app.reason && <div style={{fontSize:12,color:T.textMuted,fontStyle:"italic",marginBottom:8}}>"{app.reason}"</div>}
                    {/* Schedule preview */}
                    <div style={{background:T.bg,borderRadius:10,padding:"10px 12px",marginBottom:8}}>
                      <div style={{fontSize:10,color:T.accent,fontWeight:600,textTransform:"uppercase",letterSpacing:".4px",marginBottom:6}}>Repayment Schedule</div>
                      <table className="schedule-table">
                        <thead><tr><th>Month</th><th>Due Date</th><th>Payment</th><th>Balance</th></tr></thead>
                        <tbody>
                          {schedule.map(row=>(
                            <tr key={row.month}>
                              <td>{row.month}</td>
                              <td style={{color:T.textMuted}}>{row.due}</td>
                              <td className="highlight">{fmtFull(row.payment)}</td>
                              <td style={{color:row.balance===0?T.green:T.textMuted}}>{row.balance===0?"✓":fmtFull(row.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div style={{marginTop:8,fontSize:11,color:T.textMuted,fontWeight:600}}>Total repayable: {fmtFull(total)}</div>
                    </div>
                    {app.status === "pending" && (
                      <div className="action-row">
                        <button className="btn btn-primary" style={{background:T.green}} onClick={()=>handleApproveApp(app.id)}>✓ Approve</button>
                        <button className="btn btn-ghost" style={{color:T.red,borderColor:T.red}} onClick={()=>handleRejectApp(app.id)}>✗ Reject</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </>}
          </>}

          {/* ── MEETINGS ── */}
          {tab === "meetings" && <>
            {data.meetings.filter(m=>m.type==="upcoming").length > 0 && <>
              <div className="section-title">Upcoming</div>
              <div className="card">
                {data.meetings.filter(m=>m.type==="upcoming").map(m => {
                  const d = new Date(m.date);
                  return (
                    <div className="meeting-item" key={m.id}>
                      <div className="meeting-date-box">
                        <div className="meeting-day">{d.getDate()}</div>
                        <div className="meeting-month">{d.toLocaleString("default",{month:"short"})}</div>
                      </div>
                      <div>
                        <div className="meeting-title">{m.title}</div>
                        <div className="meeting-meta">Scheduled · Agenda pending</div>
                        <span className="pill pill-blue" style={{marginTop:6}}>Upcoming</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>}

            <div className="section-row">
              <div className="section-title" style={{marginBottom:0}}>Past Meetings</div>
              <button className="btn btn-ghost btn-sm" onClick={() => shareWhatsApp("meeting")} style={{width:"auto",marginBottom:0}}>📤 Share</button>
            </div>
            <div className="card">
              {data.meetings.filter(m=>m.type==="regular").map(m => {
                const d = new Date(m.date);
                return (
                  <div className="meeting-item" key={m.id}>
                    <div className="meeting-date-box">
                      <div className="meeting-day">{d.getDate()}</div>
                      <div className="meeting-month">{d.toLocaleString("default",{month:"short"})}</div>
                    </div>
                    <div style={{flex:1}}>
                      <div className="meeting-title">{m.title}</div>
                      <div className="meeting-meta">{m.attendees.length} attendees</div>
                      <div style={{fontSize:12,color:T.textMuted,marginTop:6,lineHeight:1.5}}>{m.notes.slice(0,120)}{m.notes.length>120?"…":""}</div>
                    </div>
                  </div>
                );
              })}
              {data.meetings.filter(m=>m.type==="regular").length===0 && <div style={{textAlign:"center",color:T.textMuted,fontSize:14}}>No meetings recorded yet</div>}
            </div>
            <button className="btn btn-primary" onClick={() => openModal("meeting")}>+ Record Meeting Minutes</button>
          </>}

          {/* ── AI INSIGHTS ── */}
          {tab === "ai" && <>
            <div className="section-title">AI Insights</div>
            <div className="ai-box">
              <div className="ai-header">
                <span style={{fontSize:18}}>✨</span>
                <span className="ai-title">Group Intelligence</span>
              </div>
              {aiLoading && <div className="ai-loading"><div className="ai-dot"/><div className="ai-dot"/><div className="ai-dot"/></div>}
              {!aiLoading && !aiInsight && <div style={{fontSize:13,color:T.textMuted}}>Tap below to get AI-powered insights about your group's financial health.</div>}
              {!aiLoading && aiInsight && <div className="ai-body">{aiInsight}</div>}
            </div>
            <button className="btn btn-primary" onClick={fetchAiInsight} disabled={aiLoading}>
              {aiLoading ? "Analysing…" : "✨ Generate Insights"}
            </button>

            <div className="divider" />
            <div className="section-title">Group Snapshot</div>
            {[
              { label:"Pool Value", val: fmtFull(poolValue), icon:"💰" },
              { label:"Collection Rate", val: `${totalSavings > 0 ? Math.round((totalSavings / (data.members.length * data.savingsTarget / data.members.length)) * 100) : 0}%`, icon:"📊" },
              { label:"Loans Outstanding", val: fmtFull(totalBalance), icon:"🏦" },
              { label:"Interest Earned", val: fmtFull(totalInterestEarned), icon:"📈" },
              { label:"Fines Collected", val: fmtFull(totalFines), icon:"⚠️" },
              { label:"Est. Dividend/Member", val: fmtFull(dividendPerMember), icon:"🎁" },
            ].map((s,i) => (
              <div className="card" key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 15px"}}>
                <span style={{fontSize:22}}>{s.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,color:T.textMuted}}>{s.label}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:T.text,marginTop:2}}>{s.val}</div>
                </div>
              </div>
            ))}

            <div className="divider" />
            <button className="btn btn-ghost" onClick={() => shareWhatsApp("summary")}>📤 Share Summary on WhatsApp</button>
          </>}

          {/* ── IMPORT ── */}
          {tab === "import" && <>
            <div className="section-title">Import from Spreadsheet</div>

            {importState === "idle" && <>
              <div
                className={`import-zone ${isDragging ? "drag" : ""}`}
                onClick={() => document.getElementById("file-input").click()}
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false); handleImportFile(e.dataTransfer.files[0]); }}
              >
                <div className="import-zone-icon">📊</div>
                <div className="import-zone-title">Upload your Excel file</div>
                <div className="import-zone-sub">Tap to browse · or drag & drop<br/>.xlsx, .xls, or .csv</div>
                <input id="file-input" type="file" accept=".xlsx,.xls,.csv" style={{display:"none"}} onChange={e => handleImportFile(e.target.files[0])} />
              </div>
              <div className="card">
                <div className="card-title" style={{marginBottom:12}}>How it works</div>
                {[
                  { n:1, text:"Upload your group spreadsheet", sub:"Any format — member list, savings register, loan book" },
                  { n:2, text:"AI reads and extracts the data", sub:"Claude intelligently maps columns to the right fields" },
                  { n:3, text:"Review before importing", sub:"You confirm what gets added to the app" },
                ].map(s => (
                  <div className="import-step" key={s.n}>
                    <div className="import-step-num">{s.n}</div>
                    <div>
                      <div className="import-step-text">{s.text}</div>
                      <div className="import-step-sub">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card">
                <div style={{fontSize:12,color:T.textMuted,lineHeight:1.6}}>
                  💡 <strong style={{color:T.text}}>Tip:</strong> Your spreadsheet doesn't need to be in any special format. Claude will figure out member names, savings amounts, loan balances, and meeting notes from whatever structure you already use.
                </div>
              </div>
            </>}

            {(importState === "parsing" || importState === "analyzing") && (
              <div className="import-progress">
                <div className="ai-loading" style={{justifyContent:"center"}}>
                  <div className="ai-dot"/><div className="ai-dot"/><div className="ai-dot"/>
                </div>
                <div className="import-progress-text">
                  {importState === "parsing" ? "Reading spreadsheet…" : "Claude is analysing your data…"}
                </div>
                <div className="import-progress-sub">
                  {importState === "parsing" ? "Extracting sheet contents" : "Identifying members, loans & meetings"}
                </div>
              </div>
            )}

            {importState === "error" && <>
              <div className="card" style={{borderColor:T.red,background:"rgba(224,90,74,.08)"}}>
                <div style={{fontSize:15,fontWeight:600,color:T.red,marginBottom:6}}>⚠️ Import failed</div>
                <div style={{fontSize:13,color:T.textMuted}}>{importError}</div>
              </div>
              <button className="btn btn-primary" onClick={() => setImportState("idle")}>Try Again</button>
            </>}

            {importState === "preview" && importPreview && <>
              <div className="card" style={{borderColor: importPreview.confidence==="high" ? T.green : T.accent, background: importPreview.confidence==="high" ? "rgba(76,175,120,.06)" : "rgba(212,133,58,.06)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{fontWeight:600,fontSize:14}}>Analysis complete</div>
                  <span className={`pill ${importPreview.confidence==="high"?"pill-green":importPreview.confidence==="medium"?"pill-amber":"pill-red"}`}>{importPreview.confidence} confidence</span>
                </div>
                {importPreview.notes && <div style={{fontSize:12,color:T.textMuted,lineHeight:1.5,fontStyle:"italic"}}>"{importPreview.notes}"</div>}
              </div>

              {importPreview.groupName && <div className="card">
                <div style={{fontSize:11,color:T.textMuted,textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>Group Name</div>
                <div style={{fontSize:16,fontWeight:600}}>{importPreview.groupName}</div>
              </div>}

              {(importPreview.members||[]).length > 0 && <div className="preview-section">
                <div style={{fontSize:13,fontWeight:600,color:T.accent,marginBottom:8}}>👥 {importPreview.members.length} Members found</div>
                <div className="card">
                  {importPreview.members.map((m, i) => (
                    <div key={i} className="member-row">
                      <div className="avatar" style={{background:avatarColors[i%avatarColors.length]+"33",color:avatarColors[i%avatarColors.length]}}>{initials(m.name)}</div>
                      <div className="member-info">
                        <div className="member-name">{m.name}</div>
                        <div className="member-role">{m.role}</div>
                      </div>
                      <div className="member-amount">{fmtFull(m.savings||0)}</div>
                    </div>
                  ))}
                </div>
              </div>}

              {(importPreview.loans||[]).length > 0 && <div className="preview-section">
                <div style={{fontSize:13,fontWeight:600,color:T.blue,marginBottom:8}}>💰 {importPreview.loans.length} Loans found</div>
                <div className="card">
                  {importPreview.loans.map((l, i) => (
                    <div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span style={{fontSize:14,fontWeight:600}}>{l.memberName}</span>
                        <span className={`pill ${l.status==="repaid"?"pill-green":"pill-amber"}`}>{l.status}</span>
                      </div>
                      <div style={{fontSize:12,color:T.textMuted,marginTop:3}}>{l.purpose} · {fmtFull(l.amount)} · Balance: {fmtFull(l.balance??l.amount)}</div>
                    </div>
                  ))}
                </div>
              </div>}

              {(importPreview.meetings||[]).length > 0 && <div className="preview-section">
                <div style={{fontSize:13,fontWeight:600,color:T.purple,marginBottom:8}}>📋 {importPreview.meetings.length} Meetings found</div>
                <div className="card">
                  {importPreview.meetings.map((m, i) => (
                    <div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
                      <div style={{fontSize:14,fontWeight:600}}>{m.title}</div>
                      <div style={{fontSize:12,color:T.textMuted,marginTop:2}}>{m.date} · {m.type}</div>
                    </div>
                  ))}
                </div>
              </div>}

              <button className="btn btn-primary" onClick={applyImport}>✓ Import This Data</button>
              <button className="btn btn-ghost" onClick={() => { setImportState("idle"); setImportPreview(null); }}>Cancel</button>
            </>}

            {importState === "done" && <>
              <div className="card" style={{textAlign:"center",padding:"30px 20px",borderColor:T.green,background:"rgba(76,175,120,.06)"}}>
                <div style={{fontSize:48,marginBottom:12}}>✅</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,marginBottom:8}}>Import successful!</div>
                <div style={{fontSize:13,color:T.textMuted}}>Your group data has been loaded. Head to any tab to review.</div>
              </div>
              <button className="btn btn-primary" onClick={() => { setTab("home"); setImportState("idle"); }}>Go to Dashboard</button>
              <button className="btn btn-ghost" onClick={() => setImportState("idle")}>Import Another File</button>
            </>}
          </>}

        </div>

        {/* FAB */}
        {tab === "home" && <button className="fab" onClick={() => openModal("deposit")}>+</button>}

        {/* NAV */}
        <nav className="nav">
          {[
            { id:"home", label:"Home", icon: Icon.Home },
            { id:"members", label:"Members", icon: Icon.Members },
            { id:"loans", label:"Loans", icon: Icon.Loans },
            { id:"meetings", label:"Meetings", icon: Icon.Meetings },
            { id:"ai", label:"Insights", icon: Icon.AI },
            { id:"import", label:"Import", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> },
          ].map(item => (
            <button key={item.id} className={`nav-item ${tab===item.id?"active":""}`} onClick={() => setTab(item.id)}>
              {item.icon}{item.label}
            </button>
          ))}
        </nav>

        {/* MODALS */}
        {modal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-handle" />

              {modal === "addMember" && <>
                <div className="modal-title">Add New Member</div>
                <div className="input-label">Full Name</div>
                <input className="input" placeholder="e.g. Chipo Mutale" value={form.name||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
                <div className="input-label">Role</div>
                <select className="select" value={form.role||""} onChange={e=>setForm(f=>({...f,role:e.target.value}))}>
                  <option value="">Select role…</option>
                  {["Member","Chairperson","Treasurer","Secretary"].map(r=><option key={r}>{r}</option>)}
                </select>
                <button className="btn btn-primary" onClick={handleAddMember}>Add Member</button>
                <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              </>}

              {modal === "deposit" && <>
                <div className="modal-title">Record Deposit</div>
                <div className="input-label">Member</div>
                <select className="select" value={form.memberId||""} onChange={e=>setForm(f=>({...f,memberId:e.target.value}))}>
                  <option value="">Select member…</option>
                  {data.members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
                <div className="input-label">Amount (ZMW)</div>
                <input className="input" type="number" placeholder="e.g. 200000" value={form.amount||""} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} />
                <button className="btn btn-primary" onClick={handleDeposit}>Save Deposit</button>
                <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              </>}

              {modal === "fine" && <>
                <div className="modal-title">Issue Fine</div>
                <div className="input-label">Member</div>
                <select className="select" value={form.memberId||""} onChange={e=>setForm(f=>({...f,memberId:e.target.value}))}>
                  <option value="">Select member…</option>
                  {data.members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
                <div className="input-label">Fine Amount (ZMW)</div>
                <input className="input" type="number" placeholder={data.fineAmount} value={form.amount||""} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} />
                <div className="input-label">Reason</div>
                <input className="input" placeholder="e.g. Late to meeting, Missed contribution" value={form.reason||""} onChange={e=>setForm(f=>({...f,reason:e.target.value}))} />
                <button className="btn btn-primary" style={{background:T.red,color:"white"}} onClick={handleFine}>Issue Fine</button>
                <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              </>}

              {modal === "loan" && <>
                <div className="modal-title">Record New Loan</div>
                <div className="input-label">Member</div>
                <select className="select" value={form.memberId||""} onChange={e=>setForm(f=>({...f,memberId:e.target.value}))}>
                  <option value="">Select member…</option>
                  {data.members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
                <div className="input-row">
                  <div className="input-wrap">
                    <div className="input-label">Amount (ZMW)</div>
                    <input className="input" type="number" placeholder="e.g. 500000" value={form.amount||""} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} />
                  </div>
                  <div className="input-wrap">
                    <div className="input-label">Interest %</div>
                    <input className="input" type="number" placeholder={data.interestRate} value={form.interestRate||""} onChange={e=>setForm(f=>({...f,interestRate:e.target.value}))} />
                  </div>
                </div>
                <div className="input-label">Purpose</div>
                <input className="input" placeholder="e.g. School fees, Business, Medical" value={form.purpose||""} onChange={e=>setForm(f=>({...f,purpose:e.target.value}))} />
                <div className="input-label">Due Date</div>
                <input className="input" type="date" value={form.dueDate||""} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))} />
                {form.amount && <div className="calc-box">
                  <div className="calc-row"><span style={{color:T.textMuted}}>Interest</span><span style={{color:T.green}}>+{fmtFull(Math.round(parseInt(form.amount||0)*(parseInt(form.interestRate||data.interestRate))/100))}</span></div>
                  <div className="calc-row calc-total"><span>Total Repayable</span><span>{fmtFull(parseInt(form.amount||0)+Math.round(parseInt(form.amount||0)*(parseInt(form.interestRate||data.interestRate))/100))}</span></div>
                </div>}
                <button className="btn btn-primary" onClick={handleLoan}>Record Loan</button>
                <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              </>}

              {modal === "repayment" && <>
                <div className="modal-title">Record Repayment</div>
                <div className="input-label">Loan</div>
                <select className="select" value={form.loanId||""} onChange={e=>setForm(f=>({...f,loanId:e.target.value}))}>
                  <option value="">Select loan…</option>
                  {activeLoans.map(l=><option key={l.id} value={l.id}>{getMember(l.memberId)?.name} — {fmtFull(l.balance)} remaining</option>)}
                </select>
                <div className="input-label">Amount (ZMW)</div>
                <input className="input" type="number" placeholder="e.g. 100000" value={form.amount||""} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} />
                <button className="btn btn-primary" onClick={handleRepayment}>Record Repayment</button>
                <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              </>}

              {modal === "meeting" && <>
                <div className="modal-title">Record Meeting Minutes</div>
                <div className="input-label">Meeting Title</div>
                <input className="input" placeholder="e.g. June Monthly Meeting" value={form.title||""} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
                <div className="input-label">Minutes / Notes</div>
                <textarea className="input" rows={5} placeholder="What was discussed, decisions made, actions…" value={form.notes||""} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} style={{resize:"none"}} />
                <div className="input-label">Attendees</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
                  {data.members.map(m => {
                    const sel = (form.attendees||[]).includes(m.id);
                    return <button key={m.id} className="btn btn-ghost btn-sm" style={{width:"auto",marginBottom:0,background:sel?T.accent:"",color:sel?T.bg:T.text,borderColor:sel?T.accent:T.border}} onClick={()=>setForm(f=>({...f,attendees:sel?(f.attendees||[]).filter(x=>x!==m.id):[...(f.attendees||[]),m.id]}))}>
                      {m.name.split(" ")[0]}
                    </button>;
                  })}
                </div>
                <button className="btn btn-primary" onClick={handleMeeting}>Save Minutes</button>
                <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              </>}
            </div>
          </div>
        )}

        {toast && <div className="toast">✓ {toast}</div>}
      </div>
    </>
  );
}
