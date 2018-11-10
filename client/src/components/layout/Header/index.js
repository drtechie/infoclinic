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
            <header id="header" className="header-main" key='desktop-header'>
                <Link to="/" className="logo">
                    <svg id="logo-header" enableBackground="new 0 0 522.191 139.513" version="1.1" viewBox="0 0 522.19 139.51" xmlns="http://www.w3.org/2000/svg">
                        <path d="m151.03 34.736c0-4.516 3.777-8.295 8.293-8.295s8.293 3.779 8.293 8.295-3.777 8.293-8.293 8.293-8.293-3.777-8.293-8.293zm1.383 12.347h13.823v46.073h-13.823v-46.073z" fill="#103348"/>
                        <path d="m219.68 64.867v28.289h-13.823v-26.262c0-5.713-3.594-8.384-8.017-8.384-5.069 0-8.57 2.947-8.57 9.491v25.156h-13.822v-46.074h13.823v4.331c2.489-3.41 7.094-5.623 13.177-5.623 9.306 0 17.232 6.638 17.232 19.076z" fill="#103348"/>
                        <path d="m245.02 47.083h8.568v13.268h-8.568v32.805h-13.825v-32.805h-6.174v-13.268h6.174c0-12.9 7.096-20.642 22.393-19.72v13.272c-5.158-0.463-8.568 1.102-8.568 6.448z" fill="#103348"/>
                        <path d="m254.05 70.122c0-13.734 10.872-24.331 24.417-24.331 13.548 0 24.422 10.597 24.422 24.331 0 13.729-10.874 24.326-24.422 24.326-13.545 0-24.417-10.597-24.417-24.326zm35.014 0c0-6.543-4.607-10.874-10.597-10.874-5.986 0-10.597 4.331-10.597 10.874 0 6.542 4.61 10.872 10.597 10.872 5.99 0 10.597-4.33 10.597-10.872z" fill="#103348"/>
                        <path d="m307.49 70.122c0-13.734 10.415-24.331 24.422-24.331 8.938 0 16.863 4.702 20.826 11.798l-12.07 7.001c-1.569-3.224-4.888-5.16-8.941-5.16-5.99 0-10.411 4.331-10.411 10.692 0 6.356 4.421 10.687 10.411 10.687 4.054 0 7.463-1.936 8.941-5.16l12.07 6.91c-3.963 7.191-11.794 11.89-20.826 11.89-14.007-1e-3 -24.422-10.598-24.422-24.327z" fill="#0F88BB"/>
                        <path d="M357.34,25.889h13.825v67.267H357.34V25.889z" fill="#0F88BB"/>
                        <path d="m379 34.736c0-4.516 3.777-8.295 8.293-8.295 4.517 0 8.293 3.779 8.293 8.295s-3.776 8.293-8.293 8.293c-4.516 0-8.293-3.777-8.293-8.293zm1.382 12.347h13.82v46.073h-13.82v-46.073z" fill="#0F88BB"/>
                        <path d="m447.65 64.867v28.289h-13.824v-26.262c0-5.713-3.592-8.384-8.018-8.384-5.068 0-8.569 2.947-8.569 9.491v25.156h-13.821v-46.074h13.821v4.331c2.489-3.41 7.096-5.623 13.177-5.623 9.308 0 17.234 6.638 17.234 19.076z" fill="#0F88BB"/>
                        <path d="m454.83 34.736c0-4.516 3.777-8.295 8.293-8.295s8.293 3.779 8.293 8.295-3.777 8.293-8.293 8.293-8.293-3.777-8.293-8.293zm1.382 12.347h13.824v46.073h-13.824v-46.073z" fill="#0F88BB"/>
                        <path d="m476.94 70.122c0-13.734 10.415-24.331 24.421-24.331 8.938 0 16.863 4.702 20.826 11.798l-12.07 7.001c-1.568-3.224-4.888-5.16-8.941-5.16-5.989 0-10.411 4.331-10.411 10.692 0 6.356 4.422 10.687 10.411 10.687 4.054 0 7.464-1.936 8.941-5.16l12.07 6.91c-3.963 7.191-11.798 11.89-20.826 11.89-14.006-1e-3 -24.421-10.598-24.421-24.327z" fill="#0F88BB"/>
                        <path d="m90.64 36.731h-17.62v-17.618c0-1.44-1.044-2.607-2.336-2.607h-27.51c-1.29 0-2.338 1.167-2.338 2.607v17.619h-17.62c-1.44 0-2.605 1.042-2.605 2.336v27.512c0 1.29 1.165 2.336 2.605 2.336h17.619l3.658-12.627c0.473-1.658 1.057-3.493 1.174-4.522 0.188-1.688-1.899-2.586-6.027-3.049l0.879-2.755c2.023-0.248 9.175-0.491 13.583 0 2.817 0.316 3.482 2.006 3.274 3.882-0.2 1.784-0.964 4.359-1.757 7.214l-7.257 24.935c-0.448 1.47-0.919 3.13-1.001 3.881-0.233 2.08-0.549 3.265 5.461 3.265h17.86c1.292 0 2.336-1.164 2.336-2.604v-17.62h17.622c1.439 0 2.605-1.046 2.605-2.336v-27.512c0-1.294-1.166-2.337-2.605-2.337zm-26.871-1.364c-0.419 3.752-3.643 7.098-7.868 6.624-4.124-0.458-6.231-3.736-5.829-7.3 0.512-4.599 4.654-6.795 8.029-6.417 3.849 0.429 6.045 3.714 5.668 7.093z" fill="#ED1C24"/>
                        <path d="M56.899,139.513l-1.492-0.577c-16.143-6.296-29.924-17.156-39.859-31.419C5.377,92.916,0,75.759,0,57.9      V0h113.859v62.01h-0.155c-0.762,16.375-6.064,32.029-15.454,45.507c-9.934,14.263-23.718,25.123-39.859,31.419L56.899,139.513z       M8.221,8.221V57.9c0,32.155,19.053,60.547,48.678,72.771c29.627-12.224,48.676-40.616,48.676-72.771v-4.114h0.06V8.221H8.221z" fill="#103348"/>
                        <path d="m51.242 117.96c-0.877-0.111-1.971-0.243-2.727-0.058-1.156 0.281-2.415 0.871-3.746 1.499-2.035 0.953-4.448 2.072-7.098 2.237 2.442 2.361 4.194 1.705 7.332 0.231 1.112-0.521 2.262-1.062 3.484-1.358 1.253-0.31 2.508-0.153 3.422-0.037l0.124 0.017v-2.465c-0.109 4e-3 -0.219 4e-3 -0.328-8e-3l-0.463-0.058z" fill="none"/>
                        <path d="m46.294 111.23c-1.373 0.438-2.75 1.003-4.083 1.552-2.975 1.218-6.157 2.526-9.654 2.526h-0.014c3.459 3.117 6.105 2.131 10.368 0.133 1.465-0.689 2.98-1.399 4.553-1.788 1.548-0.384 3.152-0.182 4.324-0.032l0.243 0.032v-2.662c-0.134 0-0.266 0-0.402-0.021-1.147-0.174-3.363-0.367-5.335 0.26z" fill="none"/>
                        <path d="m32.166 114.96c0.126 0.123 0.252 0.227 0.378 0.342h0.014c3.497 0 6.679-1.309 9.654-2.526 1.333-0.549 2.71-1.114 4.083-1.552 1.971-0.627 4.188-0.434 5.335-0.26 0.136 0.021 0.269 0.021 0.402 0.021v-4.389c-1.857-0.251-4.512-0.363-7.069 0.463-1.542 0.487-3.001 1.09-4.413 1.668-5.583 2.291-9.614 3.942-15.479-0.982-0.925-0.776-2.305-0.652-3.083 0.272-0.776 0.924-0.656 2.303 0.268 3.079 2.46 2.068 4.772 3.22 6.966 3.777 0.851-0.726 2.127-0.71 2.944 0.087z" fill="#103348"/>
                        <path d="m37.659 121.63c4e-3 4e-3 8e-3 9e-3 0.012 0.013 2.65-0.165 5.063-1.284 7.098-2.237 1.332-0.628 2.59-1.218 3.746-1.499 0.756-0.186 1.85-0.054 2.727 0.058l0.462 0.059c0.109 0.012 0.219 0.012 0.328 8e-3v-4.376l-0.243-0.032c-1.172-0.149-2.776-0.352-4.324 0.032-1.573 0.389-3.088 1.099-4.553 1.788-4.263 1.998-6.909 2.984-10.368-0.133-1.076-4e-3 -2.184-0.136-3.321-0.429-0.049 0.045-0.105 0.082-0.153 0.128-0.842 0.871-0.821 2.25 0.045 3.096 1.971 1.916 3.897 2.906 5.74 3.323 0.847-0.611 2.029-0.55 2.804 0.201z" fill="#103348"/>
                        <path d="m32.166 114.96c-0.817-0.797-2.093-0.813-2.943-0.087 1.137 0.293 2.246 0.425 3.321 0.429-0.126-0.115-0.252-0.219-0.378-0.342z" fill="#103348"/>
                        <path d="m51.909 120.48c-0.915-0.116-2.169-0.272-3.422 0.037-1.222 0.297-2.372 0.838-3.484 1.358-3.138 1.474-4.89 2.13-7.332-0.231-0.219 0.013-0.438 0.033-0.659 0.033-0.704 0-1.426-0.083-2.157-0.248-0.103 0.074-0.202 0.153-0.293 0.243-0.842 0.867-0.824 2.255 0.043 3.097 2.169 2.109 4.295 2.803 6.25 2.803 2.31 0 4.382-0.97 6.004-1.729 0.962-0.454 1.872-0.879 2.675-1.077 0.462-0.116 1.25-0.013 1.827 0.058l0.34 0.041c0.111 0.013 0.221 0.013 0.33 9e-3v-4.376l-0.122-0.018z" fill="#103348"/>
                        <path d="m37.671 121.64c-4e-3 -4e-3 -8e-3 -9e-3 -0.012-0.013-0.774-0.751-1.957-0.812-2.803-0.202 0.73 0.165 1.453 0.248 2.157 0.248 0.22 0 0.439-0.02 0.658-0.033z" fill="#103348"/>
                        <path d="m62.844 117.96c0.879-0.111 1.973-0.243 2.729-0.058 1.156 0.281 2.413 0.871 3.746 1.499 2.035 0.953 4.446 2.072 7.098 2.237-2.442 2.361-4.196 1.705-7.333 0.231-1.11-0.521-2.26-1.062-3.482-1.358-1.253-0.31-2.508-0.153-3.424-0.037l-0.122 0.017v-2.465c0.11 4e-3 0.217 4e-3 0.326-8e-3l0.462-0.058z" fill="none"/>
                        <path d="m67.792 111.23c1.373 0.438 2.751 1.003 4.084 1.552 2.975 1.218 6.155 2.526 9.652 2.526h0.014c-3.457 3.117-6.104 2.131-10.368 0.133-1.463-0.689-2.98-1.399-4.553-1.788-1.546-0.384-3.15-0.182-4.322-0.032l-0.244 0.032v-2.662c0.132 0 0.267 0 0.401-0.021 1.149-0.174 3.366-0.367 5.336 0.26z" fill="none"/>
                        <path d="m81.922 114.96c-0.128 0.123-0.252 0.227-0.38 0.342h-0.014c-3.497 0-6.677-1.309-9.652-2.526-1.333-0.549-2.712-1.114-4.084-1.552-1.969-0.627-4.186-0.434-5.335-0.26-0.134 0.021-0.269 0.021-0.401 0.021v-4.389c1.858-0.251 4.51-0.363 7.072 0.463 1.538 0.487 2.999 1.09 4.411 1.668 5.581 2.291 9.612 3.942 15.479-0.982 0.922-0.776 2.305-0.652 3.082 0.272 0.778 0.924 0.658 2.303-0.269 3.079-2.458 2.068-4.772 3.22-6.964 3.777-0.854-0.726-2.13-0.71-2.945 0.087z" fill="#103348"/>
                        <path d="m76.429 121.63c-4e-3 4e-3 -0.01 9e-3 -0.012 0.013-2.652-0.165-5.063-1.284-7.098-2.237-1.333-0.628-2.59-1.218-3.746-1.499-0.756-0.186-1.85-0.054-2.729 0.058l-0.462 0.059c-0.109 0.012-0.216 0.012-0.326 8e-3v-4.376l0.244-0.032c1.172-0.149 2.776-0.352 4.322 0.032 1.573 0.389 3.09 1.099 4.553 1.788 4.264 1.998 6.911 2.984 10.368-0.133 1.078-4e-3 2.184-0.136 3.323-0.429 0.049 0.045 0.105 0.082 0.15 0.128 0.842 0.871 0.824 2.25-0.043 3.096-1.973 1.916-3.897 2.906-5.74 3.323-0.847-0.611-2.029-0.55-2.804 0.201z" fill="#103348"/>
                        <path d="m81.922 114.96c0.815-0.797 2.091-0.813 2.943-0.087-1.14 0.293-2.246 0.425-3.323 0.429 0.128-0.115 0.252-0.219 0.38-0.342z" fill="#103348"/>
                        <path d="m62.177 120.48c0.917-0.116 2.171-0.272 3.424 0.037 1.222 0.297 2.372 0.838 3.482 1.358 3.137 1.474 4.892 2.13 7.333-0.231 0.219 0.013 0.438 0.033 0.659 0.033 0.704 0 1.424-0.083 2.157-0.248 0.101 0.074 0.202 0.153 0.293 0.243 0.842 0.867 0.824 2.255-0.045 3.097-2.167 2.109-4.295 2.803-6.25 2.803-2.31 0-4.38-0.97-6.002-1.729-0.964-0.454-1.872-0.879-2.675-1.077-0.462-0.116-1.25-0.013-1.827 0.058l-0.342 0.041c-0.109 0.013-0.219 0.013-0.329 9e-3v-4.376l0.122-0.018z" fill="#103348"/>
                        <path d="m76.417 121.64c2e-3 -4e-3 8e-3 -9e-3 0.012-0.013 0.774-0.751 1.957-0.812 2.803-0.202-0.733 0.165-1.453 0.248-2.157 0.248-0.221 0-0.439-0.02-0.658-0.033z" fill="#103348"/>
                        <path d="m56.928 135.65c-1.418 0-2.57-1.152-2.57-2.568v-28.178c0-1.42 1.152-2.568 2.57-2.568 1.42 0 2.57 1.148 2.57 2.568v28.178c0 1.416-1.15 2.568-2.57 2.568z" fill="#103348"/>
                        <path d="m99.097 98.402c-1.096-1.176-2.9-1.201-4.031-0.058-5.451 5.516-10.851 3.872-18.469 0.743-2.71-1.114-5.27-2.163-7.717-2.456-6.708-0.81-11.664 1.064-14.521 2.658v6.968c0.351-0.123 0.686-0.321 0.979-0.59 0.045-0.045 4.723-4.115 12.89-3.138 1.705 0.207 3.926 1.119 6.279 2.089 3.639 1.49 8 3.286 12.576 3.286 3.934 0 8.029-1.325 11.957-5.305 1.128-1.142 1.155-3.02 0.057-4.197z" fill="#103348"/>
                        <path d="m14.762 98.402c1.094-1.176 2.898-1.201 4.029-0.058 5.451 5.516 10.853 3.872 18.471 0.743 2.71-1.114 5.268-2.163 7.715-2.456 6.708-0.81 11.664 1.064 14.521 2.658v6.968c-0.351-0.123-0.683-0.321-0.979-0.59-0.043-0.045-4.72-4.115-12.888-3.138-1.707 0.207-3.928 1.119-6.281 2.089-3.639 1.49-7.998 3.286-12.576 3.286-3.934 0-8.027-1.325-11.957-5.305-1.126-1.142-1.153-3.02-0.055-4.197z" fill="#103348"/>
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
            <div id="mobile-menu" className={this.state.menuOpen ? 'open': ''} key='mobile-header'>
                <NavLinks mainMenu={this.props.mainMenu} />
            </div>
		];
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
