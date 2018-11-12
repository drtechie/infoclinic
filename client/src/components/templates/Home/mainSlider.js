import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltDown, faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";
import Swiper from "swiper";
import moment from 'moment';
import './mainSlider.scss'
import { utcFormat } from "../../utilities/Common/constants";
import 'moment/locale/ml'
import {Link} from "react-router-dom";
import ByAuthors from "../../layout/ByAuthors";
moment.locale('ml');

export default class MainSlider extends Component {
    constructor(props){
        super(props);
        this.mainSwiperContainer = React.createRef();
        this.state = {
            height: 0,
            post: null,
        }
    }

    initializeSlider() {
        if (this.mainSwiperContainer.current) {
            this.setState({height: (this.mainSwiperContainer.current.offsetWidth / 100) * 66.8});

            const setSwiperPost = (activeIndex) => {
                const { stickies }= this.props.data;
                this.setState({post: stickies[activeIndex]});
            };

            setTimeout(() => {
                new Swiper(this.mainSwiperContainer.current, {
                    direction: 'vertical',
                    on: {
                        init: function () {
                            setSwiperPost(this.activeIndex);
                        },
                        resize:  () =>  {
                            this.setState({height: (this.mainSwiperContainer.current.offsetWidth / 100) * 66.8});
                        },
                        slideChange: function () {
                            setSwiperPost(this.activeIndex);
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
            const { stickies }= this.props.data;
            return (
                <section id="main-slider">
                    <div
                        ref={this.mainSwiperContainer}
                        className="main-swiper-container swiper-container-vertical"
                        style={{height: this.state.height}}
                    >
                        <div className="swiper-navigation">
                            <div className="swiper-btn-prev swiper-navigation-btn">
                                <FontAwesomeIcon icon={faLongArrowAltUp}/>
                            </div>
                            <div className="article">തുടർന്നുള്ള സങ്കീർണതകൾ</div>
                            <div className="swiper-btn-next swiper-navigation-btn">
                                <FontAwesomeIcon icon={faLongArrowAltDown}/>
                            </div>
                        </div>
                        <div className="swiper-wrapper">
                            {
                                stickies.map(sticky => {
                                    const date = moment(sticky.date, utcFormat);
                                    return (
                                        <div
                                            className="swiper-slide"
                                            style={{backgroundImage: "url('https://picsum.photos/1152/648/?random')"}}
                                            key={sticky.id}
                                        >
                                            <div className="data-post">
                                                <span className='english'>{ date.format('DD/MMM/YYYY') }</span>
                                            </div>
                                            <div className="swiper-text">
                                                <div className="ellipsis text">
                                                    <Link to={`/posts/${ sticky.slug}`}>
                                                        { sticky.title.rendered }
                                                    </Link>
                                                </div>
                                                <ByAuthors coauthors={sticky.coauthors}/>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="swiper-pagination"/>
                    </div>
                    <div className="main-swiper-text">
                        {
                            this.state.post &&
                                [
                                    <Link to={`/posts/${this.state.post.slug}`} key='link'>
                                        {this.state.post.title.rendered}
                                    </Link>,
                                    <ByAuthors coauthors={this.state.post.coauthors} key='by-writers'/>
                                ]
                        }

                    </div>
                </section>
            );
        }
        return null;
    }
}