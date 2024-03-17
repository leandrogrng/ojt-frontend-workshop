import { Box, Stack } from '@chakra-ui/react'
import Resources from '../../components/Resources/Twice'
import {useEffect, useState, useRef} from 'react'
import Header from './header';
import mockApi from '../../utils/mockApi';

const ResourcesPage = () => {
    const [resourcesData, setData] = useState([]);
    const fetched = useRef(false);

    const loadData = () => {
        if (fetched.current) return;
        const requestData = mockApi("GET", "/resources");
        const {status = false, data = {}} = requestData;
        
        if (status) {
            fetched.current = true;
            setData(data);
        }
    }

    useEffect ( () => {
        loadData();
    }, [] );

    return (
        <Stack>
            <Header/>
            <Box className='containers'>
                    <Resources  data = {resourcesData} />            
            </Box>
        </Stack>
    )
};

ResourcesPage.propTypes = {};
export default ResourcesPage;