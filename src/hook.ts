import { useContext } from 'react';
import AlertsContext from './context';

const useAlerts = () => {
  const alert = useContext(AlertsContext);
  if (!alert) {
    throw new Error('useAlerts must be used within a AlertsProvider.');
  }
  return alert;
};

export default useAlerts;
