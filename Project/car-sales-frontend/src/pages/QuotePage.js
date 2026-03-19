// src/pages/QuotePage.js
//Nguyen Minh Cao - 12/3/2026
import React, { useState, useEffect } from 'react';
import { getQuotes, createQuote, updateQuote, getRequests } from '../services/api';

const QuotePage = () => {
    const [quotes, setQuotes] = useState([]);
    const [requests, setRequests] = useState([]);
    const [form, setForm] = useState({ requestId: '', price: '', note: '' });
    const [editQuote, setEditQuote] = useState(null);

    const loadData = () => {
        getQuotes().then(res => setQuotes(res.data));
        getRequests().then(res => setRequests(res.data.filter(r => r.status !== 'REJECTED')));
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editQuote) {
            await updateQuote(editQuote.id, form);
            setEditQuote(null);
        } else {
            await createQuote(form);
        }
        setForm({ requestId: '', price: '', note: '' });
        loadData();
    };

    return (
        <div className="container">
            <h2>💰 Báo giá (UC-12 & UC-13)</h2>
            <form onSubmit={handleSubmit}>
                {!editQuote && (
                    <select
                        value={form.requestId}
                        onChange={e => setForm({ ...form, requestId: e.target.value })}
                        required
                    >
                        <option value="">-- Chọn yêu cầu --</option>
                        {requests.map(r => (
                            <option key={r.id} value={r.id}>
                                Yêu cầu #{r.id} - {r.customer.name}
                            </option>
                        ))}
                    </select>
                )}
                <input
                    type="number"
                    placeholder="Giá (VNĐ)"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Ghi chú"
                    value={form.note}
                    onChange={e => setForm({ ...form, note: e.target.value })}
                />
                {editQuote && (
                    <select
                        value={form.status}
                        onChange={e => setForm({ ...form, status: e.target.value })}
                    >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>
                )}
                <button type="submit">{editQuote ? '✏️ Cập nhật' : '📝 Tạo báo giá'}</button>
                {editQuote && (
                    <button type="button" onClick={() => {
                        setEditQuote(null);
                        setForm({ requestId: '', price: '', note: '' });
                    }}>
                        ❌ Huỷ
                    </button>
                )}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Yêu cầu</th>
                        <th>Giá</th>
                        <th>Ghi chú</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map(q => (
                        <tr key={q.id}>
                            <td>#{q.id}</td>
                            <td>#{q.request.id}</td>
                            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(q.price)}</td>
                            <td>{q.note}</td>
                            <td>
                                <span className="status-badge">{q.status}</span>
                            </td>
                            <td>
                                <button onClick={() => {
                                    setEditQuote(q);
                                    setForm({
                                        requestId: q.request.id,
                                        price: q.price,
                                        note: q.note,
                                        status: q.status
                                    });
                                }}>
                                    ✏️ Sửa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuotePage;