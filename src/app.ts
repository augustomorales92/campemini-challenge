import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import {policies, clients, authenticate} from './routes'
import { errorHandler, noRoutedMatched } from './helpers/error-handler';
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');


dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(morgan('tiny'));

app.get("/", (req, res) => {
  res.redirect(301, '/api-docs');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/authenticate', authenticate);
app.use('/policies', policies);
app.use('/clients', clients);

app.use(errorHandler);
app.get('*', noRoutedMatched);

app.listen(process.env.PORT || 3000, () => {
  console.log(`linsten on port ${process.env.PORT}`);
});

export default app;
