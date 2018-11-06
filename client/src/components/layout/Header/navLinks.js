import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'

export default class NavLinks extends Component {
    constructor(props) {
        super(props);
        this.buildMenu = this.buildMenu.bind(this);
    }

    buildMenu() {
        if (this.props.mainMenu) {
            return this.props.mainMenu.map((item, i) => {
                return (
                    <li key={item.ID} >
                        <Link to={item.url}>{item.title}</Link>
                    </li>
                );
            })
        }

        return null;
    }

    render() {
        return [
            <nav className="menu" key='links'>
                <ul>
                    {this.buildMenu()}
                </ul>
            </nav>,
            <ul className="soc-wrap" key='social-links'>
                <li>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </li>
            </ul>
        ];
    }
}