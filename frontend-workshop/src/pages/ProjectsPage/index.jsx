import { Box, Heading } from '@chakra-ui/react'
import Projects from './../../components/Projects/Projects';

const ProjectPage = () => {
    return (
        <Box>
            <Box>
                <Heading> Projects </Heading>
            </Box>
            <Projects/>
        </Box>
    )
}

ProjectPage.propTypes = {};
export default ProjectPage;