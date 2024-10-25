import { useEffect, useState } from 'react';
import { ListVisits } from './visitsView';
import { getAllVisits } from '../../api/visits';

export const VisitsPage: React.FC = () => {
  const [movements, setVisits] = useState([])

  useEffect(() => {
    const GetVisits = async () => {
      setVisits(await getAllVisits())
    };
   
   GetVisits()
  }, [])
  
  return (
    <div style={{ marginTop: '100px' }}>
      <ListVisits cadastros={movements} />
    </div>
  );
};
