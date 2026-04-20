import logo from "@/assets/xenonymous-logo.png";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
  /** Show orbiting colored orbs around the logo */
  orbs?: boolean;
}

/**
 * Xenonymous logo with multi-color pulsing orbs orbiting the X.
 * Pure CSS animations — works everywhere, no JS frame loop.
 */
export function AnimatedLogo({ size = 144, className = "", orbs = true }: AnimatedLogoProps) {
  const orbConfig = [
    { color: "#22d3ee", delay: "0s",   duration: "8s",  size: 14 }, // cyan
    { color: "#a855f7", delay: "-2s",  duration: "8s",  size: 12 }, // purple
    { color: "#ec4899", delay: "-4s",  duration: "8s",  size: 13 }, // pink
    { color: "#f59e0b", delay: "-6s",  duration: "8s",  size: 11 }, // amber
    { color: "#10b981", delay: "-1s",  duration: "10s", size: 10 }, // emerald
    { color: "#3b82f6", delay: "-5s",  duration: "10s", size: 12 }, // blue
  ];

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {orbs && (
        <>
          {/* Outer rotating ring of orbs */}
          <div
            className="absolute inset-0 animate-[orbit-spin_18s_linear_infinite]"
            aria-hidden
          >
            {orbConfig.map((orb, i) => {
              const angle = (i / orbConfig.length) * 360;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{
                    width: orb.size,
                    height: orb.size,
                    background: orb.color,
                    boxShadow: `0 0 18px 4px ${orb.color}, 0 0 40px 8px ${orb.color}88`,
                    transform: `rotate(${angle}deg) translateX(${size / 2}px) translate(-50%, -50%)`,
                    transformOrigin: "0 0",
                    animation: `orb-pulse 2.4s ease-in-out infinite`,
                    animationDelay: orb.delay,
                  }}
                />
              );
            })}
          </div>

          {/* Inner counter-rotating soft glow */}
          <div
            className="absolute rounded-full opacity-70 blur-2xl animate-[hue-shift_6s_linear_infinite]"
            aria-hidden
            style={{
              inset: size * 0.15,
              background:
                "conic-gradient(from 0deg, #22d3ee, #a855f7, #ec4899, #f59e0b, #10b981, #22d3ee)",
            }}
          />
        </>
      )}

      <img
        src={logo}
        alt="Xenonymous"
        className="relative z-10 h-[70%] w-[70%] object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.6)] animate-float"
      />

      <style>{`
        @keyframes orbit-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes orb-pulse {
          0%, 100% { opacity: 0.7; transform: rotate(var(--a, 0deg)) translateX(${size / 2}px) translate(-50%, -50%) scale(0.85); }
          50%      { opacity: 1;   transform: rotate(var(--a, 0deg)) translateX(${size / 2}px) translate(-50%, -50%) scale(1.15); }
        }
        @keyframes hue-shift {
          to { filter: hue-rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
