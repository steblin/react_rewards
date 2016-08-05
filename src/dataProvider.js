'use strict';

var initialData = require('./data');
var R = require('ramda');

var DataProvider = function() {
    var storage = localStorage,
        storageKey = 'rewardsData';

    if(!storage.rewardsData) {
        storage.setItem(storageKey, JSON.stringify(initialData));
    }

    return {
        getStorageContent () {
            return JSON.parse(storage[storageKey]);
        },

        getRewards(status = 'all') {
            var rewards =  this.getStorageContent().rewards;

            if (status !== 'all') {
                /*filtering rewards by status*/
                rewards = R.filter(R.propEq('status', status))(rewards);
            }

            return rewards;
        },

        getUsers() {
            return this.getStorageContent().userList;
        },

        getUserById(id) {
            return  R.find(R.propEq('id', +id))(this.getUsers());
        },

        getStatusTypes() {
            var types = ['all'];
            this.getRewards().forEach(reward => {
                let { status } = reward;

                if(!types.includes(status)) {
                    types.push(status);
                }
            });

            return types;
        },

        getItemById(id) {
            return  R.find(R.propEq('id', +id))(this.getRewards());
        },

        updateItem(id, data) {
            var storageContent = this.getStorageContent(),
                rewardsList = storageContent.rewards,
                itemIndex = R.findIndex(R.propEq('id', +id))(rewardsList);

            rewardsList[itemIndex] = R.merge(rewardsList[itemIndex], data);

            storage.setItem(storageKey, JSON.stringify(R.merge(storageContent, {rewards: rewardsList})));
        }
    };

};

module.exports = new DataProvider();
