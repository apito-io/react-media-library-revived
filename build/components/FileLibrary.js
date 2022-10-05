import React, { useState, useMemo } from 'react';
import Col from 'react-bootstrap/Col';
import FileLibraryCard from './FileLibraryCard';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FileLibraryPager from './FileLibraryPager';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const FileLibrary = (props) => {
    const { sortProperty, sortAscending, fileLibraryList, libraryCardComponent, fileDeleteCallback, fileSelectCallback, itemsPerPage = 12, itemsPerRow, isSearchable, searchInputPlaceholder, } = props;
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [page, setPage] = useState(1);
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const itemsPerRowParsed = useMemo(() => {
        const { xs = 12, sm = 6, md = 4, lg = 6 } = itemsPerRow || {};
        return { xs, sm, md, lg };
    }, [itemsPerRow]);
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
    const parseAndFilterByQueryValue = () => fileLibraryList.filter((file) => {
        const { title = '' } = file || {};
        // TODO: find better matching condition.
        return title
            .trim()
            .toLocaleUpperCase()
            .includes(searchValue.trim().toLocaleUpperCase());
    });
    const renderList = useMemo(() => {
        if (!fileLibraryList) {
            setNumberOfItems(0);
            return [];
        }
        const parsedLibraryList = isSearchable && searchValue !== '' ? parseAndFilterByQueryValue() : fileLibraryList;
        setNumberOfItems((parsedLibraryList === null || parsedLibraryList === void 0 ? void 0 : parsedLibraryList.length) || 0);
        const arrayStart = (page - 1) * itemsPerPage;
        let arrayEnd = arrayStart + itemsPerPage;
        if (arrayEnd > parsedLibraryList.length) {
            // If calculated end extends past length of actual array
            // Set calculated end as length of array
            arrayEnd = parsedLibraryList.length;
        }
        return [...parsedLibraryList]
            .sort(sortArray)
            .slice(arrayStart, arrayEnd)
            .map((element, index) => {
            return (React.createElement(Col, { key: index, xs: itemsPerRowParsed.xs || 12, sm: itemsPerRowParsed.sm || 6, md: itemsPerRowParsed.md || 4, lg: itemsPerRowParsed.lg || 3, className: "mb-3", onClick: () => {
                    if ((selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem._id) !== (element === null || element === void 0 ? void 0 : element._id)) {
                        setSelectedItem(element);
                    }
                    else {
                        setSelectedItem(undefined);
                    }
                } }, React.createElement(libraryCardComponent, Object.assign({ selectedItem }, element))));
        });
    }, [searchValue, fileLibraryList, page, selectedItem]);
    const submitRow = selectedItem && (React.createElement(Row, null,
        React.createElement(Col, { className: "text-right" },
            fileDeleteCallback !== undefined && (React.createElement(Button, { variant: "danger", onClick: () => {
                    if (fileDeleteCallback)
                        fileDeleteCallback(selectedItem);
                }, className: "mr-3" }, "Delete")),
            React.createElement(Button, { variant: "primary", onClick: () => fileSelectCallback(selectedItem) }, "Select File"))));
    const pagerRow = numberOfItems > itemsPerPage && (React.createElement(Row, null,
        React.createElement(Col, { className: "d-flex justify-content-center" },
            React.createElement(FileLibraryPager, { count: numberOfItems, page: page, pagerCallback: (number) => setPage(number), itemsPerPage: itemsPerPage }))));
    return (React.createElement(React.Fragment, null,
        isSearchable && (React.createElement(Row, null,
            React.createElement(Col, { lg: "12" },
                React.createElement(Form, { className: "my-3" },
                    React.createElement(InputGroup, { className: "mb-3" },
                        React.createElement(Form.Control, { placeholder: searchInputPlaceholder, "aria-label": searchInputPlaceholder, "aria-describedby": "search-items", value: searchValue, onChange: (e) => {
                                setSearchValue(e.target.value);
                            } })))))),
        React.createElement(Row, { className: "py-3" }, renderList),
        pagerRow,
        submitRow));
};
FileLibrary.defaultProps = {
    sortProperty: 'createdAt',
    sortAscending: false,
    libraryCardComponent: FileLibraryCard,
    itemsPerPage: 12,
    itemsPerRow: { xs: 12, sm: 12, md: 6, lg: 3 },
    isSearchable: false,
    searchInputPlaceholder: 'Search files by title',
};
export default FileLibrary;
//# sourceMappingURL=FileLibrary.js.map