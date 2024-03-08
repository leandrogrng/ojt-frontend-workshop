import { Box, Card, CardBody, Stack } from '@chakra-ui/react'
import Resources from '../../components/Resources/Twice'
import {useState} from 'react'
import initialData from '../../components/Resources/resources.json'
import ResourcesForm from '../../forms/ResourcesForm';
import Header from './header';

const ResourcesPage = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [data, setData] = useState(initialData);

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
                {!isAdding && <Resources data = {data} onDelete={handleDelete}/>}             
            </Box>
            {isAdding && (<Box className='containers'>
                <Card>
                    <CardBody>
                        <ResourcesForm  onAdd={handleAdd} 
                                        onExit={() => setIsAdding (false)}/>
                    </CardBody>
                </Card>
            </Box>)}
        </Stack>
    )
};

ResourcesPage.propTypes = {};
export default ResourcesPage;