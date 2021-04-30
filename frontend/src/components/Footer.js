import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col className='text-center py-3'>
          <footer>footer &copy; User Details</footer>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
