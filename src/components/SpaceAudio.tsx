import { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const NARRATION_TEXT = `Welcome to the new world. A realm where synthetic minds orbit digital planets, where autonomous agents chart courses through infinite data streams. This is not science fiction. This is the architecture of tomorrow — built today by Xenonymous. The future of intelligence is here, and it is alive.`;

export default function SpaceAudio() {
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [narrationPlayed, setNarrationPlayed] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const narrationRef = useRef<HTMLAudioElement | null>(null);
  const narrationGainRef = useRef<GainNode | null>(null);

  // Generate ambient space drone using Web Audio API
  const startAmbient = useCallback(() => {
    if (audioCtxRef.current) return;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    // Deep drone
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 55;
    const g1 = ctx.createGain();
    g1.gain.value = 0.12;
    osc1.connect(g1).connect(gain);
    osc1.start();

    // Ethereal pad
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 110;
    const g2 = ctx.createGain();
    g2.gain.value = 0.06;
    osc2.connect(g2).connect(gain);
    osc2.start();

    // Slow LFO on pad
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 15;
    lfo.connect(lfoGain).connect(osc2.frequency);
    lfo.start();

    // High shimmer
    const osc3 = ctx.createOscillator();
    osc3.type = "sine";
    osc3.frequency.value = 880;
    const g3 = ctx.createGain();
    g3.gain.value = 0.015;
    osc3.connect(g3).connect(gain);
    osc3.start();

    // Shimmer LFO
    const lfo2 = ctx.createOscillator();
    lfo2.type = "sine";
    lfo2.frequency.value = 0.15;
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.value = 0.008;
    lfo2.connect(lfo2Gain).connect(g3.gain);
    lfo2.start();

    // Noise layer
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 200;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.04;
    noise.connect(noiseFilter).connect(noiseGain).connect(gain);
    noise.start();

    setLoaded(true);
  }, []);

  // Fade in/out ambient
  useEffect(() => {
    if (!gainRef.current) return;
    const g = gainRef.current;
    const now = audioCtxRef.current!.currentTime;
    g.gain.cancelScheduledValues(now);
    g.gain.setValueAtTime(g.gain.value, now);
    g.gain.linearRampToValueAtTime(muted ? 0 : 0.7, now + 1.5);

    // Handle narration volume
    if (narrationRef.current) {
      narrationRef.current.muted = muted;
    }
  }, [muted]);

  // Start ambient on first unmute
  useEffect(() => {
    if (!muted && !audioCtxRef.current) {
      startAmbient();
    }
    if (!muted && audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, [muted, startAmbient]);

  // Fetch and play Roger narration on first unmute
  useEffect(() => {
    if (muted || narrationPlayed || !loaded) return;
    setNarrationPlayed(true);

    const playNarration = async () => {
      try {
        const { data } = await supabase.functions.invoke("tts-narration", {
          body: { text: NARRATION_TEXT },
        });

        if (data instanceof Blob || data instanceof ArrayBuffer) {
          const blob = data instanceof Blob ? data : new Blob([data], { type: "audio/mpeg" });
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.volume = 0.85;
          narrationRef.current = audio;

          // Small delay to let ambient establish
          setTimeout(() => {
            if (!muted) {
              audio.play().catch(() => {});
            }
          }, 2000);
        }
      } catch (err) {
        console.error("Narration error:", err);
      }
    };

    playNarration();
  }, [muted, narrationPlayed, loaded]);

  // Cleanup
  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
      if (narrationRef.current) {
        narrationRef.current.pause();
        narrationRef.current = null;
      }
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      onClick={() => setMuted((m) => !m)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full glass glass-hover px-4 py-3 text-xs font-semibold text-foreground backdrop-blur-xl"
      aria-label={muted ? "Unmute audio" : "Mute audio"}
    >
      <AnimatePresence mode="wait">
        {muted ? (
          <motion.span
            key="off"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <VolumeX className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="on"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Volume2 className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
      <span>{muted ? "Sound off" : "Playing"}</span>

      {/* Animated sound wave when playing */}
      {!muted && (
        <div className="flex items-center gap-[2px] ml-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-[2px] rounded-full bg-primary"
              animate={{ height: [4, 12, 6, 14, 4] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}
