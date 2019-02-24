import api from "../../api";

export const warmUpPostsCache = async (store) => {
    await getPostsPage(1, store);
    await getPageList(store);
    await getCateogoryList(store);
};

const getPostsPage = (page, store) => new Promise((resolve) => {
    api.Content.postsByPage(page, true, 100)
        .then((response) => {
            console.log(`Caching posts page ${page}`);
            store.dispatch({ type: 'LOAD_DATA', payload: { type: 'posts', data: response.body } });
            if (page < parseInt(response.headers["x-wp-totalpages"], 10)) {
                const newPage = page + 1;
                getPostsPage(newPage, store);
            } else {
                resolve();
            }
        })
});

const getPageList = (store) => new Promise((resolve) => {
    api.Content.pageList()
        .then((response) => {
            console.log('Caching pages');
            store.dispatch({ type: 'LOAD_PAGES_LIST', payload: response });
            resolve();
        })
});

const getCateogoryList = (store) => new Promise((resolve) => {
    api.Content.categoryList()
        .then((response) => {
            console.log('Caching categories');
            store.dispatch({ type: 'LOAD_CATEGORIES_LIST', payload: response });
            resolve();
        })
});