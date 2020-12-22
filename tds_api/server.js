const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

todos = [

];
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
//checked
app.put("/check", (req, res) => {
  const { id } = req.body;
  todos.forEach((element) => {
    if (element.id == id) {
      element.isChecked = !element.isChecked;
      console.log(element);
      res.json(element.isChecked);
    }
  });
});
//delete
app.delete("/delete", (req, res) => {
  const { id } = req.body;
  todos.map((element, i) => {
    if (element.id == id) {
      todos.splice(i,1);
      res.json(todos);
      console.log(i,id);
    }
  });

  
});

app.listen(2000, () => console.log("serveur en cour"));
