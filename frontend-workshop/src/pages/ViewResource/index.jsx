import { Box, Button, Divider, Spacer } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import ResourcesForm from "../../forms/ResourcesForm";
import mockApi from "../../utils/mockApi";

const ViewResource = () => {
    const {id = 'add'} = useParams();
    const navigate = useNavigate();

    const handleAdd = (data) => {
        let method = "POST";
        let endpoint = "/resources";

        if(data?.id > -1) {
            method = "PUT";
            endpoint = `/resources/${data?.id}`;
        };
        mockApi(method, endpoint, data);
    };

    const handleDelete = () => {
        mockApi('DELETE', `/resources/${id}`);
        navigate('/resources');
    };

    const handleCancel = () => {
        navigate('/resources')
    };

    return (
        <Box w='container.md' mx='auto' bgColor='white' padding={6}>
            <ResourcesForm  id = {id}   onAdd={handleAdd}
                                        onExit = {handleCancel} />
            <Divider/>
            <Spacer/>
            <Box>
                <Button colorScheme='red' onClick = {handleDelete}>
                    Delete Resource
                </Button>
            </Box>
        </Box>
    );
}

ViewResource.propTypes = {}
export default ViewResource;