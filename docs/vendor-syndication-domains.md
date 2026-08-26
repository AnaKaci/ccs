# Vendor Syndication Network Observations

Observed during local Vite testing on 2026-08-19 from `http://127.0.0.1:5173`.

These are observed domains only. Do not convert this list into wildcard CSP rules, and do not add `unsafe-eval` unless a future vendor requirement proves it is necessary.

## Cisco `/cisco/`

- Primary script: `widgets.ziftsolutions.com`
- Vendor scripts, styles, images, and dynamic content: `static.ziftsolutions.com`, `dynamic.ziftsolutions.com`
- Vendor support scripts: `s3.amazonaws.com`, `cdnjs.cloudflare.com`
- CCS assets: `ccs.al`
- Frames observed: none
- Console observation: the Cisco/Zift script reports `ReferenceError: ZTrack is not defined` in local testing, while the syndicated content still renders. This is emitted by the remote vendor script.

## Fortinet `/fortinet/`

- Primary script and frame: `publisher.impartner.io`
- Vendor runtime/API/tracking domains: `tcmacore-entrypoint.prod.azw2k8-public.impartner.io`, `tcma-tracking.prod.azw2k8-public.impartner.io`
- Fonts: `fonts.googleapis.com`, `fonts.gstatic.com`
- CCS assets: `ccs.al`

## HP `/products-hp/`

- Primary script and frame content: `syndication.inc.hp.com`
- Script dependency observed: `ajax.googleapis.com`
- CCS assets: `ccs.al`
- Local dev observation: React StrictMode can briefly create a duplicate HP iframe request before cleanup. The component prunes duplicate HP wrapper nodes and keeps one vendor iframe.

## HP Poly `/hp-poly/`

- Primary script and frame content: `syndication.inc.hp.com`
- Script dependency observed: `ajax.googleapis.com`
- CCS assets: `ccs.al`
- Local dev observation: same HP iframe duplicate cleanup behavior as the general HP showcase.

## Existing Site Assets

- Homepage media and CCS-hosted images: `ccs.al`
- Shop fallback product images and shop video: `cdnimpuls.com`, `www.cdnimpuls.com`

## Consent Readiness

The Cisco, Fortinet, HP, and HP Poly widgets are isolated in route-specific React components. Their `useEffect` loaders can be gated behind a future consent manager before appending the third-party script.
