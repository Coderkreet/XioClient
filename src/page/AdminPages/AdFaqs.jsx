import React, { useEffect, useState } from 'react';
import { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } from '../../api/admin-api';
import { Plus, Edit3, Edit2, Trash2, Save, X, AlertCircle, CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const AdFaqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const res = await getAllFAQs();
      if (Array.isArray(res)) {
        setFaqs(res);
      } else if (res && Array.isArray(res.data)) {
        setFaqs(res.data);
      } else {
        setFaqs([]);
      }
    } catch {
      setError('Failed to fetch FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditing({ question: '', answer: '' });
    setError('');
    setSuccess('');
  };
  const handleEdit = (faq) => {
    setEditing(faq);
    setError('');
    setSuccess('');
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This FAQ will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (!result.isConfirmed) return;
  
    try {
      await deleteFAQ(id);
      setFaqs(faqs.filter(f => f._id !== id));
      Swal.fire('Deleted!', 'FAQ deleted successfully.', 'success');
    } catch {
      Swal.fire('Error', 'Failed to delete FAQ.', 'error');
    }
  };
  
  const handleSave = async () => {
    if (!editing.question || !editing.answer) {
      Swal.fire('Missing Fields', 'Please enter both a question and an answer.', 'warning');
      return;
    }
  
    setLoading(true);
    try {
      let res;
      if (editing._id) {
        res = await updateFAQ(editing._id, editing);
        setFaqs(faqs.map(f => f._id === editing._id ? res : f));
        Swal.fire('Success', 'FAQ updated successfully!', 'success');
      } else {
        res = await createFAQ(editing);
        setFaqs([...faqs, res]);
        Swal.fire('Success', 'FAQ created successfully!', 'success');
      }
      setEditing(null);
    } catch {
      Swal.fire('Error', 'Failed to save FAQ', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (field, value) => setEditing({ ...editing, [field]: value });

  return (
    <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: '#120540', borderColor: '#433C73', borderWidth: '1px' }}>
      {/* Header */}
      <div className="border-b pb-6 mb-8" style={{ borderColor: '#433C73' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A088C' }}>
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>FAQ Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage your website's frequently asked questions</p>
          </div>
        </div>
      </div>
      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 rounded-lg flex items-center gap-3 bg-red-50 border border-red-200">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 rounded-lg flex items-center gap-3 bg-green-50 border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">{success}</span>
        </div>
      )}
      {/* Add Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAdd}
          className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 transition"
        >
          <Plus size={20} />
        </button>
      </div>
      {/* FAQ List */}
      <div className="max-h-96 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="text-center text-white py-4 col-span-full">Loading...</div>
        ) : faqs.length === 0 ? (
          <div className="text-center text-[#AEA7D9] py-4 col-span-full">No FAQs found.</div>
        ) : (
          faqs.map(faq => (
            <div key={faq._id} className="rounded-lg p-6 flex flex-col gap-3" style={{ backgroundColor: '#433C73' }}>
              <div className="flex w-full justify-between items-center mb-2">
                <span className="text-lg font-semibold text-white">{faq.question}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(faq)} className="text-blue-400 hover:text-blue-300">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(faq._id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="text-[#AEA7D9]">{faq.answer}</div>
            </div>
          ))
        )}
      </div>
      {/* Modal for Add/Edit FAQ */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#120540] border border-[#433C73] rounded-xl p-6 w-full max-w-md mx-4 overflow-y-auto max-h-[90vh] relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">{editing._id ? 'Edit FAQ' : 'Add New FAQ'}</h3>
              <button
                onClick={() => setEditing(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>
            {/* FAQ Question */}
            <div className="mb-4">
              <label className="block text-[#AEA7D9] mb-2 font-medium">Question</label>
              <input
                type="text"
                value={editing.question}
                onChange={e => handleInputChange('question', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none focus:ring-2 focus:ring-[#4A088C]"
                placeholder="Enter FAQ question"
              />
            </div>
            {/* FAQ Answer */}
            <div className="mb-4">
              <label className="block text-[#AEA7D9] mb-2 font-medium">Answer</label>
              <textarea
                value={editing.answer}
                onChange={e => handleInputChange('answer', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none focus:ring-2 focus:ring-[#4A088C]"
                placeholder="Enter FAQ answer"
                rows={4}
              />
            </div>
            {/* Footer Actions */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleSave}
                className="bg-[#4A088C] hover:bg-[#5d0a9d] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    Saving...
                  </>
                ) : (
                  <><Save className="w-4 h-4" /> Save</>
                )}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="border border-[#727FA6] text-white px-6 py-2.5 rounded-lg hover:bg-white/10 disabled:opacity-60"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
            {error && <div className="text-red-400 mt-3">{error}</div>}
            {success && <div className="text-green-400 mt-3">{success}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdFaqs;