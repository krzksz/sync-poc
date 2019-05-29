let eventOptions = false;
try {
  let opts = Object.defineProperty({}, "passive", {
    get: function() {
      eventOptions = { passive: true };
    },
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}

export default (element, name, callback) =>
  element.addEventListener(name, callback, eventOptions);
