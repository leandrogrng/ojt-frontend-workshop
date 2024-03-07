import {Box, Flex, Stack} from '@chakra-ui/react'
import { Link, Outlet, useLocation } from 'react-router-dom'



function App() {
  const location = useLocation();
  console.log(location)
  return (
    <Flex>
      <Box id = 'sidebar'>
        <Box id = 'imageContainer'/>
        <Stack spacing={10} pt={30}>
          <Link to="/" className='menu'>Home</Link>
          <Link to="/resources" className='menu'>Resources</Link>
          <Link to="/projects" className='menu'>Projects</Link>
          <Link to="/companies" className='menu'>Companies</Link>
          <Link to="/requests" className='menu'>Requests</Link>
        </Stack>
      </Box>
      <Box id='outlet'>
        <Outlet />
      </Box>
    </Flex>
  );
}


/*
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
*/

export default App
