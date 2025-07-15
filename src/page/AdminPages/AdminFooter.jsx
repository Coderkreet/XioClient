  import { useState, useEffect } from "react";
  import {
    createFooterLink,
    getAllFooterLinks,
    updateFooterLink,
    deleteFooterLink,
    deleteDescription,
    updateDescription,
    getAllDescriptions,
    createDescription

  } from "../../api/admin-api";


  import { Plus, Edit, Trash2, Upload } from "lucide-react";
  import Swal from "sweetalert2";
import AdCopyRight from "./AdCopyRight";

  const AdminFooter = () => {
    const [footerLinks, setFooterLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingFooter, setEditingFooter] = useState(null);
    const [description, setDescription] = useState("");
    const [descriptionId, setDescriptionId] = useState(null);
    const [descriptionLoading, setDescriptionLoading] = useState(true);

    useEffect(() => {
      fetchFooterLinks();
      fetchDescription();
    }, []);

    const fetchFooterLinks = async () => {
      try {
        setLoading(true);
        const response = await getAllFooterLinks();
        if (response?.data) {
          setFooterLinks(response.data);
        } else if (Array.isArray(response)) {
          setFooterLinks(response);
        } else {
          setFooterLinks([]);
        }
        setError(null);
      } catch {
        setError("Failed to load footer links");
        setFooterLinks([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchDescription = async () => {
      try {
        setDescriptionLoading(true);
        const response = await getAllDescriptions();
        if (response?.data && response.data.length > 0) {
          const existingDescription = response.data[0];
          setDescription(existingDescription.description || "");
          setDescriptionId(existingDescription._id);
        } else if (Array.isArray(response) && response.length > 0) {
          const existingDescription = response[0];
          setDescription(existingDescription.description || "");
          setDescriptionId(existingDescription._id);
        } else {
          setDescription("");
          setDescriptionId(null);
        }
      } catch {
        console.error("Failed to load description");
        setDescription("");
        setDescriptionId(null);
      } finally {
        setDescriptionLoading(false);
      }
    };

    const handleDescriptionSave = async () => {
      if (!description.trim()) {
        Swal.fire("Missing Content", "Description cannot be empty.", "warning");
        return;
      }

      try {
        if (descriptionId) {
          // Update existing description
          await updateDescription(descriptionId, { description: description.trim() });
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Description updated successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          // Create new description
          await createDescription({ description: description.trim() });
          await fetchDescription(); // Refresh to get the new ID
          Swal.fire({
            icon: "success",
            title: "Created!",
            text: "Description created successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch {
        Swal.fire("Error", "Failed to save description.", "error");
      }
    };

    const handleDescriptionDelete = async () => {
      if (!descriptionId) {
        Swal.fire("No Description", "No description to delete.", "info");
        return;
      }

      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "This will permanently delete the description.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it",
        });

        if (result.isConfirmed) {
          await deleteDescription(descriptionId);
          setDescription("");
          setDescriptionId(null);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Description deleted successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch {
        Swal.fire("Error", "Failed to delete description.", "error");
      }
    };

    const handleAdd = () => {
      setEditingFooter({
        platform: "",
        logo: "",
        url: "",
      });
    };

    const handleEdit = (footer) => {
      setEditingFooter({ ...footer });
    };

    const handleDelete = async (id) => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "This will permanently delete the footer link.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it",
        });
    
        if (result.isConfirmed) {
          await deleteFooterLink(id);
          await fetchFooterLinks();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Footer link deleted successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch {
        Swal.fire("Error", "Failed to delete footer link.", "error");
      }
    };
    

    const handleSave = async () => {
      const { platform, logo, url } = editingFooter;
    
      if (!platform || !logo || !url) {
        Swal.fire("Missing Fields", "All fields are required.", "warning");
        return;
      }
    
      try {
        if (editingFooter._id) {
          await updateFooterLink(editingFooter._id, editingFooter);
        } else {
          await createFooterLink(editingFooter);
        }
    
        await fetchFooterLinks();
        setEditingFooter(null);
    
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Footer link saved successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire("Error", "Failed to save footer link.", "error");
      }
    };
    

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditingFooter((prev) => ({ ...prev, logo: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    };

    if (loading) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-400">Loading footer links...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8">
          <p className="text-red-400">{error}</p>
        </div>
      );
    }

    return (
      <div className="p-6 bg-black min-h-screen">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex-1">
            Footer Management
          </h2>
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="inline-block mr-2" />
            Add Footer Link
          </button>
        </div>

        {/* Description Section */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Footer Description</h3>
          {descriptionLoading ? (
            <p className="text-gray-400">Loading description...</p>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded p-3 min-h-[100px] resize-y"
                  placeholder="Enter footer description..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDescriptionSave}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded hover:opacity-90"
                  disabled={descriptionLoading}
                >
                  {descriptionLoading
                    ? descriptionId
                      ? "Updating..."
                      : "Creating..."
                    : descriptionId
                    ? "Update Description"
                    : "Create Description"}
                </button>
                {descriptionId && (
                  <button
                    onClick={handleDescriptionDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete Description
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Links List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {footerLinks.map((footer) => (
            <div
              key={footer._id || footer.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex items-center mb-3">
                {footer.logo ? (
                  <img
                    src={footer.logo}
                    alt={footer.platform}
                    className="w-10 h-10 object-contain rounded-full border border-gray-600 bg-white mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 bg-gray-300 mr-3">
                    <Upload className="w-5 h-5 text-gray-500" />
                  </div>
                )}
                <div>
                  <div className="text-white font-semibold">{footer.platform}</div>
                  <a
                    href={footer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {footer.url}
                  </a>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(footer)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(footer._id || footer.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Edit Modal */}
        {editingFooter && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
              <h3 className="text-2xl font-bold text-white mb-6">
                {editingFooter._id ? "Edit Footer Link" : "Add Footer Link"}
              </h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-white mb-2">Platform</label>
                  <input
                    type="text"
                    value={editingFooter.platform}
                    onChange={(e) =>
                      setEditingFooter({ ...editingFooter, platform: e.target.value })
                    }
                    className="w-full bg-gray-700 text-white rounded p-2"
                    placeholder="Platform"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Logo</label>
                  <div className="relative w-24 h-24 mb-2">
                    {editingFooter.logo ? (
                      <img
                        src={editingFooter.logo}
                        alt="Footer logo"
                        className="w-full h-full object-contain rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-600 rounded flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={editingFooter.logo}
                    onChange={(e) =>
                      setEditingFooter({ ...editingFooter, logo: e.target.value })
                    }
                    className="w-full bg-gray-700 text-white rounded p-2 mt-2"
                    placeholder="Or paste logo URL"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload image or paste image URL
                  </p>
                </div>
                <div>
                  <label className="block text-white mb-2">URL</label>
                  <input
                    type="text"
                    value={editingFooter.url}
                    onChange={(e) =>
                      setEditingFooter({ ...editingFooter, url: e.target.value })
                    }
                    className="w-full bg-gray-700 text-white rounded p-2"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setEditingFooter(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded hover:opacity-90"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg p-8 mb-8">
          <AdCopyRight />
        </div>
      </div>
    );
  };

  export default AdminFooter;