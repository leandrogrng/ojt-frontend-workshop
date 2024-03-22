import { Box, Button } from "@chakra-ui/react"
import { useCompany, useResources } from "../../contexts/_useContexts"

const Footer = () => {
    const {handleDelete} = useResources();

    return (
        <Box>
            <Button 
                    data-test-id='resource-delete-btn'
                    colorScheme='red' 
                    onClick = {handleDelete}>
                Delete Resource
            </Button>
        </Box>
    )
}
Footer.propTypes = {}
export default Footer;