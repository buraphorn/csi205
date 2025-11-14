
import { useRef } from "react"
import Form from 'react-bootstrap/Form'
import { verifyUser } from "../data/users"

function Login({setToken, setRole}) {
    const userRef = useRef()
    const passRef = useRef()
    return (
        <div className="Login-container d-flex flex-column align-items-center justify-content-center" 
        style={{width:'200px', margin:'2rem auto'}}>
            <h1>Login</h1>
            
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
                type="text"
                id="username"
                placeholder="user"
                style={{textAlign:'center'}}
                ref={userRef}
            />
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
                type="password"
                id="password"
                placeholder="pass"
                style={{textAlign:'center'}}
                ref={passRef}
            />
            <br/>
            <h7>Uername:user
            <br/>Password:pass
            </h7>
            <button className="btn btn-success mt-3"
            onClick={() => {
                const user = userRef.current.value.trim()
                const pass = passRef.current.value.trim()
                userRef.current.value = ''
                passRef.current.value = ''
                const userInfo= verifyUser(user, pass)
                if (userInfo === null) {
                    alert('Wrong username or password')
                    userRef.current.focus()
                } else {
                    setToken(userInfo.token)
                    setRole(userInfo.role)
            }
            }}>Login</button>
        </div>
    )
}
export default Login