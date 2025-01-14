import express from 'express';
import cors from 'cors';

import { route } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);


app.listen(3333, () => console.log("Server is up to http://localhost:3333"));