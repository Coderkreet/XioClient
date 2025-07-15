import React, { useState, useEffect } from 'react';
import { getAllRoadMaps, createRoadMap, updateRoadMap, deleteRoadMap } from '../../api/admin-api';
import { Edit3, Save, AlertCircle, CheckCircle, Trash2, X } from 'lucide-react';
import Swal from 'sweetalert2';

const AdRoadmap = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState(null);
  const [formData, setFormData] = useState({
    milestone: '',
    quarter: 'Q1',
    year: new Date().getFullYear(),
    status: 'pending',
    list: ['']
  });

  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const statuses = ['pending', 'in-progress', 'completed'];

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      const response = await getAllRoadMaps();
      if (response?.data) {
        setRoadmaps(response.data);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load roadmap data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleListChange = (index, value) => {
    const newList = [...formData.list];
    newList[index] = value;
    setFormData(prev => ({ ...prev, list: newList }));
  };

  const addListItem = () => {
    setFormData(prev => ({ ...prev, list: [...prev.list, ''] }));
  };

  const removeListItem = (index) => {
    setFormData(prev => ({ ...prev, list: prev.list.filter((_, i) => i !== index) }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, list: formData.list.filter(item => item.trim() !== '') };
      if (editingRoadmap) {
        await updateRoadMap(editingRoadmap._id, payload);
        Swal.fire('Updated!', 'Roadmap updated successfully.', 'success');
      } else {
        await createRoadMap(payload);
        Swal.fire('Created!', 'Roadmap created successfully.', 'success');
      }
  
      setIsModalOpen(false);
      setEditingRoadmap(null);
      setFormData({ milestone: '', quarter: 'Q1', year: new Date().getFullYear(), status: 'pending', list: [''] });
      fetchRoadmaps();
    } catch {
      Swal.fire('Error!', 'Failed to save roadmap.', 'error');
    }
  };
  

  const handleEdit = (roadmap) => {
    setEditingRoadmap(roadmap);
    setFormData({
      milestone: roadmap.milestone,
      quarter: roadmap.quarter,
      year: roadmap.year,
      status: roadmap.status,
      list: roadmap.list
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This roadmap will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        await deleteRoadMap(id);
        fetchRoadmaps();
        Swal.fire('Deleted!', 'The roadmap has been deleted.', 'success');
      } catch {
        Swal.fire('Error!', 'Failed to delete roadmap.', 'error');
      }
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="rounded-lg p-8 mb-8 min-h-screen" style={{ backgroundColor: '#120540', borderColor: '#433C73', borderWidth: '1px' }}>
      {/* Header */}
      <div className="border-b pb-6 mb-8" style={{ borderColor: '#433C73' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A088C' }}>
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Roadmap Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage your project milestones and progress</p>
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
      {/* Add Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => { setIsModalOpen(true); setEditingRoadmap(null); setFormData({ milestone: '', quarter: 'Q1', year: new Date().getFullYear(), status: 'pending', list: [''] }); setError(null); setSuccess(''); }}
          className="px-6 py-2.5 rounded-lg text-white font-medium"
          style={{ backgroundColor: '#4A088C' }}
        >
          + Add New Roadmap
        </button>
      </div>
      {/* Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-center text-white py-4 col-span-full">Loading...</div>
        ) : roadmaps.length === 0 ? (
          <div className="text-center text-[#AEA7D9] py-4 col-span-full">No roadmap items found.</div>
        ) : (
          roadmaps.map((roadmap) => (
            <div
              key={roadmap._id}
              className="rounded-lg p-6 flex flex-col gap-3" style={{ backgroundColor: '#433C73' }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{roadmap.milestone}</h3>
                  <p className="text-[#AEA7D9] text-sm mt-1">{roadmap.quarter} {roadmap.year}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-white text-xs ${getStatusColor(roadmap.status)}`}>
                  {roadmap.status}
                </span>
              </div>
              <ul className="list-disc list-inside mb-4 text-[#AEA7D9] text-sm space-y-1">
                {roadmap.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="flex justify-end space-x-2 text-sm">
                <button
                  onClick={() => handleEdit(roadmap)}
                  className="text-[#AEA7D9] hover:text-white px-3 py-1 rounded-lg border border-[#727FA6]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(roadmap._id)}
                  className="text-red-400 hover:text-white px-3 py-1 rounded-lg border border-[#e53e3e]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-[#120540] border border-[#433C73] rounded-lg w-full max-w-2xl mx-4 my-8 relative flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#433C73]">
              <h3 className="text-lg font-bold text-white">
                {editingRoadmap ? 'Edit Roadmap' : 'Add New Roadmap'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingRoadmap(null);
                  setFormData({ milestone: '', quarter: 'Q1', year: new Date().getFullYear(), status: 'pending', list: [''] });
                  setError(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            {/* Scrollable Form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto p-6 space-y-4 flex-1"
              id="roadmap-form"
            >
              {/* Milestone */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Milestone</label>
                <input
                  type="text"
                  name="milestone"
                  value={formData.milestone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                  required
                />
              </div>
              {/* Quarter and Year */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Quarter</label>
                  <select
                    name="quarter"
                    value={formData.quarter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-white bg-[#120540] border"
                    style={{ borderColor: '#727FA6' }}
                  >
                    {quarters.map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-white bg-[#120540] border"
                    style={{ borderColor: '#727FA6' }}
                    required
                  />
                </div>
              </div>
              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {/* List Items */}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">List Items</label>
                {formData.list.map((item, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleListChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg text-white bg-[#120540] border"
                      style={{ borderColor: '#727FA6' }}
                      placeholder={`List item ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem(index)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addListItem}
                  className="mt-2 text-[#AEA7D9] hover:text-white text-sm"
                >
                  + Add List Item
                </button>
              </div>
              {/* Sticky Footer Buttons */}
              <div className="flex gap-2 justify-end pt-4 border-t border-[#433C73] bg-[#120540] mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingRoadmap(null);
                    setFormData({ milestone: '', quarter: 'Q1', year: new Date().getFullYear(), status: 'pending', list: [''] });
                    setError(null);
                  }}
                  className="px-6 py-2.5 border text-white rounded-lg hover:opacity-80"
                  style={{ borderColor: '#727FA6' }}
                  disabled={loading}
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
                  {loading ? (editingRoadmap ? 'Updating...' : 'Saving...') : (editingRoadmap ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdRoadmap;
