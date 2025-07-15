import React, { useEffect, useState } from 'react';
import { createProduct, getAllProducts, updateProduct, deleteProduct } from '../../api/admin-api';
import { Edit3, Save, AlertCircle, CheckCircle, Trash2, Image, Plus, X, Edit2 } from 'lucide-react';
import Swal from 'sweetalert2';

const AdOurProducts = () => {
  const [section, setSection] = useState({ text: '', description: '', cards: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [cardForm, setCardForm] = useState({ title: '', url: '', image: '', idx: null });
  const [newCard, setNewCard] = useState({ title: '', url: '', image: '' });
  const [editCardModal, setEditCardModal] = useState({ open: false, idx: null });

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllProducts();
      if (res.data && (Array.isArray(res.data) ? res.data.length > 0 : res.data.text)) {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setSection({
          _id: data._id,
          text: data.text || '',
          description: data.description || '',
          cards: Array.isArray(data.cards) ? data.cards : []
        });
      } else {
        setSection({ text: '', description: '', cards: [] });
      }
      setSuccess('');
    } catch {
      setError('Failed to fetch products section');
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
    setError('');
    setSuccess('');
    try {
      if (section._id) {
        await updateProduct(section._id, section);
        setSuccess('Section updated successfully!');
        await Swal.fire('Success!', 'Section updated successfully!', 'success');
      } else {
        await createProduct(section);
        setSuccess('Section created successfully!');
        await Swal.fire('Success!', 'Section created successfully!', 'success');
      }
      setModalOpen(false);
      fetchSection();
    } catch {
      setError('Failed to save section');
      await Swal.fire('Error!', 'Failed to save section.', 'error');
    } finally {
      setLoading(false);
    }
  };

const handleSectionDelete = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will permanently delete the section!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e53e3e',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    setLoading(true);
    setError('');
    try {
      await deleteProduct(section._id);
      setSection({ text: '', description: '', cards: [] });
      Swal.fire('Deleted!', 'Section has been deleted.', 'success');
    } catch {
      Swal.fire('Error!', 'Failed to delete section.', 'error');
    } finally {
      setLoading(false);
    }
  }
};


  // Card CRUD inside modal
  const handleCardInputChange = (field, value) => {
    setCardForm({ ...cardForm, [field]: value });
  };

  const handleCardImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardAdd = () => {
    if (!newCard.title || !newCard.url || !newCard.image) return;
    setSection(prev => ({ ...prev, cards: [...prev.cards, { ...newCard }] }));
    setNewCard({ title: '', url: '', image: '' });
  };

  const handleNewCardImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCard(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Edit specific card
  const openEditCardModal = (card, idx) => {
    setCardForm({ title: card.title, url: card.url, image: card.image, idx });
    setEditCardModal({ open: true, idx });
  };

  const handleCardEdit = (card, idx) => {
    openEditCardModal(card, idx);
  };

  const closeEditCardModal = () => {
    setEditCardModal({ open: false, idx: null });
    setCardForm({ title: '', url: '', image: '', idx: null });
  };

  const handleCardSave = async () => {
    if (cardForm.idx !== null && cardForm.idx !== undefined) {
      setSection(prev => {
        const updated = [...prev.cards];
        updated[cardForm.idx] = { title: cardForm.title, url: cardForm.url, image: cardForm.image };
        return { ...prev, cards: updated };
      });
      // Save to backend
      if (section._id) {
        const updated = [...section.cards];
        updated[cardForm.idx] = { title: cardForm.title, url: cardForm.url, image: cardForm.image };
        await updateProduct(section._id, { ...section, cards: updated });
      }
    }
    closeEditCardModal();
  };

const handleCardDelete = async (idx) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will remove the product card.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e53e3e',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    setSection(prev => {
      const updated = prev.cards.filter((_, i) => i !== idx);
      return { ...prev, cards: updated };
    });

    if (section._id) {
      const updated = section.cards.filter((_, i) => i !== idx);
      await updateProduct(section._id, { ...section, cards: updated });
    }

    Swal.fire('Deleted!', 'Card has been deleted.', 'success');
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
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Products Section Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage your product cards</p>
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
      {/* Section Title, Description and Edit/Delete */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl text-[#AEA7D9] font-semibold">{section.text}</h3>
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
          <div className="text-center text-[#AEA7D9] py-4 col-span-full">No products found.</div>
        ) : (
          section.cards.map((card, idx) => (
            <div key={idx} className="rounded-lg p-6 flex flex-col items-center gap-3" style={{ backgroundColor: '#433C73' }}>
              <div className="flex flex-col items-center gap-2 mb-2">
                <Image className="w-8 h-8 text-[#AEA7D9]" />
                <a href={card.url} target="_blank" rel="noopener noreferrer">
                  <img src={card.image} alt={card.title} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                </a>
                <span className="text-lg font-semibold text-white mt-2">{card.title}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openEditCardModal(card, idx)} className="px-3 py-1 rounded bg-[#4A088C] text-white flex items-center gap-1"><Edit2 size={16} /> Edit</button>
                <button onClick={() => handleCardDelete(idx)} className="px-3 py-1 rounded bg-[#e53e3e] text-white flex items-center gap-1"><Trash2 size={16} /> Delete</button>
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
              <h3 className="text-2xl font-semibold text-white">Edit Products Section</h3>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setCardForm({ title: '', url: '', image: '', idx: null });
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
                value={section.text}
                onChange={e => setSection({ ...section, text: e.target.value })}
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
            {/* Product Cards */}
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
                  {/* Image Preview */}
                  <div className="w-full h-36 bg-[#120540] rounded-md overflow-hidden flex items-center justify-center mb-4 border border-[#433C73]">
                    {(cardForm.idx === idx ? cardForm.image : card.image) ? (
                      <img
                        src={cardForm.idx === idx ? cardForm.image : card.image}
                        alt="Preview"
                        className="h-full object-contain"
                      />
                    ) : (
                      <span className="text-sm text-[#AEA7D9]">No Image</span>
                    )}
                  </div>
                  {/* Title Input */}
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2"
                    placeholder="Product Title"
                    value={cardForm.idx === idx ? cardForm.title : card.title}
                    onChange={e =>
                      cardForm.idx === idx
                        ? handleCardInputChange('title', e.target.value)
                        : handleCardEdit(card, idx)
                    }
                    onFocus={() => handleCardEdit(card, idx)}
                  />
                  {/* URL Input */}
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2"
                    placeholder="Product URL"
                    value={cardForm.idx === idx ? cardForm.url : card.url}
                    onChange={e =>
                      cardForm.idx === idx
                        ? handleCardInputChange('url', e.target.value)
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
                        ? handleCardImageUpload(e)
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
            {/* Add New Product Card */}
            <div className="mt-8 border-t border-[#433C73] pt-6">
              <h4 className="text-white text-lg font-semibold mb-4">Add New Product</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#1b0a2d] border border-[#727FA6] rounded-lg p-4 shadow-lg">
                  <div className="w-full h-36 bg-[#120540] rounded-md overflow-hidden flex items-center justify-center mb-4 border border-[#433C73]">
                    {newCard.image ? (
                      <img
                        src={newCard.image}
                        alt="Preview"
                        className="h-full object-contain"
                      />
                    ) : (
                      <span className="text-sm text-[#AEA7D9]">No Image</span>
                    )}
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2"
                    placeholder="Product Title"
                    value={newCard.title}
                    onChange={e =>
                      setNewCard(prev => ({ ...prev, title: e.target.value }))
                    }
                  />
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2"
                    placeholder="Product URL"
                    value={newCard.url}
                    onChange={e =>
                      setNewCard(prev => ({ ...prev, url: e.target.value }))
                    }
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewCardImage}
                    className="w-full text-sm mb-3"
                  />
                  <button
                    onClick={handleCardAdd}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded hover:opacity-90"
                  >
                    <Plus size={18} /> Add Product
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
                <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Save & Close'}
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setCardForm({ title: '', url: '', image: '', idx: null });
                }}
                className="border border-[#727FA6] text-white px-6 py-2.5 rounded-lg hover:bg-white/10"
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
      {/* Edit Card Modal */}
      {editCardModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#120540] border border-[#433C73] rounded-xl p-6 w-full max-w-md mx-4 overflow-y-auto max-h-[90vh] relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Edit Product Card</h3>
              <button onClick={closeEditCardModal} className="text-gray-400 hover:text-white">
                <X size={22} />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-[#AEA7D9] mb-2 font-medium">Product Title</label>
              <input
                type="text"
                value={cardForm.title}
                onChange={e => handleCardInputChange('title', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none"
                placeholder="Enter product title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#AEA7D9] mb-2 font-medium">Product URL</label>
              <input
                type="text"
                value={cardForm.url}
                onChange={e => handleCardInputChange('url', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none"
                placeholder="Enter product URL"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#AEA7D9] mb-2 font-medium">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCardImageUpload}
                className="w-full text-sm mb-2"
              />
              {cardForm.image && (
                <img src={cardForm.image} alt="Preview" className="mt-2 max-w-24 max-h-24 object-cover rounded" />
              )}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCardSave}
                className="bg-[#4A088C] hover:bg-[#5d0a9d] text-white px-6 py-2.5 rounded-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save
              </button>
              <button
                onClick={closeEditCardModal}
                className="border border-[#727FA6] text-white px-6 py-2.5 rounded-lg hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdOurProducts;
