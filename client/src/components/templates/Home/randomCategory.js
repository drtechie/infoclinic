import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import Swiper from "swiper";
import './randomCategory.scss'
import api from "../../../api";

const mapStateToProps = (state) => ({
    categoriesList: state.api.lists.categories,
});

class RandomCategory extends Component {
    constructor(props){
        super(props);
        this.categorySwiperContainer = React.createRef();
        this.state = {
            posts: [],
        };
    }

    initializeSlider() {
        if (this.categorySwiperContainer.current) {
           setTimeout(() => {
                new Swiper(this.categorySwiperContainer.current, {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                });
            }, 200);
        }
    }

    fetchRandomCategory() {
        if (this.props.categoriesList && this.props.categoriesList.length > 0) {
            const atLeastFivePosts = this.props.categoriesList.filter(category => category.count >= 5);
            if (atLeastFivePosts.length > 0) {
                const category = atLeastFivePosts[Math.floor(Math.random()*atLeastFivePosts.length)];
                api.Content.postsByCategory(category.id, 1, 5).then(
                    res => {
                        this.setState({posts: res});
                        this.initializeSlider();
                    },
                    error => {
                        console.warn(error);
                    }
                );
            }

        }
    }

    componentDidMount() {
        this.fetchRandomCategory();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.categoriesList !== this.props.categoriesList) {
            this.fetchRandomCategory();
        }
    }

    render() {
        const { posts }= this.state;
        if (posts.length > 0) {
            return (
                <section id="top-stories" className="row" key='category-random'>
                    <div className="sub-title title">
                        <h4>Today’s top stories</h4>
                        <a href="/">More <FontAwesomeIcon icon={faChevronRight} /></a>
                    </div>
                    <div className="container-stories clearfix">
                        <div className="wrapper-post ">
                            <div className="wrap post-type-swiper" ref={this.categorySwiperContainer}>
                                <div className="swiper-wrapper">
                                    {
                                        posts.slice(0, 3).map(post => {
                                            return (
                                                <article
                                                    className="swiper-slide post-swiper overlay"
                                                    style={{backgroundImage: "url('https://place-hold.it/763x563')" }}
                                                    key={post.id}
                                                >
                                                    <div className="by-writer">
                                                        <div className="icon-author" style={{backgroundImage: "url('https://place-hold.it/63x63')" }}>
                                                        </div>
                                                        <div className="info-author">
                                                            <div className="name"><a href="/">William Wright</a>
                                                            </div>
                                                            <time className="data" dateTime="2017-07-20"> Jan 20, 2017</time>
                                                            <span className="timetoread"> · 5 min to read</span>
                                                        </div>
                                                    </div>
                                                    <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                                                    <h2 title="Why every travel photographer should carry a notebook">
                                                        <a href="/">
                                                            {post.title.rendered}
                                                        </a>
                                                    </h2>
                                                </article>
                                            )
                                        })
                                    }
                                </div>
                                <div className="swiper-pagination horizontal"/>
                            </div>
                        </div>
                        <article className="wrapper-post post-image overlay"  style={{backgroundImage: "url('https://place-hold.it/379x263')" }}>
                            <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                            <h2 title="Don’t date a girl who travels">
                                <a href="/">{ posts[3].title.rendered }</a>
                            </h2>
                        </article>
                        <article className="wrapper-post post-image overlay"  style={{backgroundImage: "url('https://place-hold.it/379x263')" }}>
                            <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                            <h2 title="Don’t date a girl who travels">
                                <a href="/">{ posts[4].title.rendered }</a>
                            </h2>
                        </article>
                        <div className="holder">article of the day</div>
                    </div>
                </section>
            );
        }
        return null;

    }
}

export default connect(mapStateToProps)(RandomCategory);