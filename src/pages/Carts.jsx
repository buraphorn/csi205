
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Carts = ({ carts, setCarts }) => {
    return (
    <div className="d-flex flex-column align-items-center  gap-3 mt-3">
      <div className="d-flex flex-wrap gap-5 justify-content-center overflow-y-auto " style={{height: '40rem'}} >
        {carts.map((cart) => {
          return (
            <Card style={{ width: '18rem' }} key={cart.id}>
              <Card.Img variant="top" src={cart.thumbnailUrl} />
              <Card.Body>
                <Card.Title className='text-center'>{cart.title}</Card.Title>
                <Card.Text className='text-center'>{cart.price.toFixed(2)} $</Card.Text>
                <center><Button variant="outline-danger" onClick={() => {setCarts(carts.filter(c => c.id !== cart.id))}}>Remove from Carts</Button></center>
              </Card.Body>
            </Card>
          )

        })}
      </div>
      <h4>Items: {carts.length} item - Total Price: ${carts.reduce((prev, cart) => prev + cart.price, 0).toFixed(2)}</h4>
      <button className='btn btn-success'>Checkout</button>
    </div>
    );
};

export default Carts;