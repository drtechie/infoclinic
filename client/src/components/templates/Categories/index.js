import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import './index.css';
import Loader from "../../layout/Loader";
import CategoriesListView from "../../layout/Categories";

const mapStateToProps = (state) => ({
    categoriesList: state.api.lists.categories,
});

class Categories extends Component {
    render() {
        return(
            <section className='categories-page'>
                {
                    this.props.categoriesList.length === 0 ?
                        <Loader/>
                        :
                        <CategoriesListView
                            more={false}
                        />

                }

            </section>
        );
    };
}

export default connect(mapStateToProps)(withRouter(Categories));