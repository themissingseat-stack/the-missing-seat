# Editorial visual metadata contract tests (Issue #61)

These are acceptance cases for the publisher's parser and social media pipeline. The package format is specified in `TMS_EDITORIAL_STANDARD.md`; this file does not authorize any queued-post changes.

| Input case | Expected outcome |
|---|---|
| Original photo, HTTPS image URL, original credit and alt text | Eligible Instagram photo |
| Public-domain archival photo with archive's rights statement and credit | Eligible photo, rights evidence retained |
| Old archival photograph with no rights statement | Reject image; do not infer public domain |
| CC BY photo with no credit | Reject image |
| Rights-cleared photo with required credit | Include credit in Instagram caption |
| Facebook external source link in Sources, HTTP 200, usable og:image | Eligible link-preview post; article URL remains in caption |
| External source link not in Sources, broken, or no useful preview | Do not attach link; use licensed photo fallback |
| Facebook link preview | No uploaded image asset in the same post |
| No suitable image | Cream card fallback; occasional dark brown; record exception |
| AI depiction of a real person or historical event | Reject for Instagram photo use |
| Existing queued post | No mutation or rescheduling |
| Live verification or Gate 1/Gate 2 missing | No social scheduling |

## Example new package metadata

```md
## Publication metadata
Image URL: https://example.org/photo.jpg
Image Credit: Example Photographer / Example Archive
Image License: CC BY 4.0
Image Rights Evidence: https://example.org/photo-rights
Image Alt Text: A factual description of the licensed photo.
Preferred Source Link: https://example.gov/official-source
```

This is an example of syntax, not a usable image, verified rights grant, or approved external source.
