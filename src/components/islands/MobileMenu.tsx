import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface Item { label: string; href: string; note?: string }
interface Child { label: string; href?: string; external?: boolean; children?: Child[] }
interface NavEntry { label: string; href?: string; children?: Child[] }
interface Props { nav: NavEntry[]; utility: Item[]; options: (Item & { modal?: string })[] }

export default function MobileMenu({ nav, utility, options }: Props) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 8h18M3 16h18" /></svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Menu"
            initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="on-dark fixed inset-0 z-[60] overflow-y-auto bg-charcoal-950 text-cream-50"
          >
            <div className="container-x flex h-[var(--header-h)] items-center justify-between">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">Menu</span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </div>

            <div className="container-x pb-12 pt-4">
              <nav aria-label="Main">
                <ul>
                  {nav.map((i, n) => (
                    <motion.li key={i.label}
                      initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + n * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-white/10">
                      {i.children ? (
                        <>
                          <div className="flex items-center">
                            <a href={i.href} onClick={() => setOpen(false)} className="flex min-h-14 flex-1 items-center font-display text-2xl font-medium">{i.label}</a>
                            <button type="button" aria-label={`Toggle ${i.label} menu`} aria-expanded={sub === i.label}
                              onClick={() => setSub(sub === i.label ? null : i.label)}
                              className="inline-flex h-12 w-12 items-center justify-center rounded-md text-gold-300">
                              <svg width="18" height="18" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className={`transition-transform duration-300 ${sub === i.label ? 'rotate-180' : ''}`}><path d="M2 3.5l3 3 3-3" /></svg>
                            </button>
                          </div>
                          <AnimatePresence initial={false}>
                            {sub === i.label && (
                              <motion.ul initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden pb-3 pl-3">
                                {i.children.map((c) => (
                                  <li key={c.label}>
                                    {c.children ? (
                                      <>
                                        <p className="eyebrow !text-[0.65rem] pb-1 pt-3">{c.label}</p>
                                        <ul className="border-l border-gold-400/50 pl-3">
                                          {c.children.map((g) => <li key={g.label}><a href={g.href} onClick={() => setOpen(false)} className="flex min-h-11 items-center text-base text-cream-100">{g.label}</a></li>)}
                                        </ul>
                                      </>
                                    ) : (
                                      <a href={c.href} onClick={() => setOpen(false)} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener' : undefined} className="flex min-h-11 items-center text-base text-cream-100">{c.label}</a>
                                    )}
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a href={i.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center font-display text-2xl font-medium">{i.label}</a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 flex flex-wrap gap-x-8">
                {utility.map((i) => (
                  <a key={i.href} href={i.href} className="inline-flex min-h-11 items-center font-display text-xs font-semibold uppercase tracking-[0.14em] text-cream-200">{i.label}</a>
                ))}
              </div>

              <p className="eyebrow mb-3 mt-8">Book Online</p>
              <div className="grid gap-3">
                {options.map((o, n) => (
                  <a key={o.href} href={o.href} onClick={o.modal ? (e) => { e.preventDefault(); setOpen(false); setTimeout(() => window.dispatchEvent(new Event('pms:open-returning')), 50); } : undefined} className={`btn ${n === 0 ? 'btn-gold' : 'btn-ghost'} w-full`}>{o.label}</a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
