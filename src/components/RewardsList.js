import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';
import EditButton from './EditButton';

var dataProvider = require('../dataProvider');
var availableTypes = require('../availableTypes');
var Griddle = require('griddle-react');

export default class RewardsList extends Component {

    componentWillMount() {
        /*if not valid status provided, redirecting to main page!*/
        if(!availableTypes.includes(this.props.params.status)) {
            browserHistory.push('/');
        }
    }

    render() {

        var { status } = this.props.params;

        var rewardsData = dataProvider.getRewards(status),
            statusTypes = dataProvider.getStatusTypes();

        rewardsData.map(rewardItem => {
            /*flatten data for Griddle component*/
            rewardItem.user = rewardItem.user.name;

            rewardItem.actions = true;
            return rewardItem;
        });

        var statusLinks = statusTypes.map(status => {
            return (
                <li key={status}>
                    <Link
                        to={'/rewards/' + status}
                        activeClassName='active'
                    >
                        {status}
                    </Link>
                </li>
            );
        });

        var columnMetadata=[
        {columnName:"actions", customComponent:EditButton}
         ];

        return (
            <div>
                <h1> Rewards List </h1>

                <ul className="nav nav-tabs nav-justified">
                    {statusLinks}
                </ul>

                <Griddle
                    results={rewardsData}
                    showSettings={true}
                    columnMetadata={columnMetadata}
                    resultsPerPage={10}
                    showFilter={true}
s                />
            </div>

        );

    }
}
