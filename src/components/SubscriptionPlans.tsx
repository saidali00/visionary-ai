import { useState } from "react";
import { Check, Crown, Zap, X } from "lucide-react";
import { AnimatedLogo } from "@/components/AnimatedLogo";

interface SubscriptionPlansProps {
  onClose?: () => void;
}

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

const paymentMethods = [
  "UPI", "Credit Card", "Debit Card", "Net Banking", "Wallets", "EMI",
];

export function SubscriptionPlans({ onClose }: SubscriptionPlansProps) {
  const [selected, setSelected] = useState("yearly");

  return (
    <div className="flex flex-col items-center w-full">
      {/* Header with branding */}
      <div className="flex flex-col items-center mb-6">
        <AnimatedLogo size={56} />
        <h2 className="font-display text-lg font-bold tracking-widest text-gradient mt-3">
          XENONYMOUS
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Choose your AI plan</p>
      </div>

      {/* Plans */}
      <div className="flex flex-col gap-3 w-full">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selected === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
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
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                    isSelected ? "bg-brand glow" : "bg-muted/40"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}
                  />
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
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected ? "border-primary bg-primary" : "border-muted-foreground/40"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
              </div>

              {/* Features */}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {plan.features.map((f) => (
                  <span key={f} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Check className="h-3 w-3 text-primary flex-shrink-0" />
                    {f}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Payment methods */}
      <div className="mt-5 w-full">
        <p className="text-[10px] text-muted-foreground font-semibold tracking-wider mb-2 text-center">
          PAYMENT METHODS
        </p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {paymentMethods.map((m) => (
            <span
              key={m}
              className="rounded-full border border-border/40 bg-card/30 px-2.5 py-1 text-[10px] text-muted-foreground"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Subscribe button */}
      <button
        className="mt-5 w-full rounded-full bg-brand py-3 text-sm font-bold text-primary-foreground glow hover:opacity-90 transition-opacity"
        onClick={() => {
          const plan = plans.find((p) => p.id === selected);
          window.open(
            `https://wadiai.vercel.app/pricing?plan=${selected}`,
            "_blank"
          );
        }}
      >
        Subscribe — ₹{plans.find((p) => p.id === selected)?.price}
        {plans.find((p) => p.id === selected)?.period}
      </button>

      <p className="mt-3 text-center text-[10px] text-muted-foreground leading-relaxed">
        Cancel anytime · Secure checkout · Instant access
      </p>
    </div>
  );
}
