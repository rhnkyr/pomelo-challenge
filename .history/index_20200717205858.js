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

            /*var data = [{ depth: 0, id: "f35vz2f" }, { depth: 0, id: "f359354" }, { depth: 1, id: "f35e0b0", parent_id: "f359354" }, { depth: 2, id: "f35ji24", parent_id: "f35e0b0" }, { depth: 2, id: "f35rnwb", parent_id: "" }, { depth: 2, id: "f35ojh4", parent_id: "f35e0b0" }, { depth: 3, id: "f35lmch", parent_id: "f35ji24" }, { depth: 3, id: "f35kl96", parent_id: "f35ji24" }],
                tree = function (data, root) {
                    var t = {};
                    data.forEach(o => {
                        Object.assign(t[o.id] = t[o.id] || {}, o);
                        t[o.parent_id] = t[o.parent_id] || {};
                        t[o.parent_id].children = t[o.parent_id].children || [];
                        t[o.parent_id].children.push(t[o.id]);
                    });
                    return t[root].children;
                }(data, undefined);

            console.log(tree);

            return ''*/

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

                    delete (element[data]['children'])
                    obj.push(element[data])

                }

            }

            //return obj

            const nested = obj.filter((elt, idx, arr) => {
                const parent = arr.find(e => e.id === elt.parent_id);
                if (!parent) return true;
                (parent.children = parent.children || []).push(elt);
            });

            console.log(nested);

            return nested


            /*var t = {};

            obj.forEach(o => {
                Object.assign(t[o.id] = t[o.id] || {}, o);
                t[o.parent_id] = t[o.parent_id] || {};
                t[o.parent_id].children = t[o.parent_id].children || [];
                t[o.parent_id].children.push(t[o.id]);

                console.log(t)
            });

            //todo burda kaldik
            return t[0];*/
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