import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import {Center} from '@chakra-ui/react'
import companies from "./companies.json"

const CompaniesTable = () => {
    return (
        <Table variant = 'striped' color="black" className = 'dataTable'>
            <Thead backgroundColor='orange'>
                <Tr>
                    <Th>NAME</Th>
                    <Th>ADDRESS</Th>                    
                    <Th>CONTACT PERSON</Th>
                    <Th>EMAIL</Th>
                    <Th>CONTACT NUMBER</Th>
                </Tr>
            </Thead>
            <Tbody>
                {companies.map((companies, index) => (
                    <Tr key={index}>
                        <Td>{companies.name}</Td>
                        <Td>{companies.address}</Td>                        
                        <Td>{companies.contactPerson}</Td>
                        <Td>{companies.email}</Td>
                        <Td>{companies.contactNumber}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>  
 

    )
}
const Companies = () => {
    return (
        <Center>
            <CompaniesTable/>            
        </Center>

    );
};

export default Companies;