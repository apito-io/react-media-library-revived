import React, { ReactElement, ReactNode } from 'react';
import { FileUploadListProps, FileUploadListItem } from '../../types';
import Badge from 'react-bootstrap/Badge';

function renderBadge(status: number): ReactNode {
  switch (status) {
    case -1:
      return <Badge bg="danger">Failed</Badge>;
    case 0:
      return <Badge bg="secondary">Processing</Badge>;
    case 1:
      return <Badge bg="success">Success</Badge>;
    default:
      return <Badge bg="danger">Failed</Badge>;
  }
}

const FileUploadList: React.FC<FileUploadListProps> = (
  props: FileUploadListProps,
): ReactElement => {
  const { fileUploadList } = props;

  function renderList(): ReactNode[] {
    return fileUploadList.map((element: FileUploadListItem, index: number) => {
      return (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {element.fileName}
          {renderBadge(element.status)}
        </li>
      );
    });
  }

  return (
    <>
      {fileUploadList.length > 0 && <h3>Uploaded Files</h3>}
      <ul className="list-groups p-0">{renderList()}</ul>
    </>
  );
};

export default FileUploadList;
