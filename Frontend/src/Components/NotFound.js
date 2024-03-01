import React from 'react'
import { Container , Row , Col} from "react-bootstrap"
const NotFound = () => {
  return (
    <Container>
      <Row className='mt-5 text-center'>
        <Col>
        <h1 className='display-6'>Page Not Found</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound