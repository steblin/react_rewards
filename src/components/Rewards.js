import React, { Component } from 'react'
import { Link } from 'react-router'
var dataProvider = require('../dataProvider');
var Griddle = require('griddle-react');

export default class Rewards extends Component {


    render() {

        var { status } = this.props.params;

        var rewardsData = dataProvider.getRewards(status),
            statusTypes = dataProvider.getStatusTypes();


        var columnMetadata= [
            {
                "columnName": "id",
                "locked": false,
                "visible": true,
                "displayName": "Employee Name"
            },
            {
                "columnName": "city",
                "order": 8,
                "locked": false,
                "visible": true
            },
        ];

                return (
            <div className='container'>
                <h1> Rewards List </h1>
                <Link to='/rewards/all/'>All</Link>
                <Link to='/rewards/completed/'>New</Link>
                <Link to='/rewards/redeemed/'>Old</Link>
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
