import React, { Component } from 'react';
import { Link } from 'react-router';
require("../main.css");

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <Link className="logoLink" to="/">
                    <img src="https://www.blueboard.com/img/img-76ac841b05bc2a0025504c081ebb1633.png" height="60" />
                </Link>

                 {this.props.children}
            </div>
        )
    }
}