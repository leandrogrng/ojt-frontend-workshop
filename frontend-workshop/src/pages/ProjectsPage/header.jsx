import { Button, HStack, Heading, Spacer } from "@chakra-ui/react"
import { PropTypes } from 'prop-types';

const Header = ({isAdding = false, toggle}) => {
    return (
        <HStack>
            <Heading textAlign='center'> Projects </Heading>
            <Spacer/>
            {!isAdding && (
                <Button colorScheme = "green"
                        onClick= {toggle}> 
                    Add projects 
                </Button>)}
        </HStack>
    )
}

Header.prototype = {isAdding: PropTypes.boolen, toggle: PropTypes.func};
export default Header;