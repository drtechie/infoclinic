import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faHeart} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
import {utcFormat} from "../../utilities/Common/constants";
import "./index.css";

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
                                <article className="wrapper-post">
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
                                        <p>
                                            As a travel urban photographer I have always felt a little unlucky for being born in
                                            Eastern
                                            Europe. We have more of the ugly commie blocks, and less of the beautiful old european
                                            architecture. Maybe I should consider shooting more brutalism...
                                        </p>
                                        <div className="by-writer">
                                            <div
                                                className="icon-author"
                                                style={{backgroundImage: "url('https://place-hold.it/66x66')" }}
                                            >
                                            </div>
                                            <div className="info-author">
                                                <div className="name"><a href="/">Dorian Pellumbi</a></div>
                                                <time className="data" dateTime={date.format('YYYY-MM-DD')}>
                                                    { date.format('MMM DD, YYYY') }
                                                </time>
                                                <span className="timetoread"> · 5 min to read</span>
                                                <span className="views"><FontAwesomeIcon icon={faHeart} />43 109</span>
                                            </div>
                                        </div>
                                        <div className="for-mob-views">
                                            <a
                                                className="btn hidden"
                                                href="/"
                                            >
                                                Read
                                            </a>
                                            <span
                                                className="hidden views"
                                            >
                                    <FontAwesomeIcon icon={faHeart} />
                                    43109
                                </span>
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
