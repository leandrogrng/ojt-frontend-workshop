import { Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Spacer, Stack } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

const initialData = {
    name: '',
    contactPerson: '',
    email: '',
    address: '',
    contactNumber: '',

};

const CompaniesForm = ({onAdd = () => {}, onExit = () => {} }) => {
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
                    <FormLabel>Name</FormLabel>
                    <Input 
                        type='text' 
                        name='name' 
                        value={formData.name} 
                        onChange={handleChange}/>
                </FormControl> 
                <FormControl>
                    <FormLabel>Contact Person</FormLabel>
                    <Input 
                        type='text' 
                        name='contactPerson' 
                        value={formData.contactPerson} 
                        onChange={handleChange}/>
                </FormControl> 
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        type='text' 
                        name='email' 
                        value={formData.email} 
                        onChange={handleChange}/>
                </FormControl> 
                <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input 
                        type='text' 
                        name='address' 
                        value={formData.address} 
                        onChange={handleChange}/>
                </FormControl> 
                <FormControl>
                    <FormLabel>Contact Number</FormLabel>
                    <Input 
                        type='text' 
                        name='contactNumber' 
                        value={formData.contactNumber} 
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
                            Add Company 
                        </Button>                        
                    </ButtonGroup>
                </HStack>               
            </Stack>
        </form>
    )
}

CompaniesForm.propTypes = {onAdd: PropTypes.func, onExit: PropTypes.func};
export default CompaniesForm;