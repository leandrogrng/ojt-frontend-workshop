import { Box, Button, Divider, Spacer } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import mockApi from "../../utils/mockApi";
import CompaniesForm from "../../forms/CompaniesForm";

const ViewCompanies = () => {
    const {id = 'add'} = useParams();
    const navigate = useNavigate();

    const handleAdd = (data) => {
        let method = "POST";
        let endpoint = "/companies";

        if(data?.id > -1) {
            method = "PUT";
            endpoint = `/companies/${data?.id}`;
        };
        mockApi(method, endpoint, data);
    };

    const handleDelete = () => {
        mockApi('DELETE', `/companies/${id}`);
        navigate('/companies');
    };

    const handleCancel = () => {
        navigate('/companies')
    };

    return (
        <Box w='container.md' mx='auto' bgColor='white' padding={6}>
            <CompaniesForm  id = {id}   onAdd={handleAdd}
                                        onExit = {handleCancel} />
            <Divider/>
            <Spacer/>
            {id !== 'add' ? 
            <Box>
                <Button colorScheme='red' onClick = {handleDelete}>
                    Delete Companies
                </Button>
            </Box> : '' }
        </Box>
    );
}

ViewCompanies.propTypes = {}
export default ViewCompanies;