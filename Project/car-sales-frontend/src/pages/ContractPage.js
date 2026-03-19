// src/pages/ContractPage.js
//Nguyen Minh Cao - 12/3/2026
import React, { useState, useEffect } from 'react';
import { getContracts, createContract, updateContractStatus, getQuotes } from '../services/api';

const ContractPage = () => {
    const [contracts, setContracts] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [form, setForm] = useState({ quoteId: '' });

    const loadData = () => {
        getContracts().then(res => setContracts(res.data));
        getQuotes().then(res => setQuotes(res.data.filter(q => q.status === 'APPROVED')));
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createContract(form);
        setForm({ quoteId: '' });
        loadData();
    };

    const handleStatusUpdate = async (id, status) => {
        await updateContractStatus(id, status);
        loadData();
    };

    return (
        <div className="container">
            <h2>📄 Hợp đồng (UC-15 → UC-18)</h2>
            <form onSubmit={handleSubmit}>
                <select
                    value={form.quoteId}
                    onChange={e => setForm({ ...form, quoteId: e.target.value })}
                    required
                >
                    <option value="">-- Chọn báo giá đã duyệt --</option>
                    {quotes.map(q => (
                        <option key={q.id} value={q.id}>
                            Báo giá #{q.id} - {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(q.price)}
                        </option>
                    ))}
                </select>
                <button type="submit">📑 Tạo hợp đồng (UC-15)</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Báo giá</th>
                        <th>Ngày tạo</th>
                        <th>Trạng thái</th>
                        <th>Thao tác (NV / Kế toán)</th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.map(c => (
                        <tr key={c.id}>
                            <td>#{c.id}</td>
                            <td>#{c.quote.id}</td>
                            <td>{new Date(c.createdAt).toLocaleDateString('vi-VN')}</td>
                            <td>
                                <span className="status-badge">{c.status}</span>
                            </td>
                            <td>
                                {c.status === 'DRAFT' && (
                                    <button
                                        className="status-btn"
                                        onClick={() => handleStatusUpdate(c.id, 'SENT')}
                                    >
                                        📤 Gửi kế toán (UC-16)
                                    </button>
                                )}
                                {c.status !== 'DRAFT' && (
                                    <select
                                        onChange={(e) => handleStatusUpdate(c.id, e.target.value)}
                                        value={c.status}
                                    >
                                        <option value="SENT">SENT</option>
                                        <option value="PROCESSING">PROCESSING</option>
                                        <option value="PAID">PAID</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                    </select>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContractPage;