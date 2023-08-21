const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { doctorModel } = require("../models/doctormodel");
const { auth } = require("../middleware/auth.middleware");

const doctorRouter = express.Router();

doctorRouter.get("/appointments", async (req, res) => {
  try {
    let { specialization, order, name } = req.query;
    let filters = {};

    if (specialization) {
      filters.specialization = specialization;
    }

    if (name) {
      filters.name = { $regex: name, $options: "i" };
    }

    let sortOptions = {};

    if (order === "asc") {
      sortOptions.date = 1;
    } else if (order === "desc") {
      sortOptions.date = -1;
    }

    const doctors = await doctorModel.find(filters).sort(sortOptions);

    res.send({ data: doctors });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error in getting doctor information" });
  }
});

doctorRouter.post("/addappointment", auth, async (req, res) => {
  try {
    const appointment = req.body;
    const date = new Date();
    const isoString = date.toISOString();
    appointment.date = isoString;
    let doctors = new doctorModel(appointment);
    await doctors.save();
    res.status(200).send(appointment);
  } catch (error) {
    res.status(400).send("not added");
  }
});

doctorRouter.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDetails = req.body;
    await doctorModel.findByIdAndUpdate(id, updatedDetails);
    res.json({ message: "Appointment updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete
doctorRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await doctorModel.findByIdAndDelete(id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  doctorRouter,
};
