import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import queryString from 'qs';
import { connect } from "react-redux";
import { default as PostsList } from "../../layout/Posts";
import Pagination from './pagination';

import './index.css';
import api from "../../../api";


const mapStateToProps = (state) => ({
    categoriesList: state.api.lists.categories,
});

class Posts extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            total: 0,
            currentPage: 1,
            heading: 'All Posts',
        };
    }

    fetchPosts() {
        const values = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
        const page = parseInt(values.page, 10) || 1;
        this.setState({currentPage: page});
        const coauthor = values.author;
        const categorySlug = values.category;
        let categoryID;
        let req;
        if (categorySlug) {
            let category = this.props.categoriesList.find(cat => cat.slug === categorySlug);
            categoryID = category.id;
            req =  api.Content.postsByCategory(categoryID, page, true);
            this.setState({heading: `Posts belonging to ${category.name}`})
        } else if (coauthor) {
            req =  api.Content.postsByAuthor(coauthor, page, true);
            this.setState({heading: `Posts written by ${coauthor}`})
        } else {
            req =  api.Content.postsByPage(page, true);
        }
        req.then(
            res => {
                this.setState({posts: res.body});
                this.setState({total: parseInt(res.headers["x-wp-total"], 10)});
            },
            error => {
                console.warn(error);
            }
        );
    }

    componentDidMount() {
        this.fetchPosts();
    }

    render() {
        return [
            <div className="margin-top-20" key="post-list">
                <PostsList
                    more={false}
                    heading={this.state.heading}
                    footerMore={false}
                    posts={this.state.posts}
                />
            </div>,
            <div className="posts-grid row pagination-grid bottom" key="pagination-bottom">
                <Pagination
                    total={this.state.total}
                    currentPage={this.state.currentPage}
                />
            </div>,
        ];
    }
}

export default withRouter(connect(mapStateToProps)(Posts));
