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
moment.locale('ml');

export default class Posts extends Component {
	render() {
		return (
            <section className="posts-grid row">
                <div className="sub-title title">
                    <h4>{this.props.heading}</h4>
                    {
                        this.props.more &&
                        <a href={this.props.moreLink}>
                            More <FontAwesomeIcon icon={faChevronRight} />
                        </a>
                    }
                </div>
                <div className="container-stories">
                    {
                        this.props.posts.map(post => {
                            const date = moment(post.date, utcFormat);
                            return (
                                <article className="wrapper-post" key={post.id}>
                                    <div className="wrap post-type-image post-image">
                                        <img
                                            className="img-responsive"
                                            src={post.featured_image_url_square}
                                            alt={post.title.rendered}
                                        />
                                    </div>
                                    <div className="wrap post-type-text">
                                        <h2>
                                            <Link to={`/posts/${post.slug}`}>{post.title.rendered}</Link>
                                        </h2>
                                        <div className='post-details'>
                                            <time className="data" dateTime={date.format('YYYY-MM-DD')}>
                                                { date.format('MMM DD, YYYY') }
                                            </time>
                                            <span className="timetoread"> · 5 min to read</span>
                                        </div>
                                        <ContentBlock content={post.excerpt.rendered}/>
                                        <ByAuthors coauthors={post.coauthors}/>
                                        <div className="for-mob-views">
                                            <Link className="btn hidden" to={`/posts/${post.slug}`}>Read</Link>
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
