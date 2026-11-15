// Prospective-only visual metadata validation; historical package records are exempt.
const REQUIRED=['social_visual_policy','image_url','image_credit','image_license','image_creator','image_archive','image_rights_statement','image_license_evidence','image_alt_text','preferred_source_link','photo_fallback_reason'];
const empty=s=>!s||/^(none|n\/a|unknown|todo|tbd|not available)$/i.test(s.trim());
const safeUrl=s=>{
  try {const u=new URL(s);return u.protocol==='https:'&&!/^(localhost|127\.|0\.0\.0\.0|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(u.hostname);}
  catch{return false;}
};
function sectionLines(source,heading) {
  const lines=source.split(/\r?\n/);
  const re=new RegExp('^##\\s+'+heading+'\\s*$','i');
  const start=lines.findIndex(line=>re.test(line.trim()));
  if(start<0)return [];
  const end=lines.findIndex((line,index)=>index>start&&/^##\s+/.test(line));
  return lines.slice(start+1,end<0?undefined:end);
}
export function parseSocialVisualMetadata(source) {
  const meta={};
  for(const line of sectionLines(source,'Publication metadata')) {
    const m=line.match(/^\s*(?:[-*]\s*)?(?:\*\*)?([a-z_][a-z0-9_ ]*)(?:\*\*)?\s*:\s*(.*?)\s*$/i);
    if(m)meta[m[1].trim().toLowerCase().replaceAll(' ','_')]=m[2].trim().replace(/^\*+|\*+$/g,'');
  }
  return meta;
}
export function validateSocialVisualPackage(source) {
  const meta=parseSocialVisualMetadata(source);
  if(!meta.social_visual_policy)return {prospective:false,errors:[],metadata:meta};
  const problems=[];
  if(meta.social_visual_policy!=='v1')problems.push('social_visual_policy must be v1');
  for(const field of REQUIRED)if(meta[field]===undefined||meta[field]==='')problems.push('missing '+field);
  if(!empty(meta.image_url)){
    if(!safeUrl(meta.image_url))problems.push('image_url must be public HTTPS');
    for(const field of ['image_credit','image_creator','image_archive','image_rights_statement','image_license_evidence','image_alt_text'])
      if(empty(meta[field]))problems.push(field+' required for photo');
    if(!safeUrl(meta.image_license_evidence))problems.push('image_license_evidence must be an HTTPS rights record');
    if(!/^(original|public domain|cc0|cc by(?:-sa)? [1-4](?:\.0)?|individually licensed)$/i.test(meta.image_license||''))
      problems.push('image_license must identify documented reuse rights');
    if(/\b(?:synthetic|ai generated|generative ai)\b/i.test(meta.image_rights_statement||''))problems.push('synthetic documentary photo prohibited');
  }else if(empty(meta.photo_fallback_reason)||String(meta.photo_fallback_reason).trim().length<25){
    problems.push('specific photo_fallback_reason required');
  }
  if(!empty(meta.preferred_source_link)){
    if(!safeUrl(meta.preferred_source_link))problems.push('preferred_source_link must be public HTTPS');
    if(safeUrl(meta.preferred_source_link)&&/(^|\.)themissingseat\.org$/i.test(new URL(meta.preferred_source_link).hostname))problems.push('preferred_source_link may not be the TMS article');
    if(!sectionLines(source,'(?:Sources|References)').join('\n').includes(meta.preferred_source_link))problems.push('preferred_source_link must appear in Sources section');
  }
  return {prospective:true,errors:[...new Set(problems)],metadata:meta};
}
