import React, { useState, useEffect } from 'react';
import { createEcosystem, getAllEcosystems, updateEcosystem, deleteEcosystem } from '../../api/admin-api';
import { Edit3, Save, AlertCircle, CheckCircle, Trash2, Image, X } from 'lucide-react';
import Swal from 'sweetalert2';

const AdEcosystem = () => {
  const [section, setSection] = useState({ title: '', description: '', cards: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [cardForm, setCardForm] = useState({ logo: '', text: '', serialNumber: '', idx: null });
  const [newCard, setNewCard] = useState({ logo: '', text: '', serialNumber: '' });

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllEcosystems();
      if (res.data && (Array.isArray(res.data) ? res.data.length > 0 : res.data.title)) {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setSection({
          _id: data._id,
          title: data.title || '',
          description: data.description || '',
          cards: Array.isArray(data.cards) ? data.cards : []
        });
      } else {
        setSection({ title: '', description: '', cards: [] });
      }
      setSuccess('');
    } catch {
      setError('Failed to fetch ecosystem section');
    } finally {
      setLoading(false);
    }
  };

  const handleSectionEdit = () => {
    setModalOpen(true);
    setError('');
    setSuccess('');
  };
  const handleSectionSave = async () => {
    setLoading(true);
    try {
      if (section._id) {
        await updateEcosystem(section._id, section);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Section updated successfully.',
          confirmButtonColor: '#4A088C',
        });
      } else {
        await createEcosystem(section);
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Section created successfully.',
          confirmButtonColor: '#4A088C',
        });
      }
      setModalOpen(false);
      fetchSection();
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save section.',
        confirmButtonColor: '#4A088C',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSectionDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the section and all its cards.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#433C73',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (!result.isConfirmed) return;
  
    setLoading(true);
    try {
      await deleteEcosystem(section._id);
      setSection({ title: '', description: '', cards: [] });
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Section deleted successfully.',
        confirmButtonColor: '#4A088C',
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete section.',
        confirmButtonColor: '#4A088C',
      });
    } finally {
      setLoading(false);
    }
  };
  

  // Card CRUD inside modal
  const handleCardInputChange = (field, value) => {
    setCardForm({ ...cardForm, [field]: value });
  };

  const handleCardLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardForm(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardAdd = () => {
    if (!newCard.text || !newCard.logo) return;
    setSection(prev => {
      const nextSerial = prev.cards.length + 1;
      return { ...prev, cards: [...prev.cards, { ...newCard, serialNumber: nextSerial }] };
    });
    setNewCard({ logo: '', text: '', serialNumber: '' });
  };

  const handleNewCardLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCard(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardEdit = (card, idx) => {
    setCardForm({ logo: card.logo, text: card.text, serialNumber: card.serialNumber, idx });
  };

  const handleCardSave = () => {
    if (cardForm.idx !== null && cardForm.idx !== undefined) {
      setSection(prev => {
        const updated = [...prev.cards];
        // Keep serialNumber in series (idx+1)
        updated[cardForm.idx] = { logo: cardForm.logo, text: cardForm.text, serialNumber: cardForm.idx + 1 };
        return { ...prev, cards: updated };
      });
    }
    setCardForm({ logo: '', text: '', serialNumber: '', idx: null });
  };

  const handleCardDelete = (idx) => {
    setSection(prev => {
      const updated = prev.cards.filter((_, i) => i !== idx);
      return { ...prev, cards: updated };
    });
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
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Ecosystem Section Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage the ecosystem overview and its cards</p>
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
      {/* Section Title/Description and Edit/Delete */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl text-[#AEA7D9] font-semibold">{section.title}</h3>
          <p className="text-[#727FA6] mt-1">{section.description}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSectionEdit} className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#4A088C' }}>Edit Section</button>
          {section._id && (
            <button onClick={handleSectionDelete} className="px-4 py-2 rounded-lg text-white flex items-center gap-1" style={{ backgroundColor: '#e53e3e' }}>
              <Trash2 className="w-4 h-4 text-white" /> Delete Section
            </button>
          )}
        </div>
      </div>
      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-center text-white py-4 col-span-full">Loading...</div>
        ) : section.cards.length === 0 ? (
          <div className="text-center text-[#AEA7D9] py-4 col-span-full">No cards found.</div>
        ) : (
          section.cards.map((card, idx) => (
            <div key={idx} className="rounded-lg p-6 flex flex-col items-center gap-3" style={{ backgroundColor: '#433C73' }}>
              <div className="flex flex-col items-center gap-2 mb-2">
                <Image className="w-8 h-8 text-[#AEA7D9]" />
                <img src={card.logo} alt={card.text} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                <span className="text-lg font-semibold text-white mt-2">{card.text}</span>
                <span className="text-sm text-[#AEA7D9]">Serial: {card.serialNumber}</span>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal for Section & Card CRUD */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#120540] border border-[#433C73] rounded-xl p-6 w-full max-w-3xl mx-4 overflow-y-auto max-h-[90vh] relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">Edit Ecosystem Section</h3>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setCardForm({ logo: '', text: '', serialNumber: '', idx: null });
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>
            {/* Section Title */}
            <div className="mb-4">
              <label className="block text-[#AEA7D9] mb-2 font-medium">Section Title</label>
              <input
                type="text"
                value={section.title}
                onChange={e => setSection({ ...section, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none focus:ring-2 focus:ring-[#4A088C]"
                placeholder="Enter section title"
              />
            </div>
            {/* Section Description */}
            <div className="mb-6">
              <label className="block text-[#AEA7D9] mb-2 font-medium">Section Description</label>
              <textarea
                value={section.description}
                onChange={e => setSection({ ...section, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none focus:ring-2 focus:ring-[#4A088C]"
                placeholder="Enter section description"
                rows={3}
              />
            </div>
            {/* Card Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
              {section.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="relative bg-[#1b0a2d] border border-[#727FA6] rounded-lg p-4 shadow-lg"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleCardDelete(idx)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                  >
                    <X size={18} />
                  </button>
                  {/* Logo Preview */}
                  <div className="w-full h-36 bg-[#120540] rounded-md overflow-hidden flex items-center justify-center mb-4 border border-[#433C73]">
                    {(cardForm.idx === idx ? cardForm.logo : card.logo) ? (
                      <img
                        src={cardForm.idx === idx ? cardForm.logo : card.logo}
                        alt="Preview"
                        className="h-full object-contain"
                      />
                    ) : (
                      <span className="text-sm text-[#AEA7D9]">No Logo</span>
                    )}
                  </div>
                  {/* Text Input */}
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2"
                    placeholder="Card Text"
                    value={cardForm.idx === idx ? cardForm.text : card.text}
                    onChange={e =>
                      cardForm.idx === idx
                        ? handleCardInputChange('text', e.target.value)
                        : handleCardEdit(card, idx)
                    }
                    onFocus={() => handleCardEdit(card, idx)}
                  />
                  {/* Serial Number Input */}
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2"
                    placeholder="Serial Number"
                    value={cardForm.idx === idx ? cardForm.serialNumber : card.serialNumber}
                    onChange={e =>
                      cardForm.idx === idx
                        ? handleCardInputChange('serialNumber', e.target.value)
                        : handleCardEdit(card, idx)
                    }
                    onFocus={() => handleCardEdit(card, idx)}
                  />
                  {/* File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e =>
                      cardForm.idx === idx
                        ? handleCardLogoUpload(e)
                        : handleCardEdit(card, idx)
                    }
                    className="w-full text-sm mb-2"
                  />
                  {/* Save Button */}
                  {cardForm.idx === idx && (
                    <button
                      onClick={handleCardSave}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              ))}
            </div>
            {/* Add New Card */}
            <div className="mt-8 border-t border-[#433C73] pt-6">
              <h4 className="text-white text-lg font-semibold mb-4">Add New Card</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#1b0a2d] border border-[#727FA6] rounded-lg p-4 shadow-lg">
                  <div className="w-full h-36 bg-[#120540] rounded-md overflow-hidden flex items-center justify-center mb-4 border border-[#433C73]">
                    {newCard.logo ? (
                      <img
                        src={newCard.logo}
                        alt="Preview"
                        className="h-full object-contain"
                      />
                    ) : (
                      <span className="text-sm text-[#AEA7D9]">No Logo</span>
                    )}
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2"
                    placeholder="Card Text"
                    value={newCard.text}
                    onChange={e =>
                      setNewCard(prev => ({ ...prev, text: e.target.value }))
                    }
                  />
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2"
                    placeholder="Serial Number"
                    value={newCard.serialNumber}
                    onChange={e =>
                      setNewCard(prev => ({ ...prev, serialNumber: e.target.value }))
                    }
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewCardLogo}
                    className="w-full text-sm mb-3"
                  />
                  <button
                    onClick={handleCardAdd}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded hover:opacity-90"
                  >
                    + Add Card
                  </button>
                </div>
              </div>
            </div>
            {/* Footer Actions */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleSectionSave}
                className="bg-[#4A088C] hover:bg-[#5d0a9d] text-white px-6 py-2.5 rounded-lg flex items-center gap-2"
                disabled={loading}
              >
                <Save className="w-4 h-4" />{loading ? 'Saving...' : 'Save & Close'}
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setCardForm({ logo: '', text: '', serialNumber: '', idx: null });
                }}
                className="border border-[#727FA6] text-white px-6 py-2.5 rounded-lg hover:bg-white/10"
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

export default AdEcosystem;
