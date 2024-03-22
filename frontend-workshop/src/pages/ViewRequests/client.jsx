import { Stack, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import SelectCompany from '../../inputs/SelectCompany';
import PropTypes  from 'prop-types';
import { useRequest } from '../../contexts/_useContexts';

const Client = ({ errors = {}, handleInputChange = () => {} }) => {
    const { isEditing, formData } = useRequest();
    console.log("DATA: ", formData)

    return (
        <Stack>
            <FormControl    isRequired
                            isInvalid = {errors?.client}
                            isReadOnly = {!isEditing}>
                <FormLabel> Client </FormLabel>
                <SelectCompany  name='client'
                                value={formData.client}
                                onChange={handleInputChange}
                                isInvalid= {errors?.client?.length > 0}
                                isReadOnly={!isEditing}/>
                    <FormErrorMessage>{errors?.client}</FormErrorMessage>
            </FormControl> 
        </Stack>
    );
}

Client.propTypes = {
    errors: PropTypes.object,
    handleInputChange: PropTypes.func,
};

export default Client;