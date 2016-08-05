import React, { Component } from 'react'
import { Link } from 'react-router'

export default class EditButton extends Component {
    render() {
        var url ="/edit/" + this.props.rowData.id + "/";
        return <Link to={url}> Edit </Link>
    }
}