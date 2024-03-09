import { Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Spacer, Stack } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import mockApi from '../../utils/mockApi';

const initialData = {
    firstName: '',
    middleName: '',
    lastName: '',
    type: '',
};

const ResourcesForm = ({ id = -1, onAdd, onCancel }) => {
    const [formData, setFormData] = useState(initialData);
    const fetched = useRef(false);

    const handleAdd = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData(initialData);
    };
    
    const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData((prevData) => {
            return {...prevData, [name]: value}
        });
    }

    const handleCancel = () => {
        setFormData(initialData);
        onCancel();
    }

    useEffect (() => {
        if (id === -1 || fetched.current) return;
        const requestData = mockApi("GET", `/resources/${id}`);
        const {status = false, data = {}} = requestData;
        if(status) {
            fetched.current = true;
            setFormData(data);
        }
    }, [id])

    return (
        <form onSubmit={handleAdd}>
            <Stack>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input 
                        type='text' 
                        name='firstName' 
                        value={formData.firstName} 
                        onChange={handleChange}/>
                </FormControl> 
                <FormControl>
                    <FormLabel>Middle  Name</FormLabel>
                    <Input 
                        type='text' 
                        name='middleName' 
                        value={formData.middleName} 
                        onChange={handleChange}/>
                </FormControl> 
                <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input 
                        type='text' 
                        name='lastName' 
                        value={formData.lastName} 
                        onChange={handleChange}/>
                </FormControl> 
                <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Input 
                        type='text' 
                        name='type' 
                        value={formData.type} 
                        onChange={handleChange}/>
                </FormControl> 
                <HStack>
                    <Spacer />
                    <ButtonGroup>
                        <Button type = 'button' 
                                onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button colorScheme = 'green' type='submit'> 
                            {id === -1 ? `Add` : `Update`} Resource
                        </Button>                        
                    </ButtonGroup>
                </HStack>               
            </Stack>
        </form>
    )
}

ResourcesForm.propTypes = {
    id: PropTypes.number, 
    onAdd: PropTypes.func, 
    onExit: PropTypes.func};
export default ResourcesForm;