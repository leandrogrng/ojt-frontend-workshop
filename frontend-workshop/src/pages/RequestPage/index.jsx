import { useState, useRef, useEffect } from 'react';
import mockApi from '../../utils/mockApi';
import { Stack, Box} from '@chakra-ui/react';
import Request from './../../components/Requests/Requests'
import Header from '../RequestPage/header';

const RequestPage = () => {
    const [dataRequests, setData] = useState([]);
    const fetched = useRef(false);

    const loadData = () => {
        if (fetch.current) return;
        const requestData = mockApi('GET', '/requests');
        const {status = false, data= []} = requestData;

        if (status) {
            fetched.current = true;
            setData(data);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <Stack>
            <Header/>
            <Box>
                <Request data = {dataRequests}/>
            </Box>
        </Stack>
    )
}

RequestPage.propTypes = {};
export default RequestPage;