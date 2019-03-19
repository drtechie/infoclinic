import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ContentBlock from "../../utilities/ContentBlock";
import ByAuthors from "../ByAuthors";
import './index.css';

export default class RelatedPosts extends Component {
    render() {
        console.log(this.props.posts);
        if (this.props.posts) {
            return (
                <div className="related-posts">
                    <div className="title">
                        {this.props.heading}
                    </div>
                    <div className="related-container clearfix">
                        {
                            this.props.posts.length > 0 && this.props.posts.map(post => {
                                return (
                                    <div className="wrap-related" key={post.id}>
                                        <img className="img-responsive"
                                             src={post.featured_image_url_mini} alt=""/>
                                        <h2>
                                            <Link to={`/posts/${post.slug}`}>
                                                <span dangerouslySetInnerHTML={{ __html: post.title.rendered }}/>
                                            </Link>
                                        </h2>
                                        <ContentBlock content={post.excerpt.rendered}/>
                                        <ByAuthors coauthors={post.coauthors}/>
                                        <Link
                                            to={`/posts/${post.slug}`}
                                            className="btn hidden"
                                        >
                                            വായിക്കുക
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )

        }
        return null;
    }
}
