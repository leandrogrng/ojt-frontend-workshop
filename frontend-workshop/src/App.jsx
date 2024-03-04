import './App.css'
import Resources from './components/Twice'
import Companies from './components/Companies'
import Projects from './components/Projects'
//import { Grid, GridItem } from '@chakra-ui/react'

function App() {
  return (
    <>
      <h1 id = 'title'> HELLO WORLD! </h1>
      <div id= 'top'>
        <h1> Companies </h1>
        <Companies/>
      </div>

      <div id = 'lowerSection'>
        <div id = 'lowerleft'>
          <h1> Resources </h1>
          <Resources/>
        </div>
        <div id = 'lowerright'>
          <h1> Projects </h1>
          <Projects/>
        </div>
      </div>  
    </>
  )
}

export default App
