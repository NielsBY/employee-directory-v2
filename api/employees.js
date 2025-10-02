import express from "express";
const router = express.Router();
export default router;

import employees from "#db/employees";

function addEmployee(name) {
  const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
  const newEmployee = { id, name };
  employees.push(newEmployee);
  return newEmployee;
}

router
  .route("/")
  .get((req, res) => {
    res.send(employees);
  })
  .post((req, res) => {
    if (!req.body) return res.status(400).send("Body is not provided");

    const { name } = req.body;
    if (!name) return res.status(400).send("Name is not provided");

    const employee = addEmployee(name);
    res.status(201).send(employee);
  });
