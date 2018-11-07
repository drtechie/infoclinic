import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
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
                <div className="wrap-form-email">
                    <div className="newletter">
                        <p>Newsletter</p>
                    </div>
                    <form action="/" className="form-email">
                        <input type="email" name="email" placeholder="YOUR EMAIL" />
						<button type="submit">
							<FontAwesomeIcon icon={faEnvelope} />
						</button>
                    </form>
                </div>
                <div className="msc-wrapper">
                    <ul className="menu">
                        {buildMenu(this.props.footerMenu)}
                    </ul>
                    <div className="sc-wrapper">
                        <ul className="soc-wrap">
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
                        <div className="copyright">
                            <p>© {(new Date()).getFullYear()} InfoClinic. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </footer>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
