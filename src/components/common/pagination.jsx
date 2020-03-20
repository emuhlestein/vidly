import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages.map(page => (
                        <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                            <a onClick={() => onPageChange(page)} style={{ cursor: 'pointer' }} className="page-link">{page}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;