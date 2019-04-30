import { combineReducers } from 'redux';
import {
    ADD_TRAINING,
    CHANGE_TRAINING,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
} from '../actions/actions.js';



const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    trainings: []
};

const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}


function trainings(state = [], action) {
    switch (action.type) {
        case ADD_TRAINING:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case CHANGE_TRAINING:
            return state.map((training, index) => {
                if (index === action.index) {
                    return Object.assign({}, training, action.training)
                }
                return training;
            });
        default:
            return state
    }
}


const trainingDiaryApp = combineReducers({
    visibilityFilter,
    trainings
});

export default trainingDiaryApp;

