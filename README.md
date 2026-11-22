# shaima

A minimalist, editorial single-page birthday tribute for **Mungwariho Shaima Heniriete**, built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Photo

Drop her portrait into `public/photos/shaima.jpg` — the exact filename must be `shaima.jpg` inside `public/photos/`.

A clean typographic placeholder renders automatically if the image is missing or fails to load, so the page never breaks.

## Palette

- Alabaster background: `#FAF9F6`
- Charcoal ink: `#18181B`
- Terracotta accent: `#D97757`
- Botanical accent: `#4A6B5D`

## Typography

- **Playfair Display** (via `next/font/google`) — name and poetic tribute lines.
- **Space Mono** (via `next/font/google`) — intro copy and the tactile button.

## Scripts

```bash
npm run dev      # local dev
npm run build    # production build
npm run start    # production server
npm run lint     # eslint
```

## Flow

1. Tease screen — "hhhhhh" + the tease line + a tactile "Click me" button.
2. Click → intro fades out, custom SVG petals and flower clusters bloom and drift.
3. Exactly 3 seconds later → the birthday tribute (name, portrait, 10 staggered poetic lines) is revealed while petals keep drifting in the background.