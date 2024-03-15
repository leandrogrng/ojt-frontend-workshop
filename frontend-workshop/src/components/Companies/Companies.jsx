import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, ButtonGroup, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { PropTypes } from 'prop-types';

const CompaniesTable = ({ data = []}) => {
    return (
        <Table className = 'dataTable'>
            <Thead>
                <Tr>
                    <Th>NAME</Th>
                    <Th>ADDRESS</Th>                    
                    <Th>CONTACT PERSON</Th>
                    <Th>EMAIL</Th>
                    <Th>CONTACT NUMBER</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.length > 0 && data.map ((companies, companiesIndex) => {
                    return (
                        <LinkBox as = {Tr} key = {`companies-${companiesIndex}`} className='row'>
                            <Td>
                                <LinkOverlay href = {`companies/${companies?.id}`}>
                                    {companies.name} </LinkOverlay>
                            </Td>
                            <Td>{companies.address}</Td>                        
                            <Td>{companies.contactPerson}</Td>
                            <Td>{companies.email}</Td>
                            <Td>{companies.contactNumber}</Td>
                        </LinkBox>
                    )

                })}
            </Tbody>
        </Table>  
    );
}

CompaniesTable.propTypes = {data: PropTypes.array, onDelete: PropTypes.func, onEdit: PropTypes.func, onCancel: PropTypes.func}
export default CompaniesTable;