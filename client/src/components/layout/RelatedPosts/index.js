import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ContentBlock from "../../utilities/ContentBlock";
import ByAuthors from "../ByAuthors";
import './index.css';
import ImageLoader from "../ImageLoader";

export default class RelatedPosts extends Component {
    render() {
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
