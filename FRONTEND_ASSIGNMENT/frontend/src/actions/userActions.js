import axios from 'axios'

export const listUsers = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: 'USERS_LIST_REQUEST' })

    const { data } = await axios.get(
      `http://localhost:5000/api/users?keyword=${keyword}&pageNumber=${pageNumber}`
    )
    dispatch({ type: 'USERS_LIST_SUCCESS', payload: data })
  } catch (error) {
    dispatch({
      type: 'USERS_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// export const updateUser = (userUpdatedDetails, id) => async (dispatch) => {
//   try {
//     const { data } = await axios.put(
//       `http://localhost:5000/users/${id}`,
//       userUpdatedDetails
//     )
//     dispatch({ type: 'USERS_UPDATE_SUCCESS' })
//   } catch (error) {
//     dispatch({
//       type: 'USERS_UPDATE_FAIL',
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }
