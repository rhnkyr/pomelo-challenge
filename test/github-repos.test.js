'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../lib/server');

describe('GET /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject('/');
        expect(res.statusCode).to.equal(200);
    });

    it('has header NodeJs Repos', async () => {
        const res = await server.inject('/');
        expect(res.result).to.contain('NodeJs Repos');
    });

    it('has not prev and first links if page = 1', async () => {
        const res = await server.inject('/');
        expect(res.result).to.not.contain('prev');
        expect(res.result).to.not.contain('first');
    });

    it('has prev and last links if page > 1', async () => {
        const res = await server.inject('/?page=2');
        expect(res.result).to.contain('prev');
        expect(res.result).to.contain('last');
    });

    it('has no result if page > 100', async () => {
        const res = await server.inject('/?page=101');
        expect(res.result).to.contain('There is no result...');
    });

    it('has table rows', async () => {
        const res = await server.inject('/');
        expect(res.result).to.not.contain('There is no result...');
    });
});