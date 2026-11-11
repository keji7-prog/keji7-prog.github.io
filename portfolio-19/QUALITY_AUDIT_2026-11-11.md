# JK Portfolio — Integrated QA & Improvement Register
Date: 2026-11-11
Scope: root 9-project selection + /portfolio-19/ exhibition + 19 independent project pages.

## Changes actually committed
- Connect the root home page to the full 19-project gallery in navigation, hero CTA, and a dedicated collection banner.
- Change root hero panel to a three-image mosaic of actual project screenshots.
- Change the 19-project gallery hero and every project card to project-specific screenshot covers; CSV cover is a source-grounded visualization graphic rather than an actual screenshot.
- Add project keyword search, category selection, alphabetical/reverse sorting, reset, empty state, and live result count.
- Add a lightweight, consistent project-navigation bar to all 19 independent pages. Includes return to gallery, previous/next and project picker. Do not intercept Alt+Arrow browser navigation.
- Add individual project OG card metadata and images.
- Correct engagement and tribute cards to match the implemented feature set, and eliminate duplicate JK naming.
- Restore editor and tribute HTML export template integrity after a navigation script was mistakenly inserted into the middle of their JavaScript template literals.

## Automated source validation
- 19/19 HTML project paths retrieved from default branch.
- 19/19 matching screenshot cover assets exist.
- 19/19 pages include shared project navigation exactly once, located at the end of the HTML body.
- Inline scripts parsed where extractable; no syntax errors reported in the final 19-page pass.
- No real-name legacy tokens found in the final 19-page pass.
- 19 gallery cards generate and link to 19 distinct pages.
- Data category filter produces 5 results.
- Keyword search, reset, empty result message, and reversing sorting produced expected states in isolated JavaScript execution.
- Gallery and shared navigation script parse checks passed.

## Important verification limits
- A browser navigation smoke test on published GitHub Pages could not be performed in this session because the public Pages URL is not accessible from the available external access path.
- Source validation is NOT equivalent to full cross-browser runtime validation. Actual live image loading, responsiveness, file upload, recorder output, persistence, and export behavior need renewed testing after deployment.
- Some third-party images or fonts may be blocked by regional access/hotlink policies. Do not silently substitute another product's photograph.
- External historical price observations, class-project archives, and original datasets have different provenance and collection dates. Do not present them as synchronous/live measurements.
- 19 project pages are interactive prototypes, not production services or proof of backend integrations.
- Public use of source code and media must respect ownership, authorization, and attribution.

## Subsequent acceptance tasks
1. Load both root and 19-project gallery in desktop Chrome and narrow mobile viewport; inspect image crop, focus visibility, filter interactions and navigation.
2. Walk all 19 project pages manually: back, previous, next, project picker, data source and primary task, one keyboard-only pass.
3. For the data cases, re-check totals and sample scope against the referenced archived records, including restrictions on sharing private housing data.
4. For content-creation cases, run upload/export tests; for video/media, validate capabilities and explicit browser requirements; for local-save cases, test persistence across refresh.
5. Verify accessibility details (alt text, labels, keyboard focus, color contrast), responsive overflow and absence of runtime console errors.
6. Review photographs, logos, and music source permissions before publication claims.

Do not claim end-to-end production acceptance until the tasks above have been completed.
