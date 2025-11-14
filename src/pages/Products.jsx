

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Products = ({ products, carts, setCarts }) => {
  return (
    <div className="d-flex flex-column align-items-center  gap-3 mt-3 ">
      <div className="d-flex flex-wrap gap-5 justify-content-center overflow-y-auto " style={{height: '40rem'}}>
        {products.map((product) => {
          return (
            <Card style={{ width: '18rem' }} key={product.id}>
              <Card.Img variant="top" src={product.thumbnailUrl} />
              <Card.Body>
                <Card.Title className='text-center'>{product.title}</Card.Title>
                <Card.Text className='text-center'>{product.price.toFixed(2)} $</Card.Text>
                {carts.find((cart) => cart.id === product.id) ? (
                  <center><span className='badge bg-danger'>Added</span></center>
                ) : (
                  <center><Button variant="outline-primary " onClick={() => setCarts([...carts, product])} >Add to Carts</Button></center>
                )}
              </Card.Body>
            </Card>
          )

        })}
      </div>
    </div>
  );
};

export default Products