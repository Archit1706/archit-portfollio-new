---
title: "The Hidden Cost of transition: all in Your CSS"
slug: the-hidden-cost-of-transition-all
date: 2026-05-10
tags: [CSS, Performance, Web Development, Lighthouse]
excerpt: "A single CSS rule was responsible for 228 non-composited animation warnings in Lighthouse. Here's exactly why it happens and how to fix it."
readingTime: 4
featured: false
---

While optimizing this portfolio's Lighthouse score, one finding stood out: **228 non-composited animations**. The culprit was a single CSS class used on nearly every interactive element.

```css
.smooth { transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
```

This is a completely normal thing to write. It's also a significant performance problem, and understanding why requires a quick detour into how browsers render.

## How the browser composites frames

Modern browsers have two rendering paths:

**The main thread path**: layout → paint → composite. Expensive. Blocks JavaScript. Causes jank.

**The compositor thread path**: skips layout and paint entirely. Runs on a separate thread. Smooth even when JavaScript is busy.

Only two CSS properties trigger the compositor-only path: `opacity` and `transform`. Everything else — `color`, `background-color`, `border-color`, `width`, `height`, `margin`, `box-shadow` — forces the browser back through the main thread.

When you write `transition: all`, you're telling the browser to watch *every* animatable CSS property. On hover, if `color` changes, the browser must repaint. If `background-color` changes, repaint. If `border-color` changes, repaint. None of these trigger the compositor path.

With 228 elements carrying this class, every mouse movement over the page becomes a repaint cascade.

## The fix

Replace the wildcard with explicit properties:

```css
.smooth {
  transition:
    color 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    background-color 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    border-color 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
```

This still transitions everything we actually animate. It just doesn't ask the browser to watch a hundred properties we never change. The browser knows upfront which properties to track, can skip checking the others, and where possible, promotes elements with `opacity` and `transform` transitions to the compositor layer.

## The visual result is identical

This is the part worth emphasizing. The user sees no difference. The animation is the same curve, the same duration, the same properties visually changing. What changes is where the computation happens — and keeping it off the main thread is what separates 60fps hover effects from the ones that stutter when the page is loading something else.

## A note on `will-change`

You'll sometimes see `will-change: transform` recommended as a fix. It works, but differently: it pre-promotes an element to its own compositor layer, which eliminates the repaint on transition but increases memory usage and can cause visual glitches if overused. It's useful for things like modals or navigation drawers that you know will animate — less useful as a blanket solution.

For general hover transitions, explicit `transition` properties are the right tool. Save `will-change` for elements with predictable, high-frequency animations (scroll-driven effects, the star field canvas, the custom cursor).

## The broader pattern

`transition: all` is one of those things that looks like a convenience shortcut but is actually a semantic mismatch. You don't want to animate *all* properties — you want to animate the *handful of properties that change*. Being explicit isn't just faster; it's more accurate about what you mean.

The same principle applies to `animation: all`, broad CSS selectors that match more than they need to, and `useEffect` dependency arrays with too many entries. The computer will do exactly what you ask. Being precise about what you're asking saves a lot of cleanup later.

---

*This was caught during a Lighthouse audit on this portfolio. The full performance improvements are tracked in the commit history.*
