const Hapi = require('hapi');
const Inert = require('inert');


exports.serve = async () => {

    const settings = {
        dir: process.env.DIR || '.',
        port: process.env.PORT || 8000,
        host: process.env.HOST || '127.0.0.1'
    };

    const server = new Hapi.server({ port: settings.port, host: settings.host });

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: settings.dir
            }
        }
    });

    await server.start();

    console.log(`Server started: serving directory ${settings.dir} at ${settings.host}:${settings.port}`);
};