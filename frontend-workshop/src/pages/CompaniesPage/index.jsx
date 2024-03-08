import { Box, Card, CardBody, Stack } from '@chakra-ui/react';
import Companies from './../../components/Companies/Companies';
import { useState } from 'react';
import Header from './header';
import CompaniesForm from './../../forms/CompaniesForm/index';

const CompaniesPage = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [data, setData] = useState([]);

    const handleAdd = (newData = {}) => {
        setData((prevData) => {
            return [...prevData, newData]
        })
    };

    const handleDelete = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    return (
        <Stack>
            <Header isAdding= {isAdding} toggle = {() => setIsAdding(!isAdding)}/>
            <Box className='containers'>
                {!isAdding && <Companies data = {data} onDelete={handleDelete}/>}             
            </Box>
            {isAdding && (<Box className='containers'>
                <Card>
                    <CardBody>
                        <CompaniesForm  onAdd={handleAdd} 
                                        onExit={() => setIsAdding (false)}/>
                    </CardBody>
                </Card>
            </Box>)}
        </Stack>
    )
};

export default CompaniesPage;