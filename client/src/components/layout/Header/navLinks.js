import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { buildMenu } from "../../utilities/Common/buildMenu";

export default class NavLinks extends Component {
    render() {
        return [
            <nav className="menu" key='links'>
                <ul>
                    {buildMenu(this.props.mainMenu)}
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