import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('dist/config/swagger.yaml');
export const handleAPIDocs = (router: Router) =>
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
