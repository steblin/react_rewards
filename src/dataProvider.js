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
        getRewards(status = 'all') {
            var rewards =  JSON.parse(storage[storageKey]).rewards;

            if (status !== 'all') {
                /*filtering rewards by status*/
                rewards = R.filter(R.propEq('status', status))(rewards);
            }

            rewards =  rewards.map(reward => {
                reward.user = reward.user.name;
                return reward;
            });

            return rewards;
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

        tmstmp: new Date()
    };

};

module.exports = new DataProvider();
