import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

interface Slide { image: string; eyebrow: string; title: string; text: string }
interface Loc { name: string; street: string; city: string; state: string; zip: string; phone: { display: string; tel: string }; mapsHref: string }
interface Props {
  slides: Slide[];
  primary: { label: string; href: string };
  phone: { display: string; tel: string };
  locations: Loc[];
  interval?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSlider({ slides, primary, phone, locations, interval = 7000 }: Props) {
  const reduce = !!useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const stopped = paused || reduce;

  const go = useCallback((n: number) => setIndex((n + slides.length) % slides.length), [slides.length]);

  // autoplay
  useEffect(() => {
    if (stopped) return;
    const t = setTimeout(() => go(index + 1), interval);
    return () => clearTimeout(t);
  }, [index, stopped, interval, go]);

  // pointer parallax (subtle, desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const imgX = useTransform(sx, (v) => v * -28);
  const imgY = useTransform(sy, (v) => v * -18);
  const txtX = useTransform(sx, (v) => v * 10);
  const txtY = useTransform(sy, (v) => v * 6);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const slide = slides[index];
  const words = slide.title.split(' ');

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Welcome"
      onPointerMove={onMove}
      className="on-dark relative -mt-[var(--header-h)] min-h-[100svh] overflow-hidden bg-charcoal-950 text-white"
    >
      {/* Image layer */}
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <motion.div key={s.image} className="absolute inset-[-3%]" style={{ x: imgX, y: imgY }}
              animate={{ opacity: active ? 1 : 0 }} transition={{ duration: reduce ? 0 : 1.4, ease: 'easeInOut' }}>
              <motion.img
                src={s.image} alt="" width={1920} height={1080}
                loading={i === 0 ? 'eager' : 'lazy'} {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                className="h-full w-full object-cover"
                initial={false}
                animate={{ scale: active && !reduce ? 1 : 1.08 }}
                transition={{ duration: active ? interval / 1000 + 1.5 : 0, ease: 'linear', delay: active ? 0 : 1.5 }}
              />
            </motion.div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/55 to-charcoal-950/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal-950/90 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        {/* Text layer */}
        <div className="container-x flex flex-1 items-center pb-10 pt-[calc(var(--header-h)+3rem)]">
          <motion.div style={{ x: txtX, y: txtY }} className="max-w-xl" aria-live={stopped ? 'polite' : 'off'}>
            <AnimatePresence mode="wait">
              <motion.div key={index} exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}>
                <motion.p initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
                  className="eyebrow mb-5 flex items-center gap-3">
                  <span className="h-px w-10 bg-gold-300" />{slide.eyebrow}
                </motion.p>

                <h1 className="font-display text-[clamp(1.9rem,1.3rem+2vw,3rem)] font-semibold leading-[1.12] tracking-tight !text-white">
                  {words.map((w, i) => (
                    <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                      <motion.span className="inline-block"
                        initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.12 + i * 0.06 }}>{w}</motion.span>
                    </span>
                  ))}
                </h1>

                <motion.p initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.45 }}
                  className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-cream-100">{slide.text}</motion.p>

                <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.6 }} className="mt-8 flex flex-wrap gap-3">
                  <a href={primary.href} className="btn btn-gold">{primary.label}</a>
                  <a href={`tel:${phone.tel}`} className="btn btn-ghost">Call {phone.display}</a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Controls + contact (Privia: phone + location shown prominently) */}
        <div className="container-x pb-6">
          <div className="mb-5 flex items-center justify-between gap-6">
            <div className="flex flex-1 items-center gap-2 sm:max-w-sm" role="group" aria-label="Choose slide">
              {slides.map((_, i) => (
                <button key={i} type="button" onClick={() => go(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === index}
                  className="group flex h-11 flex-1 items-center">
                  <span className="relative block h-[2px] w-full overflow-hidden bg-white/30">
                    {i < index && <span className="absolute inset-0 bg-gold-300" />}
                    {i === index && (
                      <motion.span key={`${index}-${stopped}`} className="absolute inset-0 origin-left bg-gold-300"
                        initial={{ scaleX: stopped ? 1 : 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: stopped ? 0 : interval / 1000, ease: 'linear' }} />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center">
              <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-white/10">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M11 3L5 9l6 6" /></svg>
              </button>
              <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused || reduce ? 'Play slideshow' : 'Pause slideshow'} className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-white/10">
                {paused || reduce ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2h3v12H4zM9 2h3v12H9z" /></svg>
                )}
              </button>
              <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-white/10">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 3l6 6-6 6" /></svg>
              </button>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-md bg-white/15 backdrop-blur-md sm:grid-cols-3 [&>*]:bg-charcoal-950/60">
            <a href={`tel:${phone.tel}`} className="flex min-h-11 flex-col justify-center px-5 py-4 transition hover:bg-charcoal-950/80">
              <span className="eyebrow !text-[0.65rem]">Call us</span>
              <span className="mt-1 font-display text-lg font-semibold">{phone.display}</span>
            </a>
            {locations.map((l) => (
              <a key={l.name} href={l.mapsHref} className="flex min-h-11 flex-col justify-center px-5 py-4 transition hover:bg-charcoal-950/80">
                <span className="eyebrow !text-[0.65rem]">{l.name}</span>
                <span className="mt-1 text-sm text-cream-100">{l.street}, {l.city}, {l.state} {l.zip}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
