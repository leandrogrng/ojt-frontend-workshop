import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ResourceProvider from "../../contexts/Resources";
import Form from "./form";
import Footer from "./footer";

const ViewResource = () => {
    const {id = 'add'} = useParams();
    return (
        <ResourceProvider id = {id}>
            <Box w= 'container.md' mx= 'auto' bgColor='white' padding={6}>
                <Form/>
                {id !== 'add' ? <Footer/> : ''}
            </Box>
        </ResourceProvider>
    );
}

ViewResource.propTypes = {}
export default ViewResource;