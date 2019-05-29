const WebSocket = require("ws");

const DiffMatchPatch = require("diff-match-patch");
const dmp = new DiffMatchPatch();

const wss = new WebSocket.Server({ port: 8080 });
let html = "";

wss.on("connection", function connection(ws) {
  ws.send(JSON.stringify({ html }));

  ws.on("message", function incoming(data) {
    const snapshot = JSON.parse(data);
    console.log({ snapshot });
    if (snapshot.patch) {
      const parsedPatch = dmp.patch_fromText(snapshot.patch);
      html = dmp.patch_apply(parsedPatch, html)[0];
    }

    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
