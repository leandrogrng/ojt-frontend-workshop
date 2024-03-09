import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, ButtonGroup } from "@chakra-ui/react";
import { PropTypes } from 'prop-types';

const CompaniesTable = ({ data = [], onDelete, onEdit }) => {
    return (
        <Table className = 'dataTable'>
            <Thead>
                <Tr>
                    <Th>NAME</Th>
                    <Th>ADDRESS</Th>                    
                    <Th>CONTACT PERSON</Th>
                    <Th>EMAIL</Th>
                    <Th>CONTACT NUMBER</Th>
                    <Th isNumeric>
                        ACTIONS
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.length > 0 && data.map ((companies = {}, companiesIndex) => {
                    return (
                        <Tr key = {`companies-${companiesIndex}`}>
                            <Td>{companies.name}</Td>
                            <Td>{companies.address}</Td>                        
                            <Td>{companies.contactPerson}</Td>
                            <Td>{companies.email}</Td>
                            <Td>{companies.contactNumber}</Td>
                            <Td isNumeric>
                                <ButtonGroup> 
                                        <Button     size = 'xs'
                                                    colorScheme = 'green'
                                                    variant = 'outline'
                                                    onClick = {() => onEdit(companies?.id) }>
                                            Edit
                                        </Button>                              
                                        <Button     size = 'xs'
                                                    colorScheme="red" 
                                                    variant = 'outline'
                                                    onClick={() => onDelete(companies?.id)}>
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                            </Td>
                        </Tr>
                    )

                })}
            </Tbody>
        </Table>  
    );
}

CompaniesTable.propTypes = {data: PropTypes.array, onDelete: PropTypes.func, onEdit: PropTypes.func}
export default CompaniesTable;