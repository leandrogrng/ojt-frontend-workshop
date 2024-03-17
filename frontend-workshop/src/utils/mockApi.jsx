import initialResources from "./resources.json";
import initialProjects from "./projects.json";
import initialCompanies from "./companies.json";
import initialRequests from "./requests.json";

const storedResources = localStorage.getItem("resources");
const storedProjects = localStorage.getItem("projects");
const storedCompanies = localStorage.getItem("companies");
const storedRequests = localStorage.getItem("requests");

let resources = storedResources
  ? JSON.parse(storedResources)
  : [...initialResources];
let projects = storedProjects
  ? JSON.parse(storedProjects)
  : [...initialProjects];
let companies = storedCompanies
  ? JSON.parse(storedCompanies)
  : [...initialCompanies];
let requests = storedRequests
  ? JSON.parse(storedRequests)
  : [...initialRequests];

const updateLocalStorage = () => {
  localStorage.setItem("resources", JSON.stringify(resources));
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("companies", JSON.stringify(companies));
  localStorage.setItem("requests", JSON.stringify(requests));
};

const findById = (array, id) => array.find((item) => item.id === id);
const findByName = (array, value, keys = ["name"]) => {
  const data = array.filter((item) =>
    keys.some((key) =>
      item?.[key]?.toUpperCase().includes(value?.toUpperCase())
    )
  );
  if (data?.length > 0) return data;
  return [];
};

const mockApi = (method, endpoint, data = null) => {
  let requestText = `Request Made: %c${method} - ${endpoint} ${
    data !== null ? `${JSON.stringify(data)}` : ``
  }`;
  let requestTheme = `color: green`;
  if (method.toUpperCase() === "POST") {
    requestTheme = `color: lightblue`;
  }
  if (method.toUpperCase() === "PUT") {
    requestTheme = `color: orange`;
  }
  if (method.toUpperCase() === "DELETE") {
    requestTheme = `color: red`;
  }
  console.log(requestText, requestTheme);

  const result = { status: false, data: null };

  switch (method.toUpperCase()) {
    case "GET": {
      const getEndpoint = endpoint.split("/");
      const resourceType = getEndpoint[1];

      switch (resourceType) {
        case "resources": {
          const validData = resources.filter((item) => !item.isDeleted);
          if (getEndpoint.length === 3) {
            const resourceId = parseInt(getEndpoint[2], 10);
            const resource = findById(validData, resourceId);

            if (resource) {
              result.status = true;
              result.data = resource;
              return result;
            } else {
              result.status = false;
              return result;
            }
          } else {
            if (data?.keyword?.length > 0) {
              const matches = findByName(validData, data?.keyword, [
                "firstName",
                "middleName",
                "lastName",
              ]);
              if (Array.isArray(matches)) {
                result.status = true;
                result.data = matches;
                return result;
              } else {
                result.status = false;
                return result;
              }
            } else {
              result.status = true;
              result.data = validData;
              return result;
            }
          }
        }
        case "projects": {
          const validData = projects.filter((item) => !item.isDeleted);
          if (getEndpoint.length === 3) {
            const projectId = parseInt(getEndpoint[2], 10);
            const project = findById(validData, projectId);
            if (project) {
              result.status = true;
              result.data = project;
              return result;
            } else {
              result.status = false;
              return result;
            }
          } else {
            if (data?.keyword?.length > 0) {
              const matches = findByName(validData, data?.keyword);
              if (Array.isArray(matches)) {
                result.status = true;
                result.data = matches;
                return result;
              } else {
                result.status = false;
                return result;
              }
            } else {
              result.status = true;
              result.data = validData;
              return result;
            }
          }
        }
        case "companies": {
          const validData = companies.filter((item) => !item.isDeleted);
          if (getEndpoint.length === 3) {
            const companyId = parseInt(getEndpoint[2], 10);
            const company = findById(validData, companyId);
            if (company) {
              result.status = true;
              result.data = company;
              return result;
            } else {
              result.status = false;
              return result;
            }
          } else {
            if (data?.keyword?.length > 0) {
              const matches = findByName(validData, data?.keyword);
              if (Array.isArray(matches)) {
                result.status = true;
                result.data = matches;
                return result;
              } else {
                result.status = false;
                return result;
              }
            } else {
              result.status = true;
              result.data = validData;
              return result;
            }
          }
        }
        case "requests": {
          const validData = requests.filter((item) => !item.isDeleted);
          if (getEndpoint.length === 3) {
            const requestId = parseInt(getEndpoint[2], 10);
            const request = findById(validData, requestId);
            if (request) {
              result.status = true;
              result.data = request;
              return result;
            } else {
              result.status = false;
              return result;
            }
          } else {
            if (data?.keyword?.length > 0) {
              const matches = findByName(validData, data?.keyword, ["subject"]);
              if (Array.isArray(matches)) {
                result.status = true;
                result.data = matches;
                return result;
              } else {
                result.status = false;
                return result;
              }
            } else {
              result.status = true;
              result.data = validData;
              return result;
            }
          }
        }
        default:
          return result;
      }
    }
    case "POST": {
      switch (endpoint) {
        case "/reset-data": {
          localStorage.setItem(
            "resources",
            JSON.stringify([...initialResources])
          );
          localStorage.setItem(
            "projects",
            JSON.stringify([...initialProjects])
          );
          localStorage.setItem(
            "companies",
            JSON.stringify([...initialCompanies])
          );
          localStorage.setItem(
            "requests",
            JSON.stringify([...initialRequests])
          );
          return;
        }
        case "/resources": {
          const newResource = { ...data, id: resources.length + 1 };
          resources.push(newResource);
          result.status = true;
          result.data = newResource;
          updateLocalStorage();
          return result;
        }
        case "/projects": {
          const newProject = { ...data, id: projects.length + 1 };
          projects.push(newProject);
          result.status = true;
          result.data = newProject;
          updateLocalStorage();
          return result;
        }
        case "/companies": {
          const newDeveloper = { ...data, id: companies.length + 1 };
          companies.push(newDeveloper);
          result.status = true;
          result.data = newDeveloper;
          updateLocalStorage();
          return result;
        }
        case "/requests": {
          const newDeveloper = { ...data, id: requests.length + 1 };
          requests.push(newDeveloper);
          result.status = true;
          result.data = newDeveloper;
          updateLocalStorage();
          return result;
        }
        default:
          updateLocalStorage();
          return result;
      }
    }
    case "PUT": {
      const putEndpoint = endpoint.split("/");
      const resourceType = putEndpoint[1];

      switch (resourceType) {
        case "resources": {
          const validData = resources.filter((item) => !item.isDeleted);
          const resourceId = parseInt(putEndpoint[2], 10);
          const resourceToUpdate = findById(validData, resourceId);
          if (resourceToUpdate) {
            Object.assign(resourceToUpdate, data);
            result.status = true;
            result.data = resourceToUpdate;
            updateLocalStorage();
            return result;
          }
          updateLocalStorage();
          return result;
        }
        case "projects": {
          const validData = projects.filter((item) => !item.isDeleted);
          const projectId = parseInt(putEndpoint[2], 10);
          const projectToUpdate = findById(validData, projectId);
          if (projectToUpdate) {
            Object.assign(projectToUpdate, data);
            result.status = true;
            result.data = projectToUpdate;
            updateLocalStorage();
            return result;
          }
          updateLocalStorage();
          return result;
        }
        case "companies": {
          const validData = companies.filter((item) => !item.isDeleted);
          const companyId = parseInt(putEndpoint[2], 10);
          const companyToUpdate = findById(validData, companyId);
          if (companyToUpdate) {
            Object.assign(companyToUpdate, data);
            result.status = true;
            result.data = companyToUpdate;
            updateLocalStorage();
            return result;
          }
          updateLocalStorage();
          return result;
        }
        case "requests": {
          const validData = requests.filter((item) => !item.isDeleted);
          const requestId = parseInt(putEndpoint[2], 10);
          const requestToUpdate = findById(validData, requestId);
          if (requestToUpdate) {
            Object.assign(requestToUpdate, data);
            result.status = true;
            result.data = requestToUpdate;
            updateLocalStorage();
            return result;
          }
          updateLocalStorage();
          return result;
        }
        default:
          updateLocalStorage();
          return result;
      }
    }
    case "DELETE": {
      const deleteEndpoint = endpoint.split("/");
      const resourceType = deleteEndpoint[1];

      switch (resourceType) {
        case "resources": {
          const resourceId = parseInt(deleteEndpoint[2], 10);
          const index = resources.findIndex((item) => item.id === resourceId);
          if (index !== -1) {
            resources[index].isDeleted = true;
            const deletedResource = resources[index];
            result.status = true;
            result.data = deletedResource;
            updateLocalStorage();
            return result;
          }
          updateLocalStorage();
          return result;
        }
        case "projects": {
          const projectId = parseInt(deleteEndpoint[2], 10);
          const index = projects.findIndex((item) => item.id === projectId);
          if (index !== -1) {
            projects[index].isDeleted = true;
            const deletedProject = projects[index];
            result.status = true;
            result.data = deletedProject;
            updateLocalStorage();
            return result;
          }
          updateLocalStorage();
          return result;
        }
        case "companies": {
          const companyId = parseInt(deleteEndpoint[2], 10);
          const index = companies.findIndex((item) => item.id === companyId);
          if (index !== -1) {
            companies[index].isDeleted = true;
            const deletedCompany = companies[index];
            result.status = true;
            result.data = deletedCompany;
            updateLocalStorage();
            return result;
          }
          updateLocalStorage();
          return result;
        }
        case "requests": {
          const requestId = parseInt(deleteEndpoint[2], 10);
          const index = requests.findIndex((item) => item.id === requestId);
          if (index !== -1) {
            requests[index].isDeleted = true;
            const deletedRequest = requests[index];
            result.status = true;
            result.data = deletedRequest;
            updateLocalStorage();
            return result;
          }
          updateLocalStorage();
          return result;
        }
        default:
          updateLocalStorage();
          return result;
      }
    }
    default:
      updateLocalStorage();
      return result;
  }
};

export default mockApi;
