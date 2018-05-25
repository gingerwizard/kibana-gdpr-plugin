
export default function (server) {

  server.route({
    path: '/api/gdpr-plugin/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

}
