import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

var DatePicker = require('react-datepicker');
var dataProvider = require('../dataProvider');
var availableTypes = require('../availableTypes');
var moment = require('moment');

export default class EditReward extends Component {
    constructor(props) {
        super(props);

        var rewardItem = dataProvider.getItemById(props.params.rewardId);

        if(!rewardItem) {
            return;
        }

        this.state = {
            saved: false,
            date: moment(rewardItem.date, "MM/DD/YYYY")
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        var experience = ReactDOM.findDOMNode(this.refs.experience).value,
            userId = ReactDOM.findDOMNode(this.refs.user).value,
            user = dataProvider.getUserById(userId),
            date = this.state.date.format("MM/DD/YYYY");

        dataProvider.updateItem(this.props.params.rewardId, {experience, date, user});
        this.setState({saved: true});
    }
    
    setDirty() {
        this.setState({saved: false});
    }

    dateChanged(date) {
        this.setState({
            date: date,
            saved: false
        });
    }

    render() {

        if(!this.state) {
            return (
                <div className="list-group-item-danger"> Invalid reward id provided</div>
            );
        }

        var rewardItem = dataProvider.getItemById(this.props.params.rewardId),
            savedMessage = null;

        var availableTypesOptions = availableTypes.map(type => {
            return <option value={type} key={type}>{type}</option>;
        });

        var availableUsers = dataProvider.getUsers().map(user => {
            return <option value={user.id} key={user.id}>{user.name}</option>;
        });

        if(this.state.saved) {
            savedMessage = <span className="list-group-item-success success-msg"> Saved Successfully!</span>;
        }

        return (
            <div id="edit-form">
                <h3> Edit Reward #{rewardItem.id}</h3>
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            User
                        </Col>
                        <Col sm={10}>
                            <select ref="user" defaultValue={rewardItem.user.id} onChange={this.setDirty.bind(this)}>
                                {availableUsers}
                            </select>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Experience
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                ref="experience"
                                type="text"
                                placeholder="Experience"
                                defaultValue={rewardItem.experience}
                                onChange={this.setDirty.bind(this)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Date
                        </Col>
                        <Col sm={10}>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.dateChanged.bind(this)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Status
                        </Col>
                        <Col sm={10}>
                            <select defaultValue={rewardItem.status} onChange={this.setDirty.bind(this)}>
                                {availableTypesOptions}
                            </select>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button bsStyle="primary" type="submit">
                                Save changes
                            </Button>
                            {savedMessage}
                        </Col>
                    </FormGroup>

                </Form>
            </div>
            );
    }
}
