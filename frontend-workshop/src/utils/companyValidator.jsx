const validCompanyName = (data) => {
    const regexCName = /^[a-zA-Z0-9.& ]+$/
    return regexCName.test(data?.name);   
}

const validContactPerson = (data) => {
    const regexName = /^[A-Z][a-z]+\s(?:[A-Z][a-z]+\s?)+$/;
    return regexName.test(data?.contactPerson);
}

const validEmailAdd = (data) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regexEmail.test(data?.email)
}

const validContactNumber = (data) => {
    const regexMobileNum1 = /^09[0-9]{9}$/;
    const regexMobileNum2 = /^\+639[0-9]{9}$/;
    return regexMobileNum1.test(data?.contactNumber) || regexMobileNum2.test(data?.contactNumber)
}

const validAddress = (data) => {
    const regexAddress = /^[a-zA-Z0-9\s.,-]+$/ ;
    return regexAddress.test(data?.address);
}

const validCompanyNameLen = (data) => {
    return data?.name.length > 1;
}

const validContactPersonLen = (data) => {
    return data?.contactPerson.length > 1;
}

const validEmailAddLen = (data) => {
    return data?.email.length > 1;
}

const validContactNumberLen = (data) => {
    return data?.contactNumber.length > 1;
}

const validAddressLen = (data) => {
    return data?.address.length > 1;
}

export const validateCompany = (data) => {
    const retData = {isValid: true, errors: {}}

    if(!validCompanyNameLen({name: data?.name})) {
        retData.errors.name = 'Invalid length of name'
        retData.isValid = false
    }

    if(!validContactPersonLen({contactPerson: data?.contactPerson})) {
        retData.errors.name = 'Invalid length of contact person'
        retData.isValid = false
    }
    
    if(!validEmailAddLen({email: data?.email})) {
        retData.errors.email = 'Invalid length of email address'
        retData.isValid = false
    }

    if(!validContactNumberLen({contactNumber: data?.contactNumber})) {
        retData.errors.contactNumber = 'Invalid contact number'
        retData.isValid = false
    }

    if(!validAddressLen({address: data?.address})) {
        retData.errors.address = 'Invalid address';
        retData.isValid = false
    }


    if(!validCompanyName({name: data?.name})) {
        retData.isValid = false;
        retData.errors.name = 'Invalid company name'
    }

    if(!validContactPerson({contactPerson: data?.contactPerson})) {
        retData.isValid = false;
        retData.errors.contactPerson = 'Invalid contact name'
    }

    if(!validEmailAdd({email: data?.email})) {
        retData.isValid = false;
        retData.errors.email = 'Invalid email address'
    }

    if(!validContactNumber({contactNumber: data?.contactNumber})) {
        retData.isValid = false;
        retData.errors.contactNumber = 'Invalid contact number';
    }
    
    if(!validAddress({address: data?.address})) {
        retData.isValid = false;
        retData.errors.address = 'Invalid address';
    }
    console.log('isValid?: ', retData.isValid);
    return retData;
};
export default validateCompany;