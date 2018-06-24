import Score from "../public/Score";

export const ActionType = {SCORE_ACTION: 0};

export function Action(data, type = ActionType.SCORE_ACTION) {
    const action = {};
    if (Array.prototype.isPrototypeOf(data))
        action.data = data;
    else if (Score.prototype.isPrototypeOf(data))
        action.data = [data];
    else
        action.data = [];
    action.type = type;
    return action;
}
