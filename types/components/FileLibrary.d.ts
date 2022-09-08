import React from 'react';

export interface FileLibraryListItem {
  _id: string | number;
  title?: string;
  size?: number;
  createdAt?: Date;
  thumbnailUrl?: string;
  description?: string;
  fileName?: string;

  [key: string]: any;
}

export interface FileLibraryProps {
  /** Array of files to display in the library tab. Each item in the array has to be of type FileLibraryListItem */
  fileLibraryList: FileLibraryListItem[];
  /** Sorting property for files in the library. */
  sortProperty?: 'title' | 'createdAt' | 'size' | 'fileName';
  /** Sort direction */
  sortAscending?: boolean;
  fileSelectCallback: (item: FileLibraryListItem) => void;
  fileDeleteCallback?: (item: FileLibraryListItem) => void;
  /** Custom rendering component for the card in the library tab. */
  libraryCardComponent?: React.FC<any>;
  /** Number of items per page.  */
  itemsPerPage?: number;
  /** Adds a custom string as a class to the modal */
  dialogClassName?: string;
}
