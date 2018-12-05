import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import api from "../../../api";
import './index.css';
import RelatedPosts from "../../layout/RelatedPosts";


class Author extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        };
    }

    fetchPosts() {
        api.Content.postsByAuthor(this.props.slug, 1, false, 3).then(
            res => {
                this.setState({posts: res});
            },
            error => {
                console.warn(error);
            }
        );
    }

    componentDidMount() {
        this.fetchPosts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.fetchPosts();
        }
    }

    render() {
        const { data } = this.props;
        if (data) {
            return (
                <section className="author-page">
                    <div className="info-author">
                        <div
                            className="icon-author"
                            style={{backgroundImage: `url('${data.avatar_url}')` }}
                        >
                        </div>
                        <h2 className="name">
                            {data.name}
                        </h2>
                        <div className='bio'>{data.description}</div>
                    </div>
                    <div className="margin-top-20">
                        <RelatedPosts posts={this.state.posts} heading={`${data.name} എഴുതിയ പുതിയ ലേഖനങ്ങൾ`}/>
                    </div>
                    <Link to={`/posts?author=${data.slug}`}>
                        <button className="author-btn btn">
                            More
                        </button>
                    </Link>
                </section>
            );
        }
        return null;
    };
};

export default withRouter(Author);