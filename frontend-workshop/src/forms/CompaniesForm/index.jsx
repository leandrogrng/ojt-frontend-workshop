import { Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, Stack } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import mockApi from '../../utils/mockApi';
import { validateCompany } from '../../utils/companyValidator';

const initialData = {
    name: '',
    contactPerson: '',
    email: '',
    address: '',
    contactNumber: '',
};

const CompaniesForm = ({id = -1, onAdd, onExit}) => {
    const [formData, setFormData] = useState(initialData);
    const fetched = useRef(false);

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
            <Heading> {id === 'add' ? 'Add' : 'Update'} Company </Heading>
                <FormControl isInvalid={errors.name} isRequired={1}>
                    <FormLabel>Name</FormLabel>
                    <Input 
                        type='text' 
                        name='name' 
                        value={formData.name} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.name}</FormErrorMessage>
                </FormControl> 
                <FormControl isInvalid={errors.contactPerson} isRequired={1}>
                    <FormLabel>Contact Person</FormLabel>
                    <Input 
                        type='text' 
                        name='contactPerson' 
                        value={formData.contactPerson} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.contactPerson}</FormErrorMessage>
                </FormControl> 
                <FormControl isInvalid={errors.email} isRequired={1} >
                    <FormLabel>Email</FormLabel>
                    <Input 
                        type='text' 
                        name='email' 
                        value={formData.email} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.email}</FormErrorMessage>
                </FormControl> 
                <FormControl isRequired={1} isInvalid= {errors.address}>
                    <FormLabel>Address</FormLabel>
                    <Input 
                        type='text' 
                        name='address' 
                        value={formData.address} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.address}</FormErrorMessage>
                </FormControl> 
                <FormControl isInvalid={errors.contactNumber} isRequired={1}>
                    <FormLabel>Contact Number</FormLabel>
                    <Input 
                        type='text' 
                        name='contactNumber' 
                        value={formData.contactNumber} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.contactNumber}</FormErrorMessage>
                </FormControl> 
                <HStack spacing = {4} width = 'full'>
                    <Spacer />
                    <ButtonGroup>
                        <Button type = 'button' 
                                onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button colorScheme = 'green' type='submit'> 
                            {id === 'add' ? `Add` : `Update`} Company
                        </Button>                        
                    </ButtonGroup>
                </HStack>               
            </Stack>
        </form>
    )
}

CompaniesForm.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onAdd: PropTypes.func, 
    onExit: PropTypes.func};
export default CompaniesForm;