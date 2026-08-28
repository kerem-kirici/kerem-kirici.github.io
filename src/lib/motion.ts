/**
 * Motion tokens, in Apple's vocabulary.
 *
 * Apple describes a spring with two designer-facing numbers instead of the
 * physics triplet: `response` (how quickly the value reaches the target, in
 * seconds) and `damping ratio` (how much it overshoots — 1.0 settles without
 * bounce, below 1.0 oscillates). Motion's `visualDuration` / `bounce` pair maps
 * onto those directly, so every spring here is expressed that way.
 *
 * Rule of thumb: critically damped (`bounce: 0`) by default. Bounce is reserved
 * for motion the user physically threw — a flick, a drag release — where the
 * overshoot reads as momentum rather than decoration.
 */
import type { SpringOptions, Transition } from 'motion/react';

/** Reposition — Apple ships damping 1.0 / response 0.4 for moves like PiP. */
export const springMove: SpringOptions = { visualDuration: 0.4, bounce: 0 };

/** Rotation — damping 0.8 / response 0.4. The slight overshoot sells the spin. */
export const springRotate: SpringOptions = { visualDuration: 0.4, bounce: 0.2 };

/** Drawers and sheets — damping 0.8 / response 0.3. */
export const springSheet: SpringOptions = { visualDuration: 0.3, bounce: 0.2 };

/** Micro-feedback (press, knob travel): fast and dead flat. */
export const springSnap: SpringOptions = { visualDuration: 0.22, bounce: 0 };

/** Pointer-driven tilt: critically damped so the surface tracks without wobble. */
export const springTilt: SpringOptions = { visualDuration: 0.5, bounce: 0 };

export const transitionMove: Transition = { type: 'spring', ...springMove };
export const transitionSheet: Transition = { type: 'spring', ...springSheet };
export const transitionSnap: Transition = { type: 'spring', ...springSnap };

/** Reduced-motion substitute: a short cross-fade with no travel and no spring. */
export const transitionCrossFade: Transition = { duration: 0.18, ease: 'easeOut' };

/**
 * Where a flick would come to rest, using the exponential scroll-deceleration
 * model from Apple's "Designing Fluid Interfaces" sample code. Snap targets
 * should be chosen from this projected point, not from the release point —
 * that is what makes a flick feel thrown instead of dragged.
 */
export function projectMomentum(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressive resistance past a boundary. A hard stop reads as frozen; damping
 * that grows with the overshoot reads as "responsive, but there's nothing more
 * here". `dimension` is the size of the axis being dragged.
 */
export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}
