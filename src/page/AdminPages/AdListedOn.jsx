import React, { useState, useEffect } from 'react';
import { createListedPlatform, getAllListedPlatforms, updateListedPlatform, deleteListedPlatform } from '../../api/admin-api';
import { Edit3, Save, AlertCircle, CheckCircle, Trash2, Image, X } from 'lucide-react';
import Swal from 'sweetalert2';

const AdListedOn = () => {
  const [section, setSection] = useState({ platformName: '', platforms: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [platformForm, setPlatformForm] = useState({ image: '', title: '', link: '', idx: null });
  const [newPlatform, setNewPlatform] = useState({ image: '', title: '', link: '' });

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllListedPlatforms();
      if (res.data && (Array.isArray(res.data) ? res.data.length > 0 : res.data.platformName)) {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setSection({
          _id: data._id,
          platformName: data.platformName || '',
          platforms: Array.isArray(data.platforms) ? data.platforms : []
        });
      } else {
        setSection({ platformName: '', platforms: [] });
      }
      setSuccess('');
    } catch {
      setError('Failed to fetch listed platforms');
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
        await updateListedPlatform(section._id, section);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Section updated successfully.',
          confirmButtonColor: '#4A088C',
        });
      } else {
        await createListedPlatform(section);
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
      text: 'This will delete the section and all its platforms.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#433C73',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (!result.isConfirmed) return;
  
    setLoading(true);
    try {
      await deleteListedPlatform(section._id);
      setSection({ platformName: '', platforms: [] });
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
  

  // Platform CRUD inside modal
  const handlePlatformInputChange = (field, value) => {
    setPlatformForm({ ...platformForm, [field]: value });
  };

  const handlePlatformImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlatformForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlatformAdd = () => {
    if (!newPlatform.title || !newPlatform.image) return;
    setSection(prev => ({ ...prev, platforms: [...prev.platforms, { ...newPlatform }] }));
    setNewPlatform({ image: '', title: '', link: '' });
  };

  const handleNewPlatformImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPlatform(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlatformEdit = (platform, idx) => {
    setPlatformForm({ image: platform.image, title: platform.title, link: platform.link || '', idx });
  };

  const handlePlatformSave = () => {
    if (platformForm.idx !== null && platformForm.idx !== undefined) {
      setSection(prev => {
        const updated = [...prev.platforms];
        updated[platformForm.idx] = { image: platformForm.image, title: platformForm.title, link: platformForm.link };
        return { ...prev, platforms: updated };
      });
    }
    setPlatformForm({ image: '', title: '', link: '', idx: null });
  };

  const handlePlatformDelete = (idx) => {
    setSection(prev => {
      const updated = prev.platforms.filter((_, i) => i !== idx);
      return { ...prev, platforms: updated };
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
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Listed Platforms Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage platforms where your token is listed</p>
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
      {/* Section Title and Edit/Delete */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-[#AEA7D9] font-semibold">{section.platformName}</h3>
        <div className="flex gap-2">
          <button onClick={handleSectionEdit} className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#4A088C' }}>Edit Section</button>
          {section._id && (
            <button onClick={handleSectionDelete} className="px-4 py-2 rounded-lg text-white flex items-center gap-1" style={{ backgroundColor: '#e53e3e' }}>
              <Trash2 className="w-4 h-4 text-white" /> Delete Section
            </button>
          )}
        </div>
      </div>
      {/* Platforms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-center text-white py-4 col-span-full">Loading...</div>
        ) : section.platforms.length === 0 ? (
          <div className="text-center text-[#AEA7D9] py-4 col-span-full">No platforms found.</div>
        ) : (
          section.platforms.map((platform, idx) => (
            <div key={idx} className="rounded-lg p-6 flex flex-col items-center gap-3" style={{ backgroundColor: '#433C73' }}>
              <div className="flex flex-col items-center gap-2 mb-2">
                <Image className="w-8 h-8 text-[#AEA7D9]" />
                <img src={platform.image} alt={platform.title} className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                <span className="text-lg font-semibold text-white mt-2">{platform.title}</span>
                {platform.link && (
                  <a href={platform.link} target="_blank" rel="noopener noreferrer" className="text-[#27B9DE] underline text-sm mt-1">Visit</a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal for Section & Platform CRUD */}
    {modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-[#120540] border border-[#433C73] rounded-xl p-6 w-full max-w-3xl mx-4 overflow-y-auto max-h-[90vh] relative">

      {/* Modal Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-white">Edit Platforms Section</h3>
        <button
          onClick={() => {
            setModalOpen(false);
            setPlatformForm({ image: '', title: '', link: '', idx: null });
          }}
          className="text-gray-400 hover:text-white"
        >
          <X size={22} />
        </button>
      </div>

      {/* Section Title */}
      <div className="mb-6">
        <label className="block text-[#AEA7D9] mb-2 font-medium">Section Title</label>
        <input
          type="text"
          value={section.platformName}
          onChange={e => setSection({ ...section, platformName: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none focus:ring-2 focus:ring-[#4A088C]"
          placeholder="Enter section title"
        />
      </div>

   {/* Platform Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
  {section.platforms.map((platform, idx) => (
    <div
      key={idx}
      className="relative bg-[#1b0a2d] border border-[#727FA6] rounded-lg p-4 shadow-lg"
    >
      {/* Delete Button */}
      <button
        onClick={() => handlePlatformDelete(idx)}
        className="absolute top-2 right-2 text-red-400 hover:text-red-300"
      >
        <X size={18} />
      </button>

      {/* Image Preview */}
      <div className="w-full h-36 bg-[#120540] rounded-md overflow-hidden flex items-center justify-center mb-4 border border-[#433C73]">
        {(platformForm.idx === idx ? platformForm.image : platform.image) ? (
          <img
            src={platformForm.idx === idx ? platformForm.image : platform.image}
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
        placeholder="Platform Title"
        value={platformForm.idx === idx ? platformForm.title : platform.title}
        onChange={e =>
          platformForm.idx === idx
            ? handlePlatformInputChange("title", e.target.value)
            : handlePlatformEdit(platform, idx)
        }
        onFocus={() => handlePlatformEdit(platform, idx)}
      />
      {/* Link Input */}
      <input
        type="url"
        className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2"
        placeholder="Platform Link (https://...)"
        value={platformForm.idx === idx ? platformForm.link : platform.link || ''}
        onChange={e =>
          platformForm.idx === idx
            ? handlePlatformInputChange("link", e.target.value)
            : handlePlatformEdit(platform, idx)
        }
        onFocus={() => handlePlatformEdit(platform, idx)}
      />
      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={e =>
          platformForm.idx === idx
            ? handlePlatformImageUpload(e)
            : handlePlatformEdit(platform, idx)
        }
        className="w-full text-sm mb-2"
      />

      {/* Save Button */}
      {platformForm.idx === idx && (
        <button
          onClick={handlePlatformSave}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          Save Changes
        </button>
      )}
    </div>
  ))}
</div>

{/* Add New Platform Card */}
<div className="mt-8 border-t border-[#433C73] pt-6">
  <h4 className="text-white text-lg font-semibold mb-4">Add New Platform</h4>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="bg-[#1b0a2d] border border-[#727FA6] rounded-lg p-4 shadow-lg">
      <div className="w-full h-36 bg-[#120540] rounded-md overflow-hidden flex items-center justify-center mb-4 border border-[#433C73]">
        {newPlatform.image ? (
          <img
            src={newPlatform.image}
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
        placeholder="Platform Title"
        value={newPlatform.title}
        onChange={e =>
          setNewPlatform(prev => ({ ...prev, title: e.target.value }))
        }
      />
      {/* Link Input */}
      <input
        type="url"
        className="w-full px-3 py-2 rounded bg-[#120540] text-white border border-[#727FA6] focus:outline-none mb-2"
        placeholder="Platform Link (https://...)"
        value={newPlatform.link}
        onChange={e =>
          setNewPlatform(prev => ({ ...prev, link: e.target.value }))
        }
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleNewPlatformImage}
        className="w-full text-sm mb-3"
      />

      <button
        onClick={handlePlatformAdd}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 rounded hover:opacity-90"
      >
        + Add Platform
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
            setPlatformForm({ image: '', title: '', link: '', idx: null });
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

export default AdListedOn;
