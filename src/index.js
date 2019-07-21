import server from './server';
import models from './models';

const port = process.env.PORT || '4000';
async function start() {
  models.sequelize.sync().then(() => {
    server.listen(
      {
        port,
      },
      () => {
        console.log(`Server is running on http://localhost:${port}`);
      }
    );
  });
}

start();
