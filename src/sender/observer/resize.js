import passiveListener from "../../common/passiveListener";

export default (element, callback) => {
  let windowDimensions = { w: 0, h: 0 };
  let isScheduled = false;

  passiveListener(window, "resize", () => {
    windowDimensions.w = window.innerWidth;
    windowDimensions.h = window.innerHeight;

    if (!isScheduled) {
      setTimeout(() => {
        const rectObject = element.getBoundingClientRect();
        callback({
          event: {
            type: "resize",
            w: rectObject.width,
            h: rectObject.height,
          },
        });
        isScheduled = false;
      }, 100);

      isScheduled = true;
    }
  });
};
