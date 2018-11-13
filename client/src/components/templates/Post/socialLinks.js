import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebookF, faGoogle, faTwitter, faWhatsapp} from '@fortawesome/free-brands-svg-icons'

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
        const { data }= this.props
        return (
            <div className="soc-wrap">
                <a
                    className="gp"
                    href={`https://plus.google.com/share?url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a
                    className="tw"
                    href={`https://twitter.com/intent/tweet?text=${data.title.rendered}&url=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                    className="fb"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                    className="wa"
                    href={`${(this.isMobile() ? 'whatsapp://' : 'https://web.whatsapp.com/')}send?text=${data.title.rendered} ${window.location.href}` }
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faWhatsapp} />
                </a>
            </div>
        );
    }
}