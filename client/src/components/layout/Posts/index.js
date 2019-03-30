import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
import 'moment/locale/ml'
import {utcFormat} from "../../utilities/Common/constants";
import "./index.css";
import ByAuthors from "../ByAuthors";
import ContentBlock from "../../utilities/ContentBlock";
import Loader from "../Loader";
import ImageLoader from "../ImageLoader";
moment.locale('ml');

export default class Posts extends Component {
    render() {
        return (
            <section className="posts-grid row">
                <div className="sub-title title">
                    <h4 dangerouslySetInnerHTML={{ __html: this.props.heading }}/>
                    {
                        this.props.more &&
                        <Link to={this.props.moreLink}>
                            കൂടുതൽ <FontAwesomeIcon icon={faChevronRight} />
                        </Link>
                    }
                </div>
                <div className="container-stories">
                    {
                        this.props.loading ?
                            <Loader/>
                            :
                            this.props.posts.map(post => {
                                const date = moment(post.date, utcFormat);
                                return (
                                    <article
                                        className={`wrapper-post ${post.featured_image_url_mini ? '' : 'no-image' }` }
                                        key={post.id}
                                    >
                                        <div className="wrap post-type-image post-image">
                                            {
                                                post.featured_image_url &&
                                                <ImageLoader
                                                    imgSmall={ post.featured_image_url_thumb }
                                                    imgLarge={ post.featured_image_url_mini }
                                                    paddingBottom='51%'
                                                    guid={ post.slug }
                                                    altText={ post.slug }
                                                />
                                            }
                                        </div>
                                        <div className="wrap post-type-text">
                                            <h2>
                                                <Link to={`/posts/${post.slug}`}>
                                                    <span dangerouslySetInnerHTML={{ __html: post.title.rendered }}/>
                                                </Link>
                                            </h2>
                                            <div className='post-details'>
                                                <time className="data" dateTime={date.format('YYYY-MM-DD')}>
                                                    { date.format('MMM DD, YYYY') }
                                                </time>
                                                <span className="timetoread"> · {post.reading_time} മിനിറ്റ് വായന</span>
                                            </div>
                                            <ContentBlock content={post.excerpt.rendered}/>
                                            <ByAuthors coauthors={post.coauthors}/>
                                            <div className="for-mob-views">
                                                <Link className="btn hidden" to={`/posts/${post.slug}`}>വായിക്കുക</Link>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })
                    }
                </div>
                {
                    this.props.footerMore &&
                    <Link to={this.props.footerLink} >
                        <button className="posts-btn btn" name="send">
                            {this.props.footerMoreText}
                        </button>
                    </Link>
                }
            </section>
        );
    }
}
