import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { PropTypes } from 'prop-types';
import mockApi from "../utils/mockApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialData = {
    isEditing: false,
    data: {
        client: '',
        project: '',
        requestSubject: '',
        requestDescription: '',
    },
    formData: {
        client: '',
        project: '',
        requestSubject: '',
        requestDescription: '',
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

export const RequestContext = createContext('default');

const RequestProvider = ({id = 'add', children}) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialData);
    const fetched = useRef(-1);

    const handleAddRequest = (data) => {
        let method = "POST";
        let endpoint = "/requests";
    
        if (data?.id > -1) {
            method = "PUT";
            endpoint = `/requests/${data?.id}`;
        }
    
        const requestData = mockApi(method, endpoint, data);
        const { status = false, data: newData = {} } = requestData;
    
        if (status && !(data?.id > -1)) {
            Swal.fire({
                title: "Request Added",
                confirmButtonText: "Ok",
                icon: "success",
            });
            navigate(`/requests/${newData?.id}`);
        } else {
            Swal.fire({
                title: "Request Updated",
                confirmButtonText: "Ok",
                icon: "success",
            });
            dispatch({ type: 'FETCHED', data: newData });
            navigate(`/requests/${data?.id};`); 
        }
        navigate(`/requests`); 
        dispatch({ type: 'SET_EDIT', isEditing: false }); 
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
            mockApi('DELETE', `/requests/${id}`);
            navigate('/requests');
            }
        }); 
    };

    const handleCancel = () => {
        if (id === 'add') {
            navigate('/requests')
            
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
        const requestData = mockApi("GET", `/requests/${id}`);
        const {status = false, data = {}} = requestData;
        if(status) {
            fetched.current = true;
            dispatch({type: 'FETCHED', data});
        }
    }, [id])

    return (
        <RequestContext.Provider
                                value = {{
                                    id, 
                                    ...state,
                                    dispatch,
                                    handleAddRequest, 
                                    handleDelete, 
                                    handleCancel, 
                                    }}>
            {children}
        </RequestContext.Provider>
    )
}

RequestProvider.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.any
}

export default RequestProvider;