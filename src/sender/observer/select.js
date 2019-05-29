import passiveListener from "../../common/passiveListener";
import { construct as constructSelector } from "../../common/selector";
export default (element, callback) => {
  passiveListener(element, "change", event => {
    const target = event.target;
    const index = target.selectedIndex;
    if (!Number.isInteger(index)) {
      return;
    }
    const selector = constructSelector(target);

    callback({
      event: {
        type: "select",
        selector,
        index,
      },
    });
  });
};
