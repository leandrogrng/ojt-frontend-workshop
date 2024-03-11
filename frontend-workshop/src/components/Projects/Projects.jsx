import {Center, SimpleGrid, Box, Heading, Text, Button, ButtonGroup} from '@chakra-ui/react'
import '../../index.css'
import { PropTypes } from 'prop-types';

/*
function ProjectContent() {
    return (
      <SimpleGrid columns={2} spacing={10} padding={10} margin={10} id = 'projectGrid'>
        {projects.map((project, index) => (
          <Box  key={index} id = 'projectContainer'>
                <Heading id='projectName'>{project.name}</Heading>
                <Text id='projectDescription' >{project.description}  </Text> 
                <Button size = 'xs'
                        colorScheme = 'red'
                        variant = 'outline'
                        onClick={() => onDelete(projectIndex)}>Delete</Button>
          </Box>
        ))}
      </SimpleGrid>
    );
  }
*/


function ProjectContent({ data = [], onDelete, onEdit }) {
  return (
      <SimpleGrid columns={2} spacing={7} id='projectGrid'>
          {data?.length > 0 && data.map((project = {}, projectIndex) => {
                return (
                    <Box key={`projects-${projectIndex}`} id='projectContainer'>
                        <Heading id='projectName'>{project.name}</Heading>
                        <Text id='projectDescription'>{project.description}</Text>
                        <ButtonGroup id = 'projectBtn'> 
                                    <Button     size = 'xs'
                                                colorScheme = 'green'
                                                variant = 'outline'
                                                onClick = {() => onEdit(project?.id) }>
                                        Edit
                                    </Button>                              
                                    <Button     size = 'xs'
                                                colorScheme="red" 
                                                variant = 'outline'
                                                onClick={() => onDelete(project?.id)}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
                    </Box>
                );
            })}
      </SimpleGrid>
  );
}


ProjectContent.propTypes = {
  data: PropTypes.array, 
  onDelete: PropTypes.func, 
  onEdit: PropTypes.func};
export default ProjectContent;