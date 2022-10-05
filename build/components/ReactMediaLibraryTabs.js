import * as React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FileUpload from './FileUpload';
import FileLibrary from './FileLibrary';
const ReactMediaLibraryTabs = (props) => {
    const { fileUploadCallback, fileLibraryList, fileSelectCallback, fileDeleteCallback, tabChangeCallback, libraryCardComponent, sortProperty, itemsPerPage, itemsPerRow, isSearchable, searchInputPlaceholder, } = props;
    return (React.createElement(Tabs, { defaultActiveKey: "upload", id: "react-media-library-tabs", onSelect: (eventKey) => {
            if (tabChangeCallback)
                tabChangeCallback(eventKey);
        } },
        React.createElement(Tab, { eventKey: "upload", title: "Upload" },
            React.createElement("div", { className: "pt-3" },
                React.createElement(FileUpload, { fileUploadCallback: fileUploadCallback }))),
        Array.isArray(fileLibraryList) && fileLibraryList.length > 0 && (React.createElement(Tab, { eventKey: "library", title: "Library" },
            React.createElement(FileLibrary, { fileLibraryList: fileLibraryList, fileSelectCallback: fileSelectCallback, fileDeleteCallback: fileDeleteCallback, libraryCardComponent: libraryCardComponent, sortProperty: sortProperty, itemsPerPage: itemsPerPage, itemsPerRow: itemsPerRow, isSearchable: isSearchable, searchInputPlaceholder: searchInputPlaceholder })))));
};
export default ReactMediaLibraryTabs;
//# sourceMappingURL=ReactMediaLibraryTabs.js.map