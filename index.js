const express = require("express");
const body_parser = require("body-parser");
// port = 5454;
port = process.env.PORT || 8080;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

let items = [];
let taskid = 1;

app.get("/", (req, res) => {
  res.render("list", { taskejs: items });
});

app.post("/", (req, res) => {
  let task = req.body.task;
  let status = false;
  items.forEach((item) => {
    if (item.text.toLowerCase() == task.toLowerCase()) {
      status = true;
    }
  });
  if (!status) {
    items.push({ id: taskid++, text: task });
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  items = items.filter((item) => item.id !== idToDelete);
  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const idToEdit = parseInt(req.params.id);
  const newTask = req.body.newTask;

  items.forEach((item) => {
    if (item.id === idToEdit) {
      item.text = newTask;
    }
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
