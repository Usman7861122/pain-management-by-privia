import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface Link { kind: string; doctor: string; href: string; note: string }
interface Props { links: Link[]; phone: { display: string; tel: string } }

export const OPEN_EVENT = 'pms:open-returning';

export default function ReturningModal({ links, phone }: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const last = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const show = () => { last.current = document.activeElement as HTMLElement; setOpen(true); };
    window.addEventListener(OPEN_EVENT, show);
    // Any link marked data-returning-modal also opens it (works before this island hydrates on slow pages).
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('a[href],button');
        if (!f.length) return;
        const first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; last.current?.focus?.(); };
  }, [open]);

  const groups = ['Office visit', 'Telemedicine'];
  const icon = (k: string) => k === 'Office visit'
    ? <path d="M4 20V8l8-5 8 5v12M9 20v-6h6v6" />
    : <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></>;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.25 }}>
          <div className="absolute inset-0 bg-charcoal-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <motion.div ref={panel} role="dialog" aria-modal="true" aria-labelledby="ret-title" tabIndex={-1}
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-xl bg-cream-50 text-charcoal-900 shadow-[0_40px_90px_-24px_rgba(0,0,0,.6)] outline-none ring-1 ring-black/5 sm:max-w-2xl sm:rounded-xl">
            <div className="h-1 w-full bg-gold-400" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close"
              className="absolute right-3 top-4 inline-flex h-11 w-11 items-center justify-center rounded-md text-charcoal-600 transition hover:bg-cream-100 hover:text-charcoal-950">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 4l10 10M14 4L4 14" /></svg>
            </button>
            <div className="p-6 pb-8 sm:p-10">
              <p className="eyebrow">Returning patients</p>
              <h2 id="ret-title" className="mt-3 pr-10 font-heading text-[1.65rem] font-semibold leading-tight sm:text-3xl">Book your next visit.</h2>
              <p className="mt-3 max-w-lg text-charcoal-600">Choose your doctor and the kind of visit you would like to request.</p>

              <div className="mt-7 space-y-6">
                {groups.map((g) => (
                  <div key={g}>
                    <p className="mb-3 flex items-center gap-2.5 font-display text-[0.75rem] font-bold uppercase tracking-[0.16em] text-gold-700">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon(g)}</svg>{g}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {links.filter((l) => l.kind === g).map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener"
                          className="group flex min-h-[4.5rem] flex-col justify-center rounded-md border border-charcoal-900/10 bg-white px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-[0_16px_30px_-20px_rgba(95,76,0,.5)] focus-visible:border-gold-400">
                          <span className="flex items-center justify-between gap-3 font-display text-lg font-semibold">{l.doctor}
                            <svg className="shrink-0 text-gold-600 transition-transform duration-300 group-hover:translate-x-1" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 9h12M10 4l5 5-5 5" /></svg>
                          </span>
                          <span className="mt-0.5 text-sm text-charcoal-600">{l.note}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-2 border-t border-charcoal-900/10 pt-5 text-sm text-charcoal-600">
                <p>Use office visits for new problems or after a telemedicine visit. Please do not use these links to schedule procedures.</p>
                <p>Not seen in our office before? Please request a <a href="https://z1-rpw.phreesia.net/ApptRequestForm.App/#/form/4c6a43ee-8e60-4386-b8d9-a2f2b0efb443" target="_blank" rel="noopener" className="font-semibold text-charcoal-950 underline decoration-gold-400 underline-offset-4">new patient appointment</a> instead. Need help? Call <a href={`tel:${phone.tel}`} className="font-semibold text-charcoal-950 underline decoration-gold-400 underline-offset-4">{phone.display}</a>.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
