import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import User from '../components/User'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listUsers } from '../actions/userActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const usersList = useSelector((state) => state.userList)
  const { loading, error, users, page, pages } = usersList

  useEffect(() => {
    dispatch(listUsers(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h1>List of Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {users.map((user) => (
              <Col key={user._id} sm={12} md={6} lg={3} xl={4}>
                <User user={user} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
