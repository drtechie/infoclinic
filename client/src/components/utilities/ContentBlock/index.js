import React, { Component } from 'react';
import './index.css';

class ContentBlock extends Component {
	render() {
		const { isVideo } = this.props;
		return (
			<div className={`content-block ${this.props.row ? 'row' : ''} ${isVideo ? 'video-post' : ''}`}
				dangerouslySetInnerHTML={{ __html: this.props.content || "" }}
			/>
		);
	};
};

export default ContentBlock;