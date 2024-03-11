import {Box, ChakraProvider, Flex, Stack} from '@chakra-ui/react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import theme from './theme'
import mockApi from './utils/mockApi';

function App() {
  const {pathname} = useLocation();
  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <Box id = 'sidebar'>
          <Box id = 'imageContainer'/>
          <Stack spacing={0} pt={30}>
            <Link to="/" 
                  className={pathname === '/' ? 'menuActive' : 'menu'}> Home </Link>
            <Link to="/resources" 
                  className={pathname === '/resources' ? 'menuActive' : 'menu'}> Resources </Link>
            <Link to="/projects" 
                  className={pathname === '/projects' ? 'menuActive' : 'menu'}> Projects </Link>
            <Link to="/companies" 
                  className={pathname === '/companies' ? 'menuActive' : 'menu'}> Companies </Link>
            <Link to="/requests" 
                  className={pathname === '/404' ? 'menuActive' : 'menu'}>Requests</Link>
          </Stack>
        </Box>
        <Box id='outlet'>
          <Outlet />
        </Box>
      </Flex>      
    </ChakraProvider>
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
