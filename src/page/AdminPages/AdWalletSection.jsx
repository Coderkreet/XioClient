import React, { useState, useEffect } from 'react'
import { deleteConnectWallet, updateConnectWallet, getConnectWalletById, getAllConnectWallets, createConnectWallet } from '../../api/admin-api'
import { Save, Edit3, Type, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';

const AdWalletSection = () => {
  const [form, setForm] = useState({
    rightTitle: '',
    rightDescription: '',
    leftTitle: '',
    leftDescription: ''
  });
  const [walletId, setWalletId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchWalletContent();
  }, []);

  const fetchWalletContent = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllConnectWallets();
      let wallet = null;
      if (res && res.data) {
        if (Array.isArray(res.data) && res.data.length > 0) {
          wallet = res.data[0];
        } else if (typeof res.data === 'object' && res.data._id) {
          wallet = res.data;
        }
      }
      if (wallet) {
        setForm({
          rightTitle: wallet.rightTitle || '',
          rightDescription: wallet.rightDescription || '',
          leftTitle: wallet.leftTitle || '',
          leftDescription: wallet.leftDescription || ''
        });
        setWalletId(wallet._id || null);
      } else {
        setForm({
          rightTitle: '',
          rightDescription: '',
          leftTitle: '',
          leftDescription: ''
        });
        setWalletId(null);
      }
    } catch {
      setError('Failed to fetch wallet content');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      let res;
      if (walletId) {
        res = await updateConnectWallet(walletId, form);
        setSuccess('Wallet content updated successfully!');
      } else {
        res = await createConnectWallet(form);
        setSuccess('Wallet content created successfully!');
      }
      if (res?.data?._id) setWalletId(res.data._id);
      await fetchWalletContent();
    } catch {
      setError('Failed to save wallet content');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!walletId) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await deleteConnectWallet(walletId);
      setSuccess('Wallet content deleted successfully!');
      setWalletId(null);
      setForm({
        rightTitle: '',
        rightDescription: '',
        leftTitle: '',
        leftDescription: ''
      });
    } catch {
      setError('Failed to delete wallet content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: '#120540', borderColor: '#433C73', borderWidth: '1px' }}>
      {/* Header */}
      <div className="border-b pb-6 mb-8" style={{ borderColor: '#433C73' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A088C' }}>
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Wallet Section Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage wallet connect section content</p>
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
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#433C73' }}>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
              <Type className="w-5 h-5 text-[#AEA7D9]" />
              Wallet Content
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Right Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg transition-colors text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Enter right title"
                  value={form.rightTitle}
                  onChange={e => handleInputChange('rightTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Right Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg transition-colors resize-none text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Enter right description"
                  value={form.rightDescription}
                  onChange={e => handleInputChange('rightDescription', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#433C73' }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Left Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg transition-colors text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Enter left title"
                  value={form.leftTitle}
                  onChange={e => handleInputChange('leftTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Left Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg transition-colors resize-none text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Enter left description"
                  value={form.leftDescription}
                  onChange={e => handleInputChange('leftDescription', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="lg:col-span-2 flex justify-end gap-4 mt-8 pt-6 border-t" style={{ borderColor: '#433C73' }}>
          <button
            type="button"
            onClick={fetchWalletContent}
            className="px-6 py-2.5 border text-white rounded-lg hover:opacity-80"
            style={{ borderColor: '#727FA6' }}
            disabled={loading}
          >
            Reset
          </button>
          {walletId && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2.5 border text-white rounded-lg flex items-center gap-2 hover:opacity-80"
              style={{ borderColor: '#e53e3e' }}
              disabled={loading}
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              Delete
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-white"
            style={{
              backgroundColor: '#4A088C',
              opacity: loading ? 0.5 : 1
            }}
          >
            <Save className="w-4 h-4" />
            {loading ? (walletId ? 'Updating...' : 'Saving...') : (walletId ? 'Update Content' : 'Save Content')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdWalletSection
