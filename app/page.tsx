"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const PHOTO_SRC = "/photos/shaima.jpg";

const NAME = "Mungwariho Shaima Heniriete";

const INTRO_LINE_1 = "hhhhhh";
const INTRO_LINE_2 =
  "you are mad now thinking that i forget that to day what it is in your life ";

const TRIBUTE_LINES: readonly string[] = [
  "You carry your quiet like a kind of strength I have come to recognize as home.",
  "Not loud, not performative — just steady, the kind of presence that makes a room softer simply by being in it.",
  "Today is not about a number; it is about the years you have folded into your own hands, and the ones you have kept open for others.",
  "I remember how you listen — as if what someone says actually matters, because to you, it does.",
  "Your journey has never been about arriving anywhere impressive. It is about staying tender in a world that rewards hardness.",
  "Thank you for the conversations that went nowhere and everywhere at once.",
  "You are allowed to take up space, Shaima. Loudly, messily, beautifully.",
  "This year, I hope you are met with the same gentleness you so easily give away.",
  "Happy birthday to a woman whose kindness does not need an announcement — it simply arrives, and stays.",
  "Here is to your journey, your character, and a friendship that keeps choosing you.",
];

const PETAL_FILLS: readonly string[] = ["#D97757", "#4A6B5D", "#18181B"];

const PETAL_SHAPES: readonly { readonly d: string }[] = [
  { d: "M 2 14 Q 8 -4 14 14 Q 8 22 2 14" },
  { d: "M 1 8 Q 9 -6 17 8 Q 9 18 1 8" },
  { d: "M 4 2 Q 8 8 4 14 Q 0 8 4 2" },
];

const PETAL_COUNT = 30;
const FLOWER_COUNT = 4;

type PetalSpec = {
  id: number;
  left: number;
  top: number;
  size: number;
  fill: string;
  opacity: number;
  shapeIndex: number;
  drift: number;
  sway: number;
  rot: number;
  bloomDelay: number;
  r1: number;
  r2: number;
  sx1: number;
  sx2: number;
};

type FlowerSpec = {
  id: number;
  left: number;
  top: number;
  size: number;
  fill: string;
  opacity: number;
  drift: number;
  rot: number;
  bloomDelay: number;
  r1: number;
  r2: number;
};

function makePetals(): PetalSpec[] {
  return Array.from({ length: PETAL_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 96 + 2,
    top: Math.random() * 96 + 2,
    size: 14 + Math.random() * 26,
    fill: PETAL_FILLS[Math.floor(Math.random() * PETAL_FILLS.length)],
    opacity: 0.5 + Math.random() * 0.4,
    shapeIndex: Math.floor(Math.random() * PETAL_SHAPES.length),
    drift: 10 + Math.random() * 13,
    sway: 3.5 + Math.random() * 4,
    rot: 4 + Math.random() * 6,
    bloomDelay: Math.random() * 1.6,
    r1: -20 + Math.random() * 40,
    r2: -20 + Math.random() * 40,
    sx1: -12 + Math.random() * 24,
    sx2: -12 + Math.random() * 24,
  }));
}

function makeFlowers(): FlowerSpec[] {
  return Array.from({ length: FLOWER_COUNT }, (_, i) => ({
    id: i,
    left: 10 + i * 20 + Math.random() * 12,
    top: 18 + i * 16 + Math.random() * 14,
    size: 30 + Math.random() * 16,
    fill: PETAL_FILLS[i % PETAL_FILLS.length],
    opacity: 0.9,
    drift: 12 + Math.random() * 10,
    rot: 9 + Math.random() * 9,
    bloomDelay: 0.5 + i * 0.5 + Math.random(),
    r1: -10 + Math.random() * 20,
    r2: -10 + Math.random() * 20,
  }));
}

const PETALS = makePetals();
const FLOWERS = makeFlowers();

function useViewportHeight() {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const onResize = () => setHeight(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return height;
}

function Petals({
  viewHeight,
  reduced,
}: {
  viewHeight: number;
  reduced: boolean;
}) {
  const driftY = -(viewHeight || 800) - 140;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {PETALS.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            y: reduced ? 0 : [0, driftY],
            x: reduced ? 0 : [0, p.sx1, p.sx2, 0],
            rotate: reduced ? 0 : [0, p.r1, p.r2, 0],
            opacity: 1,
          }}
          transition={{
            scale: { duration: 0.8, delay: p.bloomDelay, ease: "backOut" },
            opacity: { duration: 0.4, delay: p.bloomDelay },
            ...(reduced
              ? {}
              : {
                  y: {
                    duration: p.drift,
                    repeat: Infinity,
                    ease: "linear",
                    delay: p.bloomDelay,
                  },
                  x: {
                    duration: p.sway,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                    delay: p.bloomDelay,
                  },
                  rotate: {
                    duration: p.rot,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                    delay: p.bloomDelay,
                  },
                }),
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              d={PETAL_SHAPES[p.shapeIndex].d}
              fill={p.fill}
              style={{ opacity: p.opacity }}
            />
          </svg>
        </motion.div>
      ))}
      {FLOWERS.map((f) => (
        <motion.div
          key={`flower-${f.id}`}
          className="absolute"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            y: reduced ? 0 : [0, driftY],
            rotate: reduced ? 0 : [0, f.r1, f.r2, 0],
            opacity: 1,
          }}
          transition={{
            scale: { duration: 0.9, delay: f.bloomDelay, ease: "backOut" },
            opacity: { duration: 0.5, delay: f.bloomDelay },
            ...(reduced
              ? {}
              : {
                  y: {
                    duration: f.drift,
                    repeat: Infinity,
                    ease: "linear",
                    delay: f.bloomDelay,
                  },
                  rotate: {
                    duration: f.rot,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                    delay: f.bloomDelay,
                  },
                }),
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 18 18"
            aria-hidden="true"
          >
            <circle cx="9" cy="9" r="1.3" fill={f.fill} />
            {[0, 1, 2, 3, 4].map((k) => (
              <path
                key={k}
                d="M 9 2 Q 11.5 1 10 5 Q 8 5 9 2"
                transform={`rotate(${k * 72} 9 9)`}
                fill={f.fill}
                style={{ opacity: f.opacity }}
              />
            ))}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function TomJerryBadge() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="19.5" />
      <circle cx="24" cy="24" r="10" opacity="0.25" />
      <path d="M 24 5 Q 24 24 24 43" opacity="0.15" />
      {/* Tom — cat, facing right */}
      <circle cx="14" cy="15.5" r="6.5" />
      <path d="M 10 10.5 L 12 3.5 L 14.5 10.5" />
      <path d="M 14.5 10.5 L 16.5 3.5 L 18.5 10.5" />
      <path d="M 11.5 14 Q 12 13.4 12.5 14" />
      <path d="M 14.5 14 Q 15 13.4 15.5 14" />
      <circle cx="18.5" cy="15.5" r="0.7" fill="currentColor" stroke="none" />
      <path d="M 18.5 14.5 L 22 13.8" />
      <path d="M 18.5 15.5 L 22.5 15.5" />
      <path d="M 18.5 16.5 L 22 17.2" />
      {/* Jerry — mouse, facing left */}
      <circle cx="34" cy="16.5" r="5" />
      <circle cx="31" cy="11.5" r="2.6" />
      <circle cx="37" cy="11.5" r="2.6" />
      <circle cx="29.2" cy="16.5" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="32.8" cy="15.8" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="34" cy="24" r="4" />
      <path d="M 37 25 Q 41.5 25 42.5 20 Q 40 16 37.5 19" />
      {/* Botanical accents */}
      <path
        d="M 10.5 40 Q 7.5 35 9 31 Q 10.5 35 10.5 40"
        opacity="0.4"
        fill="none"
      />
      <path
        d="M 37.5 40 Q 40.5 35 39 31 Q 37.5 35 37.5 40"
        opacity="0.4"
        fill="none"
      />
    </svg>
  );
}

function TactileButton({ onStart }: { onStart: () => void }) {
  return (
    <button
      type="button"
      onClick={onStart}
      aria-label="Click me to begin"
      className="mt-16 inline-flex items-center gap-2 rounded-none border border-solid border-ink bg-transparent px-6 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-ink transition duration-150 ease-out hover:-translate-y-1 hover:scale-[1.02] active:scale-95 active:translate-y-0 active:bg-ink/[0.05] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink sm:mt-24 sm:text-sm"
    >
      <TomJerryBadge />
      <span>Click me</span>
    </button>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative z-10 flex min-h-screen flex-col items-start justify-start px-6 pb-32 pt-48 text-ink sm:px-10 sm:pt-64"
    >
      <div className="max-w-[48ch]">
        <p className="mb-6 font-[var(--font-space-mono)] text-6xl leading-none tracking-tighter sm:mb-10 sm:text-8xl">
          {INTRO_LINE_1}
        </p>
        <p className="font-[var(--font-space-mono)] text-lg leading-8 text-ink/[0.8] sm:text-xl">
          {INTRO_LINE_2}
        </p>
      </div>
      <TactileButton onStart={onStart} />
    </motion.div>
  );
}

function PortraitPlaceholder() {
  return (
    <div className="flex aspect-[9/16] w-full flex-col items-center justify-center bg-ink/[0.02] p-8 text-center">
      <span className="font-[var(--font-playfair)] text-3xl leading-none tracking-tighter sm:text-5xl">
        MSH
      </span>
      <span className="mt-6 font-[var(--font-space-mono)] text-[0.65rem] uppercase leading-6 tracking-widest text-ink/[0.45] sm:text-sm">
        Drop her portrait at
        <br />
        public/photos/shaima.jpg
      </span>
    </div>
  );
}

function Portrait() {
  const [error, setError] = useState(false);
  return (
    <div className="relative aspect-[9/16] w-full min-w-[200px] max-w-[360px] overflow-hidden border border-solid border-ink">
      {error ? (
        <PortraitPlaceholder />
      ) : (
        <Image
          src={PHOTO_SRC}
          alt="Portrait of Shaima"
          fill
          sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 360px"
          priority
          onError={() => setError(true)}
          className="object-cover object-position-center"
        />
      )}
    </div>
  );
}

function Tribute({ reduced }: { reduced: boolean }) {
  return (
    <section className="relative z-10 w-full min-h-screen px-6 py-12 sm:px-10 sm:py-32">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="font-[var(--font-playfair)] text-4xl leading-[1.02] tracking-tighter text-ink sm:text-5xl md:text-7xl lg:text-8xl"
      >
        {NAME}
      </motion.h1>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "120px" }}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        className="mb-16 mt-6 h-[1px] bg-ink sm:mb-26 sm:mt-10"
      />

      <div className="grid grid-cols-1 gap-y-16 sm:gap-y-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="lg:col-span-7 lg:col-start-1 lg:col-end-8"
        >
          {TRIBUTE_LINES.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.55 + i * 0.15,
                ease: "easeOut",
              }}
              className={`font-[var(--font-playfair)] text-lg leading-8 text-ink/[0.9] sm:text-xl md:text-2xl ${
                i === 0 ? "mt-0" : "mt-8 sm:mt-10"
              }`}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: reduced ? 0 : [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.45, ease: "easeOut" },
            scale: { duration: 0.8, delay: 0.45, ease: "easeOut" },
            y: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror",
              delay: 1.2,
            },
          }}
          className="w-full max-w-[260px] justify-self-end lg:col-span-5 lg:col-start-8 lg:col-end-13 lg:-mt-4 lg:max-w-none lg:self-end"
        >
          <Portrait />
        </motion.div>
      </div>
    </section>
  );
}

export default function BirthdayPage() {
  const [stage, setStage] = useState<"intro" | "flowers" | "revealed">("intro");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = !!useReducedMotion();
  const viewHeight = useViewportHeight();

  useEffect(() => {
    if (stage === "flowers") {
      timer.current = setTimeout(() => setStage("revealed"), 3000);
    } else if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [stage]);

  return (
    <div className="min-h-screen bg-alabaster text-ink selection:bg-terracotta selection:text-white">
      <AnimatePresence>
        {stage === "intro" && (
          <IntroScreen key="intro" onStart={() => setStage("flowers")} />
        )}
      </AnimatePresence>
      {stage !== "intro" && (
        <Petals viewHeight={viewHeight} reduced={reduced} />
      )}
      {stage === "revealed" && <Tribute reduced={reduced} />}
    </div>
  );
}