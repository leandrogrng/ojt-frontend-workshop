import { Button, ButtonGroup, HStack, Heading, Spacer, Stack } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import mockApi from "../../utils/mockApi";

const Header = () => {
    const handleCancel = () => {
        mockApi('POST', '/reset-data');
        window.location.reload();
    }

    return (
        <HStack className = "pageHeader" w='full' maxW='container.md' mx='auto' flexDirection = {{base: 'column', md: 'row'}} alignItems={{base: 'flex-start', md: 'center'}}>
            <Heading textAlign='center'> Companies </Heading>
            <Spacer/>
            <ButtonGroup>
                    <Button 
                            data-test-id='reset-company-btn'
                            colorScheme='orange' 
                            borderWidth='1px' 
                            onClick={handleCancel}> Reset </Button>
                    <Button 
                            data-test-id='add-company-btn'
                            as={Link} 
                            to='/companies/add' 
                            colorScheme = "green"> 
                        Add company 
                    </Button>                    
            </ButtonGroup>
        </HStack>
    )
}

Header.propTypes = {};
export default Header;