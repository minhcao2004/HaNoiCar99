// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getRequests = () => axios.get(`${API_URL}/requests`);
export const createRequest = (data) => axios.post(`${API_URL}/requests`, data);
export const updateRequestStatus = (id, status) => axios.put(`${API_URL}/requests/${id}/status`, { status });

export const getQuotes = () => axios.get(`${API_URL}/quotes`);
export const createQuote = (data) => axios.post(`${API_URL}/quotes`, data);
export const updateQuote = (id, data) => axios.put(`${API_URL}/quotes/${id}`, data);

export const getContracts = () => axios.get(`${API_URL}/contracts`);
export const createContract = (data) => axios.post(`${API_URL}/contracts`, data);
export const updateContractStatus = (id, status) => axios.put(`${API_URL}/contracts/${id}/status`, { status });