import { Box, Heading } from '@chakra-ui/react'
import Resources from '../../components/Resources/Twice'


const ResourcesPage = () => {
    return (
        <Box>
            <Box>
                <Heading> Resources </Heading>
            </Box>
            <Resources/>
        </Box>
    )
}

ResourcesPage.propTypes = {};
export default ResourcesPage;