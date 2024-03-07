import {Center, SimpleGrid, Box, Heading, Text} from '@chakra-ui/react'
import projects from "./projects.json"
import '../../index.css'
/*
const ProjectContent = () => {
    return (
        <div>
            {projects.map ((project, index) => (
                <div key = {index}>
                    <h1 className = 'projectName'>{project.name}</h1>
                    <h4 className = 'projectDescription'>{project.description}</h4>
                    <div id='divider'></div>
                </div>
            ))}
        </div>
    )
}
*/
function ProjectContent() {
    return (
      <SimpleGrid columns={2} spacing={10} padding={10} margin={10} id = 'projectGrid'>
        {projects.map((project, index) => (
          <Box  key={index} id = 'projectContainer'>
                <Heading id='projectName'>{project.name}</Heading>
                <Text id='projectDescription' >{project.description}  </Text> 
          </Box>
        ))}
      </SimpleGrid>
    );
  }

const Projects = () => {
    return (
      <ProjectContent/>             
    );
};

export default Projects;