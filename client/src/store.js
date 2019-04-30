import { createStore } from 'redux';
import trainingDiaryApp from './reducers/reducer.js';


const store = createStore(trainingDiaryApp);

export default store;