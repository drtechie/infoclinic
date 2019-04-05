import React, { Component } from 'react';
import RandomCategory from "./randomCategory";
import Posts from "../../layout/Posts";
import api from "../../../api";
import Categories from "../../layout/Categories";
import infoclinicCover from "../../../assets/infoclnic-cover.jpg";
import infoclinicCoverSmall from "../../../assets/infoclnic-cover-small.jpg";
import './index.css';
import RelatedPosts from "../../layout/RelatedPosts";
import ImageLoader from "../../layout/ImageLoader";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loading: true,
        };
        this.fetchPosts();
    }

    fetchPosts() {
        api.Content.postsByPage(1).then(
            res => {
                this.setState({posts: res});
                this.setState({loading: false});
            },
            error => {
                this.setState({loading: false});
                console.warn(error);
            }
        );
    }

	render() {
        const { stickies } = this.props.data;
        return [
            <div
                id="cover-image"
                key='cover'
            >
                <ImageLoader
                    imgSmall={ infoclinicCoverSmall }
                    imgLarge={ infoclinicCover }
                    paddingBottom='40%'
                    guid='infoclinic-cover'
                    altText='Infoclinic cover'
                />
            </div>,
            <div
                id="featured-posts"
                key='featured-posts'
            >
                <RelatedPosts
                    posts={stickies}
                    heading='തിരഞ്ഞെടുത്ത ലേഖനങ്ങൾ'
                />
            </div>,
            <Posts
                more={true}
                moreLink="/posts?page=2"
                heading="പുതിയ പോസ്റ്റുകൾ"
                footerMore={true}
                footerLink={'/posts?page=2'}
                footerMoreText='കൂടുതൽ'
                key="latest-posts"
                posts={this.state.posts}
                loading={this.state.loading}
            />,
            <RandomCategory
                key="random-category"
            />,
            <Categories
                key='all-categories'
                heading="മികച്ച വർഗ്ഗങ്ങൾ"
                more={true}
                moreLink="/categories"
                top={true}
            />
        ];
	};
}

export default Home;
