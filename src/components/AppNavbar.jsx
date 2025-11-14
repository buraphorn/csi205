
import { Link } from 'react-router-dom' 

const AppNavbar = ({ products, carts, setToken }) => {
    return (
        <div className="d-flex justify-content-center gap-2 ">
            <Link to="/home"><button className="btn btn-outline-primary">Home</button></Link>
            <Link to="/calculator"><button className="btn btn-outline-primary">Calculator</button></Link>
            <Link to="/animetion"><button className="btn btn-outline-primary">Animetion</button></Link>
            <Link to="/components"><button className="btn btn-outline-primary">Components</button></Link>
            <Link to="/todos"><button className="btn btn-outline-primary">Todos</button></Link>
            <Link to="/products"><button className="btn btn-outline-primary ">Products({products.length})</button></Link>
            <Link to="/carts"><button className="btn btn-outline-primary position-relative">Carts    
                { carts.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {carts.length < 10 ? carts.length : '9+'}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                )}
            </button>
            </Link>
            <Link>
            <button className='btn btn-outline-danger'
            onClick={() => {
                setToken('')}}>
                Logout
            </button>
            </Link>
        </div>
    )
}

export default AppNavbar