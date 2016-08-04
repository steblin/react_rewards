import React, { Component } from 'react'
import { Link } from 'react-router'
var dataProvider = require('../dataProvider');
var Griddle = require('griddle-react');

export default class Rewards extends Component {

    render() {

        var { status } = this.props.params;

        var rewardsData = dataProvider.getRewards(status),
            statusTypes = dataProvider.getStatusTypes();

        var statusLinks = statusTypes.map(status => {
            return (
				<li key={status}>
					<Link to={'/rewards/' + status}>{status}</Link>
				</li>
            );
        })



                return (
            <div className='container'>
                <h1> Rewards List </h1>
				<ul>
					{statusLinks}
                </ul>
                <Griddle
                    results={rewardsData}
                    showFilter={true}
                    enableInfiniteScroll={true}
                    bodyHeight={500}
                />
            </div>

        );

    }
}
