import cors from 'cors';
import express from 'express';
import routesV1 from './api/v1/routes';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use('/api/v1', routesV1);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
