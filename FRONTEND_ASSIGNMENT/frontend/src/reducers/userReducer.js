export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'USERS_LIST_REQUEST':
      return { loading: true, users: [] }
    case 'USERS_LIST_SUCCESS':
      return {
        loading: false,
        users: action.payload.users,
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case 'USERS_LIST_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
