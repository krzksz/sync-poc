import passiveListener from "../../common/passiveListener";
import { construct as constructSelector } from "../../common/selector";

export default (element, callback) => {
  passiveListener(element, "focusin", event => {
    const target = event.target;
    const parent = target.parentNode;
    const selector = constructSelector(target);

    callback({
      event: {
        type: "focusin",
        selector,
        index: Array.prototype.indexOf.call(parent.children, target),
      },
    });
  });
};
