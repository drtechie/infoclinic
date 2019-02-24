import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookF, faTwitter, faWhatsapp} from '@fortawesome/free-brands-svg-icons'

export default class SocialLinks extends Component {
    constructor(props) {
        super(props);
        this.isMobile = this.isMobile.bind(this);
    }

    isMobile() {
        const regex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        if (typeof navigator !== 'undefined') {
            return regex.test(navigator.userAgent.toLowerCase());
        } else {
            return false;
        }

    }
    render() {
        const { data } = this.props;
        const baseURL = `https://www.infoclinic.in/posts/${data.slug}`;
        return (
            <div className="soc-wrap">
                <a
                    className="tw"
                    aria-label="Share on Twitter"
                    href={`https://twitter.com/intent/tweet?text=${data.title.rendered}&url=${baseURL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                    className="fb"
                    aria-label="Share on Facebook"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${baseURL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                    aria-label="Share on WhatsApp"
                    className="wa"
                    href={`${(this.isMobile() ? 'https://api.whatsapp.com/' : 'https://web.whatsapp.com/')}send?text=${data.title.rendered} ${encodeURI(baseURL)}` }
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faWhatsapp} />
                </a>
            </div>
        );
    }
}