import React, { Component } from 'react';

class ContentBlock extends Component {
	render() {
		return (
			<div className={`content-block ${this.props.row ? 'row' : ''}`}
				dangerouslySetInnerHTML={{ __html: this.props.content || "" }}
			/>
		);
	};
};

export default ContentBlock;