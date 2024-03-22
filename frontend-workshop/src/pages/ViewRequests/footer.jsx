import { Box, Button } from "@chakra-ui/react"
import { useRequest } from "../../contexts/_useContexts"

const Footer = () => {
    const {handleDelete} = useRequest();
    return (
        <Box>
            <Button 
                    data-test-id = 'request-delete-btn'
                    colorScheme = 'red' 
                    onClick = {handleDelete}>
                Delete Request
            </Button>
        </Box>
    )
}
Footer.propTypes = {};
export default Footer;