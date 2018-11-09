import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import './randomCategory.scss'

export default class RandomCategory extends Component {
    render() {
        return [
            <section id="top-stories" className="row" key='category-random'>
                <div className="sub-title title">
                    <h4>Today’s top stories</h4>
                    <a href="/">More<FontAwesomeIcon icon={faHeart} /></a>
                </div>
                <div className="container-stories clearfix">
                    <div className="wrapper-post ">
                        <div className="wrap post-type-swiper">
                            <div className="swiper-wrapper">
                                <article className="swiper-slide post-swiper overlay" style={{backgroundImage: "url('https://place-hold.it/763x563')" }}>
                                    <div className="by-writer">
                                        <div className="icon-author" style={{backgroundImage: "url('https://place-hold.it/63x63')" }}>
                                        </div>
                                        <div className="info-author">
                                            <div className="name"><a href="/">William Wright</a>
                                            </div>
                                            <time className="data" dateTime="2017-07-20"> Jan 20, 2017</time>
                                            <span className="timetoread"> · 5 min to read</span>
                                        </div>
                                    </div>
                                    <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                                    <h2 title="Why every travel photographer should carry a notebook">
                                        <a href="/">
                                            Why every travel photographer should carry a notebook
                                        </a>
                                    </h2>
                                </article>
                                <article className="swiper-slide post-swiper overlay" style={{backgroundImage: "url('https://place-hold.it/763x563')" }} >
                                    <div className="by-writer">
                                        <div className="icon-author" style={{backgroundImage: "url('https://place-hold.it/63x63')" }}>
                                        </div>
                                        <div className="info-author">
                                            <div className="name"><a href="/">Mario Lewis</a></div>
                                            <time className="data" dateTime="2017-07-20"> Jan 20, 2017</time>
                                            <span className="timetoread"> · 5 min to read</span>
                                        </div>
                                    </div>
                                    <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                                    <h2 title="Why every travel photographer should carry a notebook">
                                        <a href="/">
                                            Why every travel photographer should carry a notebook
                                        </a>
                                    </h2>
                                </article>
                                <article className="swiper-slide post-swiper overlay"  style={{backgroundImage: "url('https://place-hold.it/763x563')" }}>
                                    <div className="by-writer">
                                        <div className="icon-author" style={{backgroundImage: "url('https://place-hold.it/63x63')" }}>
                                        </div>
                                        <div className="info-author">
                                            <div className="name"><a href="/">Mario Lewis</a></div>
                                            <time className="data" dateTime="2017-07-20"> Jan 20, 2017</time>
                                            <span className="timetoread"> · 5 min to read</span>
                                        </div>
                                    </div>
                                    <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                                    <h2 title="Why every travel photographer should carry a notebook"><a
                                        href="/">Why
                                        every travel photographer should carry a notebook</a></h2>
                                </article>
                            </div>
                            <div className="swiper-pagination horizontal"/>
                        </div>
                    </div>
                    <article className="wrapper-post post-image overlay"  style={{backgroundImage: "url('https://place-hold.it/379x263')" }}>
                        <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                        <h2 title="Don’t date a girl who travels">
                            <a href="/">Don’t date a girl who travels</a>
                        </h2>
                    </article>
                    <article className="wrapper-post post-image overlay"  style={{backgroundImage: "url('https://place-hold.it/379x263')" }}>
                        <div className="likes"><FontAwesomeIcon icon={faHeart} />43 109</div>
                        <h2 title="Don’t date a girl who travels"><a href="/">Don’t date a girl who
                            travels</a></h2>
                    </article>
                    <div className="holder">article of the day</div>
                </div>
            </section>
        ];
    }
}