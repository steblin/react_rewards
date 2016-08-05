import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './containers/App';
import RewardsList from './components/RewardsList';
import EditReward from './components/EditReward';
import NotFound from './components/NotFound';

export const routes = (
    <div>
        <Route path='/' component={App}>
            <IndexRedirect to='rewards/all' />
            <Route path='/rewards/:status' component={RewardsList} />
            <Route path='/edit/:rewardId' component={EditReward} />
        </Route>
        <Route path='*' component={NotFound} />
    </div>
)
