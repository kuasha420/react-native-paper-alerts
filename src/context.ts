import { createContext } from 'react';
import { AlertsMethods } from './type';

const AlertsContext = createContext<AlertsMethods | null>(null);

export default AlertsContext;
