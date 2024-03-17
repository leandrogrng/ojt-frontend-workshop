import { Box, Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, Stack } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import mockApi from './../../utils/mockApi';
import Swal from 'sweetalert2';
import validateProject from '../../utils/projectValidator';

const initialData = {
    name: '',
    description: '',
    alias: '',
};

const ProjectsForm = ({ id= -1, onAdd, onExit }) => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(initialData);
    const fetched = useRef(false);
    
    const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData((prevData) => {
            return {...prevData, [name]: value}
        });
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const validator = validateProject(formData);
        const {isValid = false, errors = {}} = validator;

        if(isValid) {
            onAdd(formData);
            setErrors({});  
            //setFormData(initialData);
            onExit();
            
        } else {
            setErrors(errors);
            
        }
    }

    const handleCancel = () => {
        setFormData(initialData);
        onExit();
    }

    useEffect (() => {
        if (id === -1 || fetched.current) return;
        const requestData = mockApi("GET", `/projects/${id}`);
        const {status = false, data = {}} = requestData;
        if(status) {
            fetched.current = true;
            setFormData(data);
        }
    }, [id])

    return (
        <form onSubmit={handleAdd}>
            <Heading> {id === 'add' ? 'Add' : 'Update'} Project </Heading>
            <Stack>
                <FormControl isRequired= {1} isInvalid={errors?.name}>
                    <FormLabel>Project Name</FormLabel>
                    <Input 
                        type='text' 
                        name='name' 
                        value={formData.name} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.name}</FormErrorMessage>
                </FormControl> 
                <FormControl isRequired= {1} isInvalid={errors?.description}>
                    <FormLabel>Project Description</FormLabel>
                    <Input 
                        type='text' 
                        name='description' 
                        value={formData.description} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.description}</FormErrorMessage>
                </FormControl> 
                <FormControl isRequired= {1} isInvalid={errors.alias}>
                    <FormLabel>Project Alias</FormLabel>
                    <Input 
                        type='text' 
                        name='alias' 
                        value={formData.alias} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.alias}</FormErrorMessage>
                </FormControl> 
                <HStack>
                    <Spacer />
                    <ButtonGroup>
                        <Button type = 'button' 
                                onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button colorScheme = 'green' type='submit'> 
                            {id === 'add' ? `Add` : `Update`} Project 
                        </Button>                        
                    </ButtonGroup>
                </HStack>               
            </Stack>
        </form>
    )
}

ProjectsForm.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), 
    onAdd: PropTypes.func, 
    onExit: PropTypes.func};
export default ProjectsForm;