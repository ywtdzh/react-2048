export const ActionType = {SCORE_ACTION: 0};

export function Action(data, type = ActionType.SCORE_ACTION) {
    const action = {};
    if (Array.prototype.isPrototypeOf(data))
        action.data = data;
    else if (Object.prototype.isPrototypeOf(data))
        action.data = [data];
    else
        action.data = [];
    action.type = type;
    return action;
}
