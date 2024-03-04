import {Center, Square, Circle} from '@chakra-ui/react'
import projects from "./projects.json"

const ProjectContent = () => {
    return (
        <div>
            {projects.map ((project, index) => (
                <div key = {index}>
                    <h1 class = 'projectName'>{project.name}</h1>
                    <h4 class = 'projectDescription'>{project.description}</h4>
                    <div id='divider'></div>
                </div>
            ))}
        </div>
    )
}

const Projects = () => {
    return (
        <Center>
            <ProjectContent/>
        </Center>
    );
};

export default Projects;