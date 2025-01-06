import { animation, style, animate, query, stagger } from '@angular/animations'

export const itemEnterAnimation = animation([
  style({
    height: 0,
    opacity: 0,
    transform: 'scale(0.85)',
  }),
  animate(
    '50ms',
    style({
      height: '*',
    }),
  ),
  animate(68),
])

export const itemLeaveAnimation = animation([
  animate(
    50,
    style({
      transform: 'scale(1.05)',
    }),
  ),
  animate(
    50,
    style({
      transform: 'scale(1)',
      opacity: 0.75,
    }),
  ),
  // scale down and fade out completely
  animate(
    '120ms ease-out',
    style({
      transform: 'scale(0.68)',
      opacity: 0,
    }),
  ),
  animate(
    '150ms ease-out',
    style({
      height: 0,
      width: 0,
    }),
  ),
])

export const listAnimation = animation([
  query(
    '.book-item',
    [
      style({ opacity: 0, transform: 'scale(0.8)' }),
      stagger(100, [animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
    ],
    { optional: true },
  ),
])
