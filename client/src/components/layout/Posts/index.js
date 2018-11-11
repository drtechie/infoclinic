import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faHeart} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
import {utcFormat} from "../../utilities/Common/constants";
import "./index.css";
import ContentBlock from "../../utilities/ContentBlock";

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
                                            src="https://place-hold.it/561x561"
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
                                        <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                        <div className="by-writer">
                                            {
                                                post.coauthors.map(coauthor => {
                                                    return (
                                                        <div className="info-author">
                                                            <div
                                                                className="icon-author"
                                                                style={{backgroundImage: "url('https://place-hold.it/66x66')" }}
                                                            >
                                                            </div>
                                                            <div className="name">
                                                                <Link to={`/authors/${coauthor.user_nicename}`}>{coauthor.display_name}</Link>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
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
