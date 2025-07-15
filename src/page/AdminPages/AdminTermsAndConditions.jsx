import { useState, useEffect } from "react";
import { Save, FileText, Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import {
  getAllTermsAndConditions,
  createTermAndCondition,
  updateTermAndCondition,
} from "../../api/admin-api";

const AdminTermsAndConditions = () => {
  const [termCondition, setTermCondition] = useState([]);
  const [docId, setDocId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    setLoading(true);
    try {
      const res = await getAllTermsAndConditions();
      let doc = null;
      if (res && res.data) {
        if (Array.isArray(res.data) && res.data.length > 0) {
          doc = res.data[0];
        } else if (typeof res.data === "object" && res.data._id) {
          doc = res.data;
        }
      }
      if (doc && Array.isArray(doc.termCondition)) {
        setTermCondition(doc.termCondition);
        setDocId(doc._id || null);
      } else {
        setTermCondition([]);
        setDocId(null);
      }
    } catch {
      Swal.fire("Error", "Failed to fetch Terms Of Use.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (idx, field, value) => {
    setTermCondition((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const handleAddSection = () => {
    setTermCondition((prev) => [...prev, { title: "", description: "" }]);
  };

  const handleRemoveSection = (idx) => {
    Swal.fire({
      title: "Remove this section?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setTermCondition((prev) => prev.filter((_, i) => i !== idx));
        Swal.fire("Removed", "Section has been removed.", "success");
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (termCondition.length === 0 || termCondition.some(item => !item.title || !item.description)) {
      Swal.fire("Incomplete", "All sections must have a title and description.", "warning");
      return;
    }

    setLoading(true);
    try {
      const payload = { termCondition };
      let res;
      if (docId) {
        res = await updateTermAndCondition(docId, payload);
        Swal.fire("Updated", "Terms & Conditions updated successfully!", "success");
      } else {
        res = await createTermAndCondition(payload);
        Swal.fire("Saved", "Terms & Conditions created successfully!", "success");
      }
      if (res?.data?._id) setDocId(res.data._id);
      await fetchTerms();
    } catch {
      Swal.fire("Error", "Failed to save Terms & Conditions.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Any unsaved changes will be lost.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, reset",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      fetchTerms();
    }
  };

  return (
    <div className="rounded-lg p-8 mb-8 mt-8" style={{ backgroundColor: "#120540", borderColor: "#433C73", borderWidth: "1px" }}>
      <div className="border-b pb-6 mb-8" style={{ borderColor: "#433C73" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#4A088C" }}>
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: "#AEA7D9" }}>Terms & Conditions Management</h2>
            <p className="mt-1" style={{ color: "#727FA6" }}>Add, edit, and remove sections for your Terms & Conditions</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {termCondition.map((item, idx) => (
          <div key={idx} className="rounded-lg p-6 mb-4 relative" style={{ backgroundColor: '#433C73' }}>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-[#AEA7D9]">Section Title</label>
              <button
                type="button"
                onClick={() => handleRemoveSection(idx)}
                className="text-red-400 hover:text-red-600 p-1 rounded"
                title="Remove section"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              value={item.title}
              onChange={e => handleSectionChange(idx, 'title', e.target.value)}
              className="w-full px-4 py-3 rounded-lg mb-4 text-white bg-[#120540] border"
              style={{ borderColor: '#727FA6' }}
              placeholder="Enter section title"
              required
            />
            <label className="block text-sm font-medium text-[#AEA7D9] mb-2">Description</label>
            <textarea
              rows={6}
              value={item.description}
              onChange={e => handleSectionChange(idx, 'description', e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-white bg-[#120540] border"
              style={{ borderColor: '#727FA6' }}
              placeholder="Enter section description"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSection}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-[#4A088C] hover:opacity-80 mt-2"
        >
          <Plus className="w-5 h-5" /> Add Section
        </button>
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t" style={{ borderColor: '#433C73' }}>
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
            {loading ? (docId ? 'Updating...' : 'Saving...') : (docId ? 'Update' : 'Save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTermsAndConditions;
