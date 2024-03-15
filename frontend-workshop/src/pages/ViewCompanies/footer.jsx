import { Box, Button } from "@chakra-ui/react"
import { useCompany } from "../../contexts/_useContexts"

const Footer = () => {
    const {handleDelete} = useCompany();

    return (
                <Box>
                    <Button colorScheme='red' onClick = {handleDelete}>
                        Delete Company
                    </Button>
                </Box>
    )
}

Footer.propTypes = {}
export default Footer;