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

        //determine sub objects
        const parent = array.find(e => e.id === element.parent_id);

        //if undefined then it is a parent
        if (!parent) return true;

        //otherwise push to parent's children array
        (parent.children = parent.children || []).push(element);

    });

    return nested
};

