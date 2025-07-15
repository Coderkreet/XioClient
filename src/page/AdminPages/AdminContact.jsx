import React, { useState, useEffect } from 'react';
import { getAllContacts } from '../../api/admin-api';
import { Search, Filter, Mail, User, Phone, MessageSquare, Calendar, Eye, Trash2, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await getAllContacts();
      if (response?.data) {
        setContacts(response.data);
      } else if (Array.isArray(response)) {
        setContacts(response);
      } else {
        setContacts([]);
      }
      setError(null);
    } catch {
      setError('Failed to load contacts');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleDeleteContact = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will permanently delete this contact submission.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it',
      });

      if (result.isConfirmed) {
        // Add delete API call here when available
        await fetchContacts(); // Refresh the list
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Contact submission deleted successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch {
      Swal.fire('Error', 'Failed to delete contact submission.', 'error');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A088C] mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading contacts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-400">{error}</p>
        <button
          onClick={fetchContacts}
          className="mt-4 bg-[#4A088C] text-white px-4 py-2 rounded hover:bg-[#433C73]"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
        <button
          onClick={fetchContacts}
          className="bg-[#4A088C] text-white px-4 py-2 rounded-lg hover:bg-[#433C73] transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-[#4A088C] focus:outline-none"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredContacts.length === 0 ? (
                <tr>
                                     <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                     {searchTerm ? 'No contacts match your search criteria.' : 'No contact submissions yet.'}
                   </td>
                </tr>
              ) : (
                filteredContacts.map((contact, index) => (
                  <tr key={contact._id || index} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{contact.fullName}</div>
                        <div className="text-sm text-gray-400">{contact.email}</div>
                        {contact.phone && (
                          <div className="text-sm text-gray-400 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white max-w-xs truncate" title={contact.subject}>
                        {contact.subject}
                      </div>
                    </td>
                                         <td className="px-6 py-4">
                       <div className="text-sm text-gray-400 flex items-center gap-1">
                         <Calendar className="w-3 h-3" />
                         {formatDate(contact.createdAt)}
                       </div>
                     </td>
                     <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewContact(contact)}
                          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <p className="text-white">{selectedContact.fullName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <p className="text-white">{selectedContact.email}</p>
              </div>
              
              {selectedContact.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <p className="text-white">{selectedContact.phone}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                <p className="text-white">{selectedContact.subject}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-white whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Submitted</label>
                <p className="text-gray-400">{formatDate(selectedContact.createdAt)}</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setSelectedContact(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Add reply functionality here
                  Swal.fire('Info', 'Reply functionality coming soon!', 'info');
                }}
                className="bg-[#4A088C] text-white px-4 py-2 rounded hover:bg-[#433C73]"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContact;
