import {ADD, MINUS} from "../constants/counter";

const INITIAL_STATE = {
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'replace':
      return {
        ...state,
        pages_list: action.value
      }
    default:
      return state
  }
}
