import React, { Component } from 'react';
import Swiper from 'swiper';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltUp, faLongArrowAltDown, faHeart} from "@fortawesome/free-solid-svg-icons";
import RandomCategory from './randomCategory'
import './index.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.mainSwiperContainer = React.createRef();
        this.state = {
            height: 0,
            mainSwiperText: '',
        }
    }


    initializeSlider() {
        if (this.mainSwiperContainer.current) {
            this.setState({height: (this.mainSwiperContainer.current.offsetWidth / 100) * 66.8});

            const setSwiperText = (mainSwiperText) => {
                this.setState({mainSwiperText});
            };

            setTimeout(() => {
                new Swiper(this.mainSwiperContainer.current, {
                    direction: 'vertical',
                    on: {
                        init: function () {
                            setSwiperText(this.slides.eq(this.activeIndex).find(".text").text());
                        },
                        resize:  () =>  {
                            this.setState({height: (this.mainSwiperContainer.current.offsetWidth / 100) * 66.8});
                        },
                        slideChange: function () {
                            setSwiperText(this.slides.eq(this.activeIndex).find(".text").text());
                        },
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-btn-next',
                        prevEl: '.swiper-btn-prev'
                    }

                });
            }, 200);
        }
    }

    componentDidMount() {
        this.initializeSlider();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.initializeSlider();
        }
    }

	render() {

		if (this.props.data) {

			const data = this.props.data;

			return [
                <section id="main-slider" key="main-slider">
                    <div
                        ref={this.mainSwiperContainer}
                        className="main-swiper-container swiper-container-vertical"
                        style={{height: this.state.height}}
                    >
                        <div className="swiper-navigation">
                            <div className="swiper-btn-prev swiper-navigation-btn">
                                <FontAwesomeIcon icon={faLongArrowAltUp} />
							</div>
                            <div className="article">തുടർന്നുള്ള സങ്കീർണതകൾ</div>
                            <div className="swiper-btn-next swiper-navigation-btn">
                                <FontAwesomeIcon icon={faLongArrowAltDown} />
							</div>
                        </div>
                        <div className="swiper-wrapper">
                            <div
								className="swiper-slide"
								style={{backgroundImage: "url('https://place-hold.it/1638x1093')" }}
							>
                                <div className="data-post">29/03</div>
                                <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                                <div className=" swiper-text">
                                    <div className="ellipsis text">
                                        പ്രശസ്ത മാന്ത്രികനായിരുന്ന ഹാരി ഹൗഡിനി അൻപത്തി രണ്ടാം
                                    </div>
                                </div>
                            </div>
                            <div
								className="swiper-slide"
								style={{backgroundImage: "url('https://place-hold.it/1638x1093')" }}
							>
                                <div className="data-post">29/03</div>
                                <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                                <div className=" swiper-text">
                                    <div className="ellipsis text">
                                        തുടർന്നുള്ള സങ്കീർണതകൾ മൂലമാണ് അദ്ദേഹം മരണപ്പെട്ടത്‌. അദ്ദേഹത്തിന്റെ വയറുവേദനയുടെ കാരണം അപ്പൻഡിക്സിൽ
                                    </div>
                                </div>
                            </div>
                            <div
                                className="swiper-slide"
                                style={{backgroundImage: "url('https://place-hold.it/1638x1093')" }}
                            >
								<div className="data-post">29/03</div>
                                <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                                <div className="swiper-text">
                                    <div className="ellipsis text">
                                        ഡോക്ടർമാർ ശസ്ത്രക്രിയയിലൂടെ അപ്പൻഡിക്സ് നീക്കം ചെയ്യണമെന്ന് നിർദേശിച്ചെങ്കിലും
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-pagination"/>
                    </div>
                    <div className="main-swiper-text">
                        {this.state.mainSwiperText}
                    </div>
                </section>,
                <RandomCategory key='random-category'/>
			];
		}

		return null;
	};
}

export default Home;
