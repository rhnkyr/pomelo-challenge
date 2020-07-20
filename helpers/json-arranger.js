exports.JsonArranger = (payload) => {

    let obj = []

    for (const key in payload) {

        const objects = payload[key]// Get objects

        for (const o in objects) {

            obj.push(objects[o])// pull all objects same level

        }

    }

    //Filter object by conditions
    const nested = obj.filter((element, idx, array) => {

        const parent = array.find(e => e.id === element.parent_id);

        if (!parent) return true;

        (parent.children = parent.children || []).push(element);

    });

    return nested
};

