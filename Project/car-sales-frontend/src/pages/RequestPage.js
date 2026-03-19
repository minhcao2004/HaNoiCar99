// src/pages/RequestPage.js
//Nguyen Minh Cao - 12/3/2026
import React, { useState, useEffect } from 'react';
import { getRequests, createRequest, updateRequestStatus } from '../services/api';

const RequestPage = () => {
    const [requests, setRequests] = useState([]);
    const [form, setForm] = useState({ customerName: '', phone: '', email: '' });

    const loadRequests = () => getRequests().then(res => setRequests(res.data));

    useEffect(() => { loadRequests(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createRequest(form);
        setForm({ customerName: '', phone: '', email: '' });
        loadRequests();
    };

    const handleStatusUpdate = async (id, status) => {
        await updateRequestStatus(id, status);
        loadRequests();
    };

    return (
        <div className="container">
            <h2>📋 Yêu cầu mua hàng (UC-11 & UC-14)</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Tên khách hàng"
                    value={form.customerName}
                    onChange={e => setForm({ ...form, customerName: e.target.value })}
                    required
                />
                <input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                />
                <button type="submit">➕ Tạo yêu cầu</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Điện thoại</th>
                        <th>Ngày tạo</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req.id}>
                            <td>#{req.id}</td>
                            <td>{req.customer.name}</td>
                            <td>{req.customer.phone}</td>
                            <td>{new Date(req.requestDate).toLocaleString('vi-VN')}</td>
                            <td>
                                <span className="status-badge">{req.status}</span>
                            </td>
                            <td>
                                <select
                                    onChange={(e) => handleStatusUpdate(req.id, e.target.value)}
                                    value={req.status}
                                >
                                    <option value="NEW">NEW</option>
                                    <option value="QUOTED">QUOTED</option>
                                    <option value="NEGOTIATING">NEGOTIATING</option>
                                    <option value="APPROVED">APPROVED</option>
                                    <option value="REJECTED">REJECTED</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestPage;