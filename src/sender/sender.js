import * as observer from "./observer";

const send = (snapshot, socket) => {
  console.log({ snapshot });
  socket.send(JSON.stringify(snapshot));
};

const observe = source => {
  // Create WebSocket connection.
  const socket = new WebSocket("ws://localhost:8080");

  // Connection opened
  socket.addEventListener("open", function() {
    const callback = snapshot => {
      snapshot.time = Date.now();
      send(snapshot, socket);
    };

    Object.keys(observer).forEach(name => {
      observer[name](source, callback);
    });
  });
};

export { observe };
