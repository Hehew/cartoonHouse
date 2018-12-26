const INITIAL_STATE = {
  pages_list: []
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'replace':
      return {
        ...state,
        pages_list: action.value
      }
    case 'setPageDetail':
      return {
        ...state,
        pageDetail: action.value
      }
    case 'setPageDetailIds':
        return{
          ...state,
          pageDetailIds: action.value
        }
    default:
      return state
  }
}
