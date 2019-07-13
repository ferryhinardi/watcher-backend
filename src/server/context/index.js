import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';
import models from 'models';

export default async function context({ req }) {
  const dataloaderContext = createContext(models.sequelize);
  const { headers } = req;

  if (headers.authorization) {
    token = headers.authorization.replace('Bearer ', '');
  }

  return {
    [EXPECTED_OPTIONS_KEY]: dataloaderContext,
  };
}
