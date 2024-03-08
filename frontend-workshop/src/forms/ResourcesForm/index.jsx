import { Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Spacer, Stack } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

const initialData = {
    firstName: '',
    middleName: '',
    lastName: '',
    type: '',
};

const ResourcesForm = ({onAdd = () => {}, onExit = () => {} }) => {
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
                            Add Resource 
                        </Button>                        
                    </ButtonGroup>

                </HStack>               
            </Stack>
        </form>
    )
}

ResourcesForm.propTypes = {onAdd: PropTypes.func, onExit: PropTypes.func};
export default ResourcesForm;