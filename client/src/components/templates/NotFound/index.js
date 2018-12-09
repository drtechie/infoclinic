import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

class NotFound extends Component {

	render() {

		return (
            <section className="page-404">
                <h6>404</h6>
                <div className="exist">
                    <p>ക്ഷമിക്കണം, ഈ പേജ് നിലവിലില്ല.</p>
                </div>
                <Link className="btn" to="/">പ്രധാന താൾ</Link>
            </section>
		);
	};
};

export default NotFound;