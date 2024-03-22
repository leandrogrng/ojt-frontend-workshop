const validSubject = (data) => {
    const regexSubject = /^(?!\s\s).*$/;
    return regexSubject.test(data?.requestSubject);
}

const validDescription = (data) => {
    const regexDescription = /^(?!\s\s).*$/;
    return regexDescription.test(data?.requestDescription);
}



export const validateRequest = (data) => {
    const retData = {isValid: true, errors: {}}

    if(!validSubject({requestSubject: data?.requestSubject})) {
        retData.isValid = false;
        retData.errors.requestSubject = 'Invalid subject';
    }

    if(!validDescription({requestDescription: data?.requestDescription})) {
        retData.isValid = false;
        retData.errors.requestDescription = 'Invalid description';
    }

    



    return retData;
}

export default validateRequest;