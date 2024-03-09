import { Button, HStack, Heading, Spacer } from "@chakra-ui/react"
import { PropTypes } from 'prop-types';

const Header = ({isAdding = false, toggle}) => {
    return (
        <HStack>
            <Heading className = "pageHeader" textAlign='center'> Companies </Heading>
            <Spacer/>
            {!isAdding && (
                <Button colorScheme = "green"
                        onClick= {toggle}> 
                    Add company 
                </Button>)}
        </HStack>
    )
}

Header.prototype = {isAdding: PropTypes.boolen, toggle: PropTypes.func};
export default Header;