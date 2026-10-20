import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';

interface Img { src: string; title: string }
interface Loc { name: string; street: string; city: string; state: string; zip: string; phone: { display: string; tel: string }; mapsHref: string }
interface Props {
  images: Img[];
  primary: { label: string; href: string };
  phone: { display: string; tel: string };
  locations: Loc[];
}

interface Stage { width: number; height: number; isMobile: boolean }

// Cards sit on a golden-angle spiral so they never line up. Computed once.
const spiral = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = i * 137.5 * (Math.PI / 180);
    return { cos: Math.cos(a), sin: Math.sin(a), rx: 0.28 + (i % 3) * 0.08, ry: 0.26 + (i % 2) * 0.09, rot: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2) };
  });

function Card({ item, i, total, progress, pointer, stage, geo }: {
  item: Img; i: number; total: number; progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> }; stage: Stage; geo: ReturnType<typeof spiral>[number];
}) {
  const span = 0.55;
  const start = (i / total) * (1 - span);
  const local = useTransform(progress, [start, start + span], [0, 1]);
  const z = useTransform(local, [0, 1], [stage.isMobile ? -1200 : -1700, stage.isMobile ? 350 : 500]);
  const opacity = useTransform(local, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);
  const width = stage.isMobile ? Math.max(130, Math.min(180, stage.width * 0.38)) : Math.max(180, Math.min(260, stage.width * 0.17));
  const bx = geo.cos * stage.width * geo.rx;
  const by = geo.sin * stage.height * geo.ry;
  const pan = stage.isMobile ? 20 : 45;
  const transform = useTransform([z, pointer.x, pointer.y], ([cz, px, py]: number[]) =>
    `translate3d(calc(-50% + ${bx - px * pan}px), calc(-50% + ${by - py * pan}px), ${cz}px) rotateZ(${geo.rot}deg)`);

  return (
    <motion.div style={{ width, transform, opacity, zIndex: i + 1 }} className="pointer-events-none absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform">
      <div className="relative h-full w-full overflow-hidden rounded-md bg-charcoal-800 shadow-2xl shadow-black/60 ring-1 ring-white/15">
        <img src={item.src} alt="" draggable={false} loading="eager" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/5 to-transparent p-4">
          <span className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/95">{item.title}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TunnelHero({ images, primary, phone, locations }: Props) {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState<Stage>({ width: 1440, height: 900, isMobile: false });

  useEffect(() => {
    const update = () => setStage({ width: window.innerWidth, height: window.innerHeight, isMobile: window.innerWidth < 768 });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Progress follows the normal page scroll, so the page is never locked.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const still = useMotionValue(0.5);
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 });
  const progress = reduce ? still : smooth;

  // Mouse parallax (desktop only)
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useSpring(rx, { stiffness: 60, damping: 25, mass: 0.5 });
  const py = useSpring(ry, { stiffness: 60, damping: 25, mass: 0.5 });
  useEffect(() => {
    if (reduce) return;
    const on = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      rx.set((e.clientX / window.innerWidth - 0.5) * 2);
      ry.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', on, { passive: true });
    return () => window.removeEventListener('pointermove', on);
  }, [reduce, rx, ry]);

  const titleOpacity = useTransform(progress, [0, 0.12, 0.3], [1, 1, 0]);
  const titleScale = useTransform(progress, [0, 0.3], [1, 1.18]);
  const titleY = useTransform(progress, [0, 0.3], [0, -24]);
  const ctaOpacity = useTransform(progress, [0.6, 0.78], [0, 1]);
  const ctaY = useTransform(progress, [0.6, 0.78], [28, 0]);
  const promptOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  const geo = spiral(images.length);

  return (
    <section ref={ref} aria-label="Welcome" className="on-dark relative -mt-[var(--header-h)] bg-charcoal-950 text-white" style={{ height: reduce ? '100svh' : '340svh' }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ perspective: stage.isMobile ? 900 : 1200, transformStyle: 'preserve-3d' }}>
        {/* background: soft dots + glow */}
        <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_55%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_0%,transparent_65%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[48vmin] w-[48vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[76vmin] w-[76vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />

        {/* opening text */}
        <motion.div style={reduce ? undefined : { opacity: titleOpacity, scale: titleScale, y: titleY }} className="pointer-events-none absolute inset-x-0 top-[38%] z-[5] flex -translate-y-1/2 flex-col items-center px-6 text-center">
          <p className="eyebrow">Interventional pain management</p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,1.3rem+3.6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white">Relief that begins with being heard.</h1>
          <p className="mt-5 max-w-[44ch] text-base text-cream-100 sm:text-lg">Board certified physicians offering modern, non-opioid focused care in Rockville and Frederick.</p>
          {reduce && (
            <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3">
              <a href={primary.href} className="btn btn-gold">{primary.label}</a>
              <a href={`tel:${phone.tel}`} className="btn btn-ghost">Call {phone.display}</a>
            </div>
          )}
        </motion.div>

        {/* end text with our usual buttons */}
        {!reduce && (
          <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="absolute inset-x-0 top-[38%] z-20 flex -translate-y-1/2 flex-col items-center px-6 text-center">
            <p className="eyebrow">Ready when you are</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,1.2rem+3vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-white">Let&rsquo;s find the right provider for you.</h2>
            <p className="mt-5 max-w-[44ch] text-base text-cream-100 sm:text-lg">Schedule online, or call us. Our team is here to help.</p>
            <ProgressLink visible={ctaOpacity}>
              <a href={primary.href} className="btn btn-gold">{primary.label}</a>
              <a href={`tel:${phone.tel}`} className="btn btn-ghost">Call {phone.display}</a>
            </ProgressLink>
          </motion.div>
        )}

        {/* 3D cards (calm still image instead when the visitor prefers reduced motion) */}
        {reduce ? (
          <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
            <img src={images[0].src} alt="" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {images.map((item, i) => (
              <Card key={item.src} item={item} i={i} total={images.length} progress={progress} pointer={{ x: px, y: py }} stage={stage} geo={geo[i]} />
            ))}
          </div>
        )}

        {/* scroll hint */}
        {!reduce && (
          <motion.div style={{ opacity: promptOpacity }} className="pointer-events-none absolute bottom-40 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-display text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cream-200 sm:flex">
            <span>Scroll to explore</span>
            <span className="h-6 w-px bg-gradient-to-b from-white/70 to-transparent" />
          </motion.div>
        )}

        {/* contact strip: phone + both locations (Privia rule: always prominent) */}
        <div className="absolute inset-x-0 bottom-0 z-30">
          <div className="container-x pb-6">
            <div className="grid gap-px overflow-hidden rounded-md bg-white/15 backdrop-blur-md sm:grid-cols-3 [&>*]:bg-charcoal-950/70">
              <a href={`tel:${phone.tel}`} className="flex min-h-11 flex-col justify-center px-5 py-2.5 transition hover:bg-charcoal-950/90 sm:py-4">
                <span className="eyebrow !text-[0.65rem]">Call us</span>
                <span className="mt-1 font-display text-lg font-semibold">{phone.display}</span>
              </a>
              {locations.map((l) => (
                <a key={l.name} href={l.mapsHref} className="flex min-h-11 flex-col justify-center px-5 py-2.5 transition hover:bg-charcoal-950/90 sm:py-4">
                  <span className="eyebrow !text-[0.65rem]">{l.name}</span>
                  <span className="mt-1 text-sm text-cream-100">{l.street}, {l.city}, {l.state} {l.zip}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Buttons only receive clicks once the end text is visible.
function ProgressLink({ children, visible }: { children: React.ReactNode; visible: MotionValue<number> }) {
  const events = useTransform(visible, (v) => (v > 0.5 ? 'auto' : 'none'));
  return <motion.div style={{ pointerEvents: events as unknown as 'auto' }} className="mt-8 flex flex-wrap justify-center gap-3">{children}</motion.div>;
}
