import {Center, Square, Circle} from '@chakra-ui/react'
import projects from "./projects.json"
import '../../index.css'
import '../../App.css'

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

const Projects = () => {
    return (
        <Center>
            <ProjectContent/>
        </Center>
    );
};

export default Projects;