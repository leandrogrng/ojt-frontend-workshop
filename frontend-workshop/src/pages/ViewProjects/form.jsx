import React, { useState } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardFooter, FormControl, FormErrorMessage, FormLabel, HStack, Heading, Input, Spacer, Stack } from '@chakra-ui/react'
import { useProject } from '../../contexts/_useContexts'
import validateProject from '../../utils/projectValidator'

const Form = () => {
    const {id, dispatch, formData, handleAddProject, handleCancel, isEditing} = useProject();
    const [errors, setErrors] = useState({});

    const handleAdd = (e) => {
        e.preventDefault(); 
        const validator = validateProject(formData);

        if(validator.isValid) {
            handleAddProject(formData); 
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
        <form onSubmit={handleAdd} data-test-id='project-form'>
            <Card>
                <CardBody>

            <Heading data-test-id = 'project-form-header'> {id === 'add' ? 'Add' : 'Update'} Project </Heading>
                <Stack>
                    <FormControl isRequired= {1} isInvalid={errors?.name} isReadOnly = {!isEditing}>
                        <FormLabel>Project Name</FormLabel>
                        <Input 
                            type='text' 
                            name='name' 
                            value={formData.name} 
                            onChange={handleChange}/>
                            <FormErrorMessage>{errors?.name}</FormErrorMessage>
                    </FormControl> 
                    <FormControl isRequired= {1} isInvalid={errors?.description} isReadOnly = {!isEditing}>
                        <FormLabel>Project Description</FormLabel>
                        <Input 
                            type='text' 
                            name='description' 
                            value={formData.description} 
                            onChange={handleChange}/>
                            <FormErrorMessage>{errors?.description}</FormErrorMessage>
                    </FormControl> 
                    <FormControl isRequired= {1} isInvalid={errors.alias} isReadOnly = {!isEditing}>
                        <FormLabel>Project Alias</FormLabel>
                        <Input 
                            type='text' 
                            name='alias' 
                            value={formData.alias} 
                            onChange={handleChange}/>
                            <FormErrorMessage>{errors?.alias}</FormErrorMessage>
                    </FormControl> 
                </Stack>
            </CardBody>
            <CardFooter>
                <HStack>
                        {!isEditing && <>
                                <Button 
                                        data-test-id = 'project-update-btn'
                                        type = 'button' 
                                        onClick={() => dispatch ({type: 'SET_EDIT', isEditing: true})}>
                                    Update Project
                                </Button>
                                            </>
                            }
                            <Spacer />
                            <ButtonGroup>
                                {isEditing && <>
                                    <Button 
                                            data-test-id = 'project-form-cancel'
                                            type = 'button' 
                                            onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button 
                                            data-test-id = 'project-form-submit'
                                            colorScheme = 'green' 
                                            type='submit'> 
                                        {id === 'add' ? `Add` : `Update`} Project
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
