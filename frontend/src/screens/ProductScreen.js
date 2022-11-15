import React, { useState, useEffect } from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Card, Button, ListGroup, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'


const ProductScreen = () => {
  /*const [product, setProduct] = useState([])*/
  const params = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    /*const fetchProduct = async() => {
      const { data } = await axios.get(`/api/products/${params.id}`)

      setProduct(data)
    }

    fetchProduct()*/

    dispatch(listProductDetails(params.id))
  }, [dispatch, params.id])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Go Back
      </Link>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
        <Col md={6} lg={6} xs={12}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>

            <ListGroup.Item>
              <h3>{product.name}</h3>
              <h3>1 Kg</h3>
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

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map(x => (
                          <option key={x+1} value={x+1}>{x+1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                <Button onClick={addToCartHandler} className='btn btn-lg btn-primary' type='button' disabled={product.countInStock === 0}>
                  Add To Cart
                </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      ) }
      
    </>
  )
}

export default ProductScreen
