import { Box, Card, CardBody, Stack } from '@chakra-ui/react'
import Resources from '../../components/Resources/Twice'
import {useEffect, useState, useRef} from 'react'
import ResourcesForm from '../../forms/ResourcesForm';
import Header from './header';
import mockApi from '../../utils/mockApi';

const ResourcesPage = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [data, setData] = useState([]);
    const fetched = useRef(false);

    const handleAdd = (data) => {
        setData((prevData) => [...prevData, data]);
        setIsAdding(false);
    };

    const handleDelete = (id) => {
        const requestData = mockApi('DELETE', `/resources/${id}`);
        const {status = false} = requestData;
        if(status) {
            const newData = [...data];
            const index = newData.findIndex((item) => item.id === id);
            console.log(index);
            if (index !== -1) { 
                newData.splice(index, 1);
                setData(newData);
            }
        }
    };

    const loadData = () => {
        if (fetched.current) return;
        const requestData = mockApi("GET", "/resources");
        const {status = false, data = []} = requestData;

        if (status) {
            fetched.current = true;
            setData(data);
        }
    }

    useEffect ( () => {
        loadData();
    }, [] )

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