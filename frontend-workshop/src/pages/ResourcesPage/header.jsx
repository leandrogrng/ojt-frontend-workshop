import { Button, HStack, Heading, Spacer } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <HStack className = "pageHeader" >
            <Heading textAlign='center'> Resources </Heading>
            <Spacer/>
                <Button as={Link} to='/resources/add' colorScheme = "green"> 
                    Add resources 
                </Button>)
        </HStack>
    )
}

Header.propTypes = {};
export default Header;