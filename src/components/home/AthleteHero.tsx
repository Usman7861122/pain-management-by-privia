import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface Slide { image: string; sport: string; eyebrow: string; title: string; text: string; pos?: string }
interface Loc { name: string; street: string; city: string; state: string; zip: string; mapsHref: string }
interface Props {
  slides: Slide[];
  primary: { label: string; href: string };
  phone: { display: string; tel: string };
  locations: Loc[];
  interval?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function AthleteHero({ slides, primary, phone, locations, interval = 7500 }: Props) {
  const reduce = !!useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const stopped = paused || reduce;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const go = useCallback((n: number) => setIndex((n + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (stopped) return;
    const t = setTimeout(() => go(index + 1), interval);
    return () => clearTimeout(t);
  }, [index, stopped, interval, go]);

  // Interactive text: letters near the pointer lift up, grow and turn yellow.
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !titleRef.current) return;
    const letters = titleRef.current.querySelectorAll<HTMLElement>('[data-l]');
    letters.forEach((el) => {
      const r = el.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      const k = Math.max(0, 1 - d / 150);
      el.style.transform = `translateY(${-k * 14}px) scale(${1 + k * 0.28})`;
      el.style.color = k > 0.25 ? `color-mix(in srgb, #f0c808 ${Math.round(k * 100)}%, #fff)` : '';
    });
  };
  const onLeave = () => {
    titleRef.current?.querySelectorAll<HTMLElement>('[data-l]').forEach((el) => { el.style.transform = ''; el.style.color = ''; });
  };

  const slide = slides[index];
  const words = slide.title.split(' ');
  const pad = (n: number) => String(n + 1).padStart(2, '0');

  return (
    <section aria-roledescription="carousel" aria-label="Welcome" onPointerMove={onMove} onPointerLeave={onLeave}
      className="on-dark relative -mt-[var(--header-h)] min-h-[100svh] overflow-hidden bg-charcoal-950 text-white">
      {/* Athlete images */}
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <motion.div key={s.image} className="absolute inset-0" initial={false}
              animate={{ opacity: active ? 1 : 0 }} transition={{ duration: reduce ? 0 : 1.2, ease: 'easeInOut' }}>
              <motion.img src={s.image} alt="" width={2200} height={1467}
                loading={i === 0 ? 'eager' : 'lazy'} {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
                className="absolute inset-y-0 right-0 h-full w-full object-cover lg:w-[68%]"
                style={{ objectPosition: s.pos ?? '50% 25%' }}
                initial={false} animate={{ scale: active && !reduce ? 1.06 : 1 }}
                transition={{ duration: active ? interval / 1000 + 1.2 : 0, ease: 'linear' }} />
            </motion.div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/80 to-charcoal-950/10 lg:via-charcoal-950/50 lg:from-[32%] lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal-950 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal-950/80 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="container-x flex flex-1 items-center pb-8 pt-[calc(var(--header-h)+2.5rem)]">
          <div className="max-w-2xl" aria-live={stopped ? 'polite' : 'off'}>
            <AnimatePresence mode="wait">
              <motion.div key={index} exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}>
                <motion.p initial={reduce ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease }}
                  className="eyebrow mb-5 flex items-center gap-3 !text-gold-300">
                  <span className="font-display text-sm tabular-nums text-white/60">{pad(index)} / {pad(slides.length - 1)}</span>
                  <span className="h-px w-10 bg-gold-300" />{slide.sport}
                </motion.p>

                <h1 ref={titleRef} className="text-[clamp(2.4rem,1.4rem+4.2vw,5rem)] font-medium leading-[1.04] tracking-tight !text-white">
                  {words.map((w, wi) => (
                    <span key={wi} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                      <motion.span className="inline-block" initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease, delay: 0.1 + wi * 0.07 }}>
                        {[...w].map((c, ci) => (
                          <span key={ci} data-l className="inline-block transition-[transform,color] duration-200 ease-out will-change-transform">{c}</span>
                        ))}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                <motion.p initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.5 }}
                  className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-cream-100">{slide.text}</motion.p>

                <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.65 }}
                  className="mt-8 flex flex-wrap gap-3">
                  <a href={primary.href} className="btn btn-gold">{primary.label}</a>
                  <a href={`tel:${phone.tel}`} className="btn btn-ghost">Call {phone.display}</a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="container-x pb-6">
          <div className="mb-5 flex items-center justify-between gap-6">
            <div className="flex flex-1 items-center gap-3 sm:max-w-md" role="group" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button key={s.sport} type="button" onClick={() => go(i)} aria-label={`Go to slide ${i + 1}: ${s.sport}`} aria-current={i === index}
                  className="group flex min-h-11 flex-1 flex-col justify-center gap-2 text-left">
                  <span className={`font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-colors ${i === index ? 'text-gold-300' : 'text-white/50 group-hover:text-white'}`}>{s.sport}</span>
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
              <button type="button" onClick={() => setPaused((p) => !p)} aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'} className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-white/10">
                {stopped ? (
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
