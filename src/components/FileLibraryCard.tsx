import React, { ReactElement } from 'react';
import { FileLibraryListItem } from '../../types';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import formatBytes from '../utils/formatBytes';
import formatDate from '../utils/formatDate';

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  objectPosition: '50% 50%',
};

interface IProps extends FileLibraryListItem {
  selectedItem: FileLibraryListItem | undefined;
}

const FileLibraryCard: React.FC<IProps> = (props: IProps): ReactElement => {
  const {
    _id,
    selectedItem,
    thumbnailUrl,
    title,
    description,
    fileName,
    size,
    createdAt,
  } = props;

  return (
    <Card
      bg={selectedItem !== undefined && selectedItem._id === _id ? 'primary' : undefined}
    >
      {thumbnailUrl && <Card.Img variant="top" src={thumbnailUrl} style={imgStyle} />}
      {(title || description) && (
        <Card.Body>
          <Card.Title
            color={
              selectedItem !== undefined && selectedItem._id === _id
                ? 'white'
                : undefined
            }
          >
            {title}
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      )}
      <ListGroup className="list-group-flush small">
        {fileName && <ListGroupItem>{fileName}</ListGroupItem>}
        {size && <ListGroupItem>{formatBytes(size)}</ListGroupItem>}
        {createdAt && <ListGroupItem>{formatDate(createdAt)}</ListGroupItem>}
      </ListGroup>
    </Card>
  );
};

export default FileLibraryCard;
