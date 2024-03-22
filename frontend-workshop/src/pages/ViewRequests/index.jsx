import { Box} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import RequestProvider from '../../contexts/Requests';
import Form from './form';
import Footer from './footer';

const ViewRequests = () => {
    const {id = 'add'} = useParams();
    return (
        <RequestProvider id={id}>
            <Box>
                <Form/> 
                {id !== 'add' ? <Footer/> : ''}          
            </Box>
        </RequestProvider>
    )
}
ViewRequests.propTypes = {};
export default ViewRequests;