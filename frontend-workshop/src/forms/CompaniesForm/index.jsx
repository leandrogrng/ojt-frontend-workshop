import { Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Spacer, Stack } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import mockApi from '../../utils/mockApi';

const initialData = {
    name: '',
    contactPerson: '',
    email: '',
    address: '',
    contactNumber: '',
};

const CompaniesForm = ({id = -1, onAdd, onCancel}) => {
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
        const requestData = mockApi("GET", `/companies/${id}`);
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
                            {id === -1 ? `Add` : `Update`} Company
                        </Button>                        
                    </ButtonGroup>
                </HStack>               
            </Stack>
        </form>
    )
}

CompaniesForm.propTypes = {
    id: PropTypes.number,
    onAdd: PropTypes.func, 
    onExit: PropTypes.func};
export default CompaniesForm;