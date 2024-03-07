import { Box, Heading } from '@chakra-ui/react'
import Companies from './../../components/Companies/Companies';

const CompaniesPage = () => {
    return (
        <Box className='containers'>
            <Box>
                <Heading> Companies </Heading>
            </Box>
            <Companies/>
        </Box>
    )
}

CompaniesPage.propTypes = {};
export default CompaniesPage;