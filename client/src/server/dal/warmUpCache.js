import api from "../../api";

export const warmUpPostsCache = (store) =>  {
    getPage(1, store);
};

const getPage = (page, store) => {
    api.Content.postsByPage(page, true, 100)
        .then((response) => {
            console.log(`Caching page ${page}`);
            store.dispatch({ type: 'LOAD_DATA', payload: { type: 'posts', data: response.body } });
            if (parseInt(response.headers["x-wp-totalpages"], 10) < page) {
                const newPage = page + 1;
                getPage(newPage, store);
            }
        })
}