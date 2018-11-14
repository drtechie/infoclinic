import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class ByAuthors extends Component {
    render() {
        if (this.props.coauthors.length > 0 ) {
            return (
                <div className="by-writer">
                    {
                        this.props.coauthors.map(coauthor => {
                            return (
                                <div className="info-author" key={coauthor.user_nicename}>
                                    <div
                                        className="icon-author"
                                        style={{backgroundImage: "url('https://place-hold.it/66x66')" }}
                                    >
                                    </div>
                                    <div className="name">
                                        <Link to={`/authors/${coauthor.user_nicename}`}>{coauthor.display_name}</Link>
                                    </div>
                                    {
                                        this.props.bio &&
                                        <div className='bio'>{coauthor.description}</div>
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            )

        }
        return null;
    }
}
