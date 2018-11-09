import React, { Component } from 'react';
import RandomCategory from './randomCategory'
import MainSlider from './mainSlider'

class Home extends Component {
	render() {
        return [
            <MainSlider data={this.props.data} key="main-slider" />,
            <RandomCategory key="random-category"/>
        ];
	};
}

export default Home;
