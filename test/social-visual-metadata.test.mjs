import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSocialVisualPackage,parseSocialVisualMetadata } from '../scripts/validate-social-visuals.mjs';

const PHOTO=[
  '## Publication metadata',
  'social_visual_policy: v1',
  'image_url: https://images.example.org/real.jpg',
  'image_credit: Jane Doe / National Archive, CC BY 4.0',
  'image_license: CC BY 4.0',
  'image_creator: Jane Doe',
  'image_archive: National Archive',
  'image_rights_statement: The original item page specifies CC BY 4.0',
  'image_license_evidence: https://archives.example.org/photo/rights',
  'image_alt_text: A documented historical photograph',
  'preferred_source_link: https://agency.example.org/original-report',
  'photo_fallback_reason: none',
  '',
  '## Sources',
  'Original report https://agency.example.org/original-report',
].join('\n');

test('documented authentic image plus primary source passes',()=>{
  assert.deepEqual(validateSocialVisualPackage(PHOTO).errors,[]);
  assert.equal(parseSocialVisualMetadata(PHOTO).image_creator,'Jane Doe');
});
test('unverified rights cannot be assumed',()=>{
  const bad=PHOTO.replace('image_license: CC BY 4.0','image_license: all rights reserved').replace('image_license_evidence: https://archives.example.org/photo/rights','image_license_evidence: none');
  assert.match(validateSocialVisualPackage(bad).errors.join('|'),/image_license/);
});
test('no-photo needs a specific reason',()=>{
  const noPhoto=PHOTO.replace('image_url: https://images.example.org/real.jpg','image_url: none');
  assert.match(validateSocialVisualPackage(noPhoto).errors.join('|'),/fallback_reason/);
  const documented=noPhoto.replace('photo_fallback_reason: none','photo_fallback_reason: No image with item-level reuse permission in the examined archive collections');
  assert.deepEqual(validateSocialVisualPackage(documented).errors,[]);
});
test('unrelated attachment source and self-link are blocked',()=>{
  const mismatch=PHOTO.replace('preferred_source_link: https://agency.example.org/original-report','preferred_source_link: https://unrelated.example.org/home');
  assert.match(validateSocialVisualPackage(mismatch).errors.join('|'),/Sources section/);
  const own=PHOTO.replace('preferred_source_link: https://agency.example.org/original-report','preferred_source_link: https://themissingseat.org/story.html');
  assert.match(validateSocialVisualPackage(own).errors.join('|'),/TMS article/);
});
test('legacy packages remain grandfathered',()=>{
  assert.equal(validateSocialVisualPackage('## Publication metadata\nSlug: older-article').prospective,false);
});
