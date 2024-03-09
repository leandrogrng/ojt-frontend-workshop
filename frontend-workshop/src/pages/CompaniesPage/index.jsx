import { Box, Card, CardBody, Stack } from '@chakra-ui/react';
import Companies from './../../components/Companies/Companies';
import { useEffect, useRef, useState } from 'react';
import Header from './header';
import CompaniesForm from './../../forms/CompaniesForm/index';
import mockApi from '../../utils/mockApi';

const CompaniesPage = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [companiesData, setData] = useState([]);
    const fetched = useRef(false);

    const handleAdd = (data = {}) => {
        let method = "POST";
        let endpoint = "/companies";

        if(data?.id > -1) {
            method = "PUT";
            endpoint = `/companies/${data?.id}`;
        };
        const requestData = mockApi(method, endpoint, data);
        const {status = false, data: newData = {}} = requestData;

        if(status) {
            const newCompanyData = [...companiesData]
            if(data?.id > -1) {
                const index = newCompanyData.findIndex((item) => item.id === data.id);
                if (index === -1) {
                    newCompanyData.splice(index, 1, newData);
                }
            } else {
                newCompanyData.push(newData);
            }
            setData(newCompanyData);
            setIsAdding(false);
        }
        setEditId(-1);
    };

    const handleDelete = (id) => {
        const requestData = mockApi('DELETE', `/companies/${id}`);
        const {status = false} = requestData;
        if(status) {
            const newData = [...companiesData];
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
        const requestData = mockApi("GET", "/companies");
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
                {!isAdding && <Companies    data = {companiesData} 
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}/>}             
            </Box>
            {isAdding && (<Box className='containers'>
                <Card>
                    <CardBody>
                        <CompaniesForm  id={editId}
                                        onAdd={handleAdd} 
                                        onCancel={handleCancel}
                                        />
                    </CardBody>
                </Card>
            </Box>)}
        </Stack>
    )
};

export default CompaniesPage;