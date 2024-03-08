import { Table, Thead, Tbody, Tr, Th, Td, Button, ButtonGroup } from "@chakra-ui/react";
import PropTypes from 'prop-types'

const ResourceTable = ({ data = [], onDelete, onEdit}) => {
    console.log("DATA ON THE TABLE: ", data);
    return (
        <Table className = 'dataTable'>
            <Thead>
                <Tr>
                    <Th>NAME</Th>
                    <Th>RESOURCE TYPE</Th>
                    <Th isNumeric>
                        ACTION
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.length > 0 && data.map((resources = {}, resourcesIndex) => {
                    return (
                        <Tr key = {`resources-${resourcesIndex}`}>
                            <Td>
                                {`${resources?.firstName} 
                                ${resources?.middleName ? resources.middleName + ' ' : ''}
                                ${resources?.lastName}`}
                            </Td>
                            <Td>{resources?.type}</Td>
                            <Td isNumeric>
                                <ButtonGroup> 
                                    <Button     size = 'xs'
                                                colorScheme = 'green'
                                                variant = 'outline'
                                                onClick = {() => onEdit(resources?.id) }>
                                        Edit
                                    </Button>                              
                                    <Button     size = 'xs'
                                                colorScheme="red" 
                                                variant = 'outline'
                                                onClick={() => onDelete(resources?.id)}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
                            </Td>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>        
    );
};

ResourceTable.propTypes = {data: PropTypes.array, onDelete: PropTypes.func, onEdit: PropTypes.func};
export default ResourceTable;