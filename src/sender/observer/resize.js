import passiveListener from "../../common/passiveListener";

export default (element, callback) => {
  let windowDimensions = { w: 0, h: 0 };
  let isScheduled = false;

  passiveListener(window, "resize", () => {
    windowDimensions.w = window.innerWidth;
    windowDimensions.h = window.innerHeight;

    if (!isScheduled) {
      setTimeout(() => {
        callback({
          event: {
            type: "resize",
            w: windowDimensions.w,
            h: windowDimensions.h,
          },
        });
        isScheduled = false;
      }, 100);

      isScheduled = true;
    }
  });
};
