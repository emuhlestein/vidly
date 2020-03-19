import React from 'react';

const ListGroup = (props) => {
    const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;
    return (
        <ul className="list-group">
            {items.map(item => (
                <li key={item[valueProperty]} className={item === selectedItem ? "page-item active" : "page-item"}>
                    <a onClick={() => onItemSelect(item)} style={{ cursor: 'pointer' }} className="page-link">{item[textProperty]}</a>
                </li>
            ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}

export default ListGroup;