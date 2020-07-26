import React, { Component } from 'react';

import ContentBlock from '../../utilities/ContentBlock';

import './index.css';

class Default extends Component {

	render() {

		if (this.props.data) {

			let data = this.props.data;
			const isVideo = data.format === 'video';
			return (
				<section className={`${this.props.slug} default-page`}>
					<h1 dangerouslySetInnerHTML={{ __html: data.title.rendered }} />
					<ContentBlock content={data.content.rendered} isVideo={isVideo}/>
				</section>
			);
		}

		return null;
	}
}

export default Default;
