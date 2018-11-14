import React, { Component } from 'react';
import { default as ReactPagination } from 'react-paginating';
import './pagination.css';

export default class Pagination extends Component {
    handlePageChange() {

    }

    render() {
        const { total, currentPage } = this.props;
        return (
            <div>
                <ReactPagination
                    total={total}
                    limit={10}
                    pageCount={5}
                    currentPage={currentPage}
                >
                    {({
                          pages,
                          currentPage,
                          hasNextPage,
                          hasPreviousPage,
                          previousPage,
                          nextPage,
                          totalPages,
                          getPageItemProps
                      }) => (
                        <div className='pagination'>
                            <button
                                {...getPageItemProps({
                                    pageValue: 1,
                                    onPageChange: this.handlePageChange
                                })}
                            >
                                {'<<'}
                            </button>

                            {hasPreviousPage && (
                                <button
                                    {...getPageItemProps({
                                        pageValue: previousPage,
                                        onPageChange: this.handlePageChange
                                    })}
                                >
                                    {'<'}
                                </button>
                            )}

                            {pages.map(page => {
                                return (
                                    <button
                                        key={page}
                                        className={(currentPage === page) ? 'is-active' : ''}
                                        {...getPageItemProps({
                                            pageValue: page,
                                            onPageChange: this.handlePageChange
                                        })}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            {hasNextPage && (
                                <button
                                    {...getPageItemProps({
                                        pageValue: nextPage,
                                        onPageChange: this.handlePageChange
                                    })}
                                >
                                    {'>'}
                                </button>
                            )}

                            <button
                                {...getPageItemProps({
                                    pageValue: totalPages,
                                    onPageChange: this.handlePageChange
                                })}
                            >
                                {'>>'}
                            </button>
                        </div>
                    )}
                </ReactPagination>
            </div>
        );
    }
}