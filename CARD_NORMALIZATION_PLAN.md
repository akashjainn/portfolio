# Card Styling Normalization Plan

## Current State Analysis

### Recent Commit
- **fe9cd5b** "refit cards" - Added `items-start` to Executive Summary grid to prevent vertical stretching

### Two Distinct Card Systems (Should Be One)

#### System 1: ProjectCard (Teaser) — `src/components/site/project-card.tsx`
**Used on:** Homepage projects grid, projects page
**Structure:**
- Title (text-xl, no clamp)
- Summary (line-clamp-2) 
- Metrics row (flex wrap, variable height to ~4 badges)
- Tech chips/tags (flex wrap, ~6-8 items)
- CTA row: Primary (Case study) + Secondary (Demo/Code)

**Current Issues:**
- `h-full flex flex-col` forces card height
- `mt-auto pt-6` on CTA creates "sticky footer" but causes gaps when grid is uneven
- Metric badges render in 2 formats (old object + new array)
- Title has no length constraint
- No chip count limit

#### System 2: ExecutiveSummaryCard — `src/components/ui/executive-summary.tsx`
**Used on:** Executive Summary section (30-second project overview)
**Structure:**
- Category pill + Timeline (custom div styling)
- Title + Icon links (Demo/Repo)
- Performance metric (custom grid)
- Key Impact bullets (fixed 3 items)
- Expandable tabs (performance data, tech stack, challenges)
- CTA: "Full Case Study" button

**Current Issues:**
- Different chip styling (Badge component vs custom divs)
- Metrics rendered as custom divs instead of MetricsBadge
- Icon links styled as icon-only buttons (8x8) vs text + icon in ProjectCard
- Buttons don't match: "Case study" vs "Full Case Study"
- No visual relationship between the two card types
- CTA styling is completely different

#### Grid Containers
- **ProjectCard grid:** `animated-projects-grid.tsx` — now has `items-start` ✓
- **ExecutiveSummary grid:** `executive-summary.tsx` — now has `items-start` ✓
- **Other grids?** Need to audit site/projects page grids

---

## Visual Inconsistencies Reference

| Element | ProjectCard | ExecutiveCard | Issue |
|---------|-------------|---------------|-------|
| **Title** | text-xl, no clamp | text-xl, no clamp | Both can overflow to 3+ lines |
| **Summary** | line-clamp-2 | N/A (Key Impact bullets instead) | Different narrative approach |
| **Metrics** | MetricsBadge component | Custom divs | Different rendering |
| **Category** | Tags (in summary data) | Custom Badge | Different styling |
| **Timeline** | N/A | Custom div with Clock icon | Only in Executive |
| **Tech/Meta Chips** | Pill-shaped, hover scale | Badge component | Different visuals |
| **CTA Primary** | "Case study" button | "Full Case Study" button | Inconsistent labeling |
| **CTA Secondary** | Ghost buttons (Demo/Code) | Icon-only buttons | Different approach |
| **Spacing** | `space-y-3` (header), `gap-2` (chips) | `pb-3`, `mt-3`, custom | No rhythm |
| **Border/Shadow** | `border-2 border-border/40`, glowing hover | `h-full`, subtle shadow | Different visual weight |
| **Hover** | `-translate-y-1` + glow effect | `-translate-y-1` + shadow | Similar but different |

---

## 5-Phase Implementation Plan

### Phase 1: Define Card Variants (Planning — No Code Yet)

#### Variant A: ProjectTeaserCard (Homepage/Projects Grid)
**Purpose:** Quick scan + click-through to detailed case study
**Fixed structure:**
```
┌─────────────────────────────────────┐
│ Title (line-clamp-2)               │ ← Prevent 3-line titles
│ Summary (line-clamp-2)             │
├─────────────────────────────────────┤
│ Metrics (1 row max)                │ ← Max 4 badges in a row
├─────────────────────────────────────┤
│ Tech Chips (max 2 rows)            │ ← Clamp or show "+X more"
│                                     │
│ [Case study →] [Demo] [Code]       │ ← Sticky to bottom
│                                     │
└─────────────────────────────────────┘
```
**Key constraints:**
- Title: `line-clamp-2` max
- Summary: `line-clamp-2` max  
- Metrics: flex-wrap, max 4 items per row (use MetricsBadge only)
- Chips: Use same pill component, max-h-[50px] (2 rows) or show overlow
- CTA: Primary action full-width outline, secondary as ghost buttons

#### Variant B: ProjectExecutiveCard (Executive Summary)
**Purpose:** "30-second case" + optional deep dive for recruiters/decision makers
**Fixed structure:**
```
┌─────────────────────────────────────┐
│ [Category] [Timeline] [Links]      │ ← Icons top-right
│ Title (line-clamp-2)               │
├─────────────────────────────────────┤
│ Performance metric badge (left)    │ ← Reuse MetricsBadge
│ Or 2-metric grid                   │
├─────────────────────────────────────┤
│ Key Impact (3 bullets fixed)       │
│ • Impact 1                         │
│ • Impact 2                         │
│ • Impact 3                         │
├─────────────────────────────────────┤
│ [Tech] [Challenges] [Solutions]    │ ← Expandable tabs (same styling as variant A)
│                                     │
│     [Full Case Study →]            │ ← Same button style as Variant A
│                                     │
└─────────────────────────────────────┘
```
**Key constraints:**
- Title: `line-clamp-2` max
- Impact bullets: exactly 3 items (fixed)
- Category/Timeline: use shared pill component
- Metrics: use MetricsBadge (same as Variant A)
- CTA: same button treatment as Variant A (primary outline, secondary ghost)
- Expandable content: tabs should not shift layout

---

### Phase 2: Create/Unify UI Subcomponents

#### 2.1 Create `ProjectChip` Component
**File:** `src/components/ui/project-chip.tsx`

```tsx
interface ProjectChipProps {
  children: React.ReactNode
  variant?: 'tech' | 'category' | 'meta' // tech=filled, others=variant
  icon?: React.ReactNode
}

export function ProjectChip({ children, variant = 'tech', icon }: ProjectChipProps) {
  // Shared styling for all chip-like elements
  // Base: rounded-full px-3 py-1 text-xs font-medium transition
  // Variants: control bg/border/hover behavior
}
```

**Acceptance Criteria:**
- Tech chips: `bg-muted/50 border border-border/50 hover:bg-muted`
- Category chips: `bg-secondary` (Badge-like)
- Meta chips (timeline): `bg-muted/30 text-xs` with icon support
- All support hover scale & animation delay

#### 2.2 Standardize Metrics to Array Format
**Current issue:** ProjectCard supports both object and array formats; this creates branching logic

**New format (all metrics):**
```ts
type ProjectMetrics = Array<{
  label: string           // "Lighthouse", "LCP", "Category", etc.
  value: string | number  
  unit?: string          // "ms", "/100", etc.
  variant?: 'success' | 'warning' | 'error' | 'quality' | 'performance'
}>
```

**Files to update:**
- `content/projects/*.mdx` — convert all `metrics` frontmatter to array format
  - PropSage: already in object format
  - StockSense: already in object format
  - State Farm: already in object format (removed a11y)
  
**Benefit:** Single metric rendering path in both ProjectCard and ExecutiveCard

#### 2.3 Create `ProjectActions` Component
**File:** `src/components/ui/project-actions.tsx`

**Props:**
```ts
interface ProjectActionsProps {
  href: string                     // Case study link
  demo?: string                   // Demo link
  repo?: string                   // Code/repo link
  variant?: 'teaser' | 'executive' // Button style
}
```

**Teaser variant:** Primary action (full-width outline), secondary as ghosts
**Executive variant:** Same button treatment (consistent)

**Benefit:** Single source of truth for CTA styling and positioning

#### 2.4 Create `MetricsRow` Component
**File:** `src/components/ui/metrics-row.tsx`

**Props:**
```ts
interface MetricsRowProps {
  metrics: ProjectMetrics
  maxVisible?: number // default 4
  layout?: 'wrap' | 'grid' // wrap for teaser, grid for executive
}
```

**Behavior:**
- Renders MetricsBadge for each item
- Wraps after `maxVisible` with consistent spacing
- Supports variant detection (auto-color based on value ranges)

---

### Phase 3: Normalize Height & Spacing

#### 3.1 Grid Container Rules (Both grids)

**Already applied:**
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
```

**Verify on:**
- `animated-projects-grid.tsx` ✓
- `executive-summary.tsx` ✓
- `src/app/projects/page.tsx` (check if it has a projects grid)
- Any other grids rendering cards

#### 3.2 Card Container Rules

**ProjectCard (teaser):**
```tsx
<Card className="group flex flex-col h-fit transition-all duration-300 ease-out hover:-translate-y-1 backdrop-blur-sm border-2 border-border/40 hover:border-[hsl(194_100%_50%)] hover:shadow-[0_0_20px_hsla(194,100%,50%,0.3)]">
  {/* Remove h-full, change to h-fit */}
</Card>
```

**ExecutiveCard:**
```tsx
<Card className="flex flex-col h-fit transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  {/* Change from h-full to h-fit */}
</Card>
```

#### 3.3 Content Spacing Rules

**Establish a spacing scale:**
- Header: `pb-4` (consistent)
- Between sections: `gap-4` or `space-y-4` (never mix)
- CTA row: `mt-auto pt-4` (push to bottom if needed) or `pt-2` (natural spacing)

**ProjectCard current:** `space-y-3` (header), `gap-2` (chips), `pt-6` (CTA) → Too varied

**ExecutiveCard current:** `pb-3`, `mt-3`, custom spacing → Uneven

**New standard:**
```tsx
<CardHeader className="pb-4 space-y-3">
<CardContent className="flex flex-col gap-4">
  <MetricsRow />
  <ChipsRow />
  <div className="mt-auto pt-4 flex gap-2">
    <ProjectActions />
  </div>
</CardContent>
```

#### 3.4 Clamp Rules for Content

**Title:** `line-clamp-2` (both variants)
```tsx
<CardTitle className="line-clamp-2 text-xl font-display font-semibold ...">
```

**Summary (Teaser only):** `line-clamp-2` (already applied)
```tsx
<CardDescription className="line-clamp-2 text-muted-foreground ...">
```

**Impact bullets (Executive only):** Fixed to 3 items
```tsx
{project.impact.slice(0, 3).map(...)}  // Already correct
```

**Chips/Tags:** Hard-clamp or show overflow indicator
```tsx
<div className="flex flex-wrap gap-2 max-h-[50px] overflow-hidden">
  {/* Max space for 2 rows of chips; if overflow, fade or "+X more" */}
</div>
```

---

### Phase 4: Content Standardization

#### 4.1 Project Data Audit

**For each project (content/projects/*.mdx):**

| Aspect | Rule | Current | Action |
|--------|------|---------|--------|
| **Title** | ≤2 lines @ text-xl | Check each | Truncate if needed |
| **Summary** | ≤2 lines @ body | PropSage: OK, StockSense: OK, StateFarm: OK | ✓ |
| **Metrics count** | 3–4 max | PropSage: 4, StockSense: 4, StateFarm: 4 (now 3 + removed a11y) | ✓ |
| **Metrics format** | Array only | Current: object | Convert all to array |
| **Tag/Chip count** | ≤6 preferred, max 8 | PropSage: 8, StockSense: 7, StateFarm: 5 | Monitor (don't edit) |
| **Phrasing** | Use "~" for estimates, no unverified claims | Good | Maintain |

#### 4.2 Metrics Array Conversion
**Example:**
```ts
// OLD (object format - ProjectCard only)
metrics: {
  lcp_ms: 1200,
  tbt_ms: 80,
  cls: 0.01,
  lighthouse_mobile: 95
}

// NEW (array format - both cards)
metrics: [
  { label: "LCP", value: "1.2s", variant: "success" },
  { label: "TBT", value: "80ms", variant: "success" },
  { label: "CLS", value: "0.01", variant: "success" },
  { label: "Lighthouse", value: "95/100", variant: "success" }
]
```

**Files to update:**
- `content/projects/propsage.mdx`
- `content/projects/stocksense.mdx`
- `content/projects/statefarm-chat.mdx`
- `content/projects/landsafe.mdx` (if any)
- `content/projects/adventuretime-gba.mdx` (if any)
- `content/projects/vr-puzzle-game.mdx` (if any)

---

### Phase 5: Implementation Checklist (High Leverage, Fast)

#### ✅ Stage 1: Component Extraction (2–3 hours)
- [ ] Create `ProjectChip.tsx` (shared pill styling)
- [ ] Create `ProjectActions.tsx` (unified CTA rendering)
- [ ] Create `MetricsRow.tsx` (consistent metric display)
- [ ] Update `ProjectCard.tsx` to use new components
- [ ] Update `ExecutiveSummaryCard.tsx` to use new components

#### ✅ Stage 2: Data Normalization (1 hour)
- [ ] Convert all `metrics` in .mdx files to array format
- [ ] Verify no metric data is lost in conversion
- [ ] Update `EXECUTIVE_SUMMARIES` in `executive-summary.tsx` to match array format (if using same data)

#### ✅ Stage 3: Spacing & Clamp Rules (1 hour)
- [ ] Update `ProjectCard` container: `h-fit` instead of `h-full`
- [ ] Update `ProjectCard` title: add `line-clamp-2`
- [ ] Update `ProjectCard` content spacing: use consistent `gap-4`
- [ ] Update `ProjectCard` CTA positioning: check `mt-auto pt-4` math
- [ ] Update `ExecutiveCard` container: `h-fit` instead of `h-full`
- [ ] Update `ExecutiveCard` spacing: standardize `gap-4` / `space-y-4`
- [ ] Audit `src/app/projects/page.tsx` grid for `items-start`

#### ✅ Stage 4: Visual Polish (1 hour)
- [ ] Ensure both cards' hover state → `-translate-y-1` (check current)
- [ ] Ensure both cards' border/shadow match or intentionally differ
- [ ] Test responsive behavior: 3-col → 2-col → 1-col
- [ ] Test focus/keyboard navigation on all CTAs
- [ ] Check expanded Executive Cards don't shift layout

#### ✅ Stage 5: Regression Testing (30 min)
- [ ] Desktop 3-column layout (no gaps)
- [ ] Tablet 2-column layout
- [ ] Mobile 1-column layout
- [ ] Hover states on both card variants
- [ ] Expand/collapse of Executive Card details
- [ ] Viewport zoom (110%, 150%) for text clamp

---

## Testing Checklist

### Visual Regression Tests
- [ ] All cards same "visual weight" (proportional sizing)
- [ ] No weird gaps between chips and CTA row
- [ ] Title + Summary + Metrics + Chips + CTA fit card visually
- [ ] Metric badge colors are appropriate (success green, warning orange, etc.)
- [ ] Chip animation delays stagger visibly (first chip before last)

### Responsive Tests
```
Desktop (1920px):   3-col grid, cards comfortable
Tablet (768px):     2-col grid, cards readable
Mobile (375px):     1-col, full-width, scrollable
```

### Accessibility Tests
- [ ] All buttons have proper labels (aria-label for icon buttons)
- [ ] Link focus-visible rings visible on all CTAs
- [ ] Tab order logical (title → summary → metrics → chips → actions)
- [ ] No decorative icons in button text (check embedded SVGs)

### Content Tests
- [ ] No title > 2 lines (test zoom 150%)
- [ ] No summary > 2 lines
- [ ] Metrics display correct variants (use correct colors)
- [ ] Chips don't overflow badly (test long tech names)

---

## Files to Touch

### Components (Core Changes)
- [ ] `src/components/site/project-card.tsx` — import & use new subcomponents
- [ ] `src/components/ui/executive-summary.tsx` — import & use new subcomponents
- [ ] `src/components/ui/project-chip.tsx` — **NEW**
- [ ] `src/components/ui/project-actions.tsx` — **NEW**
- [ ] `src/components/ui/metrics-row.tsx` — **NEW**

### Content (Data Format)
- [ ] `content/projects/propsage.mdx`
- [ ] `content/projects/stocksense.mdx`
- [ ] `content/projects/statefarm-chat.mdx`
- [ ] `content/projects/landsafe.mdx`
- [ ] `content/projects/adventuretime-gba.mdx`
- [ ] `content/projects/vr-puzzle-game.mdx`

### Grids (Grid Container Rules)
- [ ] `src/components/animated-projects-grid.tsx` — ✓ already has `items-start`
- [ ] `src/components/ui/executive-summary.tsx` — ✓ already has `items-start`
- [ ] `src/app/projects/page.tsx` — audit if exists
- [ ] Any other project grid locations

### Possible Additional Audit
- [ ] `src/components/DeferredSections.tsx` (deferred grids?)
- [ ] Check for other card grids in site

---

## Success Criteria

When complete, every project card on the site should:
1. ✅ **Feel related** (same button treatment, spacing rhythm, badge styles)
2. ✅ **Size predictably** (no weird gaps, cards only as tall as needed)
3. ✅ **Display consistently** (titles clamp, summaries clamp, metrics visible)
4. ✅ **Respond professionally** (same hover effect across variants)
5. ✅ **Work responsively** (no overflow on mobile, proper grid wrapping)

---

## Notes for Implementation

### Why Array Format for Metrics?
- **Single rendering path:** No logic branching for "old object vs new array"
- **Type safety:** Explicit `label`, `value`, `unit`, `variant`
- **Flexibility:** Easy to add new metric types without new code
- **Consistency:** Both card types use identical rendering

### Why New Components?
- **DRY:** Don't repeat chip styling in two places
- **Maintenance:** Update once, affects all cards
- **Readability:** `<ProjectChip>`, `<ProjectActions>` are self-documenting
- **Testing:** Easier to test subcomponents in isolation

### Why `h-fit` Instead of `h-full`?
- **h-full** forces card to fill container height → combined with grid stretch, creates gaps
- **h-fit** allows card to size to content → grid `items-start` prevents stretching to tallest card
- **mt-auto** still works for footer pinning within a card's natural height

### Why Standardize Spacing?
- **Rhythm:** Visual consistency makes designs feel professional
- **Predictability:** Designers know what to expect
- **Maintenance:** Easier to adjust global spacing via design tokens later

