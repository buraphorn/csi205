import { useState } from 'react' 
import Value from '../components/Value'
import Adder from '../components/Adder'
import Timer from '../components/Timer'
import Temperatures from '../components/Temperatures'

const Components = () => {
  const [counter , setCounter] = useState(0)

  return (
    <>
    
      <Value name={'COUNTER'} value={counter} setValue={setCounter}/> 
      <Timer />
      <Adder name={'Add'} initA={10} initB={20}/>
      <Temperatures name={'Temperatures'} initA={10}/>
      <h1 className='text-center mt-3'>67167437 บุรพร วันทอง</h1>
    </>
  )
}

export default Components