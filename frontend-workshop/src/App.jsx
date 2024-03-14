import {Box, ChakraProvider, Flex, Stack} from '@chakra-ui/react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import theme from './theme'

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
                  className={pathname.startsWith('/resources') ? 'menuActive' : 'menu'}> Resources </Link>
            <Link to="/projects" 
                  className={pathname.startsWith('/projects') ? 'menuActive' : 'menu'}> Projects </Link>
            <Link to="/companies" 
                  className={pathname.startsWith('/companies') ? 'menuActive' : 'menu'}> Companies </Link>
            <Link to="/requests" 
                  className={pathname.startsWith('/404') ? 'menuActive' : 'menu'}>Requests</Link>
          </Stack>
        </Box>
        <Box id='outlet'>
          <Outlet />
        </Box>
      </Flex>      
    </ChakraProvider>
  );
}

export default App
