import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import api from "../../../api";
import './index.css';


class Authors extends Component {
    constructor(props){
        super(props);
        this.state = {
            authors: [],
        };
    }

    fetchAuthors() {
        api.Content.getUsers().then(
            res => {
                this.setState({authors: res});
            },
            error => {
                console.warn(error);
            }
        );
    }

    componentDidMount() {
        this.fetchAuthors();
    }

    render() {
        const { authors } = this.state;
        return(
            <section className='authors-page'>
                <h1>അംഗങ്ങൾ</h1>
                <div className="authors-container">
                    {
                        authors
                            .sort((a, b) => b.name - a.name)
                            .map((author) => {
                                return (
                                    <div  className="by-writer" key={author.id}>
                                        <div className="info-author">
                                            <div
                                                className="icon-author"
                                                style={{backgroundImage: `url('${author.avatar_url}')` }}
                                            >
                                            </div>
                                            <h2 className="name">
                                                <Link to={`/authors/${author.slug}`}>{author.name}</Link>
                                            </h2>
                                            <div className='bio'>{author.description}</div>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </section>
        );
    };
}

export default withRouter(Authors);