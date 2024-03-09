import { Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Spacer, Stack } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import mockApi from './../../utils/mockApi';

const initialData = {
    name: '',
    description: '',
    alias: '',
};


const ProjectsForm = ({ id= -1, onAdd, onCancel }) => {
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
        const requestData = mockApi("GET", `/projects/${id}`);
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
                    <FormLabel>Project Name</FormLabel>
                    <Input 
                        type='text' 
                        name='name' 
                        value={formData.name} 
                        onChange={handleChange}/>
                </FormControl> 
                <FormControl>
                    <FormLabel>Project Description</FormLabel>
                    <Input 
                        type='text' 
                        name='description' 
                        value={formData.description} 
                        onChange={handleChange}/>
                </FormControl> 
                <FormControl>
                    <FormLabel>Project Alias</FormLabel>
                    <Input 
                        type='text' 
                        name='alias' 
                        value={formData.alias} 
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
                            {id === -1 ? `Add` : `Update`} Project 
                        </Button>                        
                    </ButtonGroup>
                </HStack>               
            </Stack>
        </form>
    )
}

ProjectsForm.propTypes = {
    id: PropTypes, 
    onAdd: PropTypes.func, 
    onExit: PropTypes.func};
export default ProjectsForm;