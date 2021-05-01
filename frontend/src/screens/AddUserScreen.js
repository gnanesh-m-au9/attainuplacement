import React from 'react'
import { useState } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const AddUser = () => {
  const [firstname, setFirstname] = useState(null)
  const [secondname, setSecondname] = useState(null)
  const [email, setEmail] = useState(null)
  const [gender, setGender] = useState(null)
  const [phone, setPhone] = useState(null)

  const addNewUserHandler = async (e) => {
    e.preventDefault()
    try {
      const newUser = {
        firstname: firstname,
        secondname: secondname,
        email: email,
        gender: gender,
        phone: phone,
      }
      await axios.post('http://localhost:5000/api/users/addnewuser', newUser)
      alert('New user added succesully')
      window.location.reload()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Row>
      <Container>
        <Col>
          <Form onSubmit={addNewUserHandler}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter First Name'
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Second Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Second Name'
                onChange={(e) => setSecondname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>User Email</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <select
                className='form-control'
                onChange={(e) => setGender(e.target.value)}
                selected={gender}
              >
                <option>----Select Gender--------</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </Form.Group>

            <Form.Group>
              <Form.Label>phone</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Phone'
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Add New User
            </Button>
          </Form>
        </Col>
      </Container>
    </Row>
  )
}

export default AddUser
