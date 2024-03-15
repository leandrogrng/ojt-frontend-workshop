import { useContext } from 'react';
import { CompanyContext } from './Company';

const useCompany = () => useContext(CompanyContext);

export { useCompany };