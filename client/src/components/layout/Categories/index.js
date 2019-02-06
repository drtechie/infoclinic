import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './index.css';

const mapStateToProps = (state) => ({
    categoriesList: state.api.lists.categories,
});

class Categories extends Component {

    render() {
        return (
            <section className="categories">
                <div className="categories-container">
                    <div className="sub-title title">
                        <h2>എല്ലാ വർഗ്ഗങ്ങളും</h2>
                    </div>
                    <div className="categories-swiper">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="swiper-slide-container">
                                    {
                                        this.props.categoriesList
                                            .sort((a, b) => b.count - a.count)
                                            .slice(0, 10)
                                            .map((category) => {
                                                return (
                                                    <div className="swiper-slide-item" key={category.id}>
                                                        <div className="info-author">
                                                            <Link to={`/posts?category=${category.slug}`}>
                                                                <div className="name">{category.name}</div>
                                                            </Link>
                                                            <p className='data'>
                                                                {category.count} ലേഖനങ്ങൾ
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect(mapStateToProps)(Categories);
