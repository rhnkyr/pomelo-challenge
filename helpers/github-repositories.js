const axios = require('axios').default

exports.GetGithubRepositoriesByKeyword = async (keyword, page) => {
    let links = {}, data = {}, total_count
    const per_page = 10

    try {

        const response = await axios.get(
            `https://api.github.com/search/repositories?q=${keyword}&per_page=${per_page}&page=${page}`,
            {
                headers: {
                    'Authorization': 'token 6050f83ef16dacffaddbf14f5d01e34d3ab3d8d7'
                }
            }
        )

        const link = response.headers.link;

        if (link) {
            //link helper for view
            link.replace(/<([^>]*)>;\s*rel="([\w]*)\"/g, function (m, uri, type) {
                links[type] = uri.split('&').pop();
            });
        }

        //get data
        data = response.data.items
        //get total_count of repos
        total_count = response.data.total_count

        return { links, data, total_count }

    } catch (error) {
        return {}
    }


}