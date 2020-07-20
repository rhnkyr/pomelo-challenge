'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../lib/server');

const { GetGithubRepositoriesByRepositoryKeyword } = require('../helpers/github-repositories')

describe('GET /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('has header NodeJs Repos', async () => {
        const res = await server.inject('/');
        expect(res.result).to.contain('NodeJs Repos');
    });

    it('has prev link if page = 1', async () => {
        const res = await server.inject('/');
        expect(res.result).to.not.contain('prev');
    });

    it('has prev link if page > 1', async () => {
        const res = await server.inject('/?page=2');
        expect(res.result).to.contain('prev');
    });

    it('has prev link if page > 100', async () => {
        const res = await server.inject('/?page=101');
        expect(res.result).to.contain('There is no result...');
    });

    it('has table rows', async () => {
        const res = await server.inject('/');

        expect(res.result).to.not.contain('There is no result...');
    });
});