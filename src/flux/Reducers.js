import {ActionType} from "./Actions";
import _ from 'lodash';

const reducers = {
    score: function (state = [], action) {
        if (action.type !== ActionType.SCORE_ACTION || action.data.length === 0) return state;
        const currentState = _.uniqWith(state.concat(action.data), function (a, b) {
            return a.maxNumber === b.maxNumber && a.score === b.score && a.createdAt === b.createdAt;
        });
        window.localStorage.scoreList = JSON.stringify(currentState);
        return currentState.sort((b, a) => (a.maxNumber - b.maxNumber || a.point - b.point || a.createdAt > b.createdAt));
    }
};

export default reducers;
