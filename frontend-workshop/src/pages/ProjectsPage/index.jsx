import { Box, Stack } from '@chakra-ui/react'
import {useEffect, useRef, useState} from 'react'
import Projects from './../../components/Projects/Projects';
import Header from './header';
import mockApi from '../../utils/mockApi';

const ProjectPage = () => {
    const [projectsData, setData] = useState([]);
    const fetched = useRef(false);

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
            <Header/>
            <Box>
                <Projects data = {projectsData}/>           
            </Box>
        </Stack>
    );   
};

ProjectPage.propTypes = {};
export default ProjectPage;