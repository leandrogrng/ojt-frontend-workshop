import React, { Fragment } from 'react';
import { Box, Container, Flex, Stack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import routes from './routes';

const SideNav = () => {
    const { pathname } = useLocation();
    return (
        <Container bgColor='blue'>
            <Stack  flexDirection={{base: 'row', md: 'column'}}>
                {routes.map(({ path, name }) => (
                    <Box key={`navigation-${name}`}>
                        <Link key={path} to={path}
                            className={path === '/' ? (pathname === path ? 'menuActive' : 'menu') : 
                            (pathname.startsWith(path) ? 'menuActive' : 'menu')}>
                            {name}
                        </Link>
                    </Box>
                ))}
            </Stack>
        </Container>
    );
};

export default SideNav;
