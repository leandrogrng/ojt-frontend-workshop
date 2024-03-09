import { Box, Card, CardBody, Stack } from '@chakra-ui/react'
import {useEffect, useRef, useState} from 'react'
import Projects from './../../components/Projects/Projects';
import Header from './header';
import ProjectsForm from './../../forms/ProjectForm/index';
import mockApi from '../../utils/mockApi';

const ProjectPage = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [projectsData, setData] = useState([]);
    const fetched = useRef(false);

    const handleAdd = (data = {}) => {
        let method = "POST";
        let endpoint = "/projects";

        if(data?.id > -1) {
            method = "PUT";
            endpoint = `/projects/${data?.id}`;
        };

        const requestData = mockApi(method, endpoint, data);
        const {status = false, data: newData = {}} = requestData;

        if(status) {
            const newProjectsData = [...projectsData]
            if(data?.id > -1) {
                const index = newProjectsData.findIndex((item) => item.id === data.id);
                if (index === -1) {
                    newProjectsData.splice(index, 1, newData);
                }
            } else {
                newProjectsData.push(newData);
            }
            setData(newProjectsData);
            setIsAdding(false);
        }
        setEditId(-1);
    };

    const handleDelete = (id) => {
        const requestData = mockApi('DELETE', `/projects/${id}`);
        const {status = false} = requestData;
        if(status) {
            const newData = [...projectsData];
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
        const requestData = mockApi("GET", "/projects");
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
            <Box>
                {!isAdding && <Projects 
                                        data = {projectsData} 
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}/>}             
            </Box>
            {isAdding && (<Box className='containers'>
                <Card>
                    <CardBody>
                        <ProjectsForm   id={editId}
                                        onAdd={handleAdd} 
                                        onCancel={handleCancel}/>
                    </CardBody>
                </Card>
            </Box>)}
        </Stack>
    )    


}

ProjectPage.propTypes = {};
export default ProjectPage;