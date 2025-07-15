import React, { useState, useEffect } from 'react';
import { getAllNews, createNews, updateNews } from '../../api/admin-api';
import { Edit3, Save, AlertCircle, CheckCircle, Trash2, Image, X, Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const AdNews = () => {
  const [newsDoc, setNewsDoc] = useState(null); // { _id, images: [ { image, link } ] }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [newsForm, setNewsForm] = useState({ image: '', link: '' });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllNews();
      // API returns { news: [ { _id, images: [...] } ] }
      let doc = Array.isArray(res.news) && res.news.length > 0 ? res.news[0] : { images: [] };
      setNewsDoc(doc);
      setSuccess('');
    } catch {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const handleModalOpen = (idx = null) => {
    setEditIdx(idx);
    setError('');
    setSuccess('');
    if (idx !== null && newsDoc && newsDoc.images[idx]) {
      setNewsForm({ image: newsDoc.images[idx].image, link: newsDoc.images[idx].link });
    } else {
      setNewsForm({ image: '', link: '' });
    }
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditIdx(null);
    setNewsForm({ image: '', link: '' });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewsForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormChange = (field, value) => {
    setNewsForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!newsForm.image || !newsForm.link) {
      Swal.fire('Missing Fields', 'Both image and link are required.', 'warning');
      return;
    }
  
    setLoading(true);
    try {
      let updatedImages = newsDoc && Array.isArray(newsDoc.images) ? [...newsDoc.images] : [];
  
      if (editIdx !== null) {
        updatedImages[editIdx] = { ...newsForm }; // Edit existing
      } else {
        updatedImages.push({ ...newsForm }); // Add new
      }
  
      if (newsDoc && newsDoc._id) {
        await updateNews(newsDoc._id, { images: updatedImages });
        Swal.fire('Success', editIdx !== null ? 'News updated successfully!' : 'News added successfully!', 'success');
      } else {
        await createNews({ images: updatedImages });
        Swal.fire('Created', 'News created successfully!', 'success');
      }
  
      handleModalClose();
      fetchNews();
    } catch {
      Swal.fire('Error', 'Failed to save news.', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (idx) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This news item will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (!result.isConfirmed) return;
  
    setLoading(true);
    try {
      let updatedImages = newsDoc && Array.isArray(newsDoc.images) ? [...newsDoc.images] : [];
      updatedImages.splice(idx, 1);
  
      if (newsDoc && newsDoc._id) {
        await updateNews(newsDoc._id, { images: updatedImages });
        Swal.fire('Deleted!', 'News item deleted successfully!', 'success');
      } else {
        await createNews({ images: updatedImages });
        Swal.fire('Deleted!', 'News item removed from new document.', 'success');
      }
  
      fetchNews();
    } catch {
      Swal.fire('Error', 'Failed to delete news item.', 'error');
    } finally {
      setLoading(false);
    }
  };
  

  const images = newsDoc && Array.isArray(newsDoc.images) ? newsDoc.images : [];

  return (
    <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: '#120540', borderColor: '#433C73', borderWidth: '1px' }}>
      {/* Header */}
      <div className="border-b pb-6 mb-8" style={{ borderColor: '#433C73' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A088C' }}>
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>News Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage news images and links</p>
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
      {/* Add News Button */}
      <div className="flex justify-end mb-6">
        <button onClick={() => handleModalOpen()} className="px-4 py-2 rounded-lg text-white flex items-center gap-2" style={{ backgroundColor: '#4A088C' }}><Plus size={18} /> Add News</button>
      </div>
      {/* News List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-center text-white py-4 col-span-full">Loading...</div>
        ) : images.length === 0 ? (
          <div className="text-center text-[#AEA7D9] py-4 col-span-full">No news found.</div>
        ) : (
          images.map((item, idx) => (
            <div key={idx} className="rounded-lg p-6 flex flex-col items-center gap-3 relative" style={{ backgroundColor: '#433C73' }}>
              <button onClick={() => handleDelete(idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
              <div className="flex flex-col items-center gap-2 mb-2">
                <Image className="w-8 h-8 text-[#AEA7D9]" />
                <img src={item.image} alt="News" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#27B9DE] underline text-sm mt-1">Visit</a>
                )}
              </div>
              <button onClick={() => handleModalOpen(idx)} className="bg-[#4A088C] hover:bg-[#5d0a9d] text-white px-4 py-2 rounded w-full mt-2">Edit</button>
            </div>
          ))
        )}
      </div>
      {/* Modal for Add/Edit News */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#120540] border border-[#433C73] rounded-xl p-6 w-full max-w-md mx-4 overflow-y-auto max-h-[90vh] relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">{editIdx !== null ? 'Edit News' : 'Add News'}</h3>
              <button onClick={handleModalClose} className="text-gray-400 hover:text-white"><X size={22} /></button>
            </div>
            {/* Image Preview */}
            <div className="w-full h-36 bg-[#1b0a2d] rounded-md overflow-hidden flex items-center justify-center mb-4 border border-[#433C73]">
              {newsForm.image ? (
                <img src={newsForm.image} alt="Preview" className="h-full object-contain" />
              ) : (
                <span className="text-sm text-[#AEA7D9]">No Image</span>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm mb-3" />
            <input type="url" className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2" placeholder="News Link (https://...)" value={newsForm.link} onChange={e => handleFormChange('link', e.target.value)} />
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
                  <><Save className="w-4 h-4" /> Save & Close</>
                )}
              </button>
              <button
                onClick={handleModalClose}
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

export default AdNews;
