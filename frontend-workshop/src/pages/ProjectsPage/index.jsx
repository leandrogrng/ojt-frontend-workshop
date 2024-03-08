import { Box, Card, CardBody, Stack } from '@chakra-ui/react'
import {useState} from 'react'
import Projects from './../../components/Projects/Projects';
import Header from './header';
import ProjectsForm from './../../forms/ProjectForm/index';

const ProjectPage = () => {
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
            <Box>
                {!isAdding && <Projects data = {data} onDelete={handleDelete}/>}             
            </Box>
            {isAdding && (<Box className='containers'>
                <Card>
                    <CardBody>
                        <ProjectsForm  onAdd={handleAdd} 
                                        onExit={() => setIsAdding (false)}/>
                    </CardBody>
                </Card>
            </Box>)}
        </Stack>
    )    


}

ProjectPage.propTypes = {};
export default ProjectPage;