import { Box, Button, Divider, Spacer } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import mockApi from "../../utils/mockApi";
import ProjectsForm from "../../forms/ProjectForm";
import Swal from "sweetalert2";

const ViewProjects = () => {
    const {id = -1} = useParams();
    const navigate = useNavigate();

    const handleAdd = (data) => {
        let method = "POST";
        let endpoint = "/projects";

        if(data?.id > -1) {
            method = "PUT";
            endpoint = `/projects/${data?.id}`;
        };
        mockApi(method, endpoint, data);
    };

    const handleDelete = () => {
        mockApi('DELETE', `/projects/${id}`);
        navigate('/projects');
    };

    const handleCancel = () => {
        navigate('/projects')
    };

    return (
        <Box w='container.md' mx='auto' bgColor='white' padding={6}>
            <ProjectsForm  id = {id}    onAdd={handleAdd}
                                        onExit = {handleCancel} />
            <Divider/>
            <Spacer/>
            {id !== 'add' ? 
            <Box>
                <Button colorScheme='red' onClick = {handleDelete}>
                    Delete Project
                </Button> 
            </Box> : '' }
        </Box>
    );
}

ViewProjects.propTypes = {}
export default ViewProjects;