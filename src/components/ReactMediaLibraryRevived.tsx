import * as React from 'react';
import { ReactMediaLibraryRevivedProps } from '../../types';
import ReactMediaLibraryTabs from './ReactMediaLibraryTabs';

const ReactMediaLibraryRevived: React.FC<ReactMediaLibraryRevivedProps> = (
  props: ReactMediaLibraryRevivedProps,
): React.ReactElement => {
  const {
    fileLibraryList,
    fileUploadCallback,
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
    <ReactMediaLibraryTabs
      fileLibraryList={fileLibraryList}
      fileUploadCallback={fileUploadCallback}
      fileSelectCallback={fileSelectCallback}
      fileDeleteCallback={fileDeleteCallback}
      libraryCardComponent={libraryCardComponent}
      sortProperty={sortProperty}
      itemsPerPage={itemsPerPage}
      itemsPerRow={itemsPerRow}
      isSearchable={isSearchable}
      searchInputPlaceholder={searchInputPlaceholder}
      tabChangeCallback={tabChangeCallback}
    />
  );
};

export default ReactMediaLibraryRevived;
