# React Media Library Revived

The original repo forked from here: [Link](https://github.com/Richard1320/React-Media-Library).
I intended to use it, but I saw that it was outdated. So, I decided to fork it and "revive" it.
The original (and updated) README.md content is below.


---

Have you ever worked with WordPress? If not, count your blessings. :)

But seriously, using a CMS like WordPress does provide a lot of useful features. The feature I miss most as a MERN developer is the media library browser. All image fields are edited using a modal where you can select something previously uploaded or drag-and-drop new images from your file browser. React Media Library provides an image browser in React using React Bootstrap. 
 
Note: this only includes the UI; everybody's app is different so I can't write your API connections for you.

## Table of Contents

- [Installation](#installation)
- [Component](#component)
- [Props List](#props-list)
- [Functions](#functions)
    - [fileUploadCallback](#fileuploadcallback)
    - [fileSelectCallback](#fileselectcallback)
    - [fileDeleteCallback](#filedeletecallback)
    - [tabChangeCallback](#tabchangecallback)
- [Interfaces](#interfaces)
    - [FileMeta](#filemeta)
    - [FileLibraryListItem](#FileLibraryListItem)
- [Example](#example)
- [Screenshots](#screenshots)

## Installation

Install it via npm in your project.

```
npm install react-media-library-revived --save
```


or via yarn

```
yarn add react-media-library-revived
```

## Component

This package only includes one component you should use: `<ReactMediaLibraryRevived />`. 

## Props List

Prop | Value Type | Default | Description 
--- | --- | --- | --- 
show | boolean | N/A (Required) | Shows and hides the modal. The on / off switch is controlled outside the app. Your app will have to inform React Media Library when to hide and when to show.
onHide | function | N/A (Required) | Callback function when the user clicks the close button. At the very least, this function should set the `show` prop to false.
modalTitle | string | "Media Library" | Title text that appears at the top of the modal. 
itemsPerPage | number | 12 | Number of items per page. 
itemsPerRow | object | `{ xs: 12, sm: 6, md: 4, lg: 6 }` | how many colums per row on different bootstrap breakpoints. Values range from 1 to 12, where 12 is maximum. Value 12 will place one item per row, 4 three items per row etc. (12/value) = items per row 
fileLibraryList | array | `[]` | Array of files to display in the library tab. Each item in the array has to be of type [FileLibraryListItem](#filelibrarylistitem).
libraryCardComponent | React.FC | [FileLibraryCard](src/components/FileLibraryCard.tsx) | Custom rendering component for the card in the library tab. See [FileLibraryCard](src/components/FileLibraryCard.tsx) as an example.
sortProperty | "title", "createdAt", "size" or "fileName" | "createdAt" | Sorting property for files in the library.
sortAscending | boolean | false | Sort direction
isSearchable | boolean | false | If set to true, it will enable live search by title via simple input field. It will search only files with the title value.
searchInputPlaceholder | string | 'Search files by title' | Defines placeholder inside search box input
dialogClassName | string | N/A | Adds a custom string as a class to the modal
fileUploadCallback | function | N/A (Required) | See [fileUploadCallback](#fileuploadcallback)  
fileSelectCallback | function | N/A (Required) | See [fileSelectCallback](#fileselectcallback)  
fileDeleteCallback | function | N/A | See [fileDeleteCallback](#filedeletecallback)  
tabChangeCallback | function | N/A | See [tabChangeCallback](#filechangecallback)  

---
## Functions

### fileUploadCallback

Async callback function when the user chooses a file to upload. This is used for both the drag-and-drop as well as the browser file select. The first argument is the file base64 as a string. The second argument contains the [FileMeta](#filemeta) information. This promise should return true or false to let React Media Library know if the APIs successfully processed the file.

```typescript
import {FileMeta} from 'react-media-library-revived';

async function uploadCallback(fileBase64: string, fileMeta: FileMeta): Promise<boolean> {
    // Process the file data, send it to backend APIs, add it to the database, etc...
    // Also remember to update the fileLibraryList prop with a new list

    // Return true / false for react-media-library-revived to display upload status
    return true; // If successful
    return false; // If failed
}
```

### fileSelectCallback

Callback function when the user selects a file from the library. Returns [FileLibraryListItem](#filelibrarylistitem) as the first argument.

```typescript
import {FileLibraryListItem} from 'react-media-library-revived';

function selectCallback(item: FileLibraryListItem) {
    // Use the file, put the file ID into your input field, etc
}
```

### fileDeleteCallback

Optional callback function when the user chooses a file and clicks the delete button. Delete button will appear beside the select button in the library tab, or will be hidden if this prop is not set. Returns [FileLibraryListItem](#filelibrarylistitem) as the first argument.
 
```typescript
import {FileLibraryListItem} from 'react-media-library-revived';

function deleteCallback(item: FileLibraryListItem) {
    // Delete the data from your database
    // Also remember to update the fileLibraryList prop with a new list
}
```
### tabChangeCallback

Optional callback function when the user changes tab inside modal window. Returns string as the first and only argument.

---
 
## Interfaces

Note: All (more) interfaces are viewable in the `/types` directory of this package. Below are the main ones you will use.

### FileMeta

Property | Type | Description
--- | --- | ---
fileName | string | Filename of uploaded file.
type | string | The ASCII-encoded string in lower case representing the media type. See [File API Type](https://www.w3.org/TR/FileAPI/#dfn-type)
size | number | The size of the byte sequence in number of bytes. See [File API Size](https://www.w3.org/TR/FileAPI/#dfn-size)

### FileLibraryListItem

Property | Type | Description
--- | --- | ---
_id | string / number | Unique identifier for this item. Required to properly select the item in library tab.
title | string (optional) | Displayed title on card in library tab.
description | string (optional) | Displayed description on card in library tab.
size | number (optional) | Displayed size on card in library tab.
createdAt | Date (optional) | Displayed date on card in library tab.
thumbnailUrl | string (optional) | URL for thumbnail to display image in library tab.
fileName | string (optional) | Displayed filename on card in library tab.
??? | any | Any other properties you put in, you get back in the `fileSelectCallback` & `fileDeleteCallback` functions. 

---

## Example

```typescript
import React, { useEffect, useState } from 'react';
import {
  FileLibraryListItem,
  ReactMediaLibraryRevived,
  FileMeta,
} from 'react-media-library-revived';

const ReactMediaLibraryWrapper: React.FC = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [fileLibraryList, setFileLibraryList] = useState<FileLibraryListItem[]>(
    [],
  );

  useEffect(() => {
    // TODO Get file list from database
    setFileLibraryList([
      {
        _id: 1,
        title: 'Cat 300x300',
        size: 294880,
        fileName: 'cat300.jpg',
        type: 'image/jpeg',
        createdAt: new Date('2022-10-17T03:12:29.866Z'),
        thumbnailUrl: 'https://placekitten.com/300/300',
      },
      {
        _id: 2,
        title: 'Cat 500x500',
        size: 864483,
        fileName: 'cat500.jpg',
        type: 'image/jpeg',
        createdAt: new Date('2022-10-17T03:12:45.018Z'),
        thumbnailUrl: 'https://placekitten.com/500/500',
      },
      {
        _id: 3,
        title: 'Cat 600x600',
        size: 586458,
        fileName: 'cat600.jpg',
        type: 'image/jpeg',
        createdAt: new Date('2022-10-17T03:19:33.498Z'),
        thumbnailUrl: 'https://placekitten.com/600/600',
      },
      {
        _id: 4,
        title: 'Cat 800x800',
        size: 894665,
        fileName: 'photo-107.jpg',
        type: 'image/jpeg',
        createdAt: new Date('2022-10-17T03:28:39.723Z'),
        thumbnailUrl: 'https://placekitten.com/800/800',
      },
    ]);
  }, []);

  async function uploadCallback(
    fileBase64: string,
    fileMeta: FileMeta,
  ): Promise<boolean> {
    // TODO Upload file to backend APIs
    const result = await fileUpload(fileBase64, fileMeta);

    if (result.success) {
      // New file uploaded
      // TODO Reacquire new file list from database
      const newFileList = await getNewFileList();
      setFileLibraryList(newFileList);

      // Return true to display upload success in modal
      return true;
    } else {
      // Return false to display upload failed in modal
      return false;
    }
  }

  function selectCallback(item: FileLibraryListItem) {
    // Hide modal
    setDisplay(false);

    // TODO Pass selected file back to client component callback function
    clientSelectCallback(item);
  }

  async function deleteCallback(item: FileLibraryListItem) {
    // TODO Delete file from backend service
    const result = await fileDelete(item);

    if (result.success) {
      // Deleted file
      // TODO Reacquire file list from database
      const newFileList = await getNewFileList();
      setFileLibraryList(newFileList);
    }
  }

  function tabChangeHandler(key: string) {
    // ...
  }

  return (
    <React.Fragment>
      <button
        onClick={() => {
          setDisplay(true);
        }}
      >
        Open React Media Library Revived
      </button>
      <ReactMediaLibraryRevived
        show={display}
        onHide={() => {
          setDisplay(false);
        }}
        fileUploadCallback={uploadCallback}
        fileLibraryList={fileLibraryList}
        fileSelectCallback={selectCallback}
        fileDeleteCallback={deleteCallback}
        tabChangeCallback={tabChangeHandler}
      />
    </React.Fragment>
  );
};

export default ReactMediaLibraryWrapper;

```

<!-- ## Screenshots

![Upload Tab](docs/images/screenshot-upload.jpg)

![Library Tab](docs/images/screenshot-library.jpg) -->
