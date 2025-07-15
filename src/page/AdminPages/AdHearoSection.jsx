import { useState, useEffect } from 'react';
import { Upload, Save, Edit3, Image, FileText, Type, AlertCircle, CheckCircle } from 'lucide-react';
import { getAllHeaderContent, createHeaderContent, updateHeaderContent } from '../../api/admin-api';
import Swal from 'sweetalert2';

const AdHearoSection = () => {
  const [form, setForm] = useState({
    headerTitle: '',
    subTitle: '',
    description: '',
    sideLogoTitle: '',
    logoImage: '',
    sideLogo: '',
    staticImage: '',
    navLogo: '',
    lightPaper: '',
    whitePaper: '',
    onePager: '',
    auditReport: '',
    solidProof: ''
  });
  const [headerId, setHeaderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchHeaderContent();
  }, []);

  const fetchHeaderContent = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllHeaderContent();
      let header = null;
      if (res && res.data) {
        if (Array.isArray(res.data) && res.data.length > 0) {
          header = res.data[0];
        } else if (typeof res.data === 'object' && res.data._id) {
          header = res.data;
        }
      }
      if (header) {
        setForm({
          headerTitle: header.headerTitle || '',
          subTitle: header.subTitle || '',
          description: header.description || '',
          sideLogoTitle: header.sideLogoTitle || '',
          floatingLogo: header.logoImage || '', // for preview
          logoImage: header.logoImage || '', // for form data submission
          sideLogo: header.sideLogo || '',
          staticImage: header.staticImage || '',
          navLogo: header.navLogo || '',
          lightPaper: header.lightPaper || '',
          whitePaper: header.whitePaper || '',
          onePager: header.onePager || '',
          auditReport: header.auditReport || '',
          solidProof: header.solidProof || ''
        });
        setHeaderId(header._id || null);
      } else {
        setForm({
          headerTitle: '',
          subTitle: '',
          description: '',
          sideLogoTitle: '',
          floatingLogo: '',
          logoImage: '',
          sideLogo: '',
          staticImage: '',
          navLogo: '',
          lightPaper: '',
          whitePaper: '',
          onePager: '',
          auditReport: '',
          solidProof: ''
        });
        setHeaderId(null);
      }
    } catch {
      setError('Failed to fetch header content');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // When uploading floatingLogo, update both floatingLogo (for preview) and logoImage (for API)
  const handleFileUpload = (field, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (field === 'logoImage') {
        setForm(f => ({ ...f, floatingLogo: e.target.result, logoImage: e.target.result }));
      } else {
        setForm(f => ({ ...f, [field]: e.target.result }));
      }
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAuditReportLink = (value) => {
    setForm(f => ({ ...f, auditReport: value }));
  };

  const handleAuditReportPdf = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm(f => ({ ...f, auditReport: e.target.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSolidProofLink = (value) => {
    setForm(f => ({ ...f, solidProof: value }));
  };

  const handleSolidProofPdf = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm(f => ({ ...f, solidProof: e.target.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleDeletePdf = (field) => {
    setForm(f => ({ ...f, [field]: " " }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (headerId) {
        res = await updateHeaderContent(headerId, form);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Header content updated successfully!',
          confirmButtonColor: '#4A088C',
        });
      } else {
        res = await createHeaderContent(form);
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Header content created successfully!',
          confirmButtonColor: '#4A088C',
        });
      }
  
      if (res?.data?._id) setHeaderId(res.data._id);
      await fetchHeaderContent();
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save header content',
        confirmButtonColor: '#4A088C',
      });
    } finally {
      setLoading(false);
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
            <h2 className="text-2xl font-semibold" style={{ color: '#AEA7D9' }}>Header Content Management</h2>
            <p className="mt-1" style={{ color: '#727FA6' }}>Manage your website's header content and media assets</p>
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Text Fields */}
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#433C73' }}>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
              <Type className="w-5 h-5 text-[#AEA7D9]" />
              Text Content
            </h3>
            <div className="space-y-4">
              {['headerTitle', 'subTitle', 'sideLogoTitle'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2 text-[#AEA7D9] capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg transition-colors text-white bg-[#120540] border"
                    style={{ borderColor: '#727FA6' }}
                    placeholder={`Enter ${field}`}
                    value={form[field]}
                    onChange={e => handleInputChange(field, e.target.value)}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Audit Report (Link or PDF)</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-lg transition-colors text-white bg-[#120540] border mb-2"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Enter audit report link (optional)"
                  value={form.auditReport.startsWith('data:application/pdf') ? '' : form.auditReport}
                  onChange={e => handleAuditReportLink(e.target.value)}
                />
                <div className="border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors" style={{ borderColor: '#727FA6' }}>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => handleAuditReportPdf(e.target.files[0])}
                    className="hidden"
                    id="auditReportPdf"
                  />
                  <label htmlFor="auditReportPdf" className="flex flex-col items-center justify-center">
                    {form.auditReport.startsWith('data:application/pdf') ? (
                      <div className="flex flex-col items-center">
                        <FileText className="w-8 h-8 text-[#AEA7D9] mb-2" />
                        <span className="text-xs text-[#AEA7D9]">PDF Uploaded</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-[#AEA7D9] mb-2" />
                        <p className="text-sm text-[#AEA7D9]">Click to upload PDF</p>
                        <p className="text-xs text-[#727FA6] mt-1">PDF up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
                {/* Preview */}
                {form.auditReport && (
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      {form.auditReport.startsWith('data:application/pdf') ? (
                        <span className="text-[#AEA7D9]">PDF Uploaded</span>
                      ) : (
                        <a href={form.auditReport} target="_blank" rel="noopener noreferrer" className="text-[#AEA7D9] underline">View Audit Report Link</a>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePdf('auditReport')}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Solid Proof (Link or PDF)</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-lg transition-colors text-white bg-[#120540] border mb-2"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Enter solid proof link (optional)"
                  value={form.solidProof.startsWith('data:application/pdf') ? '' : form.solidProof}
                  onChange={e => handleSolidProofLink(e.target.value)}
                />
                <div className="border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors" style={{ borderColor: '#727FA6' }}>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => handleSolidProofPdf(e.target.files[0])}
                    className="hidden"
                    id="solidProofPdf"
                  />
                  <label htmlFor="solidProofPdf" className="flex flex-col items-center justify-center">
                    {form.solidProof.startsWith('data:application/pdf') ? (
                      <div className="flex flex-col items-center">
                        <FileText className="w-8 h-8 text-[#AEA7D9] mb-2" />
                        <span className="text-xs text-[#AEA7D9]">PDF Uploaded</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-[#AEA7D9] mb-2" />
                        <p className="text-sm text-[#AEA7D9]">Click to upload PDF</p>
                        <p className="text-xs text-[#727FA6] mt-1">PDF up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
                {/* Preview */}
                {form.solidProof && (
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      {form.solidProof.startsWith('data:application/pdf') ? (
                        <span className="text-[#AEA7D9]">PDF Uploaded</span>
                      ) : (
                        <a href={form.solidProof} target="_blank" rel="noopener noreferrer" className="text-[#AEA7D9] underline">View Solid Proof Link</a>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePdf('solidProof')}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-[#AEA7D9]">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg transition-colors resize-none text-white bg-[#120540] border"
                  style={{ borderColor: '#727FA6' }}
                  placeholder="Enter description"
                  value={form.description}
                  onChange={e => handleInputChange('description', e.target.value)}
                />
              </div>
            </div>
          </div>
              {/* PDF Uploads */}
            {['lightPaper', 'whitePaper', 'onePager'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-3 text-[#AEA7D9] capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <div className="border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors" style={{ borderColor: '#727FA6' }}>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => handleFileUpload(field, e.target.files[0])}
                    className="hidden"
                    id={field}
                  />
                  <label htmlFor={field} className="flex flex-col items-center justify-center">
                    {form[field] ? (
                      <div className="flex flex-col items-center">
                        <FileText className="w-8 h-8 text-[#AEA7D9] mb-2" />
                        <span className="text-xs text-[#AEA7D9]">PDF Uploaded</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-[#AEA7D9] mb-2" />
                        <p className="text-sm text-[#AEA7D9]">Click to upload PDF</p>
                        <p className="text-xs text-[#727FA6] mt-1">PDF up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
                {/* Delete button for PDF */}
                {form[field] && (
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDeletePdf(field)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Media Uploads */}
        <div className="space-y-6">
          <div className="rounded-lg p-6" style={{ backgroundColor: '#433C73' }}>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-white">
              <Image className="w-5 h-5 text-[#AEA7D9]" />
              Media Assets
            </h3>

            {/* Image Uploads */}
            {/* Floating Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-3 text-[#AEA7D9]">
                Floating Logo
              </label>
              <div
                className="border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors"
                style={{ borderColor: '#727FA6' }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload('logoImage', e.target.files[0])}
                  className="hidden"
                  id="logoImage"
                />
                <label htmlFor="logoImage" className="flex flex-col items-center justify-center">
                  {form.logoImage ? (
                    <img
                      src={form.logoImage}
                      alt="Floating Logo Preview"
                      className="w-32 h-32 object-contain rounded-lg mb-3 border border-gray-200"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-[#AEA7D9] mb-2" />
                      <p className="text-sm text-[#AEA7D9]">Click to upload</p>
                      <p className="text-xs text-[#727FA6] mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Side Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-3 text-[#AEA7D9]">
                Audit Logo
              </label>
              <div
                className="border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors"
                style={{ borderColor: '#727FA6' }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload('sideLogo', e.target.files[0])}
                  className="hidden"
                  id="sideLogo"
                />
                <label htmlFor="sideLogo" className="flex flex-col items-center justify-center">
                  {form.sideLogo ? (
                    <img
                      src={form.sideLogo}
                      alt="Side Logo Preview"
                      className="w-32 h-32 object-contain rounded-lg mb-3 border border-gray-200"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-[#AEA7D9] mb-2" />
                      <p className="text-sm text-[#AEA7D9]">Click to upload</p>
                      <p className="text-xs text-[#727FA6] mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Static Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-3 text-[#AEA7D9]">
                Home Logo
              </label>
              <div
                className="border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors"
                style={{ borderColor: '#727FA6' }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload('staticImage', e.target.files[0])}
                  className="hidden"
                  id="staticImage"
                />
                <label htmlFor="staticImage" className="flex flex-col items-center justify-center">
                  {form.staticImage ? (
                    <img
                      src={form.staticImage}
                      alt="Static Image Preview"
                      className="w-32 h-32 object-contain rounded-lg mb-3 border border-gray-200"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-[#AEA7D9] mb-2" />
                      <p className="text-sm text-[#AEA7D9]">Click to upload</p>
                      <p className="text-xs text-[#727FA6] mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Nav Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-3 text-[#AEA7D9]">
                Nav Logo
              </label>
              <div
                className="border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors"
                style={{ borderColor: '#727FA6' }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload('navLogo', e.target.files[0])}
                  className="hidden"
                  id="navLogo"
                />
                <label htmlFor="navLogo" className="flex flex-col items-center justify-center">
                  {form.navLogo ? (
                    <img
                      src={form.navLogo}
                      alt="Nav Logo Preview"
                      className="w-32 h-32 object-contain rounded-lg mb-3 border border-gray-200"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-[#AEA7D9] mb-2" />
                      <p className="text-sm text-[#AEA7D9]">Click to upload</p>
                      <p className="text-xs text-[#727FA6] mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

        
          </div>
        </div>

        {/* Buttons */}
        <div className="lg:col-span-2 flex justify-end gap-4 mt-8 pt-6 border-t" style={{ borderColor: '#433C73' }}>
          <button
            type="button"
            onClick={fetchHeaderContent}
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
            style={{
              backgroundColor: '#4A088C',
              opacity: loading ? 0.5 : 1
            }}
          >
            <Save className="w-4 h-4" />
            {loading ? (headerId ? 'Updating...' : 'Saving...') : (headerId ? 'Update Content' : 'Save Content')}
          </button>
        </div>
      </form>
    </div>
  );
};


export default AdHearoSection;
