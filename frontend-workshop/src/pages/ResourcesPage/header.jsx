import { Button, ButtonGroup, HStack, Heading, Spacer } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import mockApi from "../../utils/mockApi";

const Header = () => {
    const handleCancel = () => {
        mockApi('POST', '/reset-data');
        window.location.reload();
    }

    return (
        <HStack className = "pageHeader">
            <Heading textAlign='center'> Resources </Heading>
            <Spacer/>
            <ButtonGroup>
                    <Button colorScheme='orange' borderWidth='1px' onClick={handleCancel}> Reset </Button>
                    <Button as={Link} to='/resources/add' colorScheme = "green"> 
                        Add resource 
                    </Button>                    
            </ButtonGroup>
        </HStack>
    )
}

Header.propTypes = {};
export default Header;