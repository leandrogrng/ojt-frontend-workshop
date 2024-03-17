import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProjectProvider from "../../contexts/Projects";
import Form from "./form";
import Footer from "./footer";

const ViewProjects = () => {
    const {id = 'add'} = useParams();

    return (
        <ProjectProvider id = {id}>
            <Box w='container.md' mx='auto' bgColor='white' padding={6}>
                <Form/>
                {id !== 'add' ? <Footer/> : ''}
            </Box>
        </ProjectProvider>
    );
}

ViewProjects.propTypes = {}
export default ViewProjects;