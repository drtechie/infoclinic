import React from 'react';
import './index.css';

export default class ImageLoader extends React.Component {
    componentDidMount() {
        const { imgLarge, top } = this.props;
        const { imageContainer } = this;
        let imgLargeDiv = imageContainer.querySelector('.img-large');
        const small = imageContainer.querySelector('.img-small');
        const img = new Image();
        img.src = small.src;
        img.onload = function () {
            small.classList.add('loaded');
        };
        if (imgLargeDiv) {
            small.classList.remove('large-loaded');
            imgLargeDiv.classList.remove('loaded');
            imgLargeDiv.src = imgLarge;
            imgLargeDiv.onload = function () {
                imgLargeDiv.classList.add('loaded');
                small.classList.add('large-loaded');
            };
        } else {
            imgLargeDiv = new Image();
            imgLargeDiv.src = imgLarge;
            imgLargeDiv.style.top = top;
            imgLargeDiv.itemProp = 'image';
            imgLargeDiv.classList.add('img-large');
            imgLargeDiv.onload = function () {
                imgLargeDiv.classList.add('loaded');
                small.classList.add('large-loaded');
            };
            const paddingDiv = imageContainer.querySelector('.img-padding');
            paddingDiv.parentNode.insertBefore(imgLargeDiv, paddingDiv.nextSibling);
        }
    }

    render() {
        const {
            imgSmall,
            paddingBottom,
            guid,
            altText,
        } = this.props;
        return (
            <div
                className='img-container'
                id={ guid }
                ref={ (imageContainer) => { this.imageContainer = imageContainer; } }
            >
                <img src={ imgSmall } className='img-small' alt={ altText || '' } />
                <div style={ { paddingBottom } } className='img-padding' />
            </div>
        );
    }
}
