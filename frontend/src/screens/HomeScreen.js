import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import User from '../components/User'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import { listUsers } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const usersList = useSelector((state) => state.userList)
  const { loading, error, users } = usersList

  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  useEffect(() => {
    dispatch(listUsers())
  }, [currentPage])

  // Get Current Users
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <h1>List of Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {currentUsers.map((user) => (
            <Col key={user.id} sm={12} md={6} lg={3} xl={4}>
              <User user={user} />
            </Col>
          ))}
        </Row>
      )}
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
    </>
  )
}

export default HomeScreen
