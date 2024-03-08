import { Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Spacer, Stack } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

const initialData = {
    name: '',
    description: '',
    alias: '',
};

const ProjectsForm = ({onAdd = () => {}, onExit = () => {} }) => {
    const [formData, setFormData] = useState(initialData);

    const handleAdd = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData(initialData);
        onExit();
    };
    const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData((prevData) => {
            return {...prevData, [name]: value}
        });
    }

    const handleCancel = () => {
        setFormData(initialData);
        onExit();
    }
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
                            Add Resource 
                        </Button>                        
                    </ButtonGroup>

                </HStack>               
            </Stack>
        </form>
    )
}

ProjectsForm.propTypes = {onAdd: PropTypes.func, onExit: PropTypes.func};
export default ProjectsForm;