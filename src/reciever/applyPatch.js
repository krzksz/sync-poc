import DiffMatchPatch from "./diff_match_patch.js";

const dmp = new DiffMatchPatch();

export default (patch, text) => {
  const parsedPatch = dmp.patch_fromText(patch);

  return dmp.patch_apply(parsedPatch, text)[0];
};
