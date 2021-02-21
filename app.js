const app = require("./server");

const port = process.env.PORT || "80";
app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`);
});

module.exports = app;