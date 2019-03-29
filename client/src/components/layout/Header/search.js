import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import enhanceWithClickOutside from 'react-click-outside';
import './search.css';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchOpen: false,
            query: '',
        };
        this.toggleSearchBar = this.toggleSearchBar.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.navigateToSearch = this.navigateToSearch.bind(this);
    }

    handleClickOutside() {
        this.setState({searchOpen: false});
    }

    toggleSearchBar(){
        if (this.state.searchOpen && this.state.query.length > 0) {
            this.navigateToSearch();
        } else {
            this.setState({searchOpen: !this.state.searchOpen})
        }
    }

    updateQuery(event){
        this.setState({query: event.target.value})
    }

    handleSearch(e){
        e.preventDefault();
        if (this.state.query.length > 0) {
            this.navigateToSearch();
        }
    }

    navigateToSearch() {
        this.props.history.push({
            pathname: '/posts',
            search: `?search=${this.state.query}`
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname || this.props.location.search !== prevProps.location.search) {
            this.setState({searchOpen: false})
        }
    }

    render() {
        return (
            <div
                id="infoclinic-search"
                className={`infoclinic-search ${this.state.searchOpen ? 'infoclinic-search-open' : ''}`}
            >
                <form onSubmit={(e) => this.handleSearch(e)}>
                    <input
                        className="infoclinic-search-input"
                        placeholder="നിങ്ങളുടെ തിരയൽ പദം നൽകുക..."
                        type="search"
                        value={this.state.query}
                        onChange={this.updateQuery}
                        name="search"
                        id="search"
                    />
                    <span
                        className="infoclinic-icon-search"
                        onClick={this.toggleSearchBar}
                        onKeyPress={this.toggleSearchBar}
                        role='button'
                        tabIndex={0}
                    >
                        <FontAwesomeIcon icon={ faSearch } />
                    </span>
                </form>
            </div>
        );
    }
}

export default withRouter(enhanceWithClickOutside(Search));