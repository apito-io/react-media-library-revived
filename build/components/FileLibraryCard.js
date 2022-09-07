import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import formatBytes from '../utils/formatBytes';
import formatDate from '../utils/formatDate';
const imgStyle = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    objectPosition: '50% 50%',
};
const FileLibraryCard = (props) => {
    const { _id, selectedItem, thumbnailUrl, title, description, fileName, size, createdAt, } = props;
    return (React.createElement(Card, { bg: selectedItem !== undefined && selectedItem._id === _id ? 'primary' : undefined },
        thumbnailUrl && React.createElement(Card.Img, { variant: "top", src: thumbnailUrl, style: imgStyle }),
        (title || description) && (React.createElement(Card.Body, null,
            React.createElement(Card.Title, { color: selectedItem !== undefined && selectedItem._id === _id
                    ? 'white'
                    : undefined }, title),
            React.createElement(Card.Text, null, description))),
        React.createElement(ListGroup, { className: "list-group-flush small" },
            fileName && React.createElement(ListGroupItem, null, fileName),
            size && React.createElement(ListGroupItem, null, formatBytes(size)),
            createdAt && React.createElement(ListGroupItem, null, formatDate(createdAt)))));
};
export default FileLibraryCard;
//# sourceMappingURL=FileLibraryCard.js.map