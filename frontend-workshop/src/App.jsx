import React from 'react';
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import theme from './theme';
import SideNav from './components/SideNav';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid w='full'
            templateAreas= {{
              base: `"sidenav"
                    "content"`,
              md: `"sidenav content"`
            }}
            gridTemplateColumns={[`1fr`, `1fr`,`200px 1fr`]}>
        <GridItem area='sidenav' id='sidebar'>
          <SideNav/>

        </GridItem>
        <GridItem area='content'>
          <Outlet/>

        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
