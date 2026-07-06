const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const PLANS_PATH = path.join(__dirname, 'data', 'plans.json');
const ENROLLMENTS_PATH = path.join(__dirname, 'data', 'enrollments.json');

app.use(cors());
app.use(express.json());

// Small helpers for reading/writing our JSON "database"
async function readJSON(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function writeJSON(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// GET all membership plans
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await readJSON(PLANS_PATH);
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: 'Could not load plans.' });
  }
});

// GET all enrollments (simple admin/debug view)
app.get('/api/enrollments', async (req, res) => {
  try {
    const enrollments = await readJSON(ENROLLMENTS_PATH);
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: 'Could not load enrollments.' });
  }
});

// POST a new enrollment
app.post('/api/enroll', async (req, res) => {
  const { name, email, planId } = req.body;

  if (!name || !email || !planId) {
    return res.status(400).json({ error: 'name, email, and planId are all required.' });
  }

  try {
    const plans = await readJSON(PLANS_PATH);
    const plan = plans.find((p) => p.id === planId);

    if (!plan) {
      return res.status(404).json({ error: `No plan found with id "${planId}".` });
    }

    const enrollments = await readJSON(ENROLLMENTS_PATH);

    const enrollment = {
      id: Date.now().toString(36),
      name,
      email,
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      enrolledAt: new Date().toISOString(),
    };

    enrollments.push(enrollment);
    await writeJSON(ENROLLMENTS_PATH, enrollments);

    res.status(201).json({ success: true, enrollment });
  } catch (err) {
    res.status(500).json({ error: 'Could not save enrollment.' });
  }
});

app.get('/', (req, res) => {
  res.send('Gym Configurator API is running. Try GET /api/plans');
});

app.listen(PORT, () => {
  console.log(`Gym Configurator API listening on http://localhost:${PORT}`);
});
