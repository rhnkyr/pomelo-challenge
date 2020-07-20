const axios = require('axios').default

exports.GetGithubRepositoriesByRepositoryKeyword = async (page, keyword) => {
    let links = {}, data = {}, total_count
    const per_page = 10

    try {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${keyword}&per_page=${per_page}&page=${page || 1}`,
            {
                headers: {
                    'Authorization': 'token 6050f83ef16dacffaddbf14f5d01e34d3ab3d8d7'
                }
            })

        const link = response.headers.link;

        if (link) {
            link.replace(/<([^>]*)>;\s*rel="([\w]*)\"/g, function (m, uri, type) {
                links[type] = uri.split('&').pop();
            });
        }

        data = response.data.items
        total_count = response.data.total_count

        return { links, data, total_count }

    } catch (error) {
        //console.log(error.response.status)
        return {}
    }


}