import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { connectDatabase } from './config/database';

const app = express();
const PORT = process.env.PORT || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({ name: 'Octofit Tracker API', status: 'ok' });
});

app.use('/api', routes);

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(400).json({ message: error.message || 'Request failed' });
});

export default app;

if (require.main === module) {
  connectDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Octofit Tracker API listening at ${baseUrl}`);
      });
    })
    .catch((error) => {
      console.error('Unable to start the API:', error);
      process.exitCode = 1;
    });
}
