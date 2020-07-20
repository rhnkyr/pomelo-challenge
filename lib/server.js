'use strict';

const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');

const { JsonArranger } = require('../helpers/json-arranger')
const { GetGithubRepositoriesByKeyword } = require('../helpers/github-repositories')


const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.register(Vision);

server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: '../templates'
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

        return h.view('index', await GetGithubRepositoriesByKeyword('nodejs', request.query.page));

    }
});

exports.init = async () => {

    await server.initialize();
    return server;
};

exports.start = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

