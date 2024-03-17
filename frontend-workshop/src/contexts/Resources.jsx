import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { PropTypes } from 'prop-types';
import mockApi from "../utils/mockApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialData = {
    isEditing: false,
    data: {
        firstName: '',
        middleName: '',
        lastName: '',
        type: '',
    },
    formData: {
        firstName: '',
        middleName: '',
        lastName: '',
        type: '',
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

export const ResourceContext = createContext('default');

const ResourceProvider = ({id = 'add', children}) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialData);
    const fetched = useRef(-1);

    const handleAddResource = (data) => {
        let method = "POST";
        let endpoint = "/resources";

        if (data?.id > -1) {
            method = "PUT";
            endpoint = `/resources/${data?.id}`;
        }

        const requestData = mockApi(method, endpoint, data);
        const { status = false, data: newData = {} } = requestData;

        if (status && !(data?.id > -1)) {
            Swal.fire({
                title: "Resource Added",
                confirmButtonText: "Ok",
                icon: "success",
            });
            navigate(`/resources/${newData?.id}`);
        } else {
            Swal.fire({
                title: "Resource Updated",
                confirmButtonText: "Ok",
                icon: "success",
            });
            dispatch({type: 'FETCHED', data: newData})
            navigate(`/resources/${data?.id};`);
        }
        navigate(`/resources`);
        dispatch({type: 'SET_EDIT', isEditing: false});
    };

    const handleDelete = () => {
        mockApi('DELETE', `/resources/${id}`);
        navigate('/resources');
    };

    const handleCancel = () => {
        if (id === 'add') {
            navigate('/resources')
            
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
        const requestData = mockApi("GET", `/resources/${id}`);
        const {status = false, data = {}} = requestData;
        if(status) {
            fetched.current = true;
            dispatch({type: 'FETCHED', data});
        }
    }, [id])

    return (
        <ResourceContext.Provider
                                value = {{
                                    id, 
                                    ...state,
                                    dispatch,
                                    handleAddResource, 
                                    handleDelete, 
                                    handleCancel, 
                                    }}>
            {children}
        </ResourceContext.Provider>
    )
}

ResourceContext.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.any
}

export default ResourceProvider;