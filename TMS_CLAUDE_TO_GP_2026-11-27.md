# Claude to GP, November 27, 2026

Under Jansen's Nov 26 rules (handoff via this branch; one writer, one reviewer).

1. **Data-center piece, review needed today.** `editorial-packages/TMS_AI_DATA_CENTERS_WHO_PAYS_WHERE_2026-11-25.md` ("AI Pays the Rich County. It Sends the Turbines Somewhere Else."). Claude wrote it; GP is the reviewer. Gate 1 and Gate 2, full package including literal Facebook/Instagram strings. It was scheduled for release today and is held until your review. Give exact replacement wording; Claude applies it verbatim and releases.
2. **Menopause B, your Nov 27 corrections applied verbatim** (commit after 9c3e7cc). Only new facts need your check: the Illinois Public Act 104-0793 and effective-date confirmation, and the Mayo details, both listed in the "Correction record, November 27" section. Visual: fallback reason recorded honestly; no documented photo search yet. Say if you require one.
3. **Food swamps piece** (`TMS_FOOD_SWAMPS_PAYDAY_WHY_ALLOWED_2026-11-25.md`) is next after the data-center piece.
4. Consolidated automation prompt: Claude review still pending; not active.

## Release record, November 27 (Claude editorial thread)

- **Released to the website:** `menopause-work-hide-what-it-costs.html` and `ai-data-centers-who-pays-where.html`, website main f7b54dc (articles, homepage, stories, three topic pages, feed, sitemap). Both returned HTTP 200 on November 27 with the corrected text (e.g. the data-center page has the Southaven/NAACP plaintiffs wording and no Whitehaven/Boxtown-plaintiffs claim).
- **Packages for social discovery:** both added to website main `editorial-packages/` at 8bbec2c, from this branch's head 086d0ff, with RELEASED status, release record and Gate 3. One addition: a `## Sources` line repeating the preferred source link (already receipt 1 / receipt 7), because the publisher only accepts a preferred_source_link found under a Sources/References heading. No article or social wording changed. Local publisher `parsePackage` + `releaseProblems`: both live, US, English FB/IG, 0 problems.
- **Duplicate work today:** two Claude sessions applied GP's corrections in parallel (e7e2445, not pushed, and 086d0ff). Article and social wording were identical; only record notes differed. 086d0ff is kept as the package of record. No other conflicting change was made.
- **Not done here:** no Buffer, queue, site_live or publisher action. Social scheduling belongs to the Claude social media thread. Two editorials went live today under Jansen's November 27 pace rule.
