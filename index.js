const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Task 1', description: 'This is task 1', done: false },
  { id: 2, title: 'Task 2', description: 'This is task 2', done: true },
  { id: 3, title: 'Task 3', description: 'This is task 3', done: true }


]

app.get('/', (req, res) => {
  res.json({ "name": 'TASK API', "version": "1.0", "endpoints": ["/tasks"] });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  if (typeof req.body.title !== 'string' || !req.body.title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = {
    id: Math.max(0, ...tasks.map(task => task.id)) + 1,
    title: req.body.title,
    done: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: `Task ${req.params.id} not found` });
  }
  res.json(task);
});


app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

