import passiveListener from "../../common/passiveListener";

export default (element, callback) => {
  let scrollPosition = { x: 0, y: 0 };
  let isScheduled = false;

  passiveListener(window, "scroll", () => {
    scrollPosition.x = window.pageXOffset;
    scrollPosition.y = window.pageYOffset;

    if (!isScheduled) {
      setTimeout(() => {
        callback({
          event: {
            type: "scroll",
            x: scrollPosition.x,
            y: scrollPosition.y,
          },
        });
        isScheduled = false;
      }, 100);

      isScheduled = true;
    }
  });
};
