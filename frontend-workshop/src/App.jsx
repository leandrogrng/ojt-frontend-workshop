import {ChakraProvider, Box, Flex, Stack} from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom'
import Home from './pages/Home/Home'
import './App.css'
import './index.css'

/*
function App() {
  return (
    <Box>
      <Flex>
        <Box>
          <Stack>
            <Link to = "/">Home</Link>
            <Link to = '/resources'> Resources </Link>
            <Link to = '/projects'> Projects </Link>
            <Link to = '/companies'> Companies </Link>
            <Link to = '/accouting'> Accouting</Link>
          </Stack>
        </Box>
      </Flex>
      <Outlet />
    </Box>
  )
}
*/

function App() {
  return (
    <>
      <ChakraProvider id= 'main'>
        <div className = 'root'>
          <div id= 'sidebar'>
            <Stack>


              <Link className='menu' to = "/"> Home </Link>
              <Link className='menu' to = '/resources'> Resources </Link>
              <Link className='menu' to = '/projects'> Projects </Link>
              <Link className='menu' to = '/companies'> Companies </Link>
              <Link className='menu' to = '/requests'> Requests</Link>    
              <h6> Copyright 2024</h6>          
            </Stack>
          </div>

          <div id= 'display'>
            <Outlet/>
          </div>
        </div>
      
      </ChakraProvider>
    </>
  )
}

export default App
