# Product page visual QA

## Source visual truth

- User reference: Autodesk-style product catalog screenshot in the task.
- Product-page brief: `.codex/attachments/04cef0e6-e43b-412c-8493-1bcc1624ae53/pasted-text.txt`.
- Local image source set: `/Users/joseph/Downloads/ChatGPT 图像 2026年10月4日 15_37_20-1.png` through `15_37_33-7.png`.

## Asset mapping

The mapping was made by opening every image and inspecting its visual content. It does not rely on the original download names.

| Semantic role | Source image | Runtime asset |
|---|---|---|
| Hero science lab | `15_37_20-1.png` | `public/assets/products/hero-science-lab.png` |
| Platform ice cube | `15_37_22-2.png` | `public/assets/products/platform.png` |
| LAMMPS particle chain | `15_37_24-3.png` | `public/assets/products/lammps.png` |
| Science agent glass wave | `15_37_27-4.png` | `public/assets/products/ai-agent.png` |
| Materials network | `15_37_29-5.png` | `public/assets/products/materials.png` |
| Chemistry molecule | `15_37_31-6.png` | `public/assets/products/chemistry.png` |
| Biology DNA helix | `15_37_33-7.png` | `public/assets/products/biology.png` |

All seven supplied images are used. No image was omitted.

## Implementation evidence

- Route: `https://8.130.144.193/official/products/`
- Viewports checked in Chrome: desktop 1440px, responsive 390px during the same product-page work.
- Browser checks: hero image loaded, all seven product image requests completed with their natural dimensions, category buttons filtered cards, product detail opened a modal, and language switch changed visible copy.
- Console errors: none observed in the product-page tab.

## Comparison findings

- Header keeps the existing AethericAI language and dark navigation while adopting the reference product-center hierarchy.
- Hero uses a 300px high bright image band with a left readability wash and the science visual preserved on the right.
- Body uses a white catalog surface, six product cards in three columns, 124px image slots, restrained borders and a 2px hover lift.
- Mobile collapses to one column and keeps category navigation horizontally scrollable.

## Final result

passed

---

# Login modal visual QA

## Source visual truth

- P1 current-state reference: `/var/folders/bk/sz8j79kx4573n2__nbzf7mzh0000gn/T/codex-clipboard-6ca8bae0-133a-4a3a-bae5-1eb2fa2156c5.png` (1000 x 1152).
- P2 target reference: `/var/folders/bk/sz8j79kx4573n2__nbzf7mzh0000gn/T/codex-clipboard-6fa0c777-b8ce-4044-97f9-4092d3bbba64.png` (654 x 762).
- Target state: Chinese homepage with the compact login modal open and the background molecular scene reduced to soft, unreadable forms inside the panel.

## Implementation evidence

- Route: `http://localhost:3000/` in the Codex in-app browser, with the homepage login modal open.
- Browser capture: Codex in-app browser tab 2, emitted during the 2026-10-05 QA pass; browser viewport was 694 x 899 CSS pixels.
- Direct route check: `http://localhost:3000/login/` rendered the same form structure without the homepage overlay.
- Implementation state: Chinese, idle form, no values entered, no network submission.
- Focused panel comparison: P2 panel approximately 603 x 704 pixels; implementation panel approximately 520 x 570 CSS pixels in the 694 x 899 in-app browser. Full-page aspect differs because the available in-app browser viewport is narrower than the supplied reference.

## Review

- Typography: the existing Inter/PingFang stack and the existing Chinese labels remain in use; the title, labels, placeholders, links, and disabled alternatives remain readable.
- Layout: the overlay panel is centered at `top: 48%`, uses a 520px maximum width, compact 56px fields, and keeps the close control above the panel. The original homepage navigation, hero copy, molecular scene, and chapter controls remain unchanged.
- Color and tokens: the panel uses the existing graphite/ice-cyan palette, a denser dark blue-gray glass volume, a 1px ice-blue border, corner highlights, short edge glow, and a light cyan submit button.
- Image/background treatment: the modal is rendered through a Portal at `document.body`; the panel uses `backdrop-filter: blur(52px) saturate(135%) brightness(0.88)` and `-webkit-backdrop-filter`, while the background receives only a transient 2px blur when the modal is open. The background remains visible as soft blue-gray forms without readable text or sharply resolved bonds inside the panel.
- Copy and controls: phone, verification code, invitation code, consent, terms link, close action, language switch, and API-backed submit/send behavior remain intact. The secondary area now renders “密码登录” and “暂未开通” as two matching disabled outline buttons, as requested.

## Interaction checks

- Opened the modal from the homepage.
- Closed it with the X control and reopened it.
- Switched Chinese → English → Chinese.
- Focused the phone input and confirmed the custom focus border/ring.
- Opened `/login/` directly.
- No form submission or SMS request was performed.

## Iteration history

1. Existing modal was inspected before edits. It used a `.88` scale transform, 64px inputs, a 620px card shell, and a single disabled alternative badge.
2. The modal was moved through a React Portal to `document.body`, with body scroll locking while open, so the card is independent of the homepage/header stacking context.
3. The material system was rebuilt with a 520px panel, 52px blur, denser blue-gray volume, short 7px edge glow, corner highlights, surface veil, sharp form content, 56px fields, and compact secondary outline buttons.
4. The new P1/P2 comparison was repeated in the browser. The final local state shows the homepage text and individual molecular details reduced to soft, unreadable blurred forms inside the panel while the form stays sharp.

## Validation

- `bun run build:ip`: passed.
- `bun run lint`: passed with 9 pre-existing `@next/next/no-img-element` warnings outside the login files.
- `git diff --check`: passed.

## Follow-up polish

- A same-size 654 x 762 browser capture would allow a stricter pixel comparison. The component-level comparison used here matches the supplied panel state and material hierarchy.

final result: passed
# Account workspace QA · 2026-10-06

Scope: authenticated account workspace and administration; this section supersedes earlier login-only acceptance for the new dashboard routes.

- Source visual: `/var/folders/bk/sz8j79kx4573n2__nbzf7mzh0000gn/T/codex-clipboard-ed76c361-cabf-4392-a822-61852e283a4e.png` (1732 × 1624). User requested this layout with the official website's dark / ice-blue palette, rather than the reference purple.
- Desktop implementation: `output/workspace-qa/dashboard-desktop.png`, CSS viewport 1440 × 1050, DPR 2. The in-app full-page capture placed half-scale content in the upper-left tile; `dashboard-desktop-content.png` preserves the complete visible content crop at 720 × 761 for comparison. It is not a 1:1 pixel match claim.
- Combined source / implementation comparison: `output/workspace-qa/reference-comparison.png` (1460 × 800). Inspected together: balance ring at left, three period cards, access strip, lower heatmap and trend, plus the required product breakdown.
- Mobile implementation: `output/workspace-qa/dashboard-mobile.png`, 390 × 844 CSS viewport; document width 380 after scrollbar, no horizontal overflow. Cards stack and tables scroll within their containers.
- State: local isolated fixture accounts, simulated SMS, synthetic transaction and usage data. Fixture code and database are excluded from production deployment.

Fidelity surfaces: existing Inter/PingFang typography reused; panel spacing and rounded controls follow the website; graphite/ice-blue/mint replace purple intentionally; charts reflect API data rather than an embedded screenshot; all visible labels and actions map to account/usage/product operations. No mock quotas or sample financial values are sent to production.

Fixes after comparison: month labels were tied to actual calendar boundaries and given no-wrap styling; product price changes are rejected before purchase; shared session refresh avoids competing refresh requests across site modules.

Browser checks: owner adjusts fixture member credits; assigns an administrator and a product scope; creates two product activation codes and assigns a manager; manager redeems one for a user; user's balance and product uses increase; user buys a package on Products and the ledger, purchase and entitlement agree; simulated verified login redirects from the homepage to Dashboard. The owner, admin and user API permission boundaries are independently covered by tests. Browser error log empty.

Validation: 15 Python workspace/community regression tests passed; login return-path test passed; TypeScript static export and lint passed (9 existing image warnings). New product prices and external product usage feeds remain operator-configured; production uses honest empty states before any real usage.

final result: passed

---
