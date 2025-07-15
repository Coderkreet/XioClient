import React, { useState, useEffect } from 'react';
import { createBlog, getAllBlogs, updateBlog, deleteBlog } from '../../api/admin-api';
import { Edit3, FileText, Image, Plus, Trash2, Save, AlertCircle, CheckCircle, X } from 'lucide-react';
import Swal from 'sweetalert2';

const initialForm = {
  title: '',
  description: '',
  image: '',
  textArea: [
    { textTitle: '', textContent: '' }
  ]
};

const AdBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllBlogs();
      setBlogs(res?.data || []);
    } catch {
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleTextAreaChange = (idx, field, value) => {
    const updated = form.textArea.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setForm({ ...form, textArea: updated });
  };

  const addTextArea = () => {
    setForm({ ...form, textArea: [...form.textArea, { textTitle: '', textContent: '' }] });
  };

  const removeTextArea = (idx) => {
    if (form.textArea.length === 1) return;
    setForm({ ...form, textArea: form.textArea.filter((_, i) => i !== idx) });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm(f => ({ ...f, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (!form.title.trim() || !form.description.trim()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Incomplete Fields',
        text: 'Please fill in the title and description.',
        confirmButtonColor: '#4A088C',
      });
    }
  
    const hasEmptySection = form.textArea.some(
      (section) => !section.textTitle.trim() || !section.textContent.trim()
    );
    if (hasEmptySection) {
      return Swal.fire({
        icon: 'warning',
        title: 'Incomplete Section',
        text: 'Please fill in all blog section titles and contents.',
        confirmButtonColor: '#4A088C',
      });
    }
  
    setLoading(true);
    setError('');
    try {
      if (editId) {
        await updateBlog(editId, form);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Blog updated successfully!',
          confirmButtonColor: '#4A088C',
        });
      } else {
        await createBlog(form);
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Blog created successfully!',
          confirmButtonColor: '#4A088C',
        });
      }
      setForm(initialForm);
      setEditId(null);
      fetchBlogs();
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save blog',
        confirmButtonColor: '#4A088C',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = async () => {
    if (
      !form.title &&
      !form.description &&
      !form.image &&
      form.textArea.every((section) => !section.textTitle && !section.textContent)
    ) {
      return; // Nothing to reset
    }
  
    const confirm = await Swal.fire({
      icon: 'question',
      title: 'Reset Form?',
      text: 'This will clear all fields. Continue?',
      showCancelButton: true,
      confirmButtonColor: '#4A088C',
      cancelButtonColor: '#727FA6',
      confirmButtonText: 'Yes, reset it',
    });
  
    if (confirm.isConfirmed) {
      setForm(initialForm);
      setEditId(null);
    }
  };
  

  const handleEdit = (blog) => {
    setForm({
      title: blog.title || '',
      description: blog.description || '',
      image: blog.image || '',
      textArea: Array.isArray(blog.textArea) && blog.textArea.length > 0 ? blog.textArea : [{ textTitle: '', textContent: '' }]
    });
    setEditId(blog._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      icon: 'warning',
      title: 'Delete Blog?',
      text: 'Are you sure you want to delete this blog?',
      showCancelButton: true,
      confirmButtonColor: '#4A088C',
      cancelButtonColor: '#727FA6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (confirm.isConfirmed) {
      setLoading(true);
      try {
        await deleteBlog(id);
        Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Blog deleted successfully!', confirmButtonColor: '#4A088C' });
        fetchBlogs();
      } catch {
        Swal.fire({ icon: 'error', title: 'Error!', text: 'Failed to delete blog', confirmButtonColor: '#4A088C' });
      } finally {
        setLoading(false);
      }
    }
  };

  // const handleReset = () => {
  //   setForm(initialForm);
  //   setEditId(null);
  // };

  return (
    <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: '#120540', borderColor: '#433C73', borderWidth: '1px' }}>
      {/* Header */}
      <div className="border-b pb-6 mb-8" style={{ borderColor: '#433C73' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#4A088C' }}>
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Blog Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Create, update, and manage your blogs</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Blog Fields */}
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#433C73' }}>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
              <FileText className="w-5 h-5 text-[#AEA7D9]" />
              Blog Content
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg transition-colors text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Enter blog title"
                  value={form.title}
                  onChange={e => handleInputChange('title', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg transition-colors resize-none text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Enter description"
                  value={form.description}
                  onChange={e => handleInputChange('description', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Image (Upload Only)</label>
                <div className="border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors" style={{ borderColor: '#727FA6' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="blogImageUpload"
                  />
                  <label htmlFor="blogImageUpload" className="flex flex-col items-center justify-center">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Preview"
                        className="w-32 h-32 object-contain rounded-lg mb-3 border border-gray-200"
                        onError={e => { e.target.onerror = null; e.target.src = ''; }}
                      />
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
            </div>
          </div>
        </div>
        {/* Right: Dynamic TextArea Sections */}
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#433C73' }}>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
              <FileText className="w-5 h-5 text-[#AEA7D9]" />
              Blog Sections
            </h3>
            <div className="space-y-6">
              {form.textArea.map((section, idx) => (
                <div key={idx} className="border border-[#727FA6] rounded-lg p-4 relative">
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-[#727FA6] hover:text-red-500"
                    onClick={() => removeTextArea(idx)}
                    disabled={form.textArea.length === 1}
                  >
                    <X size={18} />
                  </button>
                  <div className="mb-2">
                    <label className="block text-xs font-medium mb-1 text-[#AEA7D9]">Section Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded-lg transition-colors text-white bg-[#120540] border"
                      style={{ borderColor: '#727FA6' }}
                      placeholder="Enter section title"
                      value={section.textTitle}
                      onChange={e => handleTextAreaChange(idx, 'textTitle', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-[#AEA7D9]">Section Content</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg transition-colors resize-none text-white bg-[#120540] border"
                      style={{ borderColor: '#727FA6' }}
                      placeholder="Enter section content"
                      value={section.textContent}
                      onChange={e => handleTextAreaChange(idx, 'textContent', e.target.value)}
                      required
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4A088C] text-white font-bold hover:bg-[#433C73] transition-all"
                onClick={addTextArea}
              >
                <Plus size={18} /> Add Section
              </button>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="lg:col-span-2 flex justify-end gap-4 mt-8 pt-6 border-t" style={{ borderColor: '#433C73' }}>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 border text-white rounded-lg hover:opacity-80"
            style={{ borderColor: '#727FA6' }}
            disabled={loading}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-white"
            style={{ backgroundColor: '#4A088C', opacity: loading ? 0.5 : 1 }}
          >
            <Save className="w-4 h-4" />
            {loading ? (editId ? 'Updating...' : 'Saving...') : (editId ? 'Update Blog' : 'Save Blog')}
          </button>
        </div>
      </form>

      {/* Blog List */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-6 text-[#AEA7D9]">All Blogs</h3>
        {loading && <div className="text-[#727FA6] mb-4">Loading...</div>}
        {error && (
          <div className="mb-6 p-4 rounded-lg flex items-center gap-3 bg-red-50 border border-red-200">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div key={blog._id} className="rounded-lg border border-[#727FA6] bg-[#433C73] p-6 flex flex-col gap-3 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                {blog.image && (
                  <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                )}
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{blog.title}</h4>
                  <p className="text-xs text-[#AEA7D9]">{blog.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {Array.isArray(blog.textArea) && blog.textArea.map((section, idx) => (
                  <div key={idx} className="bg-[#120540] rounded px-2 py-1 text-xs text-[#AEA7D9]">
                    {section.textTitle}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-auto">
                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#4A088C] text-white text-xs hover:bg-[#433C73]"
                  onClick={() => handleEdit(blog)}
                  type="button"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-600 text-white text-xs hover:bg-red-800"
                  onClick={() => handleDelete(blog._id)}
                  type="button"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdBlogs;