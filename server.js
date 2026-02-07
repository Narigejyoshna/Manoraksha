// server.js (ESM)
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Example appointments data
let appointments = [
  { id: 1, name: "Ravi Kumar", date: "2025-09-25", time: "10:30 AM", status: "pending" },
  { id: 2, name: "Anjali Sharma", date: "2025-09-25", time: "12:00 PM", status: "confirmed" },
];

// Get all appointments
app.get("/appointments", (req, res) => {
  res.json(appointments);
});

// Book new appointment
app.post("/appointments", (req, res) => {
  const { name, date, time } = req.body;
  const newApp = {
    id: appointments.length + 1,
    name,
    date,
    time,
    status: "pending"
  };
  appointments.push(newApp);
  res.status(201).json(newApp);
});

// Update appointment status
app.put("/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const appointment = appointments.find(a => a.id == id);
  if (!appointment) return res.status(404).json({ message: "Not found" });
  appointment.status = status;
  res.json(appointment);
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
