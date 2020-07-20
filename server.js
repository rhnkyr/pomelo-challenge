'use strict';

const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');

const { JsonArranger } = require('./helpers/json-arranger')
const { GetGithubRepositoriesByRepositoryKeyword } = require('./helpers/github-repositories')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(Vision);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });

    server.route({
        method: 'POST',
        path: '/json-arranger',
        handler: (request, h) => {

            //Get json payload
            const payload = request.payload;

            return JsonArranger(payload)

        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {

            const { data, links, total_count } =
                await GetGithubRepositoriesByRepositoryKeyword(request.query.page, 'nodejs')

            return h.view('index', { data, total_count, links });

        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();