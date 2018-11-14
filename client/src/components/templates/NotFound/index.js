import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';

class NotFound extends Component {

	render() {

		return (
            <section className="page-404">
                <h6>404</h6>
                <div className="exist">
                    <p>Sorry, this page doesn’t exist.</p>
                </div>
                <Link className="btn" to="/">Go home</Link>
            </section>
		);
	};
};

export default NotFound;