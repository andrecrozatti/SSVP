import { api } from '../shared/services/api';

import { IVisits } from '../shared/dtos/IVisits';



const createVisits= async (data: IVisits) => {
  try {
    const result = await api.post('/visits',  data );

    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateVisits= async (data: IVisits) => {
  try {
    const result = await api.put(`/visits/${data.id}`, data);
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteVisits= async (id: number) => {
  try {
    const result = await api.delete(`/visits/${id}`);

    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


const getAllVisits= async () => {
  try {
   
    const result = await api.get('/visits');
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getOneVisits= async (id: Number) => {
  try {

    return await api.get(`/visits/${id}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { createVisits, deleteVisits, updateVisits, getAllVisits, getOneVisits};
