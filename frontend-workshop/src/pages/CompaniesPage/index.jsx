import { Box, Card, CardBody, Stack } from '@chakra-ui/react';
import Companies from './../../components/Companies/Companies';
import { useEffect, useRef, useState } from 'react';
import Header from './header';
import mockApi from '../../utils/mockApi';

const CompaniesPage = () => {
    const [companiesData, setData] = useState([]);
    const fetched = useRef(false);

    const loadData = () => {
        if (fetched.current) return;
        const requestData = mockApi("GET", "/companies");
        const {status = false, data = {}} = requestData;
        if (status) {
            fetched.current = true;
            setData(data);
        }
    }

    useEffect ( () => {
        loadData();
    }, [] )

    return (
        <Stack>
            <Header />
            <Box className='containers'>
                <Companies   data = {companiesData}/>           
            </Box>
        </Stack>
    )
};

CompaniesPage.propTypes = {};
export default CompaniesPage;