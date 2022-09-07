import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import FileLibraryCard from './FileLibraryCard';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FileLibraryPager from './FileLibraryPager';
const FileLibrary = (props) => {
    const { sortProperty, sortAscending, fileLibraryList, libraryCardComponent, fileDeleteCallback, fileSelectCallback, itemsPerPage = 12, } = props;
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [page, setPage] = useState(1);
    function sortArray(a, b) {
        try {
            const property = sortProperty;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let valA = property !== undefined ? a[property] : 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let valB = property !== undefined ? b[property] : 0;
            // If string, ignore upper and lowercase
            if (typeof valA === 'string')
                valA = valA.toUpperCase();
            if (typeof valB === 'string')
                valB = valB.toUpperCase();
            if (sortAscending) {
                return valA < valB ? -1 : 1;
            }
            else {
                return valA > valB ? -1 : 1;
            }
        }
        catch (_a) {
            return 0;
        }
    }
    function renderList() {
        if (!fileLibraryList)
            return [];
        const arrayStart = (page - 1) * itemsPerPage;
        let arrayEnd = arrayStart + itemsPerPage;
        if (arrayEnd > fileLibraryList.length) {
            // If calculated end extends past length of actual array
            // Set calculated end as length of array
            arrayEnd = fileLibraryList.length;
        }
        return [...fileLibraryList]
            .sort(sortArray)
            .slice(arrayStart, arrayEnd)
            .map((element, index) => {
            return (React.createElement(Col, { key: index, xs: 12, sm: 6, md: 4, lg: 3, className: "mb-3", onClick: () => setSelectedItem(element) }, React.createElement(libraryCardComponent, Object.assign({ selectedItem }, element))));
        });
    }
    const submitRow = selectedItem && (React.createElement(Row, null,
        React.createElement(Col, { className: "text-right" },
            fileDeleteCallback !== undefined && (React.createElement(Button, { variant: "danger", onClick: () => {
                    if (fileDeleteCallback)
                        fileDeleteCallback(selectedItem);
                }, className: "mr-3" }, "Delete")),
            React.createElement(Button, { variant: "primary", onClick: () => fileSelectCallback(selectedItem) }, "Select File"))));
    const pagerRow = fileLibraryList.length > itemsPerPage && (React.createElement(Row, null,
        React.createElement(Col, { className: "d-flex justify-content-center" },
            React.createElement(FileLibraryPager, { count: fileLibraryList.length, page: page, pagerCallback: (number) => setPage(number), itemsPerPage: itemsPerPage }))));
    return (React.createElement(React.Fragment, null,
        React.createElement(Row, { className: "py-3" }, renderList()),
        pagerRow,
        submitRow));
};
FileLibrary.defaultProps = {
    sortProperty: 'createdAt',
    sortAscending: false,
    libraryCardComponent: FileLibraryCard,
    itemsPerPage: 12,
};
export default FileLibrary;
//# sourceMappingURL=FileLibrary.js.map