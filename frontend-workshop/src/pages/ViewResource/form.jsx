import React, { useState } from 'react'
import validateResource from '../../utils/resourceValidator';
import { Button, ButtonGroup, Card, CardBody, CardFooter, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, Stack } from '@chakra-ui/react'
import { useResources } from '../../contexts/_useContexts';

const Form = () => {
    const {id, dispatch, formData, handleAddResource, handleCancel, isEditing} = useResources();
    const [errors, setErrors] = useState({});

    const handleAdd = (e) => {
        e.preventDefault();
        const validator = validateResource(formData);

        if(validator.isValid) {
            handleAddResource(formData);
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
        <form onSubmit={handleAdd} data-test-id ='resource-form'>
            <Card>
                <CardBody>
            <Heading data-test-id = 'resource-form-header'> {id === 'add' ? 'Add' : 'Update'} Resource </Heading>
            <Stack>
                <FormControl isInvalid={errors?.firstName} isRequired={1} isReadOnly = {!isEditing} >
                    <FormLabel>First Name</FormLabel>
                    <Input 
                        type='text' 
                        name='firstName' 
                        value={formData.firstName} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.firstName}</FormErrorMessage>
                </FormControl> 
                <FormControl isInvalid = {errors?.middleName} isReadOnly = {!isEditing} >
                    <FormLabel>Middle  Name</FormLabel>
                    <Input 
                        type='text' 
                        name='middleName' 
                        value={formData.middleName} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.middleName}</FormErrorMessage>
                </FormControl> 
                <FormControl isInvalid={errors?.lastName} isRequired={1} isReadOnly = {!isEditing}>
                    <FormLabel>Last Name</FormLabel>
                    <Input 
                        type='text' 
                        name='lastName' 
                        value={formData.lastName} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.lastName}</FormErrorMessage>
                </FormControl> 
                <FormControl isInvalid={errors?.type} isRequired={1} isReadOnly = {!isEditing}>
                    <FormLabel>Type</FormLabel>
                    <Input 
                        type='text' 
                        name='type' 
                        value={formData.type} 
                        onChange={handleChange}/>
                        <FormErrorMessage>{errors?.type}</FormErrorMessage>
                </FormControl> 
            </Stack>
            </CardBody>
            <CardFooter>
                <HStack>
                    {!isEditing && <>
                        <Button   
                                data-test-id='resource-update-btn'
                                type = 'button' 
                                onClick={() => dispatch ({type: 'SET_EDIT', isEditing: true})}>
                            Update Resource
                        </Button>
                                    </>
                    }
                    <Spacer />
                    <ButtonGroup>
                        {isEditing && <>
                            <Button data-test-id='resource-form-cancel'
                                    type = 'button' 
                                    onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button data-test-id = 'resource-form-submit' colorScheme = 'green' type='submit'> 
                                {id === 'add' ? `Add` : `Update`} Resource
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