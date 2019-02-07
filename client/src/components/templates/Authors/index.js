import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import api from "../../../api";
import './index.css';
import Loader from "../../layout/Loader";


class Authors extends Component {
    constructor(props){
        super(props);
        this.state = {
            authors: [],
            loading: true,
        };
    }

    fetchAuthors() {
        api.Content.getUsers().then(
            res => {
                this.setState({authors: res});
                this.setState({loading: false});
            },
            error => {
                this.setState({loading: false});
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
                        this.state.loading ?
                            <Loader/>
                            :
                            authors
                                .sort((a, b) => b.name - a.name)
                                .filter((a) => a.slug !== 'admin')
                                .map((author) => {
                                    return (
                                        <div className="by-writer" key={author.id}>
                                            <div className="info-author">
                                                <div
                                                    className="icon-author"
                                                    style={{backgroundImage: `url('${author.avatar_url}')` }}
                                                >
                                                </div>
                                                <h2 className="name">
                                                    <Link className='english' to={`/authors/${author.slug}`}>{author.name}</Link>
                                                </h2>
                                                <div className='bio english'>{author.description}</div>
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