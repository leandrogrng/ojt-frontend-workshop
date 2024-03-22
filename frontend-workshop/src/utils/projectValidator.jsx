const validProjectName = (data) => {
    const regexPName = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/
    return regexPName.test(data?.name);   
}

const validProjectDescription = (data) => {
    const regexPDescription = /^(?!\s\s).*$/
    return regexPDescription.test(data?.description);
}

const validAlias = (data) => {
    const regexAlias = /^[a-z][A-Za-z]*$/;
    return regexAlias.test(data?.alias);
}

export const validateProject = (data) => {
    const retData = {isValid: true, errors: {}}

    if(!validProjectName({name: data?.name})) {
        retData.isValid = false;
        retData.errors.name = 'Invalid project name'
    }

    if(!validProjectDescription({description: data?.description})) {
        retData.isValid = false;
        retData.errors.description = 'Description required'
    }

    if(!validAlias({alias: data?.alias})) {
        retData.isValid = false;
        retData.errors.alias = 'Invalid alias. Should not contain any spaces.'
    }

    return retData;
};
export default validateProject;