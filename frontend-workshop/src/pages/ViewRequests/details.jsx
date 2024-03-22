import { useRequest } from "../../contexts/_useContexts"
import { Stack, FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';


const Details = ({ errors = {}, handleInputChange = () => {} }) => {
    const { isEditing, formData } = useRequest();
    return (
        <Stack>
            <FormControl                         
                        isRequired 
                        isInvalid={errors?.requestSubject} 
                        isReadOnly={!isEditing}>
                            
                <FormLabel> Subject </FormLabel>
                <Input 
                        type='text' 
                        name='requestSubject' 
                        value={formData.requestSubject} 
                        onChange={handleInputChange} />
                <FormErrorMessage>{errors?.requestSubject}</FormErrorMessage>
            </FormControl>
            
            <FormControl 
                        isRequired 
                        isInvalid={errors?.requestDescription} 
                        isReadOnly={!isEditing}>
                <FormLabel> Description </FormLabel>
                <Textarea 
                    type='text' 
                    name='requestDescription' 
                    value={formData.requestDescription} 
                    onChange={handleInputChange}/>
                    <FormErrorMessage>{errors?.requestDescription}</FormErrorMessage>
            </FormControl>
        </Stack>
    )
}

Details.propTypes = {
    errors: PropTypes.object,
    handleInputChange: PropTypes.func
};

export default Details;