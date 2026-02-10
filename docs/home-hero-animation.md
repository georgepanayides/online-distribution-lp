# Home Hero Animation — “Automation Film” Spec

Goal: a premium, single-screen hero animation that feels like a real operational console (not a cute illustration). It should read like a short product film: *trigger → transmission → feedback → execution*.

This spec is written to match our repo rules:
- **Sections are SSR by default** (keep `components/sections/PageHero.tsx` server-rendered).
- **Interactivity/animation lives in leaf client components** under `components/graphics/` (Framer Motion only).
- Light theme, pale blues, subtle gradients; premium elements can use the `od-gradient`.
- Motion is **functional realism** (state machine progression, not looping “floaty” animations).

---

## Concept

A single “stage” frame on the right of the hero that looks like a live operations dashboard. Inside that frame, the UI transitions through a **6-step state machine** showing how Online Distribution closes efficiency gaps:

1) **Trigger (Checkout / Order Created)**
2) **Transmission (Order Sync / Integration)**
3) **Planning (Warehouse Task + Slotting)**
4) **Execution (Pick/Pack with scan gates)**
5) **Dispatch (Carrier label + tracking)**
6) **Feedback (Delivery + customer notification + KPI update)**

Each step should have:
- A clear on-screen “status” line (like our existing status overlays)
- One primary interaction/animation that communicates the operation
- A consistent visual grammar (grid, subtle blurs, clean borders, OD-blue accents)

---

## Why 6 steps

Six is the sweet spot: the viewer can map it to the real world quickly, and we can make each step legible in ~2.0–2.8 seconds.

Suggested cadence:
- Total runtime: **~14–18s**
- Each step: **~2.3s average**
- Between steps: **~300–450ms** transition

No infinite “spinner loop” feeling — the film should progress deterministically and then restart.

---

## Visual Language (non-negotiables)

- Stage uses a **real UI frame**: border, subtle shadow, frosted layer, grid texture.
- Use **OD brand geometry**: slashes (skewed panes) and crisp dividers.
- Use branded icons from `public/icons/` where they fit (e.g. `Target - Gradient.svg` for “targeting/precision”, cubes for “inventory blocks”).

---

## Component Architecture (SSR → Client)

### Server (Section)
- `components/sections/PageHero.tsx`
  - Remains SSR.
  - Chooses the hero animation by `hero_graphic` string.
  - Renders copy + CTAs; passes minimal props into the client film.

### Client (Leaf Animation)
- `components/graphics/home-hero/AutomationFilm.tsx` (client)
  - Owns the **state machine** and timing.
  - Switches scenes via `AnimatePresence`.
  - Exposes `mode` props later if we want “short” vs “long”.

---

## Folder Layout

Create a dedicated, scalable structure:

- `components/graphics/home-hero/`
  - `AutomationFilm.tsx` (orchestrator)
  - `film.types.ts` (step enum + config)
  - `film.constants.ts` (timings, copy labels)
  - `StageFrame.tsx` (shared outer shell)
  - `StatusRail.tsx` (status pill + progress)
  - `scenes/`
    - `SceneCheckout.tsx`
    - `SceneSync.tsx`
    - `ScenePlanning.tsx`
    - `ScenePickPack.tsx`
    - `SceneDispatch.tsx`
    - `SceneDelivered.tsx`
  - `ui/`
    - `GhostTable.tsx`
    - `Toast.tsx`
    - `DataPulse.tsx`
    - `InventoryBlocks.tsx`
    - `CornerTJunctionDots.tsx` (corners only)
    - `ScanGate.tsx`

This keeps the hero film isolated and easy to iterate.

---

## Step-by-step Storyboard (Refined)

### Scene 1: Ingest (The Hub)
**Concept:** Visualizing the influx of orders into the "black box" of our system.
**Visuals:**
- Central "Brand Cube" (Online Distribution logo/icon).
- "Order" icons (doc/cart icons) flow into the cube from the left and right edges.
- **Trigger:** Top notification toast drops down: "12 New Orders Received".

### Scene 2: Sync (The Data)
**Concept:** The system organizing chaos into structured data.
**Visuals:**
- The Cube expands/morphs into a "Ghost Table" (Glass list view).
- Rows populate rapidly.
- **Action:** A "Processing" beam or highlight scans down the list. Status dots flip to Green (Synced).

### Scene 3: Logic (The Optimization)
**Concept:** AI turning a list of items into an efficient pick path.
**Visuals:**
- The list fades out, replaced by a "Warehouse Grid" (abstract inventory map).
- Order items appear as highlighted blocks scattered in the grid.
- **Action:** A glowing line connects the blocks in the most efficient sequence (The Pick Path). Label: "AI Slotting Optimized".

### Scene 4: Execution (The Scan)
**Concept:** Precision control during the physical work.
**Visuals:**
- Zoom in on one 3D "Package/Box".
- **Action:** A "Scanner Frame" (corners) locks onto the box.
- A quick flash/pulse. Text: "Scan Verified".
- The box visually seals (lid closes or tape applied animation).

### Scene 5: Dispatch (The Timeline)
**Concept:** Transparency from warehouse to doorstep.
**Visuals:**
- A vertical Timeline appears (Stages: Printed -> Carrier -> Transit -> Delivered).
- **Action:** An active "Puck" slides down the timeline.
- As it passes "Carrier", a Carrier Logo (e.g., CourierPost) flashes.
- As it hits "Delivered", a final Toast notification pops: "Delivery Confirmed: 09:41 AM".

---

## Technical Structure (Streamlined)

To avoid file bloat, we will group the logic, but keep distinct visual components for clarity.

- `components/graphics/home-hero/`
  - `AutomationFilm.tsx` (Main orchestrator - handles state switching)
  - `FilmStage.tsx` (The container frame with grid/glass effects)
  - `FilmAssets.tsx` (Shared small sub-components: Toasts, Icons, Nodes)
  - `scenes/` (The distinct visual states)
    - `IngestScene.tsx` (Cube + Flowing Icons)
    - `ProcessingScene.tsx` (List View + Grid/Map View)
    - `DispatchScene.tsx` (Scanner + Timeline)

*Note: We compressed 6 steps into 3 main "Scene" files that can handle internal transitions (e.g., List -> Grid can happen inside `ProcessingScene`).*

---

## Shared Stage Shell

### `FilmStage`
- Rounded 2xl/3xl container
- Light frosted background + subtle grid texture
- No mandatory corner dots (keep clean/minimal)
Use mechanical, high-end motion:
- `transition: { type: "spring", stiffness: 520–700, damping: 40–55 }` for UI entrance
- Avoid “floaty” easing for primary UI
- Use `AnimatePresence mode="wait"` so scenes don’t overlap messily

No “randomness” unless it’s seeded and deterministic.

---

## Integration Plan (incremental)

1) Add `AutomationFilm` alongside `SmartDespatchCard` (don’t delete existing yet)
2) Wire `PageHero` to render `hero_graphic === "automation-film"`
3) Build `StageFrame` + `StatusRail`
4) Implement scenes 1–6 as minimal-but-real UI
5) Final pass: typography, brand icons, slash accents, corner dots

---

## Open Questions (quick decisions)

- Do we want the stage to look like **one app** (single dashboard) or a **sequence of app panels**?
  - Recommendation: one app shell + scene content swap.
- Should the copy in the left hero column match the scene step label in real-time?
  - Recommendation: yes, but only a small “LIVE: …” line so it doesn’t distract.
