import React, { useState, useEffect, useRef } from 'react';
import { Upload, Save, Edit3, FileText, AlertCircle, CheckCircle, Image, X } from 'lucide-react';
import {
  deleteHeaderSlider,
  updateHeaderSlider,
  getAllHeaderSliders,
  createHeaderSlider
} from '../../api/admin-api';
import Swal from 'sweetalert2';

const AdHearoSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(null); // null or slider object
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllHeaderSliders();
      setSliders(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError('Failed to fetch sliders');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (files) => {
    const fileArr = Array.from(files);
    if (fileArr.length === 0) return;
    const promises = fileArr.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(base64Arr => {
      setImages(prev => [...prev, ...base64Arr]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    });
  };

  const handleDeleteImage = (idxToDelete) => {
    setImages(prev => prev.filter((_, idx) => idx !== idxToDelete));
  };

  const handleAdd = () => {
    setEditing({});
    setImages([]);
    setSuccess('');
    setError('');
  };

  const handleEdit = (slider) => {
    setEditing(slider);
    setImages(slider.images ? Object.values(slider.images) : []);
    setSuccess('');
    setError('');
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This slider will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (!result.isConfirmed) return;
  
    setLoading(true);
    try {
      await deleteHeaderSlider(id);
      setSliders(sliders.filter(s => s._id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Slider deleted successfully.',
        confirmButtonColor: '#4A088C',
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete slider.',
        confirmButtonColor: '#4A088C',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    if (!images.length) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please select at least one image.',
        confirmButtonColor: '#4A088C',
      });
      return;
    }
  
    setLoading(true);
    try {
      if (editing && editing._id) {
        await updateHeaderSlider(editing._id, { images });
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Slider updated successfully.',
          confirmButtonColor: '#4A088C',
        });
      } else {
        await createHeaderSlider({ images });
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Slider created successfully.',
          confirmButtonColor: '#4A088C',
        });
      }
      fetchSliders();
      setEditing(null);
      setImages([]);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save slider.',
        confirmButtonColor: '#4A088C',
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: '#120540', borderColor: '#433C73', borderWidth: '1px' }}>
      <div className="border-b pb-6 mb-8" style={{ borderColor: '#433C73' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A088C' }}>
            <Image className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#AEA7D9]">Hero Slider Management</h2>
            <p className="mt-1 text-[#727FA6]">Manage your hero slider images</p>
          </div>
          {sliders.length === 0 && (
            <button
              onClick={handleAdd}
              className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white p-3 rounded-full shadow-lg transition-all"
            >
              +
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center text-white py-4">Loading...</div>
      ) : error && !editing ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          {sliders.map(slider => (
            <div key={slider._id} className="bg-[#433C73]/60 border border-[#727FA6] rounded-xl p-4 mb-4 shadow-lg hover:border-purple-500 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-purple-400 font-bold">Slider</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(slider)}
                    className="text-blue-400 hover:text-blue-300 p-1"
                  >Edit</button>
                  <button
                    onClick={() => handleDelete(slider._id)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >Delete</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {slider.images && Object.values(slider.images).map((img, idx) => (
                  <img key={idx} src={img} alt={`Slider ${idx + 1}`} className="w-24 h-24 object-cover rounded border border-purple-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <form onSubmit={handleSave} className="bg-[#433C73] border border-[#727FA6] rounded-lg p-6 w-full max-w-md mx-4">
            <div className="mb-4">
              <label className="text-[#AEA7D9] block mb-1">Upload Images (multiple)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={e => handleImageUpload(e.target.files)}
                className="w-full bg-transparent text-white"
              />
              <div className="flex flex-wrap gap-3 mt-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group w-20 h-20">
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover rounded border border-purple-500" />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center space-x-1 disabled:opacity-50">
                <span>{loading ? (editing && editing._id ? 'Updating...' : 'Saving...') : (editing && editing._id ? 'Update' : 'Save')}</span>
              </button>
              <button type="button" onClick={() => { setEditing(null); setImages([]); setError(''); }} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">Cancel</button>
            </div>
            {error && <div className="text-red-400 mt-2">{error}</div>}
            {success && <div className="text-green-400 mt-2">{success}</div>}
          </form>
        </div>
      )}

      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};

export default AdHearoSlider;
