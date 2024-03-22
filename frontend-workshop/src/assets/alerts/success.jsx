import Swal from "sweetalert2";
import { PropTypes } from 'prop-types';

function SuccessAlert( endpoint, method ) {
    if (method === 'POST') {
        Swal.fire({
            title: `${endpoint} Added`,
            confirmButtonText: "Ok",
            icon: "success",
        });
    } else if (method === 'PUT') {
        Swal.fire({
            title: `${endpoint} Updated`,
            confirmButtonText: "Ok",
            icon: "success",
        });
    } else if (method === 'DELETE') {
        Swal.fire({
            title: `${endpoint} Deleted`,
            confirmButtonText: "Ok",
            icon: "success",
        });       
    }
}

SuccessAlert.propTypes = {
    endpoint: PropTypes.any,
    method: PropTypes.any
}
export default SuccessAlert;