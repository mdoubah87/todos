const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

todos = [];
app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.json(todos);
});

//ajout
app.post("/ajout", (req, res) => {
  const { todo } = req.body;
  if (todo) {
    const ligne = { id: uuidv4(), item: todo, isChecked: false };
    console.log(ligne.id);
    todos.push(ligne);
    res.json(todos);
  }
});
app.put("/completedAll", (req, res) => {
  const vrai = todos.find((element) => {
    return element.isChecked == req.body.isCompleted;
  });
  if (vrai) {
    todos.forEach((element) => {
      element.isChecked = true;
    });
  } else {
    todos.forEach((element) => {
      element.isChecked = false;
    });
  }
  res.json(todos);
});
//checked
app.put("/check", (req, res) => {
  const { id } = req.body;
  todos.forEach((element) => {
    if (element.id === id) {
      element.isChecked = !element.isChecked;
      console.log(element);
      res.json({ el: element.isChecked, tod: todos });
    }
  });
});
app.put("/modifie", (req, res) => {
  const { id, text } = req.body;
  console.log(req.body);
  todos.forEach((element) => {
    if (element.id === id) {
      element.item = text;
      console.log(element);
      res.json(todos);
    }
  });
});
//delete
app.delete("/delete", (req, res) => {
  const { id } = req.body;
  console.log(" hello", id);

  todos.map((element, i) => {
    if (element.id == id) {
      todos.splice(i, 1);
      res.json(todos);
      console.log(i, id);
    }
  });
});
app.delete("/clearCompleted", (req, res) => {
  const { isCompleted } = req.body;
  console.log(req.body);
  todos.map((element, i) => {
    if (element.isChecked == isCompleted) {
      todos.splice(i, 1);
      console.log(element);
    }
  });
  res.json(todos);
  
});

app.get("/completed", (req, res) => {
  const completed = [];
  todos.map((element) => {
    if (element.isChecked == true) {
      completed.push(element);
    }
  });
  res.json(completed);
});
app.get("/active", (req, res) => {
  const active = [];
  todos.map((element) => {
    if (element.isChecked === false) {
      active.push(element);
    }
  });
  res.json(active);
});

app.listen(2000, () => console.log("serveur en cour"));
