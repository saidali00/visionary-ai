import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Fingerprint } from "lucide-react";

/**
 * Animated fingerprint scanner. On press, runs a scanning animation,
 * then navigates to /experience.
 */
export function FingerprintScanner() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const handlePress = () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => {
      navigate({ to: "/experience" });
    }, 1800);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handlePress}
        aria-label="Press to enter the new world"
        className="group relative flex h-32 w-32 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-background"
      >
        {/* Pulsing rings */}
        <span className="absolute inset-0 rounded-full border border-primary/30 animate-[ring-pulse_2.4s_ease-out_infinite]" aria-hidden />
        <span className="absolute inset-0 rounded-full border border-primary/20 animate-[ring-pulse_2.4s_ease-out_infinite] [animation-delay:1.2s]" aria-hidden />

        {/* Main button */}
        <span
          className="relative flex h-24 w-24 items-center justify-center rounded-full glass overflow-hidden transition-transform group-hover:scale-105 group-active:scale-95"
          style={{
            boxShadow:
              "0 0 40px -8px rgba(56,189,248,0.6), inset 0 0 30px -8px rgba(168,85,247,0.4)",
          }}
        >
          <Fingerprint
            className={`h-12 w-12 text-primary transition-colors ${scanning ? "text-cyan-300" : ""}`}
            strokeWidth={1.5}
          />

          {/* Scanning line */}
          {scanning && (
            <span
              className="absolute left-0 right-0 h-[3px] animate-[scan-line_1.6s_ease-in-out_forwards]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #22d3ee 20%, #a855f7 50%, #ec4899 80%, transparent)",
                boxShadow: "0 0 20px #22d3ee, 0 0 40px #a855f7",
                top: 0,
              }}
              aria-hidden
            />
          )}

          {/* Success flash */}
          {scanning && (
            <span
              className="absolute inset-0 rounded-full opacity-0 animate-[success-flash_1.8s_ease-out_forwards]"
              style={{
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.5), transparent 70%)",
              }}
              aria-hidden
            />
          )}
        </span>
      </button>

      <div className="text-center">
        <p
          className={`font-display text-sm font-bold tracking-[0.4em] uppercase transition-colors ${
            scanning ? "text-gradient" : "text-foreground"
          }`}
        >
          {scanning ? "Authenticating…" : "PRESS"}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          {scanning ? "Initializing the gateway" : "Enter a new world"}
        </p>
      </div>

      <style>{`
        @keyframes ring-pulse {
          0%   { transform: scale(1);    opacity: 0.7; }
          100% { transform: scale(1.6);  opacity: 0; }
        }
        @keyframes scan-line {
          0%   { top: 0;    opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes success-flash {
          0%, 70% { opacity: 0; }
          80%     { opacity: 1; }
          100%    { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
