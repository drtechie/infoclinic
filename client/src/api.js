import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.REACT_APP_API_URL;

const responseBody = res => res.body;
const responseWithHeaders = res => { return { headers: res.headers, body: res.body } };

const requests = {
	get: url =>
		superagent.get(`${API_ROOT}${url}`).then( responseBody ),
	getWithCredentials: url =>
		superagent.get(`${API_ROOT}${url}`).withCredentials().then( responseBody ),
    getWithHeaders: url =>
        superagent.get(`${API_ROOT}${url}`).then( responseWithHeaders ),
}

const Menus = {
	bySlug: (slug) => 
		requests.get(`/wp-json/react-wp-rest/menus/${slug}`)
}

const Content = {
	data: type =>
		requests.get(`/wp-json/wp/v2/${type}?_embed`),
	dataBySlug: (type, slug) =>
		requests.get(`/wp-json/wp/v2/${type}?slug=${slug}&_embed`),
	previewDataBySlug: (type, slug, wpnonce) =>
		requests.getWithCredentials(`/wp-json/react-wp-rest/preview?type=${type}&slug=${slug}&_wpnonce=${wpnonce}&_embed`),
	pageList: () =>
		requests.get('/wp-json/react-wp-rest/pages/list'),
    stickyPosts: (per_page = 3) =>
        requests.get(`/wp-json/wp/v2/posts?per_page=${per_page}&sticky=true`),
    postsByPage: (page, withHeader, per_page = 10) => {
        if (withHeader) {
            return requests.getWithHeaders(`/wp-json/wp/v2/posts?per_page=${per_page}&page=${page}`)
        }
        return requests.get(`/wp-json/wp/v2/posts?per_page=${per_page}&page=${page}`)
	},
    postsByCategory: (categoryID, page, withHeader, per_page = 10) => {
        if (withHeader) {
            return requests.getWithHeaders(`/wp-json/wp/v2/posts?categories=${categoryID}&per_page=${per_page}&page=${page}`)
        }
        return requests.get(`/wp-json/wp/v2/posts?categories=${categoryID}&per_page=${per_page}&page=${page}`)
	},
    postsByAuthor: (coauthor, page, withHeader, per_page = 10) => {
        if (withHeader) {
            return requests.getWithHeaders(`/wp-json/wp/v2/posts?coauthor=${coauthor}&per_page=${per_page}&page=${page}`)
        }
        return requests.get(`/wp-json/wp/v2/posts?coauthor=${coauthor}&per_page=${per_page}&page=${page}`)
    },
    categoryList: () =>
        requests.get('/wp-json/wp/v2/categories?per_page=100'),
    randomPosts: () =>
        requests.get('/wp-json/posts/random'),
    getUser: (slug) =>
        requests.get(`/wp-json/wp/v2/users?slug=${slug}`),
} 

export default {
	Menus,
	Content
}
