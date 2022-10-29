import React, { useState, useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import { Row, Col, Image, Card, Button, ListGroup } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'



const ProductScreen = () => {
  const [product, setProduct] = useState([])
  const params = useParams()

  useEffect(() => {
    const fetchProduct = async() => {
      const { data } = await axios.get(`/api/products/${params.id}`)

      setProduct(data)
    }

    fetchProduct()
  }, [])


  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6} lg={6} xs={12}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>

            <ListGroup.Item>
              <h3>{product.name}</h3>
              <h4>{product.quantity}</h4>
            </ListGroup.Item>

            
            <ListGroup.Item>
              <Rating value={product.rating} text={product.numReviews}/>
            </ListGroup.Item>

            <ListGroup.Item>
              Price : &#8377;{product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              Description : {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col nd={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    &#8377;{product.price}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:
                  </Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <div className='d-grid gap-2'>
                <Button className='btn btn-lg btn-primary' type='button' disabled={product.countInStock === 0}>
                  Add To Cart
                </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
