import * as React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FileUpload from './FileUpload';
import { ReactMediaLibraryTabsProps } from '../../types';
import FileLibrary from './FileLibrary';

const ReactMediaLibraryTabs: React.FC<ReactMediaLibraryTabsProps> = (
  props: ReactMediaLibraryTabsProps,
): React.ReactElement => {
  const {
    fileUploadCallback,
    fileLibraryList,
    fileSelectCallback,
    fileDeleteCallback,
    libraryCardComponent,
    sortProperty,
    itemsPerPage,
    itemsPerRow
  } = props;

  return (
    <Tabs defaultActiveKey="upload" id="react-media-library-tabs">
      <Tab eventKey="upload" title="Upload">
        <div className="pt-3">
          <FileUpload fileUploadCallback={fileUploadCallback} />
        </div>
      </Tab>
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
          />
        </Tab>
      )}
    </Tabs>
  );
};

export default ReactMediaLibraryTabs;
