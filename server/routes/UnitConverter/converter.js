import express from 'express';
const router = express.Router();

const conversionRates = {
  Length: {
    cm: 1,
    m: 100,
    ft: 30.48,
  },
  Weight: {
    g: 1,
    kg: 1000,
    lb: 453.592,
  },
};

// Get available units per category
router.get('/categories', (req, res) => {
  res.json(Object.keys(conversionRates));
});

router.get('/units/:category', (req, res) => {
  const category = req.params.category;
  if (conversionRates[category]) {
    res.json(Object.keys(conversionRates[category]));
  } else {
    res.status(400).json({ error: 'Invalid category' });
  }
});

// Convert value
router.post('/convert', (req, res) => {
  const { category, from, to, value } = req.body;

  if (!conversionRates[category]) return res.status(400).json({ error: 'Invalid category' });

  const fromRate = conversionRates[category][from];
  const toRate = conversionRates[category][to];

  if (!fromRate || !toRate) return res.status(400).json({ error: 'Invalid unit selection' });

  const converted = (value * fromRate) / toRate;
  res.json({ result: converted });
});

export default router;
