import { Table, Thead, Tbody, Tr, Th, Td, chakra, Box } from "@chakra-ui/react";
import {Center} from '@chakra-ui/react'
import resources from "./resources.json"
import '../../index.css'
import '../../App.css'

const ResourceTable = () => {
    return (
        <Table variant = 'striped' colorScheme= 'black' className = 'dataTable'>
            <Thead backgroundColor = 'orange'>
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