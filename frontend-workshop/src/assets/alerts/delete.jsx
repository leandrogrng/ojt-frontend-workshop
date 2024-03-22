import Swal from "sweetalert2";
import mockApi from "../../utils/mockApi";
import { PropTypes } from 'prop-types';
import { useNavigate } from "react-router-dom";

function DeleteAlert(endpoint, data, id) {
    const navigate = useNavigate();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            mockApi('DELETE', `/resources/${id}`);
            navigate('/resources');
        } else {
            navigate(`/resources/${data?.id}`);
        }
    });
}

DeleteAlert.propTypes = {
    endpoint: PropTypes.string,
    data: PropTypes.object,
    id: PropTypes.any
}

export default DeleteAlert;