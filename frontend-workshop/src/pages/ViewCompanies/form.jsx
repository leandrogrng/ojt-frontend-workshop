import React, { useState } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardFooter, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, Stack } from '@chakra-ui/react'
import { useCompany } from '../../contexts/_useContexts'
import validateCompany from '../../utils/companyValidator'

const Form = () => {
    const {id, dispatch, formData, handleAddCompany, handleCancel, isEditing} = useCompany();
    const [errors, setErrors] = useState({});

    const handleAdd = (e) => {
        e.preventDefault(); 
        const validator = validateCompany(formData);

        if(validator.isValid) {
            handleAddCompany(formData); 
            setErrors({});    
        } else {
            setErrors(validator.errors);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch({type: 'ON_INPUTCHANGE', name, value})
    }

    return (
        <form onSubmit={handleAdd} data-test-id ='company-form'>
            <Card>
                <CardBody>
                    <Stack>
                    <Heading data-test-id = 'company-form-header'> {id === 'add' ? 'Add' : 'Update'} Company </Heading>
                        <FormControl isInvalid={errors.name} isRequired={1} isReadOnly = {!isEditing}>
                            <FormLabel>Name</FormLabel>
                            <Input 
                                type='text' 
                                name='name' 
                                value={formData.name} 
                                onChange={handleChange}/>
                                <FormErrorMessage>{errors?.name}</FormErrorMessage>
                        </FormControl> 
                        <FormControl isInvalid={errors.contactPerson} isRequired={1} isReadOnly = {!isEditing}>
                            <FormLabel>Contact Person</FormLabel>
                            <Input 
                                type='text' 
                                name='contactPerson' 
                                value={formData.contactPerson} 
                                onChange={handleChange}/>
                                <FormErrorMessage>{errors?.contactPerson}</FormErrorMessage>
                        </FormControl> 
                        <FormControl isInvalid={errors.email} isRequired={1} isReadOnly = {!isEditing} >
                            <FormLabel>Email</FormLabel>
                            <Input 
                                type='text' 
                                name='email' 
                                value={formData.email} 
                                onChange={handleChange}/>
                                <FormErrorMessage>{errors?.email}</FormErrorMessage>
                        </FormControl> 
                        <FormControl isRequired={1} isInvalid= {errors.address} isReadOnly = {!isEditing}>
                            <FormLabel>Address</FormLabel>
                            <Input 
                                type='text' 
                                name='address' 
                                value={formData.address} 
                                onChange={handleChange}/>
                                <FormErrorMessage>{errors?.address}</FormErrorMessage>
                        </FormControl> 
                        <FormControl isInvalid={errors.contactNumber} isRequired={1} isReadOnly = {!isEditing}>
                            <FormLabel>Contact Number</FormLabel>
                            <Input 
                                type='text' 
                                name='contactNumber' 
                                value={formData.contactNumber} 
                                onChange={handleChange}/>
                                <FormErrorMessage>{errors?.contactNumber}</FormErrorMessage>
                        </FormControl> 
                </Stack>
            </CardBody>
            <CardFooter>
                    <HStack>
                            {!isEditing && <>
                                <Button 
                                        data-test-id = 'company-update-btn'
                                        type = 'button' 
                                        onClick={() => dispatch ({type: 'SET_EDIT', isEditing: true})}>
                                    Update Company
                                </Button>
                                            </>
                            }
                            <Spacer />
                            <ButtonGroup>
                                {isEditing && <>
                                    <Button 
                                            data-test-id = 'company-form-cancel'
                                            type = 'button' 
                                            onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        data-test-id = 'company-form-submit'
                                        colorScheme = 'green' 
                                        type='submit'> 
                                        {id === 'add' ? `Add` : `Update`} Company
                                    </Button>                        
                                </>}
                        </ButtonGroup>
                    </HStack> 
            </CardFooter>
        </Card>              
        </form>
    )
}

Form.propTypes = {}
export default Form;
