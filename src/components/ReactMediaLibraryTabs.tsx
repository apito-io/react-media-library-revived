import * as React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FileUpload from './FileUpload';
import { ReactMediaLibraryTabsProps } from '../../types';
import FileLibrary from './FileLibrary';

const ReactMediaLibraryTabs: React.FC<ReactMediaLibraryTabsProps> = (
  props: ReactMediaLibraryTabsProps
): React.ReactElement => {
  const {
    fileUploadCallback,
    fileLibraryList,
    fileSelectCallback,
    fileDeleteCallback,
    tabChangeCallback,
    libraryCardComponent,
    sortProperty,
    itemsPerPage,
    itemsPerRow,
    isSearchable,
    searchInputPlaceholder,
  } = props;

  return (
    <Tabs
      defaultActiveKey="upload"
      id="react-media-library-tabs"
      onSelect={(eventKey: string) => {
        if (tabChangeCallback) tabChangeCallback(eventKey);
      }}>
      {Array.isArray(fileLibraryList) && fileLibraryList.length > 0 && (
        <Tab eventKey="library" title="Library">
          <FileLibrary
            fileLibraryList={fileLibraryList}
            fileSelectCallback={fileSelectCallback}
            fileDeleteCallback={fileDeleteCallback}
            libraryCardComponent={libraryCardComponent}
            sortProperty={sortProperty}
            itemsPerPage={itemsPerPage}
            itemsPerRow={itemsPerRow}
            isSearchable={isSearchable}
            searchInputPlaceholder={searchInputPlaceholder}
          />
        </Tab>
      )}
      <Tab eventKey="upload" title="Upload">
        <div className="pt-3">
          <FileUpload fileUploadCallback={fileUploadCallback} />
        </div>
      </Tab>
    </Tabs>
  );
};

export default ReactMediaLibraryTabs;
