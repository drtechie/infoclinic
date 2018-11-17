import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Swiper from "swiper";
import moment from "moment";
import {Link} from "react-router-dom";
import "./randomCategory.scss";
import api from "../../../api";
import ByAuthors from "../../layout/ByAuthors";
import { utcFormat } from "../../utilities/Common/constants";
import "moment/locale/ml";


moment.locale('ml');

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
                api.Content.postsByCategory(category.id, 1, false, 5).then(
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
                                            const date = moment(post.date, utcFormat);
                                            return (
                                                <article
                                                    className="swiper-slide post-swiper overlay"
                                                    style={{backgroundImage: `url('${post.featured_image_url_mini}')` }}
                                                    key={post.id}
                                                >
                                                    <ByAuthors coauthors={post.coauthors}/>
                                                    <h2 title={post.title.rendered}>
                                                        <Link to={`/posts/${post.slug}`}>{post.title.rendered}</Link>
                                                    </h2>
                                                    <div className='post-details'>
                                                        <time className="data" dateTime={date.format('YYYY-MM-DD')}>
                                                            { date.format('MMM DD, YYYY') }
                                                        </time>
                                                        <span className="timetoread"> · 5 min to read</span>
                                                    </div>
                                                </article>
                                            )
                                        })
                                    }
                                </div>
                                <div className="swiper-pagination horizontal"/>
                            </div>
                        </div>
                        <article className="wrapper-post post-image overlay"  style={{backgroundImage: `url('${posts[3].featured_image_url_mini}')` }}>
                            <h2 title={posts[3].title.rendered}>
                                <Link to={`/posts/${ posts[3].slug}`}>{ posts[3].title.rendered }</Link>
                            </h2>
                            <div className='post-details'>
                                <time className="data" dateTime={moment(posts[3].date, utcFormat).format('YYYY-MM-DD')}>
                                    { moment(posts[3].date, utcFormat).format('MMM DD, YYYY') }
                                </time>
                                <span className="timetoread"> · 5 min to read</span>
                            </div>
                        </article>
                        <article className="wrapper-post post-image overlay"  style={{backgroundImage: `url('${posts[4].featured_image_url_mini}')` }}>
                            <h2 title={posts[4].title.rendered}>
                                <Link to={`/posts/${ posts[4].slug}`}>{ posts[4].title.rendered }</Link>
                            </h2>
                            <div className='post-details'>
                                <time className="data" dateTime={moment(posts[4].date, utcFormat).format('YYYY-MM-DD')}>
                                    { moment(posts[4].date, utcFormat).format('MMM DD, YYYY') }
                                </time>
                                <span className="timetoread"> · 5 min to read</span>
                            </div>
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