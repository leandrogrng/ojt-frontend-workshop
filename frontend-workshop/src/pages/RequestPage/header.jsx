import { Button, ButtonGroup, HStack, Heading, Spacer } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import mockApi from "../../utils/mockApi";

const Header = () => {
    const handleCancel = () => {
        mockApi('POST', '/reset-data');
        window.location.reload();
    }

    return (
        <HStack className = "pageHeader">
            <Heading 
                    
                    textAlign='center'> Requests </Heading>
            <Spacer/>
            <ButtonGroup>
                    <Button 
                            data-test-id = 'request-reset-btn'
                            colorScheme='orange' 
                            borderWidth='1px' 
                            onClick={handleCancel}> Reset </Button>
                    <Button 
                            data-test-id = 'request-add-btn'
                            as={Link} 
                            to='/requests/add' 
                            colorScheme = "green"> 
                        Add request 
                    </Button>                    
            </ButtonGroup>
        </HStack>
    )
}

Header.propType = {};
export default Header;