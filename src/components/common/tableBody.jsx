import React, { Component } from 'react'
import _ from 'lodash';

// data: Array
// onClick: function
// onDelete: function
class TableBody extends Component {
    renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path);
    };

    createKey(item, column) {
        const key = item._id + (column.path || column.key);
        return key;
    }

    getItemKey(item) {
        return item._id;
    }

    render() {
        const { data, columns } = this.props;

        return (
            <tbody>
                {data.map(item => (<tr key={this.getItemKey(item)}>
                    {columns.map(column => <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>)}
                </tr>))}
            </tbody>);
    }
}

export default TableBody;