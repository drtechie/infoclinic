import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {faFacebookF, faTwitter, faGithub, faYoutube} from "@fortawesome/free-brands-svg-icons";
import { faRss } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import api from "../../../api";
import { buildMenu } from "../../utilities/Common/buildMenu";

const mapStateToProps = (state) => ({
    footerMenu: state.api.menus.footer
});

const mapDispatchToProps = (dispatch) => ({
    loadMenu: (menu) => dispatch({ type: 'LOAD_MENU', payload: menu })
});

class Footer extends Component {

    constructor(props) {
        super(props);
        this.fetchAndLoadMenu();
    }

    fetchAndLoadMenu() {
        if (this.props.footerMenu && this.props.footerMenu.length > 0) {
            this.props.loadMenu(this.props.footerMenu);
        } else {
            this.props.loadMenu(api.Menus.bySlug('footer'));
        }
    }

	render() {
		return (
            <footer id="footer" className="row">
                <div className="msc-wrapper">
                    <ul className="menu">
                        {buildMenu(this.props.footerMenu)}
                    </ul>
                    <div className="sc-wrapper">
                        <ul className="soc-wrap">
                            <li>
                                <a href="https://www.facebook.com/infoclinicindia" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/infoclinicindia" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/channel/UCAyFZ413Wyyl2bsH6_ZHpTw"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faYoutube} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/feed"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faRss} />
                                </a>
                            </li>
                        </ul>
                        <div className="copyright">
                            <p>&copy; {(new Date()).getFullYear()} InfoClinic. All Rights Reserved</p>
                            <p>
                                <FontAwesomeIcon icon={faGithub} />&nbsp;
                                <a
                                    href="https://github.com/drtechie/infoclinic"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    drtechie/infoclinic
                                </a>
                            </p>
                            <p>
                                <Link to='/privacy-policy'>Privacy Policy</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
