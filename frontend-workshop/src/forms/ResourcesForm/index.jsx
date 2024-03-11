import { Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Spacer, Stack, ChakraProvider } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import mockApi from '../../utils/mockApi';
import PropTypes  from 'prop-types';

const initialData = {
    firstName: '',
    middleName: '',
    lastName: '',
    type: '',
};

const ResourcesForm = ({ id = -1, onAdd, onExit}) => {
    const [formData, setFormData] = useState(initialData);
    const fetched = useRef(false);
    
    const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData((prevData) => {
            return {...prevData, [name]: value};
        });
    }

    const handleAdd = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData(initialData);
        onExit();
    };
    
    const handleCancel = () => {
        setFormData(initialData);
        onExit();
    }

    useEffect (() => {
        if (id === -1 || fetched.current) return;
        const requestData = mockApi("GET", `/resources/${id}`);
        const {status = false, data = {}} = requestData;
        if(status) {
            fetched.current = true;
            setFormData(data);
        }
    }, [id]);

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
                            {id === 'add' ? `Add` : `Update`} Resource
                        </Button>                        
                    </ButtonGroup>
                </HStack>               
            </Stack>
        </form>
    )
}

ResourcesForm.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onAdd: PropTypes.func, 
    onExit: PropTypes.func};
export default ResourcesForm;