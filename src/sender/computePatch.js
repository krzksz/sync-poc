import DiffMatchPatch from "./diff_match_patch";

const dmp = new DiffMatchPatch();

export default (current, next) => {
  const patch = dmp.patch_make(current, next);
  const textPatch = dmp.patch_toText(patch);

  return textPatch;
};
