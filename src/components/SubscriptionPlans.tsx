import { useState } from "react";
import {
  Check,
  Crown,
  Zap,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";
import { AnimatedLogo } from "@/components/AnimatedLogo";

interface SubscriptionPlansProps {
  onClose?: () => void;
}

type Step = "plans" | "checkout" | "processing" | "success";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 49,
    period: "/mo",
    icon: Zap,
    popular: false,
    features: [
      "WadiAI Chat — Unlimited",
      "Image Generator — 100/mo",
      "Video Creator — 10/mo",
      "Study Assistant",
      "Email support",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    price: 499,
    period: "/yr",
    icon: Crown,
    popular: true,
    savings: "Save ₹89",
    features: [
      "WadiAI Chat — Unlimited",
      "Image Generator — Unlimited",
      "Video Creator — 100/mo",
      "Study Assistant",
      "Deep Thinking AI",
      "Developer API access",
      "Priority support",
    ],
  },
];

const quickPayApps = [
  { id: "gpay", name: "Google Pay", color: "from-[#4285F4] to-[#34A853]", letter: "G" },
  { id: "phonepe", name: "PhonePe", color: "from-[#5f259f] to-[#7b3fbd]", letter: "Pe" },
  { id: "fampay", name: "FamPay", color: "from-[#FFCC00] to-[#FF9500]", letter: "F", dark: true },
  { id: "paytm", name: "Paytm", color: "from-[#00BAF2] to-[#0078D4]", letter: "P" },
];

const paymentTabs = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "bank", label: "Bank", icon: Building2 },
  { id: "wallet", label: "Wallet", icon: Wallet },
];

const banks = ["SBI", "HDFC", "ICICI", "Axis", "Kotak", "PNB", "BOB", "Yes Bank"];
const walletList = ["Amazon Pay", "Freecharge", "MobiKwik", "Jio Money", "Airtel Money"];

const inputClass =
  "w-full rounded-xl border border-border/50 bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:shadow-[0_0_20px_-6px_var(--cyan-glow)] transition-all";

export function SubscriptionPlans({ onClose }: SubscriptionPlansProps) {
  const [selected, setSelected] = useState("yearly");
  const [step, setStep] = useState<Step>("plans");
  const [payMethod, setPayMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");

  const activePlan = plans.find((p) => p.id === selected)!;

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => setStep("success"), 2500);
  };

  const isFormValid = () => {
    switch (payMethod) {
      case "upi": return upiId.includes("@");
      case "card": return cardNumber.length >= 16 && cardExpiry.length >= 4 && cardCvv.length >= 3 && cardName.length > 0;
      case "bank": return selectedBank.length > 0;
      case "wallet": return selectedWallet.length > 0;
      default: return false;
    }
  };

  // ─── SUCCESS ───
  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center w-full py-8 animate-fade-up">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <CheckCircle2 className="h-16 w-16 text-primary relative" />
        </div>
        <AnimatedLogo size={48} />
        <h3 className="font-display text-lg font-bold text-gradient mt-4">Payment Successful!</h3>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Welcome to <span className="text-foreground font-medium">Xenonymous {activePlan.name}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">₹{activePlan.price}{activePlan.period}</p>
        <div className="mt-6 w-full rounded-xl border border-primary/30 bg-accent/20 p-4">
          <p className="text-[11px] text-muted-foreground text-center">
            A confirmation email has been sent. Your AI features are now unlocked.
          </p>
        </div>
        <button
          onClick={() => { setStep("plans"); onClose?.(); }}
          className="mt-5 w-full rounded-full bg-brand py-3 text-sm font-bold text-primary-foreground glow hover:opacity-90 transition-opacity"
        >
          Start Using WadiAI
        </button>
      </div>
    );
  }

  // ─── PROCESSING ───
  if (step === "processing") {
    return (
      <div className="flex flex-col items-center justify-center w-full py-16 animate-fade-up">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: "1.5s" }} />
          <Loader2 className="h-12 w-12 text-primary animate-spin relative" />
        </div>
        <p className="font-display text-sm font-bold tracking-wider text-gradient mt-6">PROCESSING PAYMENT</p>
        <p className="text-xs text-muted-foreground mt-2">Please do not close this window</p>
        <div className="mt-6 flex items-center gap-2 rounded-full border border-border/40 bg-card/30 px-4 py-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="text-[11px] text-muted-foreground">256-bit SSL encrypted · PCI DSS compliant</span>
        </div>
      </div>
    );
  }

  // ─── CHECKOUT ───
  if (step === "checkout") {
    return (
      <div className="flex flex-col w-full animate-fade-up">
        {/* Header */}
        <button
          onClick={() => setStep("plans")}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to plans
        </button>

        {/* Order summary card */}
        <div className="rounded-2xl border border-primary/30 bg-accent/15 p-4 mb-5">
          <div className="flex items-center gap-3">
            <AnimatedLogo size={32} />
            <div className="flex-1">
              <p className="font-display text-[10px] font-bold tracking-[0.2em] text-primary">XENONYMOUS</p>
              <p className="text-sm font-semibold text-foreground">{activePlan.name} Plan</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-foreground flex items-center">
                <IndianRupee className="h-4 w-4" />{activePlan.price}
              </p>
              <p className="text-[10px] text-muted-foreground">{activePlan.period}</p>
            </div>
          </div>
        </div>

        {/* Quick Pay Apps */}
        <p className="text-[10px] font-semibold text-muted-foreground tracking-[0.2em] mb-2.5">QUICK PAY</p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {quickPayApps.map((app) => (
            <button
              key={app.id}
              onClick={handlePay}
              className="group flex flex-col items-center gap-1.5 rounded-xl border border-border/30 bg-card/20 p-2.5 hover:border-primary/40 hover:shadow-[0_0_20px_-6px_var(--cyan-glow)] transition-all"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${app.color} shadow-lg`}>
                <span className={`text-xs font-bold ${app.dark ? "text-[#1a1a1a]" : "text-white"}`}>
                  {app.letter}
                </span>
              </div>
              <span className="text-[9px] font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight text-center">
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border/40" />
          <span className="text-[10px] text-muted-foreground font-medium">OR PAY WITH</span>
          <div className="flex-1 h-px bg-border/40" />
        </div>

        {/* Payment method tabs */}
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {paymentTabs.map((tab) => {
            const Icon = tab.icon;
            const active = payMethod === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setPayMethod(tab.id)}
                className={`flex flex-col items-center gap-1 rounded-xl py-2 px-1 text-[10px] font-medium transition-all border ${
                  active
                    ? "border-primary/50 bg-accent/30 text-primary shadow-[0_0_15px_-5px_var(--cyan-glow)]"
                    : "border-border/30 text-muted-foreground hover:border-border/60"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* UPI */}
        {payMethod === "upi" && (
          <div className="space-y-3">
            <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider">UPI ID</label>
            <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)}
              placeholder="yourname@okaxis" className={inputClass} />
            <p className="text-[10px] text-muted-foreground">Works with Google Pay, PhonePe, Paytm, BHIM & more</p>
          </div>
        )}

        {/* Card */}
        {payMethod === "card" && (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider mb-1.5">CARD NUMBER</label>
              <input type="text" value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                placeholder="1234 5678 9012 3456" className={`${inputClass} font-mono tracking-wider`} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider mb-1.5">CARDHOLDER NAME</label>
              <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)}
                placeholder="Full name on card" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider mb-1.5">EXPIRY</label>
                <input type="text" value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="MM/YY" className={`${inputClass} font-mono`} />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider mb-1.5">CVV</label>
                <input type="password" value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="•••" className={`${inputClass} font-mono`} />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Visa, Mastercard, RuPay accepted</span>
            </div>
          </div>
        )}

        {/* Net Banking */}
        {payMethod === "bank" && (
          <div className="space-y-2">
            <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider mb-1">SELECT BANK</label>
            <div className="grid grid-cols-2 gap-2">
              {banks.map((bank) => (
                <button key={bank} onClick={() => setSelectedBank(bank)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
                    selectedBank === bank
                      ? "border-primary/50 bg-accent/30 text-primary shadow-[0_0_15px_-5px_var(--cyan-glow)]"
                      : "border-border/40 text-muted-foreground hover:border-border/60"
                  }`}
                >
                  {bank}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wallets */}
        {payMethod === "wallet" && (
          <div className="space-y-2">
            <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider mb-1">SELECT WALLET</label>
            <div className="grid grid-cols-2 gap-2">
              {walletList.map((w) => (
                <button key={w} onClick={() => setSelectedWallet(w)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
                    selectedWallet === w
                      ? "border-primary/50 bg-accent/30 text-primary shadow-[0_0_15px_-5px_var(--cyan-glow)]"
                      : "border-border/40 text-muted-foreground hover:border-border/60"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pay Button */}
        <button onClick={handlePay} disabled={!isFormValid()}
          className="mt-5 w-full rounded-full bg-brand py-3.5 text-sm font-bold text-primary-foreground glow hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
        >
          <ShieldCheck className="h-4 w-4" />
          Pay ₹{activePlan.price}
        </button>

        <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
          <span>🔒 Secured by Xenonymous</span>
          <span>·</span>
          <span>PCI DSS</span>
          <span>·</span>
          <span>256-bit SSL</span>
        </div>
      </div>
    );
  }

  // ─── PLAN SELECTION ───
  return (
    <div className="flex flex-col items-center w-full">
      {/* Header with branding */}
      <div className="flex flex-col items-center mb-6">
        <AnimatedLogo size={56} />
        <h2 className="font-display text-lg font-bold tracking-widest text-gradient mt-3">XENONYMOUS</h2>
        <p className="text-xs text-muted-foreground mt-1">Choose your AI plan</p>
      </div>

      {/* Plans */}
      <div className="flex flex-col gap-3 w-full">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selected === plan.id;
          return (
            <button key={plan.id} onClick={() => setSelected(plan.id)}
              className={`relative w-full rounded-2xl p-4 text-left transition-all duration-300 border ${
                isSelected
                  ? "border-primary/60 bg-accent/30 shadow-[0_0_40px_-10px_var(--cyan-glow)]"
                  : "border-border/40 bg-card/30 hover:border-border/60"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-brand px-3 py-0.5 text-[10px] font-bold tracking-wider text-primary-foreground glow">
                  BEST VALUE
                </span>
              )}
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  isSelected ? "bg-brand glow" : "bg-muted/40"
                }`}>
                  <Icon className={`h-5 w-5 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-sm font-bold">{plan.name}</span>
                    {plan.savings && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        {plan.savings}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-bold text-foreground">₹{plan.price}</span>
                    <span className="text-xs text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground/40"
                }`}>
                  {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {plan.features.map((f) => (
                  <span key={f} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Check className="h-3 w-3 text-primary flex-shrink-0" />{f}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Payment methods preview */}
      <div className="mt-5 w-full">
        <p className="text-[10px] text-muted-foreground font-semibold tracking-[0.2em] mb-2.5 text-center">ACCEPTED PAYMENTS</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {quickPayApps.map((app) => (
            <span key={app.id} className="flex items-center gap-1.5 rounded-full border border-border/40 bg-card/30 px-2.5 py-1">
              <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-gradient-to-br ${app.color}`}>
                <span className={`text-[6px] font-bold ${app.dark ? "text-[#1a1a1a]" : "text-white"}`}>{app.letter}</span>
              </span>
              <span className="text-[10px] text-muted-foreground">{app.name}</span>
            </span>
          ))}
          {["UPI", "Cards", "Net Banking"].map((m) => (
            <span key={m} className="rounded-full border border-border/40 bg-card/30 px-2.5 py-1 text-[10px] text-muted-foreground">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Subscribe button */}
      <button
        className="mt-5 w-full rounded-full bg-brand py-3.5 text-sm font-bold text-primary-foreground glow hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        onClick={() => setStep("checkout")}
      >
        <CreditCard className="h-4 w-4" />
        Subscribe — ₹{activePlan.price}{activePlan.period}
      </button>

      <p className="mt-3 text-center text-[10px] text-muted-foreground leading-relaxed">
        Cancel anytime · Secure checkout · Instant access
      </p>
    </div>
  );
}
