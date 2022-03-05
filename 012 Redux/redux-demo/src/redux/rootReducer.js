import { combineReducers } from "redux";
import BatReducer from "./batReduce";
import BallReducer from "./ballReduce";

const rootReducer = combineReducers({
    bat: BatReducer,
    ball: BallReducer
})

export default rootReducer