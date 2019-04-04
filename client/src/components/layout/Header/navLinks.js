import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';
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
                    <a
                        href="https://www.facebook.com/infoclinicindia"
                        target="_blank"
                        aria-label='Facebook'
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://twitter.com/infoclinicindia"
                        target="_blank"
                        aria-label='Twitter'
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.youtube.com/channel/UCAyFZ413Wyyl2bsH6_ZHpTw"
                        target="_blank"
                        aria-label='YouTube'
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                </li>
                <li>
                    <a
                        href="/feed"
                        target="_blank"
                        aria-label='RSS Feed'
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faRss} />
                    </a>
                </li>
            </ul>
        ];
    }
}