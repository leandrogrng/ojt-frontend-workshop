import { Box, Card, CardBody, Stack } from '@chakra-ui/react'
import Resources from '../../components/Resources/Twice'
import {useEffect, useState, useRef} from 'react'
import ResourcesForm from '../../forms/ResourcesForm';
import Header from './header';
import mockApi from '../../utils/mockApi';

const ResourcesPage = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [resourcesData, setData] = useState([]);
    const fetched = useRef(false);

    const handleAdd = (data = {}) => {
        let method = "POST";
        let endpoint = "/resources";

        if(data?.id > -1) {
            method = "PUT";
            endpoint = `/resources/${data?.id}`;
        };

        const requestData = mockApi(method, endpoint, data);
        const {status = false, data: newData = {}} = requestData;

        if(status) {
            const newResourceData = [...resourcesData]
            if(data?.id > -1) {
                const index = newResourceData.findIndex((item) => item.id === data.id);
                if (index === -1) {
                    newResourceData.splice(index, 1, newData);
                }
            } else {
                newResourceData.push(newData);
            }
            setData(newResourceData);
            setIsAdding(false);
        }
        setEditId(-1);
    };

    const handleDelete = (id) => {
        const requestData = mockApi('DELETE', `/resources/${id}`);
        const {status = false} = requestData;
        if(status) {
            const newData = [...resourcesData];
            const index = newData.findIndex((item) => item.id === id);
            console.log(index);
            if (index !== -1) { 
                newData.splice(index, 1);
                setData(newData);
            }
        }
    };

    const handleEdit = (id) => {
        setIsAdding(true);
        setEditId(id);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditId(-1);
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
                {!isAdding && 
                    <Resources  
                                data = {resourcesData} 
                                onDelete={handleDelete} 
                                onEdit={handleEdit}/>}             
            </Box>
            {isAdding && (<Box className='containers'>
                <Card>
                    <CardBody>
                        <ResourcesForm  id={editId}    
                                        onAdd={handleAdd} 
                                        onCancel={handleCancel}
                                        />
                    </CardBody>
                </Card>
            </Box>)}
        </Stack>
    )
};

ResourcesPage.propTypes = {};
export default ResourcesPage;