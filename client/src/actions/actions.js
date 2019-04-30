/*
 * action types
 */

export const ADD_TRAINING = 'ADD_TODO';
export const CHANGE_TRAINING = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';


/*
 * other constants
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_THIS_MONTH: 'SHOW_THIS_MONTH',
    SHOW_THIS_WEEK: 'SHOW_THIS_WEEK',
    SHOW_BY_DATE: 'SHOW_BY_DATE'
}

/*
 * action creators
 */

export function addTraining(text) {
    return { type: ADD_TRAINING, text }
}

export function changeTraining(index) {
    return { type: CHANGE_TRAINING, index }
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
}

