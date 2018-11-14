import React, { Component } from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ml'
import ContentBlock from '../../utilities/ContentBlock';
import SocialLinks from "./socialLinks";
import ByAuthors from "../../layout/ByAuthors";
import api from "../../../api";
import {utcFormat} from "../../utilities/Common/constants";
import './index.css';
moment.locale('ml');

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            randomPosts: [],
        };
    }

    fetchRandomPosts() {
        api.Content.randomPosts().then(
            res => {
                this.setState({randomPosts: res});
            },
            error => {
                console.warn(error);
            }
        );
    }

    componentDidMount() {
        this.fetchRandomPosts();
    }

    render() {
        if (this.props.data) {

            let data = this.props.data;
            const date = moment(data.date, utcFormat);
            return (
                <article className={`single-post ${this.props.slug}`} >
                    <div className="container-post">
                        <div className="post-image">
                            <img className="img-responsive" src="https://picsum.photos/1152/648/?random" alt="" />
                        </div>
                        <div className="post-content">
                            <div className="data-post row">
                                <time className="data" dateTime={date.format('YYYY-MM-DD')}>
                                    { date.format('MMM DD, YYYY') }
                                </time>
                                <span className="timetoread"> · 5 min to read</span>
                            </div>
                            <h1 className="row">{data.title.rendered}</h1>
                            <div className="info-post row">
                                <SocialLinks data={data} />
                            </div>
                            <ContentBlock row={true} content={data.content.rendered} />
                            <div className="sub-share">
                                <SocialLinks data={data} />
                            </div>
                            <div className="writer-social">
                                <ByAuthors coauthors={data.coauthors} bio={true}/>
                            </div>
                        </div>
                        <div className="related-posts">
                            <div className="title">
                                Related posts
                            </div>
                            <div className="related-container clearfix">
                                {
                                    this.state.randomPosts.length > 0 && this.state.randomPosts.map(post => {
                                        return (
                                            <div className="wrap-related" key={post.id}>
                                                <img className="img-responsive"
                                                     src="https://picsum.photos/768/432/?random" alt=""/>
                                                <h2>
                                                    <Link to={`/posts/${post.slug}`}>{post.title.rendered}</Link>
                                                </h2>
                                                <ContentBlock content={post.excerpt.rendered}/>
                                                <ByAuthors coauthors={post.coauthors}/>
                                                <Link
                                                    to={`/posts/${post.slug}`}
                                                    className="btn hidden"
                                                >
                                                    Read
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </article>
            );
        } else {
            return <div></div>
        }
    }
}

export default Post;
