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
