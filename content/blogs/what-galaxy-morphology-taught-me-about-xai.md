---
title: "What Galaxy Morphology Taught Me About the Limits of Explainability"
slug: what-galaxy-morphology-taught-me-about-xai
date: 2025-06-08
tags: [XAI, Deep Learning, Research, Computer Vision]
excerpt: "We had four explainability methods and four CNN architectures. None of them agreed with each other. That disagreement was the finding."
readingTime: 7
featured: false
---

When we started the galaxy morphology project, the plan was clean: train classifiers on galaxy images, apply four explainability methods, compare them, and recommend the best one for astronomical deep learning.

We did all of that. The recommendation we ended up with was "it depends" — which is a worse deliverable but a more honest one.

## The setup

The Galaxy10 DECaLS dataset contains galaxy images classified by volunteers on Galaxy Zoo. Ten morphological classes: spirals, ellipticals, edge-ons, mergers, and a handful of finer distinctions. We trained four CNN architectures — ResNet-18, VGG-16, EfficientNet-B0, and a lightweight custom network — and then applied Grad-CAM, LIME, Integrated Gradients, and GradientSHAP to each.

This gives you 4 × 4 = 16 explainer-architecture combinations. We evaluated them using two standard metrics: Deletion AUC (remove the most important features — does accuracy drop?) and Insertion AUC (start with nothing, add features back — does accuracy recover?).

## What we found

ResNet-18 had the best classification accuracy (96.1%). GradientSHAP produced the best Insertion AUC (0.89). Grad-CAM had the best Deletion AUC (0.32). These are not the same model.

There's no clean answer to "which explainer should an astronomer trust?" because the answer is architecture-dependent. LIME, which works by locally perturbing inputs, struggles with high-resolution galaxy images because the superpixel approximations introduce artifacts that don't correspond to any physical feature. Grad-CAM, which operates on convolutional activations, produces spatially coarse attributions that work well for identifying galactic cores but miss spiral arm detail. Integrated Gradients requires a baseline — a "neutral" galaxy image — and what that baseline *means* astronomically is genuinely unclear.

## The calibration failure

The more disturbing finding came from our secondary experiment with Galaxy Zoo Evo. We applied strict vote-fraction filtering to ensure label quality. Under those conditions — smaller dataset, higher label confidence — the XAI evaluation became *unstable*.

The same methods that had consistent rankings on DECaLS showed high variance on GZ Evo. Rankings flipped. Differences that looked significant in aggregate disappeared when we cut by morphological class. 

This is a calibration failure in the evaluation methodology, not the models. Most XAI papers pick one architecture, one dataset, and report metric rankings as if they're laws. When the conditions change, the laws break.

## Why this matters beyond astronomy

I keep thinking about what an astronomer actually needs from explainability. They're not trying to debug the model — they're trying to understand whether it's looking at the galactic features they care about (bar structure, spiral tightness, dust lanes) or at image artifacts, brightness gradients, or redshift proxies.

For that use case, the right explainability tool is not the one that scores highest on Deletion AUC. It's the one whose attributions are *interpretable by domain experts*. LIME, despite its technical weaknesses, produces attributions that an astronomer can look at and say "yes, that's the spiral arm" or "no, that's a CCD artifact." That's worth something that a metric won't capture.

The field has a tendency to benchmark explainability methods against each other as if explainability were a single, well-defined property. It isn't. Faithfulness (does the explanation reflect what the model actually did?) and usefulness (does the explanation help a human make a decision?) are different things. Good scores on one don't guarantee the other.

## What I'd do differently

If I ran this experiment again, I'd include domain expert evaluation from the start — not as a qualitative afterthought but as a primary metric. I'd also report confidence intervals on Deletion/Insertion AUC, not point estimates. The variance across random seeds and data splits is large enough that ranking two methods without error bars is mostly noise.

Most importantly, I'd be less interested in crowning a winner and more interested in characterizing the conditions under which each method fails. That's less publishable but more useful.

The telescope doesn't care which explainability method you use. The astronomer does.

---

*The full report is available on the [research page](/research/responsible-ai-galaxy-morphology). The Galaxy10 DECaLS dataset is publicly available through AstroNN.*
