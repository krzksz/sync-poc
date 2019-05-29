import passiveListener from "../../common/passiveListener";

export default (element, callback) => {
  let isScheduled = false;
  const mousePosition = { x: 0, y: 0 };

  passiveListener(element, "mousemove", event => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;

    if (!isScheduled) {
      setTimeout(() => {
        isScheduled = false;

        callback({
          event: {
            type: "mousemove",
            x: mousePosition.x,
            y: mousePosition.y,
          },
        });
      }, 100);
      isScheduled = true;
    }
  });
};
