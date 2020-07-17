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

            
        

            let obj = [
                /*{ id: 10, title: 'House', level: 0, children: [], parent_id: null },
                { id: 12, title: 'Red Roof', level: 1, children: [], parent_id: 10 },
                { id: 18, title: 'Blue Roof', level: 1, children: [], parent_id: 10 },
                { id: 13, title: 'Wall', level: 1, children: [], parent_id: 10 },
                { id: 17, title: 'Blue Window', level: 2, children: [], parent_id: 12 },
                { id: 16, title: 'Door', level: 2, children: [], parent_id: 13 },
                { id: 15, title: 'Red Window', level: 2, children: [], parent_id: 12 }*/
            ]

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