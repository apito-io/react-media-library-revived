import * as React from 'react';
import { ReactMediaLibraryRevivedProps } from '../../types';
import Modal from 'react-bootstrap/Modal';
import ReactMediaLibraryTabs from './ReactMediaLibraryTabs';

const ReactMediaLibraryRevived: React.FC<ReactMediaLibraryRevivedProps> = (
  props: ReactMediaLibraryRevivedProps,
): React.ReactElement => {
  const {
    show,
    onHide,
    modalTitle,
    fileLibraryList,
    fileUploadCallback,
    fileSelectCallback,
    fileDeleteCallback,
    libraryCardComponent,
    sortProperty,
    itemsPerPage,
    dialogClassName
  } = props;

  return (
    <Modal
      size="xl"
      show={show}
      onHide={onHide}
      id="react-media-library-revived-modal"
      aria-labelledby="react-media-library-revived-modal"
      dialogClassName={dialogClassName}
    >
      <Modal.Header closeButton>
        {modalTitle && <Modal.Title>{modalTitle}</Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        <ReactMediaLibraryTabs
          fileLibraryList={fileLibraryList}
          fileUploadCallback={fileUploadCallback}
          fileSelectCallback={fileSelectCallback}
          fileDeleteCallback={fileDeleteCallback}
          libraryCardComponent={libraryCardComponent}
          sortProperty={sortProperty}
          itemsPerPage={itemsPerPage}
        />
      </Modal.Body>
    </Modal>
  );
};

ReactMediaLibraryRevived.defaultProps = {
  modalTitle: 'Media Library',
};

export default ReactMediaLibraryRevived;
