import { Box, Button } from "@chakra-ui/react"
import { useProject } from "../../contexts/_useContexts"

const Footer = () => {
    const {handleDelete} = useProject();

    return (
        <Box>
            <Button 
                    data-test-id = 'project-delete-btn'
                    colorScheme='red' 
                    onClick = {handleDelete}>
                Delete Project
            </Button>
        </Box>
    )
}
Footer.propTypes = {}
export default Footer;