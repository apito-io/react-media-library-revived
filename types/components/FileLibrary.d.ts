import React from 'react';

interface IItemsPerRow {
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

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
  /** Number of items per row.
   * An object with breakpoint keys and values
   * default value is:
   * { xs: 12, sm: 6, md: 4, lg: 6 }
   * @example { xs: 12, sm: 12, md: 6, lg: 3 }
   */
  itemsPerRow?: IItemsPerRow;
  /** If set to true, it will enable live search by title. It will search only images with title value */
  isSearchable?: boolean;
  /** Defines placeholder inside search box input
   * default value is: 'Search files by title'
   * */
  searchInputPlaceholder?: string;
}
