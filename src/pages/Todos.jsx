
import { Form, Table, Badge, Button, Modal } from 'react-bootstrap'
import { useEffect, useRef, useState } from "react"
import { fetchTodos } from "../data/todos"
import { Prev } from 'react-bootstrap/esm/PageItem'


const Todos = () => {

    //todosRaw -> filters -> todos
    const [todosRaw, setTodosRaw] = useState([])
    const [todos, setTodos] = useState([])
    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [curPage, setcurPage] = useState(1)
    const [numPage, setnumPage] = useState(3)

    //load
    useEffect(() => {
        setTodosRaw(fetchTodos())
        //fetch
        //intiial
    }, []) //fetch todos on loaded

    useEffect(() => {

        //console.log(todosRaw)
        //bypass filters
        setTodos(todosRaw)
    }, [todosRaw, onlyWaiting])


    // useEffect( ()=> {
    //     console.log(onlyWaiting)
    // }, [onlyWaiting])

    useEffect(() => {
        console.log('itmeperpage:' + itemsPerPage)
    }, [itemsPerPage])

    useEffect(() => {
        if (onlyWaiting) {
            setTodos(todosRaw.filter((todo) => {
                return !todo.completed
            }))
        } else {
            //show all
            setTodos(todosRaw)
        }
    })


    //...todo -> [x] -> numpage -> [x] -> curpage -> todos
    // itemsPerPage
    useEffect(() => {
        setnumPage(Math.ceil(todos.length / itemsPerPage))
    }, [todos, itemsPerPage]
    )
    useEffect(() => {
        if (numPage <= 0) setcurPage(0)
        else if (curPage > numPage) setcurPage(numPage)
        else if (curPage === 0) setcurPage(1)
    }, [numPage]
    )

    const waitingClicked = (id) => {
        console.log(id)
        //change completed => true
        todosRaw.find((todo) => todo.id === id).completed = true

        setTodosRaw([...todosRaw])
    }
    const deleteClicked = (id) => {
        // const remainTodos = todosRaw.filter((todo) =>{
        //     return todo.id !== id
        // })
        // setTodosRaw(remainTodos)
        setTodosRaw(todosRaw.filter((todo) => todo.id !== id))
    }

    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //save

    const newIdRef = useRef()
    const newTitleRef = useRef()

    const saveClicked = (id, title) =>{
        console.log()
        if (title.trim() !== ''){
            //save
            const newTodo = {
                userId: 1,
                id,
                title,
                completed: false,
            } 
            setTodosRaw([...todosRaw,newTodo])
        }

        handleClose()
    }
    return (<>

        {/* modal */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add to do</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            value={todosRaw.reduce((prev , todo) => (todo.id > prev ? todo.id : prev),-1)+1}
                            disabled
                            ref={newIdRef}
                            
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Title</Form.Label>
                        <Form.Control as="textarea" rows={3} 
                        placeholder='สิ่งที่ต้องทำ'
                        ref={newTitleRef}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {
                    saveClicked(Number(newIdRef.current.value) , newTitleRef.current.value)
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        {/* Modal */}

        <p className='mb-2 mb-md-3'></p>
        {/* //fliters */}
        <Form>
            <div className='d-flex justify-content-between align-items-center'>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Show only waiting"
                    onChange={(e) => { setOnlyWaiting(e.target.checked) }}
                // onChange={(e) => { console.log(e.target.checked)}}
                />
                <Form.Select aria-label="Default select example" className='w-25'
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    value={itemsPerPage}>
                    <option value={5}>5 items per page</option>
                    <option value={10}>10 items per page</option>
                    <option value={50}>50 items per page</option>
                    <option value={100}>100 items per page</option>
                </Form.Select>
            </div>
        </Form>
        {/* table */}
        <div>
            <Table striped bordered hover>
                <thead className='table-dark text-center'>
                    <tr>
                        <th style={{ width: '3rem' }}>ID</th>
                        <th>Title</th>
                        <th style={{ width: '10rem' }}>Completed <button onClick={handleShow}><i className='bi bi-plus'></i></button></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //start =( curpage -1 )* itemsparpage = 0
                        //stop = curpage * itemsparpage -1 = 4
                        todos.filter((todo, index) => {
                            return (
                                index >= (curPage - 1) * itemsPerPage &&
                                index <= curPage * itemsPerPage - 1
                            )
                        })

                            .map((todo) => {
                                return (
                                    <tr>
                                        <td>
                                            <Badge bg="secondary">{todo.id}</Badge>
                                        </td>
                                        <td>{todo.title}</td>
                                        <td className='text-end'>
                                            {todo.completed ?
                                                <Badge bg='success' className='fs-6'>'done'</Badge>
                                                :
                                                <button bg="warning" className="text-dark btn btn-warning " onClick={() => { waitingClicked(todo.id) }}>
                                                    Waiting&nbsp;<i class="bi bi-clock"></i></button>
                                                // <Badge bg='warning'>'waiting'</Badge>
                                            }
                                            <button className="btn btn-danger text" onClick={() => {
                                                deleteClicked(todo.id)
                                            }}><i class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}

                </tbody>
            </Table>
        </div>
        {/* page control */}
        <div className="text-center">
            <button className="btn btn-primary" onClick={() => { setcurPage(1) }}
                disabled={curPage === 1}
            >First
            </button>&nbsp;

            <button className="btn btn-primary" onClick={() => {
                if (curPage > 1) {
                    setcurPage((p) => p - 1)
                }
            }}
                disabled={curPage === 1}
            >Previous
            </button>&nbsp;

            <span>&nbsp;{curPage} / {numPage}&nbsp;</span>&nbsp;

            <button className="btn btn-primary" onClick={() => {
                if (curPage < numPage) {
                    setcurPage((p) => p + 1)
                }
            }}
                disabled={curPage === numPage}
            >Next
            </button>&nbsp;

            <button className="btn btn-primary" onClick={() => {
                setcurPage(numPage)
            }
            }
                disabled={curPage === numPage}
            >Last
            </button>&nbsp;
            <p className='mb-2 mb-md-3'></p>
        </div>
    </>)
}

export default Todos