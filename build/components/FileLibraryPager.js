import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
const FileLibraryPager = (props) => {
    const { offsetDisplay, pagerCallback } = props;
    function renderLinks() {
        const links = [];
        const { count, page, itemsPerPage } = props;
        const offset = offsetDisplay !== undefined ? offsetDisplay : 2;
        const totalPages = Math.ceil(count / itemsPerPage);
        const prevPage = page - 1;
        const nextPage = page + 1;
        // if not on first page, show prev and first page links
        if (page > 1) {
            links.push(React.createElement(Pagination.First, { key: "first", onClick: () => pagerCallback(1) }));
            links.push(React.createElement(Pagination.Prev, { key: "prev", onClick: () => pagerCallback(prevPage) }));
        }
        // loop to show links to range of pages around current page
        // eslint-disable-next-line no-plusplus
        for (let number = page - offset; number < page + offset + 1; number++) {
            // if it's a valid page number...
            if (number > 0 && number <= totalPages) {
                links.push(React.createElement(Pagination.Item, { key: number, active: number === page, onClick: () => pagerCallback(number) }, number));
            }
        }
        // if not on last page, show next and last page links
        if (page !== totalPages) {
            links.push(React.createElement(Pagination.Next, { key: "next", onClick: () => pagerCallback(nextPage) }));
            links.push(React.createElement(Pagination.Last, { key: "last", onClick: () => pagerCallback(totalPages) }));
        }
        return links;
    }
    return React.createElement(Pagination, null, renderLinks());
};
FileLibraryPager.defaultProps = {
    offsetDisplay: 2,
};
export default FileLibraryPager;
//# sourceMappingURL=FileLibraryPager.js.map