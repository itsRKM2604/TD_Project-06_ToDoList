const express = require("express");
const body_parser = require("body-parser");
// port = 5454;
port = process.env.PORT || 8080;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

var items = [];

app.get("/", (req, res) => {
  res.render("list", { taskejs: items });
});

app.post("/", (req, res) => {
  let task = req.body.task;
  let status = false;
  items.forEach((item) => {
    if (item.toLowerCase() == task.toLowerCase()) {
      status = true;
    }
  });
  if (!status) {
    items.push(task);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
