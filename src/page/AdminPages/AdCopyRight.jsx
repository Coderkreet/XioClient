import React, { useEffect, useState } from 'react';
import { createCopyWrite, getAllCopyWrites, updateCopyWrite } from '../../api/admin-api';
import { Edit3, Save, AlertCircle, CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const initialForm = {
  title: '',
  description: ''
};

const AdCopyRight = () => {
  const [form, setForm] = useState(initialForm);
  const [copyId, setCopyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCopy();
  }, []);

  const fetchCopy = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await getAllCopyWrites();
      let copy = null;
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        copy = res.data[0];
      } else if (res && res.data && res.data._id) {
        copy = res.data;
      }
      if (copy) {
        setForm({
          title: copy.title || '',
          description: copy.description || ''
        });
        setCopyId(copy._id);
      } else {
        setForm(initialForm);
        setCopyId(null);
      }
    } catch {
      setError('Failed to fetch copyright info');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Incomplete Fields',
        text: 'Please fill in both title and description.',
        confirmButtonColor: '#4A088C',
      });
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (copyId) {
        await updateCopyWrite(copyId, form);
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Copyright updated successfully!', confirmButtonColor: '#4A088C' });
      } else {
        await createCopyWrite(form);
        Swal.fire({ icon: 'success', title: 'Created!', text: 'Copyright created successfully!', confirmButtonColor: '#4A088C' });
      }
      fetchCopy();
    } catch {
      Swal.fire({ icon: 'error', title: 'Error!', text: 'Failed to save copyright info', confirmButtonColor: '#4A088C' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg  p-8 mb-8" style={{ backgroundColor: '#120540', borderColor: '#433C73', borderWidth: '1px' }}>
      {/* Header */}
      <div className="border-b pb-6 mb-8" style={{ borderColor: '#433C73' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A088C' }}>
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Copyright Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage your website copyright notice</p>
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
      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: '#433C73' }}>
          <div className="mb-4">
            <label className="block text-[#AEA7D9] mb-2 font-medium">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none focus:ring-2 focus:ring-[#4A088C]"
              placeholder="Enter copyright title"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#AEA7D9] mb-2 font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={e => handleInputChange('description', e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none focus:ring-2 focus:ring-[#4A088C]"
              placeholder="Enter copyright description"
              rows={4}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          {!copyId && (
            <button
              type="submit"
              className="bg-[#4A088C] hover:bg-[#5d0a9d] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  Saving...
                </>
              ) : (
                <><Save className="w-4 h-4" /> Create</>
              )}
            </button>
          )}
          {copyId && (
            <button
              type="submit"
              className="bg-[#4A088C] hover:bg-[#5d0a9d] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  Saving...
                </>
              ) : (
                <><Save className="w-4 h-4" /> Update</>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdCopyRight;
