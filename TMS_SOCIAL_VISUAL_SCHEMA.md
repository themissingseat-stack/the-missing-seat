# TMS prospective social-visual package contract — Issue #61

Applies to NEW social posts after November 15, 2026; grandfather legacy packages and all posts already queued in Buffer. Supplement TMS_EDITORIAL_STANDARD.md; do not bypass release gates.

## Publication metadata

Each new full editorial package must include these literal metadata keys under `## Publication metadata`:

```text
social_visual_policy: v1
image_url: https://archive.example/photo.jpg
image_credit: Photographer Name / Archive, CC BY 4.0
image_license: CC BY 4.0
image_creator: Photographer Name
image_archive: Archive or source institution
image_rights_statement: Exact item-level reuse terms confirmed
image_license_evidence: https://archive.example/item-rights
image_alt_text: Accurate description of the actual photograph
preferred_source_link: https://agency.example/source-document
photo_fallback_reason: none
```

## Mandatory sourcing and rights check

During daily editorial research, **actively search** relevant official sources, public archives, museum collections and image repositories for an authentic, topic-specific photograph. Open the original item record. Record search terms, searches attempted, creator, archive, subject verification, original item URL, explicit license/rights statement, restrictions, required attribution, evidence URL and the date verified under `## Visual sourcing record`. Do not infer public domain from age, archive or public availability. Commercial stock images and editorial-only photos require permission. Never generate synthetic documentary scenes of actual people or historical events.

License types accepted for prospective photos: documented original owned/authorized by TMS; CC0; CC BY and CC BY-SA with attribution and share-alike compliance; public domain with item-level evidence; or individually licensed with terms/permission verified. An unlabeled, merely 'licensed', or all-rights-reserved image does not pass. Record the actual license, not a guess. Source images must remain accessible until Buffer publishes. No undocumented rights means no photo.

If no eligible photo is found, set `image_url: none`, `image_credit: none`, `image_license: none`, `image_creator: none`, `image_archive: none`, `image_rights_statement: none`, `image_license_evidence: none`, `image_alt_text: none`, and provide a specific and substantial `photo_fallback_reason`. For images rejected by technical validation, the publisher also records its specific rejection reason. Do not silently fall back to a text card.

The `preferred_source_link` must be an actual source in the package's `## Sources` section, ideally the original primary document. Never use the TMS article URL as a Facebook external attachment. If no appropriate external source exists use `preferred_source_link: none` and explain in the sourcing record. Check original page and useful OG title, description and image before offering a link preview; if Buffer's actual preview cannot be confirmed or is unsuitable, fall back to the verified photograph.

## Social channel policy

Instagram prefers a real, properly licensed photograph with a cream text box, or photograph above a cream panel. Include license-required credit in the caption. Fallback text card requires a reason. Facebook alternates eligible photo posts and source-link previews. A link attachment and a non-empty image assets array must never coexist. Include the TMS article link in Facebook caption, as before. The publisher chooses the attachment and may defer an unsafe source link to a photo. Photo sourcing and editorial metadata belong here; Buffer integration belongs only in `tms-social-publisher`.

Fallback palette: cream by default. Dark brown is permitted only for every fifth (or fewer) **prospective** fallback card in chronological allocation order; total dark count must never exceed floor(total new fallback cards / 5). Count each language card. Store the palette decision with the card and do not recolor existing queued posts.

## Validation and release

Run `node --test test/social-visual-metadata.test.mjs` (and both ordinary editorial reviews). Only packages explicitly carrying `social_visual_policy: v1` are validated under this new contract. Older packages and already planned Buffer posts remain untouched. This package check documents metadata and cannot independently verify a third party's claim of copyright ownership; editors must retain item-level evidence.
