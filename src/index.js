import e from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import * as toxicity from '@tensorflow-models/toxicity';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = e();
const port = 3000;

app.use(cors());
app.use(e.json());
app.use(morgan('dev'));
app.use(e.static(path.join(__dirname, '../src/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/submit', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const threshold = 0.5;
  const model = await toxicity.load(threshold);
  const predictions = await model.classify(text);
  const toxicPredictions = predictions.filter(
    (prediction) => prediction.results[0].match
  );

  if (toxicPredictions.length === 0) {
    return res.json({ message: 'No se ha detectado contenido tóxico' });
  }

  res.json(toxicPredictions);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
