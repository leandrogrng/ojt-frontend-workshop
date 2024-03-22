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
            <Heading textAlign='center'> Projects </Heading>
            <Spacer/>
            <ButtonGroup>
                    <Button 
                            data-test-id='project-reset-btn'
                            colorScheme='orange' 
                            borderWidth='1px' 
                            onClick={handleCancel}> Reset </Button>
                    <Button 
                            data-test-id='project-add-btn'
                            as={Link} 
                            to='/projects/add' 
                            colorScheme = "green"> 
                        Add project 
                    </Button>                    
            </ButtonGroup>
        </HStack>
    )
}

Header.propType = {};
export default Header;