import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import api from '../../../api';

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
		this.buildMenu = this.buildMenu.bind(this);
	}

    fetchAndLoadMenu() {
        if (this.props.mainMenu && this.props.mainMenu.length > 0) {
            this.props.loadMenu(this.props.mainMenu);
        } else {
            this.props.loadMenu(api.Menus.bySlug('main'));
        }
    }

	buildMenu() {
		if (this.props.mainMenu) {
			return this.props.mainMenu.map((item, i) => {
				return (
					<Link key={item.ID} to={item.url}>{item.title}</Link>
				);
			})
		}

		return null;
	}

	render() {
		return (
			<header className="header-main">
				<nav>
					{this.buildMenu()}
				</nav>
			</header>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
