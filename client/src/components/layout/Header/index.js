import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import api from '../../../api';
import NavLinks from './navLinks';
import './index.css';

const mapStateToProps = (state) => ({
	mainMenu: state.api.menus.main
});

const mapDispatchToProps = (dispatch) => ({
	loadMenu: (menu) => dispatch({ type: 'LOAD_MENU', payload: menu })
});

class Header extends Component {

	constructor(props) {
		super(props);
		this.fetchAndLoadMenu();
		this.state = {
		    menuOpen: false,
        }
	}

    fetchAndLoadMenu() {
        if (this.props.mainMenu && this.props.mainMenu.length > 0) {
            this.props.loadMenu(this.props.mainMenu);
        } else {
            this.props.loadMenu(api.Menus.bySlug('main'));
        }
    }

    toggleMenu() {
	    this.setState({ menuOpen: !this.state.menuOpen})
    }

	render() {
		return [
            <header id="header" className="header-main">
                <Link to="/" className="logo">
                    <svg id="logo-header" x="0px" y="0px" viewBox="0 0 461 68">
                        <g>
                            <path d="M377.9,52.4h22.7V63h-36V5h35.7v10.6h-22.4v13.2h20v10.5h-20V52.4z"/>
                        </g>
                        <g>
                            <path d="M427.8,42.9V63h-13.2V5h20c6.5,0,11.7,1.7,15.6,5.2c3.9,3.4,5.9,7.9,5.9,13.4c0,8.3-3.5,14-10.6,17.1L460.3,63h-15.8
        l-12.6-20.1H427.8z M427.8,15.8v16.3h6.3c5.7,0,8.6-2.8,8.6-8.4c0-2.5-0.7-4.4-2.2-5.8c-1.5-1.4-3.5-2.1-6.1-2.1H427.8z"/>
                        </g>
                        <g>
                            <path d="M350.6,28.6v29.2c-5.5,4-12.7,6-21.5,6c-8.8,0-16.1-2.7-21.9-8c-5.8-5.3-8.7-12.6-8.7-21.7c0-9.1,3-16.4,9.1-21.8
        c6-5.4,13.7-8.2,23-8.2c6.5,0,12.2,1.2,16.9,3.6V21c-5.5-3.2-11.1-4.7-16.7-4.7c-5.6,0-10,1.6-13.2,4.9c-3.2,3.2-4.8,7.6-4.8,13
        s1.6,9.7,4.7,12.9c3.2,3.2,7.5,4.8,12.9,4.8c2.5,0,4.9-0.4,7.3-1.1V39.8h-9.4V28.6H350.6z"/>
                        </g>
                        <g>
                            <path d="M284.6,28.6v29.2c-5.5,4-12.7,6-21.5,6c-8.8,0-16.1-2.7-21.9-8c-5.8-5.3-8.7-12.6-8.7-21.7c0-9.1,3-16.4,9.1-21.8
        c6-5.4,13.7-8.2,23-8.2c6.5,0,12.2,1.2,16.9,3.6V21c-5.5-3.2-11.1-4.7-16.7-4.7c-5.6,0-10,1.6-13.2,4.9c-3.2,3.2-4.8,7.6-4.8,13
        s1.6,9.7,4.7,12.9c3.2,3.2,7.5,4.8,12.9,4.8c2.5,0,4.9-0.4,7.3-1.1V39.8h-9.4V28.6H284.6z"/>
                        </g>
                        <g>
                            <path d="M71.8,51.4h21.4V63H58.6V5h13.2V51.4z"/>
                        </g>
                        <g>
                            <path d="M0.6,5h22.5c6.4,0,11.2,1.5,14.5,4.5c3.3,3,5,6.8,5,11.5c0,3-0.8,5.7-2.4,8c-1.6,2.3-3.7,3.8-6.3,4.6
        c6.7,2,10.1,6.5,10.1,13.6c0,4.6-1.6,8.4-4.9,11.3c-3.3,3-7.8,4.4-13.5,4.4h-25V5z M13.8,15.6v13h4.9c3.4,0,6-0.6,7.8-1.9
        c1.7-1.3,2.6-2.9,2.6-5c0-4.1-2.8-6.1-8.3-6.1H13.8z M13.8,52.4h7c6.5,0,9.8-2.2,9.8-6.7S27.4,39,20.9,39h-7.1V52.4z"/>
                        </g>
                        <path className="st0" d="M184.5,67.5h-43C123.1,67.5,108,52.4,108,34v0c0-18.4,15.1-33.5,33.5-33.5l43,0C202.9,0.5,218,15.6,218,34v0
    C218,52.4,202.9,67.5,184.5,67.5z"/>
                        <circle className="st1" cx="184" cy="34" r="27"/>
                    </svg>
                </Link>
                <NavLinks mainMenu={this.props.mainMenu} />
                <div
                    id="burger-button"
                    onClick={() => this.toggleMenu()}
                    onKeyPress={() => this.toggleMenu()}
                    role='button'
                    tabIndex={0}
                    className={this.state.menuOpen ? 'active': ''}
                >
                    <span/><span/><span/>
                </div>
            </header>,
            <div id="mobile-menu" className={this.state.menuOpen ? 'open': ''}>
                <NavLinks mainMenu={this.props.mainMenu} />
            </div>
		];
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
