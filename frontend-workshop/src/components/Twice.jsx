import { Table, Thead, Tbody, Tr, Th, Td, chakra, Box } from "@chakra-ui/react";
import {Center, Square, Circle} from '@chakra-ui/react'
import resources from "./resources.json"

const ResourceTable = () => {
    return (
        <Table variant = 'simple' class = 'dataTable'>
            <Thead>
                <Tr>
                    <Th>NAME</Th>
                    <Th>RESOURCE TYPE</Th>
                </Tr>
            </Thead>
            <Tbody>
                {resources.map((resource, index) => (
                    <Tr key={index}>
                        <Td>{`${resource.firstName} ${resource.middleName ? resource.middleName + ' ' : ''}${resource.lastName}`}</Td>
                        <Td>{resource.type}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>        
    )
}
const Resources = () => {
    return (
        <Box id= 'resourceContainer'>
            <Center>
                <ResourceTable/>
            </Center>            
        </Box>
    );
};

export default Resources;