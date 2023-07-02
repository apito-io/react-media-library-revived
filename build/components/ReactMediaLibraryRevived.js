import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactMediaLibraryTabs from './ReactMediaLibraryTabs';
const ReactMediaLibraryRevived = (props) => {
    const { fileLibraryList, fileUploadCallback, fileSelectCallback, fileDeleteCallback, tabChangeCallback, libraryCardComponent, sortProperty, itemsPerPage, itemsPerRow, isSearchable, searchInputPlaceholder, } = props;
    return (React.createElement(Modal, { size: "xl", id: "react-media-library-revived-modal", "aria-labelledby": "react-media-library-revived-modal" },
        React.createElement(Modal.Header, { closeButton: true }, React.createElement(Modal.Title, null, modalTitle)),
        React.createElement(Modal.Body, null,
            React.createElement(ReactMediaLibraryTabs, { fileLibraryList: fileLibraryList, fileUploadCallback: fileUploadCallback, fileSelectCallback: fileSelectCallback, fileDeleteCallback: fileDeleteCallback, libraryCardComponent: libraryCardComponent, sortProperty: sortProperty, itemsPerPage: itemsPerPage, itemsPerRow: itemsPerRow, isSearchable: isSearchable, searchInputPlaceholder: searchInputPlaceholder, tabChangeCallback: tabChangeCallback }))));
};

export default ReactMediaLibraryRevived;
//# sourceMappingURL=ReactMediaLibraryRevived.js.map
