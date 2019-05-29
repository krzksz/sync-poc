import passiveListener from "../../common/passiveListener";
import { construct as constructSelector } from "../../common/selector";
import anonymize from "../../common/anonymize";

export default (element, callback) => {
  passiveListener(element, "change", event => {
    const target = event.target;
    if (Number.isInteger(target.selectedIndex)) {
      return;
    }
    const parent = target.parentNode;
    const selector = constructSelector(target);

    callback({
      event: {
        type: "change",
        selector,
        index: Array.prototype.indexOf.call(parent.children, target),
        value: anonymize(target.value),
      },
    });
  });
};
