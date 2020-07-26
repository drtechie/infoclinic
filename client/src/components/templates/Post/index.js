import React, { Component } from 'react';
import moment from "moment";
import 'moment/locale/ml';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ContentBlock from '../../utilities/ContentBlock';
import SocialLinks from "./socialLinks";
import ByAuthors from "../../layout/ByAuthors";
import api from "../../../api";
import {utcFormat} from "../../utilities/Common/constants";
import './index.css';
import RelatedPosts from "../../layout/RelatedPosts";
import Categories from "../../layout/Categories";
import Loader from "../../layout/Loader";
import ImageLoader from "../../layout/ImageLoader";
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

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.fetchRandomPosts();
        }
    }

    render() {
        const getCategory = (categoryID) => {
          if (this.props.categoriesList) {
              return this.props.categoriesList.find(cat => cat.id === categoryID)
          }
          return '';
        };


        if (this.props.data) {
            let data = this.props.data;
            const date = moment(data.date, utcFormat);
            const isVideo = data.format === 'video';
            const isStandard = data.format === 'standard'
            return [
                <article className={`single-post ${this.props.slug}`} key='single-post'>
                    <div className="container-post">
                        {
                            data.featured_image_url &&
                            <div className="post-image">
                                <ImageLoader
                                    imgSmall={ data.featured_image_url_thumb }
                                    imgLarge={ data.featured_image_url }
                                    paddingBottom='51%'
                                    guid='featured-image'
                                    altText={ data.title.rendered }
                                />
                            </div>
                        }
                        <div className="post-content">
                            <div className="data-post row">
                                <time className="data" dateTime={date.format('YYYY-MM-DD')}>
                                    { date.format('MMM DD, YYYY') }
                                </time>
                                {
                                    isStandard &&
                                    <span className="timetoread"> · {data.reading_time} മിനിറ്റ് വായന</span>
                                }
                            </div>
                            <h1 className="row" dangerouslySetInnerHTML={{ __html: data.title.rendered }} />
                            <div className="info-post row">
                                {
                                    data.categories.map((cat) => {
                                        const category = getCategory(cat);
                                        return (
                                            <Link key={category.id} to={`/posts?category=${category.slug}`} className='category-badge'>
                                                <span className="badge" key={cat}>{category.name}</span>
                                            </Link>
                                        )
                                    })
                                }
                                <SocialLinks data={data} />
                            </div>
                            <ContentBlock row={true} content={data.content.rendered} isVideo={isVideo}/>
                            <div className="sub-share">
                                <SocialLinks data={data} />
                            </div>
                            <div className="writer-social">
                                <div className="title">ലേഖകർ</div>
                                <ByAuthors coauthors={data.coauthors} bio={true}/>
                            </div>
                            {
                                data.illustrator &&
                                <div className="writer-social illustrator">
                                    <div className="title">ചിത്രകാരൻ</div>
                                    <ByAuthors coauthors={[data.illustrator]} bio={true}/>
                                </div>
                            }
                        </div>
                        <RelatedPosts posts={this.state.randomPosts} heading='കൂടുതൽ വായനയ്ക്ക്'/>
                    </div>
                </article>,
                <Categories
                    key='all-categories'
                    heading="മികച്ച വർഗ്ഗങ്ങൾ"
                    more={true}
                    moreLink="/categories"
                    top={true}
                />
            ];
        } else {
            return <Loader />
        }
    }
}


const mapStateToProps = (state) => ({
    categoriesList: state.api.lists.categories,
});

export default withRouter(connect(mapStateToProps)(Post));
