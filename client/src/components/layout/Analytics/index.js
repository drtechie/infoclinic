import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

class Analytics extends Component {
    constructor(props){
        super(props)
        this.pushToGA = this.pushToGA.bind(this);
    }

    pushToGA(path, search) {
        ReactGA.pageview(path+search)
    }

    componentDidMount() {
        this.pushToGA(this.props.location.pathname, this.props.location.search)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname || this.props.location.search !== prevProps.location.search) {
            this.pushToGA(this.props.location.pathname, this.props.location.search)
        }
    }

    render() {
        return null;
    }
}

export default withRouter(Analytics);