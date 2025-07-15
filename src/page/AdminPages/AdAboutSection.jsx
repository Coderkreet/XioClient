import React, { useEffect, useState } from 'react';
import { Save, Edit3, Image, Type, AlertCircle, CheckCircle, Trash2, X, Plus } from 'lucide-react';
import { getAllOverviews, createOverview, updateOverview } from '../../api/admin-api';
import Swal from 'sweetalert2';

const AdAboutSection = () => {
  const [overview, setOverview] = useState(null); // single overview object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    text: '',
    topDescription: '',
    card: []
  });

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllOverviews();
      const overviewData = Array.isArray(res?.data) ? res.data[0] : res;
      if (overviewData && (overviewData._id || overviewData.text)) {
        setOverview(overviewData);
        setForm({
          text: overviewData.text || '',
          topDescription: overviewData.topDescription || '',
          card: Array.isArray(overviewData.card) ? overviewData.card : []
        });
      } else {
        setOverview(null);
        setForm({ text: '', topDescription: '', card: [] });
      }
    } catch {
      setError('Failed to fetch overview');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setForm({
      text: overview?.text || '',
      topDescription: overview?.topDescription || '',
      card: Array.isArray(overview?.card) ? overview.card.map(c => ({ ...c })) : []
    });
    setSuccess('');
    setError('');
    setModalOpen(true);
  };

  const handleAddCard = () => {
    setForm(f => ({ ...f, card: [...f.card, { title: '', description: '', image: '' }] }));
  };

  const handleRemoveCard = (idx) => {
    setForm(f => ({ ...f, card: f.card.filter((_, i) => i !== idx) }));
  };

  const handleCardChange = (idx, field, value) => {
    setForm(f => ({
      ...f,
      card: f.card.map((c, i) => i === idx ? { ...c, [field]: value } : c)
    }));
  };

  const handleCardImageUpload = (idx, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm(f => ({
        ...f,
        card: f.card.map((c, i) => i === idx ? { ...c, image: e.target.result } : c)
      }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (overview && overview._id) {
        res = await updateOverview(overview._id, form);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Overview updated successfully.',
          confirmButtonColor: '#4A088C',
        });
      } else {
        res = await createOverview(form);
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Overview created successfully.',
          confirmButtonColor: '#4A088C',
        });
      }
      setOverview(res.data);
      setModalOpen(false);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save overview.',
        confirmButtonColor: '#4A088C',
      });
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
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Overview Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage your About/Overview section content</p>
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

      {/* Overview Display */}
      {loading ? (
        <div className="text-center text-white py-4">Loading overview...</div>
      ) : !overview ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-[#AEA7D9] py-4">No overview found.</div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-2.5 rounded-lg text-white font-medium"
            style={{ backgroundColor: '#4A088C' }}
          >
            + Add Overview
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="bg-[#433C73] rounded-lg p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              <Type className="w-5 h-5 text-[#AEA7D9]" />
              <span className="text-lg font-semibold text-white">{overview.text}</span>
            </div>
            <div className="text-[#AEA7D9] mb-2">{overview.topDescription}</div>
            <div className="flex flex-wrap gap-4">
              {Array.isArray(overview.card) && overview.card.map((card, idx) => (
                <div key={idx} className="rounded-lg p-4 flex flex-col gap-2" style={{ backgroundColor: '#120540', minWidth: 220, maxWidth: 300 }}>
                  <div className="font-semibold text-white text-base">{card.title}</div>
                  <div className="text-[#AEA7D9] text-sm">{card.description}</div>
                  {card.image && (
                    <img src={card.image} alt="Card" className="w-full h-24 object-cover rounded-lg border border-gray-200" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleEdit}
                className="px-6 py-2.5 rounded-lg text-white font-medium"
                style={{ backgroundColor: '#4A088C' }}
              >
                Edit Overview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Add/Edit */}
   {modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
    <div className="bg-[#120540] border border-[#433C73] rounded-lg p-6 w-full max-w-2xl mx-4 relative max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#727FA6] scrollbar-track-transparent">
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#120540] z-10 pb-2 border-b border-[#433C73]">
        <h3 className="text-lg font-bold text-white">{overview ? 'Edit' : 'Add'} Overview</h3>
        <button
          onClick={() => setModalOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>
      <form onSubmit={handleSave} className="space-y-4">
        {/* Main Title */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Main Title</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg transition-colors text-white bg-[#120540] border"
            style={{ borderColor: '#727FA6' }}
            placeholder="Enter main title"
            value={form.text}
            onChange={e => handleInputChange('text', e.target.value)}
            required
          />
        </div>

        {/* Top Description */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Top Description</label>
          <textarea
            rows={3}
            className="w-full px-4 py-3 rounded-lg transition-colors resize-none text-white bg-[#120540] border"
            style={{ borderColor: '#727FA6' }}
            placeholder="Enter top description"
            value={form.topDescription}
            onChange={e => handleInputChange('topDescription', e.target.value)}
            required
          />
        </div>

        {/* Cards Section */}
        <div>
          <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Cards</label>
          <div className="flex flex-col gap-4">
            {form.card.map((card, idx) => (
              <div key={idx} className="rounded-lg p-4" style={{ backgroundColor: '#433C73' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">Card {idx + 1}</span>
                  <button type="button" onClick={() => handleRemoveCard(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>

                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg mb-2 text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Title"
                  value={card.title}
                  onChange={e => handleCardChange(idx, 'title', e.target.value)}
                  required
                />

                <textarea
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg mb-2 text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Description"
                  value={card.description}
                  onChange={e => handleCardChange(idx, 'description', e.target.value)}
                  required
                />

                <div className="border-2 border-dashed rounded-lg p-3 cursor-pointer transition-colors mb-2" style={{ borderColor: '#727FA6' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleCardImageUpload(idx, e.target.files[0])}
                    className="hidden"
                    id={`cardImage${idx}`}
                  />
                  <label htmlFor={`cardImage${idx}`} className="flex flex-col items-center justify-center">
                    {card.image ? (
                      <img src={card.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg mb-2 border border-gray-200" />
                    ) : (
                      <div className="text-center">
                        <Image className="w-8 h-8 text-[#AEA7D9] mb-2" />
                        <p className="text-sm text-[#AEA7D9]">Click to upload</p>
                        <p className="text-xs text-[#727FA6] mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddCard} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-[#4A088C] hover:opacity-80 mt-2">
              <Plus size={18} /> Add Card
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6 justify-end sticky bottom-0 bg-[#120540] py-4">
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="px-6 py-2.5 border text-white rounded-lg hover:opacity-80"
            style={{ borderColor: '#727FA6' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-white"
            style={{ backgroundColor: '#4A088C' }}
            disabled={loading}
          >
            <Save className="w-4 h-4" />
            {loading ? (overview ? 'Updating...' : 'Saving...') : (overview ? 'Update' : 'Save')}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default AdAboutSection;
