import React, { ReactElement, ReactNode, useState, useMemo } from 'react';
import { FileLibraryListItem, FileLibraryProps } from '../../types';
import Col from 'react-bootstrap/Col';
import FileLibraryCard from './FileLibraryCard';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import FileLibraryPager from './FileLibraryPager';
import { IItemsPerRow } from '../../types/components/FileLibrary';

const FileLibrary: React.FC<FileLibraryProps> = (
  props: FileLibraryProps,
): ReactElement => {
  const {
    sortProperty,
    sortAscending,
    fileLibraryList,
    libraryCardComponent,
    fileDeleteCallback,
    fileSelectCallback,
    itemsPerPage = 12,
    itemsPerRow
  } = props;

  const [selectedItem, setSelectedItem] = useState<FileLibraryListItem | undefined>(
    undefined,
  );
  const [page, setPage] = useState<number>(1);

  const itemsPerRowParsed: IItemsPerRow = useMemo(() => {
    const { xs = 12, sm = 6, md = 4, lg = 6 } = itemsPerRow || {};
    return { xs, sm, md, lg };
  }, [itemsPerRow]);

  function sortArray(a: FileLibraryListItem, b: FileLibraryListItem): -1 | 0 | 1 {
    try {
      const property = sortProperty;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let valA: any = property !== undefined ? a[property] : 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let valB: any = property !== undefined ? b[property] : 0;

      // If string, ignore upper and lowercase
      if (typeof valA === 'string') valA = valA.toUpperCase();
      if (typeof valB === 'string') valB = valB.toUpperCase();

      if (sortAscending) {
        return valA < valB ? -1 : 1;
      } else {
        return valA > valB ? -1 : 1;
      }
    } catch {
      return 0;
    }
  }

  function renderList(): ReactNode[] {
    if (!fileLibraryList) return [];

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
      .map((element: FileLibraryListItem, index: number) => {
        return (
          <Col
            key={index}
            xs={itemsPerRowParsed.xs || 12}
            sm={itemsPerRowParsed.sm || 6}
            md={itemsPerRowParsed.md || 4}
            lg={itemsPerRowParsed.lg || 3}
            className="mb-3"
            onClick={() => setSelectedItem(element)}
          >
            {React.createElement(libraryCardComponent as React.FC<FileLibraryListItem>, {
              selectedItem,
              ...element,
            })}
          </Col>
        );
      });
  }

  const submitRow: ReactNode = selectedItem && (
    <Row>
      <Col className="text-right">
        {fileDeleteCallback !== undefined && (
          <Button
            variant="danger"
            onClick={() => {
              if (fileDeleteCallback)
                fileDeleteCallback(selectedItem as FileLibraryListItem);
            }}
            className="mr-3"
          >
            Delete
          </Button>
        )}
        <Button
          variant="primary"
          onClick={() => fileSelectCallback(selectedItem as FileLibraryListItem)}
        >
          Select File
        </Button>
      </Col>
    </Row>
  );

  const pagerRow: ReactNode = fileLibraryList.length > itemsPerPage && (
    <Row>
      <Col className="d-flex justify-content-center">
        <FileLibraryPager
          count={fileLibraryList.length}
          page={page}
          pagerCallback={(number: number) => setPage(number)}
          itemsPerPage={itemsPerPage}
        />
      </Col>
    </Row>
  );

  return (
    <>
      <Row className="py-3">{renderList()}</Row>
      {pagerRow}
      {submitRow}
    </>
  );
};

FileLibrary.defaultProps = {
  sortProperty: 'createdAt',
  sortAscending: false,
  libraryCardComponent: FileLibraryCard,
  itemsPerPage: 12,
  itemsPerRow: { xs: 12, sm: 12, md: 6, lg: 3 }
};

export default FileLibrary;
