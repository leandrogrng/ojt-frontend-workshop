import { Button, HStack, Heading, Spacer } from "@chakra-ui/react"
import { PropTypes } from 'prop-types';

const Header = ({isAdding = false, toggle}) => {
    return (
        <HStack className = "pageHeader" >
            <Heading textAlign='center'> Resources </Heading>
            <Spacer/>
            {!isAdding && (
                <Button colorScheme = "green"
                        onClick= {toggle}> 
                    Add resources 
                </Button>)}
        </HStack>
    )
}

Header.prototype = {isAdding: PropTypes.boolen, toggle: PropTypes.func};
export default Header;