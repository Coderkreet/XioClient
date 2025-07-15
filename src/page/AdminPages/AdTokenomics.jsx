import { useState, useEffect } from 'react'
import { createTokenomics, getTokenomics, updateTokenomics, deleteTokenomics } from '../../api/admin-api'
import { createMarketStats, getAllMarketStats, updateMarketStats, deleteMarketStats } from '../../api/admin-api'
import { createTokenTracker, getAllTokenTrackers, updateTokenTracker, deleteTokenTracker } from '../../api/admin-api'
import Swal from 'sweetalert2';

const TokenomicsSection = () => {
  const [tokenomics, setTokenomics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(null); // null or tokenomics object
  const [form, setForm] = useState({ title: '', percentage: '', tokenQuantity: '' });

  // Market Stats logic
  const [marketStats, setMarketStats] = useState(null);
  const [marketStatsId, setMarketStatsId] = useState(null);
  const [marketStatsLoading, setMarketStatsLoading] = useState(false);
  const [marketStatsError, setMarketStatsError] = useState('');
  const [marketStatsSuccess, setMarketStatsSuccess] = useState('');
  const [marketStatsEdit, setMarketStatsEdit] = useState(false);
  const [marketStatsForm, setMarketStatsForm] = useState({ price: '', change24h: '', marketCap: '', volume24h: '' });

  // Token Tracker logic
  const [tokenTracker, setTokenTracker] = useState(null);
  const [tokenTrackerLoading, setTokenTrackerLoading] = useState(false);
  const [tokenTrackerError, setTokenTrackerError] = useState('');
  const [tokenTrackerSuccess, setTokenTrackerSuccess] = useState('');
  const [tokenTrackerEdit, setTokenTrackerEdit] = useState(false);
  const [tokenTrackerForm, setTokenTrackerForm] = useState({
    totalHolders: '',
    holdersChange: '',
    totalTransactions: '',
    transactionsChange: '',
    circulatingSupply: '',
    totalSupply: '',
    BurnedToken: ''
  });

  useEffect(() => {
    fetchTokenomics();
    fetchMarketStats();
    fetchTokenTrackers();
  }, []);

  const fetchTokenomics = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getTokenomics();
      setTokenomics(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError('Failed to fetch tokenomics');
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketStats = async () => {
    setMarketStatsLoading(true);
    setMarketStatsError('');
    try {
      const res = await getAllMarketStats();
      let stats = null;
      if (res && res.data) {
        if (Array.isArray(res.data) && res.data.length > 0) {
          stats = res.data[0];
        } else if (typeof res.data === 'object' && res.data.price !== undefined) {
          stats = res.data;
        }
      }
      if (stats) {
        setMarketStats(stats);
        setMarketStatsId(stats._id || null);
        setMarketStatsForm({
          price: stats.price || '',
          change24h: stats.change24h || '',
          marketCap: stats.marketCap || '',
          volume24h: stats.volume24h || ''
        });
      } else {
        setMarketStats(null);
        setMarketStatsId(null);
        setMarketStatsForm({ price: '', change24h: '', marketCap: '', volume24h: '' });
      }
    } catch {
      setMarketStatsError('Failed to fetch market stats');
    } finally {
      setMarketStatsLoading(false);
    }
  };

  const fetchTokenTrackers = async () => {
    setTokenTrackerLoading(true);
    setTokenTrackerError('');
    try {
      const res = await getAllTokenTrackers();
      let tracker = null;
      if (res && res.data) {
        if (Array.isArray(res.data) && res.data.length > 0) {
          tracker = res.data[0];
        } else if (typeof res.data === 'object' && res.data._id) {
          tracker = res.data;
        }
      } else if (res && res._id) {
        tracker = res;
      }
      if (tracker) {
        setTokenTracker(tracker);
        setTokenTrackerForm({
          totalHolders: tracker.totalHolders || '',
          holdersChange: tracker.holdersChange || '',
          totalTransactions: tracker.totalTransactions || '',
          transactionsChange: tracker.transactionsChange || '',
          circulatingSupply: tracker.circulatingSupply || '',
          totalSupply: tracker.totalSupply || '',
          BurnedToken: tracker.BurnedToken || ''
        });
      } else {
        setTokenTracker(null);
        setTokenTrackerForm({
          totalHolders: '',
          holdersChange: '',
          totalTransactions: '',
          transactionsChange: '',
          circulatingSupply: '',
          totalSupply: '',
          BurnedToken: ''
        });
      }
    } catch {
      setTokenTrackerError('Failed to fetch token tracker');
    } finally {
      setTokenTrackerLoading(false);
    }
  };

  const handleAdd = () => {
    setEditing({}); // Set to empty object to open modal
    setForm({ title: '', percentage: '', tokenQuantity: '' });
    setSuccess('');
    setError('');
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || '',
      percentage: item.percentage || '',
      tokenQuantity: item.tokenQuantity || ''
    });
    setSuccess('');
    setError('');
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This entry will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await deleteTokenomics(id);
          setTokenomics(tokenomics.filter(t => t._id !== id));
          Swal.fire('Deleted!', 'Entry has been deleted.', 'success');
        } catch {
          Swal.fire('Error', 'Failed to delete entry.', 'error');
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
    if (!form.title || !form.percentage || !form.tokenQuantity) {
      Swal.fire('Validation Error', 'All fields are required.', 'warning');
      return;
    }
    setLoading(true);
    try {
      if (editing && editing._id) {
        await updateTokenomics(editing._id, {
          title: form.title,
          percentage: Number(form.percentage),
          tokenQuantity: Number(form.tokenQuantity)
        });
        await fetchTokenomics();
        setEditing(null);
        setForm({ title: '', percentage: '', tokenQuantity: '' });
        Swal.fire('Updated!', 'Entry updated successfully.', 'success');
      } else {
        await createTokenomics({
          title: form.title,
          percentage: Number(form.percentage),
          tokenQuantity: Number(form.tokenQuantity)
        });
        await fetchTokenomics();
        setEditing(null);
        setForm({ title: '', percentage: '', tokenQuantity: '' });
        Swal.fire('Created!', 'Entry created successfully.', 'success');
      }
    } catch {
      Swal.fire('Error', 'Failed to save entry.', 'error');
    } finally {
      setLoading(false);
    }
  };
  

  const handleMarketStatsInputChange = (field, value) => {
    setMarketStatsForm({ ...marketStatsForm, [field]: value });
  };
  const handleMarketStatsSave = async (e) => {
    e.preventDefault();
    setMarketStatsLoading(true);
    try {
      let res;
      if (marketStatsId) {
        res = await updateMarketStats(marketStatsId, marketStatsForm);
        Swal.fire('Updated!', 'Market stats updated successfully!', 'success');
      } else {
        res = await createMarketStats(marketStatsForm);
        Swal.fire('Created!', 'Market stats created successfully!', 'success');
      }
      if (res && res.data && res.data._id) setMarketStatsId(res.data._id);
      fetchMarketStats();
      setMarketStatsEdit(false);
    } catch {
      Swal.fire('Error', 'Failed to save market stats.', 'error');
    } finally {
      setMarketStatsLoading(false);
    }
  };
  

  const handleMarketStatsDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Market stats will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setMarketStatsLoading(true);
        try {
          await deleteMarketStats(marketStatsId);
          setMarketStats(null);
          setMarketStatsId(null);
          setMarketStatsForm({ price: '', change24h: '', marketCap: '', volume24h: '' });
          Swal.fire('Deleted!', 'Market stats deleted.', 'success');
        } catch {
          Swal.fire('Error', 'Failed to delete market stats.', 'error');
        } finally {
          setMarketStatsLoading(false);
        }
      }
    });
  };
  
  const handleTokenTrackerInputChange = (field, value) => {
    setTokenTrackerForm({ ...tokenTrackerForm, [field]: value });
  };
  const handleTokenTrackerSave = async (e) => {
    e.preventDefault();
    setTokenTrackerLoading(true);
    try {
      if (tokenTracker && tokenTracker._id) {
        await updateTokenTracker(tokenTracker._id, tokenTrackerForm);
        Swal.fire('Updated!', 'Token tracker updated.', 'success');
      } else {
        await createTokenTracker(tokenTrackerForm);
        Swal.fire('Created!', 'Token tracker created.', 'success');
      }
      fetchTokenTrackers();
      setTokenTrackerEdit(false);
    } catch {
      Swal.fire('Error', 'Failed to save token tracker.', 'error');
    } finally {
      setTokenTrackerLoading(false);
    }
  };
  

  const handleTokenTrackerEdit = () => {
    setTokenTrackerEdit(true);
    setTokenTrackerError('');
    setTokenTrackerSuccess('');
  };

  const handleTokenTrackerAdd = () => {
    setTokenTrackerEdit(true);
    setTokenTrackerForm({
      totalHolders: '',
      holdersChange: '',
      totalTransactions: '',
      transactionsChange: '',
      circulatingSupply: '',
      totalSupply: '',
      BurnedToken: ''
    });
    setTokenTrackerError('');
    setTokenTrackerSuccess('');
  };

  const handleTokenTrackerDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Token tracker will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setTokenTrackerLoading(true);
        try {
          await deleteTokenTracker(tokenTracker._id);
          setTokenTracker(null);
          Swal.fire('Deleted!', 'Token tracker deleted.', 'success');
        } catch {
          Swal.fire('Error', 'Failed to delete token tracker.', 'error');
        } finally {
          setTokenTrackerLoading(false);
        }
      }
    });
  };
  

  return (
    <div className="bg-gradient-to-br from-[#1e1e2f] via-[#23233a] to-[#1e1e2f] rounded-2xl shadow-2xl border border-purple-700/40 p-6 mb-8 backdrop-blur-md relative overflow-hidden">
      {/* Market Stats Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">Market Stats</h2>
          <div className="flex gap-2">
            {marketStats ? (
              <>
                <button onClick={() => setMarketStatsEdit(true)} className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600">Edit</button>
                <button onClick={handleMarketStatsDelete} className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600">Delete</button>
              </>
            ) : (
              <button onClick={() => setMarketStatsEdit(true)} className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded shadow">Add Market Stats</button>
            )}
          </div>
        </div>
        <div className="bg-black/60 border border-gray-700 rounded-xl p-6 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-gray-400">Price</div>
            <div className="text-lg font-bold text-white">{marketStats?.price ?? '--'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">24h Change</div>
            <div className="text-lg font-bold text-white">{marketStats?.change24h ?? '--'}%</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Market Cap</div>
            <div className="text-lg font-bold text-white">{marketStats?.marketCap ?? '--'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">24h Volume</div>
            <div className="text-lg font-bold text-white">{marketStats?.volume24h ?? '--'}</div>
          </div>
        </div>
        {marketStatsError && <div className="text-red-400 mt-2">{marketStatsError}</div>}
        {marketStatsSuccess && <div className="text-green-400 mt-2">{marketStatsSuccess}</div>}
        {marketStatsEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleMarketStatsSave} className="bg-gray-900 border border-purple-500 rounded-lg p-8 w-full max-w-md mx-4">
              <h3 className="text-lg font-bold text-white mb-4">{marketStatsId ? 'Edit' : 'Add'} Market Stats</h3>
              <div className="space-y-4">
                <input type="number" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Price" value={marketStatsForm.price} onChange={e => handleMarketStatsInputChange('price', e.target.value)} step="any" required />
                <input type="number" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="24h Change (%)" value={marketStatsForm.change24h} onChange={e => handleMarketStatsInputChange('change24h', e.target.value)} step="any" required />
                <input type="text" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Market Cap" value={marketStatsForm.marketCap} onChange={e => handleMarketStatsInputChange('marketCap', e.target.value)} required />
                <input type="text" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="24h Volume" value={marketStatsForm.volume24h} onChange={e => handleMarketStatsInputChange('volume24h', e.target.value)} required />
              </div>
              <div className="flex gap-2 mt-6 justify-end">
                <button type="submit" disabled={marketStatsLoading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center space-x-1 disabled:opacity-50">
                  <span>{marketStatsLoading ? (marketStatsId ? 'Updating...' : 'Saving...') : (marketStatsId ? 'Update' : 'Save')}</span>
                </button>
                <button type="button" onClick={() => setMarketStatsEdit(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow">Cancel</button>
              </div>
              {marketStatsError && <div className="text-red-400 mt-2">{marketStatsError}</div>}
              {marketStatsSuccess && <div className="text-green-400 mt-2">{marketStatsSuccess}</div>}
            </form>
          </div>
        )}
      </div>

      {/* Token Tracker Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">Token Tracker</h2>
          {!tokenTracker && (
            <button onClick={handleTokenTrackerAdd} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white p-2 rounded-full shadow-lg transition-all">+</button>
          )}
        </div>
        {tokenTrackerLoading ? (
          <div className="text-center text-white py-4">Loading...</div>
        ) : tokenTrackerError ? (
          <div className="text-center text-red-500 py-4">{tokenTrackerError}</div>
        ) : tokenTracker ? (
          <div className="bg-black/60 border border-gray-700 rounded-xl p-6 shadow-lg flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div><span className="text-purple-400 font-bold">Total Holders:</span> <span className="text-white">{tokenTracker.totalHolders}</span></div>
              <div><span className="text-purple-400 font-bold">Holders Change:</span> <span className="text-white">{tokenTracker.holdersChange}</span></div>
              <div><span className="text-purple-400 font-bold">Total Transactions:</span> <span className="text-white">{tokenTracker.totalTransactions}</span></div>
              <div><span className="text-purple-400 font-bold">Transactions Change:</span> <span className="text-white">{tokenTracker.transactionsChange}</span></div>
              <div><span className="text-purple-400 font-bold">Circulating Supply:</span> <span className="text-white">{tokenTracker.circulatingSupply}</span></div>
              <div><span className="text-purple-400 font-bold">Total Supply:</span> <span className="text-white">{tokenTracker.totalSupply}</span></div>
              <div><span className="text-purple-400 font-bold">Burned Token:</span> <span className="text-white">{tokenTracker.BurnedToken}</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleTokenTrackerEdit} className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600">Edit</button>
              <button onClick={handleTokenTrackerDelete} className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600">Delete</button>
            </div>
            {tokenTrackerSuccess && <div className="text-green-400 mt-2">{tokenTrackerSuccess}</div>}
          </div>
        ) : null}
        {tokenTrackerEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleTokenTrackerSave} className="bg-gray-900 border border-purple-500 rounded-lg p-8 w-full max-w-md mx-4">
              <h3 className="text-lg font-bold text-white mb-4">{tokenTracker && tokenTracker._id ? 'Edit' : 'Add'} Token Tracker</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-1">Total Holders</label>
                  <input type="number" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Total Holders" value={tokenTrackerForm.totalHolders} onChange={e => handleTokenTrackerInputChange('totalHolders', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-white mb-1">Holders Change</label>
                  <input type="text" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Holders Change" value={tokenTrackerForm.holdersChange} onChange={e => handleTokenTrackerInputChange('holdersChange', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-white mb-1">Total Transactions</label>
                  <input type="number" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Total Transactions" value={tokenTrackerForm.totalTransactions} onChange={e => handleTokenTrackerInputChange('totalTransactions', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-white mb-1">Transactions Change</label>
                  <input type="text" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Transactions Change" value={tokenTrackerForm.transactionsChange} onChange={e => handleTokenTrackerInputChange('transactionsChange', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-white mb-1">Circulating Supply</label>
                  <input type="number" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Circulating Supply" value={tokenTrackerForm.circulatingSupply} onChange={e => handleTokenTrackerInputChange('circulatingSupply', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-white mb-1">Total Supply</label>
                  <input type="number" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Total Supply" value={tokenTrackerForm.totalSupply} onChange={e => handleTokenTrackerInputChange('totalSupply', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-white mb-1">Burned Token</label>
                  <input type="number" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Burned Token" value={tokenTrackerForm.BurnedToken} onChange={e => handleTokenTrackerInputChange('BurnedToken', e.target.value)} required />
                </div>
              </div>
              <div className="flex gap-2 mt-6 justify-end">
                <button type="submit" disabled={tokenTrackerLoading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center space-x-1 disabled:opacity-50">
                  <span>{tokenTrackerLoading ? (tokenTracker && tokenTracker._id ? 'Updating...' : 'Saving...') : (tokenTracker && tokenTracker._id ? 'Update' : 'Save')}</span>
                </button>
                <button type="button" onClick={() => setTokenTrackerEdit(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow">Cancel</button>
              </div>
              {tokenTrackerError && <div className="text-red-400 mt-2">{tokenTrackerError}</div>}
              {tokenTrackerSuccess && <div className="text-green-400 mt-2">{tokenTrackerSuccess}</div>}
            </form>
          </div>
        )}
      </div>

      {/* Tokenomics Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">Tokenomics Management</h2>
          <button onClick={handleAdd} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white p-2 rounded-full shadow-lg transition-all">+</button>
        </div>
        {loading ? (
          <div className="text-center text-white py-4">Loading...</div>
        ) : error && !editing ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokenomics.map(item => (
              <div key={item._id} className="bg-black/60 border border-gray-700 rounded-xl p-4 shadow-lg hover:border-purple-500 transition-all flex flex-col gap-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-400 font-bold text-lg">{item.title}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-blue-300 p-1">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300 p-1">Delete</button>
                  </div>
                </div>
                <div className="text-white text-xl font-bold">{item.percentage}%</div>
                <div className="text-white text-lg">Token Quantity: <span className="font-bold">{item.tokenQuantity}</span></div>
              </div>
            ))}
          </div>
        )}
        {editing !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleSave} className="bg-gray-900 border border-purple-500 rounded-lg p-8 w-full max-w-md mx-4">
              <h3 className="text-lg font-bold text-white mb-4">{editing && editing._id ? 'Edit' : 'Add'} Tokenomics</h3>
              <div className="space-y-4">
                <input type="text" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Title" value={form.title} onChange={e => handleInputChange('title', e.target.value)} required />
                <input type="number" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Percentage" value={form.percentage} onChange={e => handleInputChange('percentage', e.target.value)} min="0" max="100" required />
                <input type="number" className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" placeholder="Token Quantity" value={form.tokenQuantity} onChange={e => handleInputChange('tokenQuantity', e.target.value)} min="0" required />
              </div>
              <div className="flex gap-2 mt-6 justify-end">
                <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center space-x-1 disabled:opacity-50">
                  <span>{loading ? (editing ? 'Updating...' : 'Saving...') : (editing ? 'Update' : 'Save')}</span>
                </button>
                <button type="button" onClick={() => { setEditing(null); setForm({ title: '', percentage: '', tokenQuantity: '' }); setError(''); }} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow">Cancel</button>
              </div>
              {error && <div className="text-red-400 mt-2">{error}</div>}
              {success && <div className="text-green-400 mt-2">{success}</div>}
            </form>
          </div>
        )}
      </div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};

export default TokenomicsSection;
