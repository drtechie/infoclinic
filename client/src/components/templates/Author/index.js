import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

class NotFound extends Component {

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
                    <Link to={`/posts?author=${data.slug}`}>
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