import React, { Component } from 'react';

// Input: liked boolean
// Output: onClick

class Like extends Component {
    render() {
        return (
            <i
                onClick={() => this.props.onClick()}
                style={{ cursor: 'pointer' }}
                className={this.getClasses()}>
            </i>
        );
    }

    getClasses() {
        let classes = "fa fa-heart";
        if (!this.props.liked) classes += '-o'
        return classes;
    }
}

export default Like;