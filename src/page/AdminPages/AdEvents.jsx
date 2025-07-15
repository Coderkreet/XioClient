import React, { useEffect, useState } from 'react';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../../api/admin-api';
import { Eye, EyeOff, Edit2, Trash2, Plus, Save, X, AlertCircle, CheckCircle, Image } from 'lucide-react';
import Swal from 'sweetalert2';

const eventTabs = [
  { label: 'All', value: 'all' },
  { label: 'Events', value: 'event' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Gallery', value: 'gallery' },
];

const AdEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(null);
  const [previewMode, setPreviewMode] = useState({});
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getAllEvents();
      setEvents(res.data || []);
      setError('');
    } catch {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditing({ text: '', image: '', type: 'event' });
    setError('');
    setSuccess('');
  };
  const handleEdit = (event) => {
    setEditing(event);
    setError('');
    setSuccess('');
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This event will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
  
    if (result.isConfirmed) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(e => e._id !== id));
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      } catch {
        Swal.fire('Error', 'Failed to delete event.', 'error');
      }
    }
  };
  
  const handleSave = async () => {
    if (!editing.text || !editing.type) {
      Swal.fire('Validation Error', 'Please fill in all required fields.', 'warning');
      return;
    }
  
    try {
      setLoading(true);
      const updated = editing._id
        ? await updateEvent(editing._id, editing)
        : await createEvent(editing);
  
      setEvents(
        editing._id
          ? events.map(e => (e._id === editing._id ? updated.data : e))
          : [...events, updated.data]
      );
      setEditing(null);
  
      Swal.fire({
        icon: 'success',
        title: editing._id ? 'Updated!' : 'Created!',
        text: `Event ${editing._id ? 'updated' : 'created'} successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire('Error', 'Failed to save event.', 'error');
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (field, value) => setEditing({ ...editing, [field]: value });
  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => setEditing({ ...editing, image: e.target.result });
    reader.readAsDataURL(file);
  };

  const onPreview = (id) => setPreviewMode(pm => ({ ...pm, [`events-${id}`]: !pm[`events-${id}`] }));

  // Filtered events by tab
  const filteredEvents = activeTab === 'all'
    ? events
    : events.filter(e => e.type === activeTab);

  return (
    <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: '#120540', borderColor: '#433C73', borderWidth: '1px' }}>
      {/* Header */}
      <div className="border-b pb-6 mb-8" style={{ borderColor: '#433C73' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A088C' }}>
            <Image className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Events Section Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage the events and gallery items</p>
          </div>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 justify-center">
        {eventTabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 border-2 ${
              activeTab === tab.value
                ? 'bg-gradient-to-r from-[#4A088C] to-[#AEA7D9] text-white border-[#4A088C]'
                : 'bg-[#433C73] text-[#AEA7D9] border-[#727FA6] hover:bg-gradient-to-r hover:from-[#4A088C]/20 hover:to-[#AEA7D9]/20'
            }`}
            style={{ backgroundImage: activeTab === tab.value ? 'linear-gradient(to right, #4A088C, #AEA7D9)' : undefined }}
          >
            {tab.label}
          </button>
        ))}
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
          onClick={handleAdd}
          className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:opacity-90 transition"
        >
          <Plus size={20} />
        </button>
      </div>
      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-center text-white py-4 col-span-full">Loading...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center text-[#AEA7D9] py-4 col-span-full">No events found.</div>
        ) : (
          filteredEvents.map(event => (
            <div key={event._id} className="rounded-lg p-6 flex flex-col items-center gap-3" style={{ backgroundColor: '#433C73' }}>
              <div className="flex w-full justify-between items-center mb-2">
                <button onClick={() => onPreview(event._id)} className="text-[#AEA7D9]">
                  {previewMode[`events-${event._id}`] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(event)} className="text-blue-400 hover:text-blue-300">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(event._id)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              {!previewMode[`events-${event._id}`] ? (
                <div className="text-center w-full">
                  <span className="text-lg font-semibold text-white">{event.text}</span>
                  <div className="text-sm text-[#AEA7D9] mt-1">Type: {event.type}</div>
                  {event.image && (
                    <img
                      src={event.image}
                      alt="Event"
                      className="mt-2 w-full h-32 object-cover rounded border border-gray-200"
                    />
                  )}
                </div>
              ) : (
                <pre className="bg-[#1b0a2d] text-[#AEA7D9] text-sm p-3 rounded-xl mt-2 overflow-x-auto w-full">
                  {JSON.stringify(event, null, 2)}
                </pre>
              )}
            </div>
          ))
        )}
      </div>
      {/* Modal for Add/Edit Event */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#120540] border border-[#433C73] rounded-xl p-6 w-full max-w-md mx-4 overflow-y-auto max-h-[90vh] relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">{editing._id ? 'Edit Event' : 'Add New Event'}</h3>
              <button
                onClick={() => setEditing(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>
            {/* Event Text */}
            <div className="mb-4">
              <label className="block text-[#AEA7D9] mb-2 font-medium">Event Text</label>
              <input
                type="text"
                value={editing.text}
                onChange={e => handleInputChange('text', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none focus:ring-2 focus:ring-[#4A088C]"
                placeholder="Enter event text"
              />
            </div>
            {/* Event Type */}
            <div className="mb-4">
              <label className="block text-[#AEA7D9] mb-2 font-medium">Event Type</label>
              <select
                value={editing.type}
                onChange={e => handleInputChange('type', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#1b0a2d] text-white border border-[#727FA6] focus:outline-none focus:ring-2 focus:ring-[#4A088C]"
              >
                <option value="">Select type</option>
                <option value="event">Event</option>
                <option value="upcoming">Upcoming</option>
                <option value="gallery">Gallery</option>
              </select>
            </div>
            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-[#AEA7D9] mb-2 font-medium">Event Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageUpload(e.target.files[0])}
                className="w-full text-sm"
              />
              {editing.image && (
                <img src={editing.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded border border-[#433C73]" />
              )}
            </div>
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
                  <><Save className="w-4 h-4" /> Save</>
                )}
              </button>
              <button
                onClick={() => setEditing(null)}
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

export default AdEvents;
