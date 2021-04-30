import React from 'react'
import { useState } from 'react'
import { Card, Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap'
import userimage from './userimage.jpg'
import { useDispatch } from 'react-redux'

import axios from 'axios'

const User = ({ user }) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //updated user details

  const [id] = useState(user.id)
  const [Firstname, setFirstname] = useState(user.first_name)
  const [Secondname, setSecondname] = useState(user.last_name)
  const [Email, setEmail] = useState(user.email)
  const [Gender, setGender] = useState(user.gender)
  const [Phone, setPhone] = useState(user.phone)

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const userUpdatedDetails = {
        first_name: Firstname,
        last_name: Secondname,
        email: Email,
        gender: Gender,
        phone: Phone,
      }
      const res = await axios.put(
        `http://localhost:5000/users/${id}`,
        userUpdatedDetails
      )
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }

  //   user Delete handler
  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/users/${id}`)
      window.location.reload()
      alert('Given User Deleted Succesfully')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Card
        className='my-3 p-3 rounded'
        style={{ width: '22rem', height: '21rem' }}
      >
        <Row>
          <Col md={3}>
            <Card.Img src={userimage} />
          </Col>
          <Col md={9}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Name</Col>
                  <Col md={9}>
                    {user.first_name + ' '} {user.last_name}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Email</Col>
                  <Col>{user.email}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Gender</Col>
                  <Col>{user.gender}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phone</Col>
                  <Col>{user.phone}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Button
                      onClick={deleteHandler}
                      variant='danger'
                      style={{ width: 'auto', height: '2rem' }}
                      className='p-1'
                    >
                      Delete
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={handleShow}
                      variant='info'
                      style={{ width: 'auto', height: '2rem' }}
                      className='p-1'
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>User ID</Form.Label>
              <Form.Control type='number' value={id} readOnly />
            </Form.Group>

            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                value={Firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Second Name</Form.Label>
              <Form.Control
                type='text'
                value={Secondname}
                onChange={(e) => setSecondname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>User Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <select
                className='form-control'
                onChange={(e) => setGender(e.target.value)}
              >
                <option>----Select Gender--------</option>
                <option value='male'>Male </option>
                <option value='female'>Female</option>
              </select>
            </Form.Group>

            <Form.Group>
              <Form.Label>phone</Form.Label>
              <Form.Control
                type='text'
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update User
            </Button>

            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default User
