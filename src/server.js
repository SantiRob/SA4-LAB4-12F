const app = require('./app');
const config = require('./config');

const server = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port} (${config.env})`);
});

const handleShutdown = (signal) => {
  console.log(`Received ${signal}. Stopping server...`);
  server.close((err) => {
    if (err) {
      console.error(`Error while closing server on ${signal}:`, err);
      process.exit(1);
    }
    console.log('Server stopped cleanly. Exiting.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = { app, server };
