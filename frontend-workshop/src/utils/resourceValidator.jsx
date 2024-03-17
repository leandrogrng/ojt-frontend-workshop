const validNameChr = (data) => {
    const regexName = /^[a-zA-Z]+$/
    return regexName.test(data?.firstName) && regexName.test(data?.lastName) && regexName.test(data?.middleName);
}

const validFNameLen = (data) => {
    return data?.firstName.length > 2   
}

const validLNameLen = (data) => {
    return data?.lastName.length >= 2;
}

export const validateResource = (data) => {
    const retData = {isValid: true, errors: {}}

    if(!validNameChr({firstName: data?.firstName})) {
        retData.isValid = false;
        retData.errors.firstName = 'Invalid characters'
    }

    if(!validNameChr({lastName: data?.lastName})) {
        retData.isValid = false;
        retData.errors.lastName = 'Invalid characters'
    }

    if(!validFNameLen({firstName: data?.firstName})) {
        retData.isValid = false;
        retData.errors.firstName = 'Invalid name length'
    }

    if(!validLNameLen({lastName: data?.lastName})) {
        retData.isValid = false;
        retData.errors.lastName = 'Invaliid name length'
    }

    if(data?.type?.length < 1) {
        retData.isValid = false;
        retData.errors.type = 'Resource type is required.'
    } else {
        if(!['DEV', 'QA', 'PM'].includes((data?.type))) {
            retData.isValid = false;
            retData.errors.type = 'Please enter a valid resource type (PM, QA, or DEV)'
        }
    }
    return retData;
};

export default validateResource;