import { Box, Button, Divider, Spacer } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import ResourcesForm from "../../forms/ResourcesForm";
import mockApi from "../../utils/mockApi";
import Swal from "sweetalert2";

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

        const requestData = mockApi(method, endpoint, data);
        const {status = false, data: newData = {}} = requestData
        if(status && !(data?.id > -1)) {
            navigate(`/resources/${newData?.id}`);
            Swal.fire({
                title: "Success",
                text: "User successfully added.",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Updated",
                text: "User information successfully updated",
                icon: "success"
            });           
        }
    };

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are deleting an information. Proceed?',
            reverseButtons: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButton: 'Cancel',
            confirmButtonColor: 'red',
            cancelButtonColor: 'gray',
            confirmButton: 'Delete',
            icon: 'warning'
        })
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
            {id !== 'add' ? 
            <Box>
                <Button colorScheme='red' onClick = {handleDelete}>
                    Delete Resource
                </Button> 
            </Box> : '' }
        </Box>
    );
}

ViewResource.propTypes = {}
export default ViewResource;