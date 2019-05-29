import applyPatch from "./applyPatch";

const cursor = document.querySelector("#cursor");

const eventsHistory = {
  focusin: null,
  select: {},
  change: {},
};

const applyEvent = (event, target) => {
  const index = event.index;
  let element;

  switch (event.type) {
    case "focusin":
      element = target.querySelector(
        `${event.selector}:nth-child(${index + 1})`
      );
      if (!element) {
        return;
      }

      element.focus();
      eventsHistory.focusin = event;
      break;
    case "change":
      element = target.querySelector(
        `${event.selector}:nth-child(${index + 1})`
      );
      if (!element) {
        return;
      }

      element.click();
      element.value = event.value;
      eventsHistory.change[event.selector] = event;
      break;
    case "select":
      element = target.querySelector(event.selector);
      if (!element) {
        return;
      }

      element.selectedIndex = index;
      element.value = element.querySelector(`:nth-child(${index + 1})`).value;
      eventsHistory.select[event.selector] = event;
      break;
    case "mousemove":
      console.log(event.x, event.y);
      cursor.style.transform = `translate3d(${event.x}px, ${event.y}px, 0)`;
      break;
    case "scroll":
      console.log(event.x, event.y);
      window.scroll({
        behavior: "smooth",
        top: event.y,
        left: event.x,
      });
      break;
  }
};

const redoEvents = (events, target) => {
  if (events.focusin) {
    applyEvent(events.focusin, target);
  }

  Object.values(eventsHistory.change).forEach(event => {
    applyEvent(event, target);
  });

  Object.values(eventsHistory.select).forEach(event => {
    applyEvent(event, target);
  });
};

const listen = target => {
  // Create WebSocket connection.
  const socket = new WebSocket("ws://localhost:8080");

  // Listen for messages
  socket.addEventListener("message", event => {
    const snapshot = JSON.parse(event.data);
    console.log({ snapshot });

    if (snapshot.html) {
      target.innerHTML = snapshot.html;
      redoEvents(eventsHistory, target);
    }

    if (snapshot.patch) {
      target.innerHTML = applyPatch(snapshot.patch, target.innerHTML);
      redoEvents(eventsHistory, target);
    }

    if (snapshot.event) {
      applyEvent(snapshot.event, target);
    }
  });
};

export { listen };
