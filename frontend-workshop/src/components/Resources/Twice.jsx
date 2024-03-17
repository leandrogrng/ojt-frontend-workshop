import { Table, Thead, Tbody, Tr, Th, Td, Button, ButtonGroup, LinkBox, LinkOverlay } from "@chakra-ui/react";
import PropTypes from 'prop-types'

const ResourceTable = ({ data = []}) => {
    return (
        <Table className = 'dataTable'>
            <Thead>
                <Tr>
                    <Th>NAME</Th>
                    <Th>RESOURCE TYPE</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data?.length > 0 && data.map((resources, id) => {
                    return (
                        <LinkBox as={Tr} key = {`resources-${id}`} className = 'row'> 
                            <Td>
                                <LinkOverlay href = {`/resources/${resources?.id}`}>
                                    {`${resources?.firstName} 
                                    ${resources?.middleName ? resources.middleName + ' ' : ''}
                                    ${resources?.lastName}`}
                                </LinkOverlay>
                            </Td>
                            <Td>{resources?.type}</Td>
                        </LinkBox>
                    );
                })}
            </Tbody>
        </Table>        
    );
};

ResourceTable.propTypes = {data: PropTypes.array};
export default ResourceTable;