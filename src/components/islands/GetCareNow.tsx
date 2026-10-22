import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface Option { label: string; href: string; note?: string }

/** Privia rule: "Get Care Now" button with two options (See My Provider, Immediate Care). */
export default function GetCareNow({ options }: { options: Option[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="btn btn-gold"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        Get Care Now
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s' }}>
          <path d="M2 4.5l4 4 4-4" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={id}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-72 overflow-hidden rounded-md bg-cream-50 p-2 text-charcoal-900 shadow-[0_24px_60px_-20px_rgba(0,0,0,.45)] ring-1 ring-black/5"
          >
            {options.map((o) => (
              <li key={o.href}>
                <a href={o.href} className="flex min-h-11 flex-col rounded-md px-4 py-3 transition hover:bg-cream-100">
                  <span className="font-display text-base font-semibold">{o.label}</span>
                  {o.note && <span className="text-sm text-charcoal-600">{o.note}</span>}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
