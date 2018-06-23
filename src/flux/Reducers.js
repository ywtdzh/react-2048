import {ActionType} from "./Actions";

const reducers = {
    score: function (state = [], action) {
        if (action.type !== ActionType.SCORE_ACTION || action.data.length === 0) return state;
        const currentState = state.concat(action.data);
        window.localStorage.scoreList = JSON.stringify(currentState);
        return currentState.sort((b, a) => (a.point - b.point || a.createdAt > b.createdAt));
    }
};

export default reducers;
