'use client';

import { springSnap } from '@/lib/motion';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

type SwitchSize = 'sm' | 'md' | 'lg';

export type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  ariaLabel?: string;
  className?: string;
};

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const trackSize: Record<SwitchSize, string> = {
  sm: 'w-10 h-6',
  md: 'w-12 h-7',
  lg: 'w-14 h-8',
};

const knobSize: Record<SwitchSize, string> = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7',
};

/** Knob travel in px, so the position can be driven by a spring rather than a
 *  fixed-duration CSS transition. */
const knobTravel: Record<SwitchSize, { off: number; on: number }> = {
  sm: { off: 2, on: 18 },
  md: { off: 2, on: 22 },
  lg: { off: 2, on: 26 },
};

export function Switch({
  checked,
  onChange,
  disabled,
  size = 'md',
  ariaLabel,
  className,
}: SwitchProps) {
  const reduceMotion = useReducedMotion();

  const [pressed, setPressed] = useState(false);

  const travel = knobTravel[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onPointerDown={() => !disabled && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={() => !disabled && onChange(!checked)}
      className={classNames(
        'relative inline-flex items-center rounded-full touch-manipulation transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        trackSize[size],
        checked ? 'bg-black/90 dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-700',
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <motion.span
        className={classNames(
          'pointer-events-none inline-block rounded-full bg-white shadow dark:bg-black',
          knobSize[size],
        )}
        // The knob stretches toward the side it is about to travel to, so the
        // press already hints at the outcome before the state flips.
        style={{ originX: checked ? 1 : 0 }}
        animate={{
          x: checked ? travel.on : travel.off,
          scaleX: pressed && !reduceMotion ? 1.14 : 1,
        }}
        transition={reduceMotion ? { duration: 0 } : { type: 'spring', ...springSnap }}
      />
    </button>
  );
}

export default Switch;
