const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: process.env.BACKEND_PORT || 3000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'], // Allow all origins (adjust as needed for security)
      },
    },
  });

  // Health Check Route
  server.route({
    method: 'GET',
    path: '/health',
    handler: (request, h) => {
      return { status: 'ok' };
    },
  });

  // Example API Route
  server.route({
    method: 'GET',
    path: '/api',
    handler: (request, h) => {
      return { message: 'Hello from Hapi API!' };
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
