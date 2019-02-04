import React, { Component } from 'react';
import moment from "moment";
import 'moment/locale/ml'
import ContentBlock from '../../utilities/ContentBlock';
import SocialLinks from "./socialLinks";
import ByAuthors from "../../layout/ByAuthors";
import api from "../../../api";
import {utcFormat} from "../../utilities/Common/constants";
import './index.css';
import RelatedPosts from "../../layout/RelatedPosts";
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
                            <img className="img-responsive" src={data.featured_image_url} alt="" />
                        </div>
                        <div className="post-content">
                            <div className="data-post row">
                                <time className="data" dateTime={date.format('YYYY-MM-DD')}>
                                    { date.format('MMM DD, YYYY') }
                                </time>
                                <span className="timetoread"> · {data.reading_time} മിനിറ്റ് വായന</span>
                            </div>
                            <h1 className="row" dangerouslySetInnerHTML={{ __html: data.title.rendered }} />
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
                        <RelatedPosts posts={this.state.randomPosts} heading='കൂടുതൽ വായനയ്ക്ക്'/>
                    </div>
                </article>
            );
        } else {
            return <div></div>
        }
    }
}

export default Post;
