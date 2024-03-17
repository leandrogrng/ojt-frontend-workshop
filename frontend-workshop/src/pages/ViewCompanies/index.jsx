import { Box} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CompanyProvider from "../../contexts/Company";
import Footer from "./footer";
import Form from "./form";

const ViewCompanies = () => {
    const {id = 'add'} = useParams();

    return (
        <CompanyProvider id = {id}>
            <Box w='container.md' mx='auto' bgColor='white' padding={6}>             
                <Form />
                {id !== 'add' ? <Footer/> : '' }
            </Box>
        </CompanyProvider>
    );
}

ViewCompanies.propTypes = {}
export default ViewCompanies;