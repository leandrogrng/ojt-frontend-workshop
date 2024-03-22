import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { PropTypes } from 'prop-types';
import mockApi from "../utils/mockApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialData = {
    isEditing: false,
    data: {
        name: '',
        description: '',
        alias: ''
    },
    formData: {
        name: '',
        description: '',
        alias: ''
    },
};
const reducer = (state, action) => {
    const {type, ...payload} = action;
    switch (type) {
        case "FETCHED":
            return {...state, formData: payload.data, data: payload.data};  
        case "SET_EDIT" : {
            return {...state, isEditing: payload.isEditing}
        }
        case "RESET_DATA": {
            return {...state, formData: state.data};

        }
        case "ON_INPUTCHANGE": 
            return {...state, formData:{...state.formData, [payload.name]: payload.value}};     
        default:
            return state;
    }
}

export const ProjectsContext = createContext('default');

const ProjectProvider = ({id = 'add', children}) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialData);
    const fetched = useRef(-1);

    const handleAddProject = (data) => {
        let method = "POST";
        let endpoint = "/projects";

        if (data?.id > -1) {
            method = "PUT";
            endpoint = `/projects/${data?.id}`;
        }

        const requestData = mockApi(method, endpoint, data);
        const { status = false, data: newData = {} } = requestData;

        if (status && !(data?.id > -1)) {
            Swal.fire({
                title: "Project Added",
                confirmButtonText: "Ok",
                icon: "success",
            });
            navigate(`/projects/${newData?.id}`);
        } else {
            Swal.fire({
                title: "Project Updated",
                confirmButtonText: "Ok",
                icon: "success",
            });
            dispatch({type: 'FETCHED', data: newData})
            navigate(`/projects/${data?.id};`);
        }
        navigate(`/projects`);
        dispatch({type: 'SET_EDIT', isEditing: false});
    };

    const handleDelete = (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "green",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            mockApi('DELETE', `/projects/${id}`);
            navigate('/projects');
            }
        }); 
    };

    const handleCancel = () => {
        if (id === 'add') {
            navigate('/projects')           
        }
        dispatch({type: 'SET_EDIT', isEditing: false});
        dispatch({type: 'RESET_DATA'})
    };

    useEffect (() => {
        if (id === 'add') {
            dispatch({type: 'SET_EDIT', isEditing: true})
            dispatch({type: 'RESET_DATA'})
        }  
        if (fetched.current === id) return;
        const requestData = mockApi("GET", `/projects/${id}`);
        const {status = false, data = {}} = requestData;
        if(status) {
            fetched.current = true;
            dispatch({type: 'FETCHED', data});
        }
    }, [id])

    return (
        <ProjectsContext.Provider
                                value = {{
                                    id, 
                                    ...state,
                                    dispatch,
                                    handleAddProject, 
                                    handleDelete, 
                                    handleCancel, 
                                    }}>
            {children}
        </ProjectsContext.Provider>
    )
}

ProjectProvider.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.any
}

export default ProjectProvider;