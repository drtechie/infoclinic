import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

class NotFound extends Component {

    render() {
        console.log(this.props);
        const { data } = this.props;
        if (data) {
            return (
                <section className="author-page">
                    <div className="info-author">
                        <div
                            className="icon-author"
                            style={{backgroundImage: `url('${data.avatar_urls["96"]}')` }}
                        >
                        </div>
                        <div className="name">
                            {data.name}
                        </div>
                        <div className='bio'>{data.description}</div>
                    </div>
                    <Link to={`/posts?coauthor=${data.slug}`}>
                        <button className="author-btn btn">
                            More posts by {data.name}
                        </button>
                    </Link>

                </section>
            );
        }
        return null;
    };
};

export default NotFound;