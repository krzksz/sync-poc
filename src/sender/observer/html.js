import anonymize from "../../common/anonymize";
import computePatch from "../computePatch";
import { calculate as calculateHash } from "../../common/hash";

export default (source, callback) => {
  let hash = calculateHash("");
  let previousHTML = "";
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  };

  const mutationCallback = () => {
    const newHTML = source.innerHTML
      .replace(
        /value="([^"]+)"/gm,
        (match, value) => `value="${anonymize(value)}"`
      )
      .replace(
        /value='([^']+)'/gm,
        (match, value) => `value='${anonymize(value)}'`
      );
    const patch = computePatch(previousHTML, newHTML);

    callback({ patch, hash });

    previousHTML = newHTML;
    hash = calculateHash(newHTML);
  };
  mutationCallback();

  const observer = new MutationObserver(mutationCallback);
  observer.observe(source, config);
};
