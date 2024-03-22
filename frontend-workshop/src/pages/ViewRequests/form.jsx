import { useRequest } from "../../contexts/_useContexts"
import validateRequest from "../../utils/requestValidator";
import { Card, CardBody, Stack, Divider, CardFooter, ButtonGroup, HStack, Button, Spacer, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import Client from "./client";
import Details from "./details";
import Project from "./project";

const Form = () => {
    const { formData = {}, dispatch, handleAddRequest, handleCancel, isEditing, id} = useRequest();
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        dispatch({ type: 'ON_INPUTCHANGE', name, value});
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const validator = validateRequest(formData);
        if(validator.isValid) {
            handleAddRequest(formData);
            setErrors({});
        } else {
            setErrors(validator.errors);
        }
    }

    return (
        <form onSubmit={handleAdd} data-test-id = 'request-form'>
            <Card>
                <CardBody>
                    <Heading data-test-id = 'request-form-header'> {id === 'add' ? 'Add' : 'Update'} Request </Heading>
                    <Stack>
                        <Client errors={errors} handleInputChange={handleInputChange}/>
                        <Divider my={4}/>
                        <Project errors={errors} handleInputChange={handleInputChange}/>                       
                        <Divider my={4}/>
                        <Details errors={errors} handleInputChange={handleInputChange}/>
                        <Divider my={4}/>
                    </Stack>
                </CardBody>
                <CardFooter>
                    <HStack>
                        {!isEditing && <>
                            <Button 
                                    data-test-id = 'request-update-btn'
                                    type = 'button' 
                                    onClick={() => dispatch ({type: 'SET_EDIT', isEditing: true})}>
                                Update Request
                            </Button>
                                </>
                            }
                            <Spacer />
                            <ButtonGroup>
                                {isEditing && <>
                                    <Button 
                                            data-test-id = 'request-form-cancel'
                                            type = 'button' 
                                            onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button 
                                            data-test-id = 'request-form-submit'
                                            colorScheme = 'green' 
                                            type='submit'> 
                                        {id === 'add' ? `Add` : `Update`} Request
                                    </Button>                        
                                </>}
                            </ButtonGroup>
                        </HStack>
                </CardFooter>
            </Card>
        </form>
    )
}

Form.propTypes = {};
export default Form;