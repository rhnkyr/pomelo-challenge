'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: '/json-arranger',
        handler: (request, h) => {
            const payload = request.payload;

            
        

            let obj = []

            for (const key in payload) {

                const element = payload[key]

                for (const data in element) {

                    obj.push(element[data])

                }

            }

            const nested = obj.filter((elt, idx, arr) => {
                const parent = arr.find(e => e.id === elt.parent_id);
                if (!parent) return true;
                (parent.children = parent.children || []).push(elt);
            });

            return nested

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