import React, { Component } from 'react';

import ContentBlock from '../../utilities/ContentBlock';

import './index.css';

class Default extends Component {

	render() {

		if (this.props.data) {

			let data = this.props.data;

			return (
				<section className={`${this.props.slug} default-page`}>
					<h1>{data.title.rendered}</h1>
					<ContentBlock content={data.content.rendered} />
				</section>
			);
		}

		return null;
	}
}

export default Default;
