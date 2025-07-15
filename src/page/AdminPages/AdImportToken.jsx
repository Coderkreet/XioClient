import { useState, useEffect } from 'react';
import { createTokenV2, getAllTokensV2, updateTokenV2, deleteTokenV2 } from '../../api/admin-api';
import { Edit3, Save, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const AdImportToken = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null or token object
  const [form, setForm] = useState({
    tokenName: '',
    symbol: '',
    decimals: 18,
    address: '',
    network: ''
  });

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllTokensV2();
      setTokens(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError('Failed to fetch tokens');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({ tokenName: '', symbol: '', decimals: 18, address: '', network: '' });
    setSuccess('');
    setError('');
    setModalOpen(true);
  };

  const handleEdit = (token) => {
    setEditing(token);
    setForm({
      tokenName: token.tokenName || '',
      symbol: token.symbol || '',
      decimals: token.decimals || 18,
      address: token.address || '',
      network: token.network || ''
    });
    setSuccess('');
    setError('');
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This token will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await deleteTokenV2(id);
          setTokens(tokens.filter(t => t._id !== id));
          Swal.fire('Deleted!', 'Token has been deleted.', 'success');
        } catch {
          Swal.fire('Error', 'Failed to delete token.', 'error');
        } finally {
          setLoading(false);
        }
      }
    });
  };
  
  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.tokenName || !form.symbol || !form.decimals || !form.address || !form.network) {
      Swal.fire('Validation Error', 'All fields are required.', 'warning');
      return;
    }
  
    setLoading(true);
    try {
      if (editing && editing._id) {
        await updateTokenV2(editing._id, form);
        Swal.fire('Updated!', 'Token updated successfully!', 'success');
      } else {
        await createTokenV2(form);
        Swal.fire('Created!', 'Token created successfully!', 'success');
      }
  
      fetchTokens();
      setModalOpen(false);
      setEditing(null);
      setForm({ tokenName: '', symbol: '', decimals: 18, address: '', network: '' });
    } catch {
      Swal.fire('Error', 'Failed to save token.', 'error');
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
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Import Token Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage your imported tokens for the platform</p>
          </div>
          <div className="ml-auto">
            <button onClick={handleAdd} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-700 hover:to-purple-700 text-white p-2 rounded-lg shadow-lg transition-all flex items-center gap-1">
              <Plus className="w-5 h-5" /> <span className="hidden sm:inline">Add Token</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && !modalOpen && (
        <div className="mb-6 p-4 rounded-lg flex items-center gap-3 bg-red-50 border border-red-200">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}
      {success && !modalOpen && (
        <div className="mb-6 p-4 rounded-lg flex items-center gap-3 bg-green-50 border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {/* Token List */}
      {loading ? (
        <div className="text-center text-[#AEA7D9] py-4">Loading...</div>
      ) : (
        <>
          {tokens.length > 0 && (
            <div className="bg-[#433C73] border border-[#727FA6] rounded-xl shadow-lg p-6 max-w-md mx-auto flex flex-col gap-2 mb-8">
              <div className="flex flex-col gap-1">
                <span className="text-[#AEA7D9] text-sm">Token Name</span>
                <span className="text-white font-semibold text-lg">{tokens[0].tokenName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#AEA7D9] text-sm">Symbol</span>
                <span className="text-white">{tokens[0].symbol}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#AEA7D9] text-sm">Decimals</span>
                <span className="text-white">{tokens[0].decimals}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#AEA7D9] text-sm">Address</span>
                <span className="text-white break-all">{tokens[0].address}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[#AEA7D9] text-sm">Network</span>
                <span className="text-white">{tokens[0].network}</span>
              </div>
              <div className="flex gap-4 mt-4 justify-end">
                <button onClick={() => handleEdit(tokens[0])} className="text-blue-400 hover:text-blue-300 font-semibold">Edit</button>
                <button onClick={() => handleDelete(tokens[0]._id)} className="text-red-400 hover:text-red-300 font-semibold">Delete</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#120540] border border-[#433C73] rounded-2xl p-8 w-full max-w-md mx-auto relative shadow-2xl animate-fadeIn">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-[#AEA7D9] hover:text-white text-xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
              <Edit3 className="w-5 h-5 text-[#AEA7D9]" />
              {editing ? 'Edit' : 'Add'} Token
            </h3>
            {/* Alerts in Modal */}
            {error && (
              <div className="mb-4 p-3 rounded-lg flex items-center gap-2 bg-red-50 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 rounded-lg flex items-center gap-2 bg-green-50 border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700">{success}</span>
              </div>
            )}
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-[#AEA7D9] mb-1">Token Name</label>
                <input type="text" className="w-full bg-[#120540] border border-[#727FA6] rounded-lg px-4 py-3 text-white" placeholder="Token Name" value={form.tokenName} onChange={e => handleInputChange('tokenName', e.target.value)} required />
              </div>
              <div>
                <label className="block text-[#AEA7D9] mb-1">Symbol</label>
                <input type="text" className="w-full bg-[#120540] border border-[#727FA6] rounded-lg px-4 py-3 text-white" placeholder="Symbol" value={form.symbol} onChange={e => handleInputChange('symbol', e.target.value)} required />
              </div>
              <div>
                <label className="block text-[#AEA7D9] mb-1">Decimals</label>
                <input type="number" className="w-full bg-[#120540] border border-[#727FA6] rounded-lg px-4 py-3 text-white" placeholder="Decimals" value={form.decimals} onChange={e => handleInputChange('decimals', e.target.value)} required />
              </div>
              <div>
                <label className="block text-[#AEA7D9] mb-1">Address</label>
                <input type="text" className="w-full bg-[#120540] border border-[#727FA6] rounded-lg px-4 py-3 text-white" placeholder="Address" value={form.address} onChange={e => handleInputChange('address', e.target.value)} required />
              </div>
              <div>
                <label className="block text-[#AEA7D9] mb-1">Network</label>
                <input type="text" className="w-full bg-[#120540] border border-[#727FA6] rounded-lg px-4 py-3 text-white" placeholder="Network" value={form.network} onChange={e => handleInputChange('network', e.target.value)} required />
              </div>
              <div className="flex gap-2 mt-6 justify-end">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2.5 border text-white rounded-lg hover:opacity-80" style={{ borderColor: '#727FA6' }}>Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-white" style={{ backgroundColor: '#4A088C', opacity: loading ? 0.5 : 1 }}>
                  <Save className="w-4 h-4" />
                  {loading ? (editing ? 'Updating...' : 'Saving...') : (editing ? 'Update' : 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdImportToken;
