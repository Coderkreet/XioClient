import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogById, getAllBlogs } from '../../api/admin-api';
import { ChevronLeft } from 'lucide-react';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentBlogs, setRecentBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await getBlogById(id);
        setBlog(res?.data || null);
      } catch {
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await getAllBlogs();
        if (res?.data) {
          // Exclude current blog, sort by createdAt desc, take 3
          const filtered = res.data.filter(b => b._id !== id);
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRecentBlogs(filtered.slice(0, 3));
        }
      } catch {
        setRecentBlogs([]);
      }
    };
    fetchRecent();
  }, [id]);

  // Floating orb for background effect (reuse from AllBlogs)
  const FloatingOrb = ({ size, delay, duration }) => (
    <div 
      className={`absolute rounded-full bg-[#4A088C]/30 blur-xl animate-pulse ${size}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#120540] text-[#AEA7D9]">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#120540] text-red-400">{error}</div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center bg-[#120540] text-[#AEA7D9]">Blog not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120540] via-[#252041] to-[#450862] text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <FloatingOrb size="w-96 h-96 -top-48 -left-48" delay={0} duration={8} />
        <FloatingOrb size="w-72 h-72 top-1/3 -right-36" delay={2} duration={10} />
        <FloatingOrb size="w-80 h-80 bottom-1/4 left-1/4" delay={4} duration={12} />
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-16 px-4">
        <Link to="/blogs" className="flex items-center gap-2 text-[#AEA7D9] hover:text-white mb-8">
          <ChevronLeft size={20} /> Back to Blogs
        </Link>
        <div className="rounded-3xl overflow-hidden border border-[#727FA6] bg-[#433C73]/70 shadow-2xl p-8 mb-16">
          {blog.image && (
            <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-6 border border-gray-200" />
          )}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-[#AEA7D9]">{blog.title}</h1>
            {blog.createdAt && (
              <span className="text-base text-[#727FA6] font-medium ml-4 whitespace-nowrap">
                {new Date(blog.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
          <p className="text-lg text-[#727FA6] mb-6">{blog.description}</p>
          {Array.isArray(blog.textArea) && blog.textArea.length > 0 && (
            <div className="space-y-8">
              {blog.textArea.map((section, idx) => (
                <div key={section._id || idx} className=" rounded-xl p-6 ">
                  <h2 className="text-2xl font-semibold text-[#AEA7D9] mb-2">{section.textTitle}</h2>
                  <p className="text-[#E0E0F0] whitespace-pre-line">{section.textContent}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Recent Blogs Section */}
        {recentBlogs.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#AEA7D9] mb-6">Recent Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentBlogs.map((b) => (
                <div
                  key={b._id}
                  className="cursor-pointer rounded-3xl overflow-hidden border border-[#727FA6] bg-[#433C73]/70 shadow-2xl transition-transform hover:scale-105"
                  onClick={() => navigate(`/blog/${b._id}`)}
                >
                  <div className="p-6">
                    {b.image && (
                      <img src={b.image} alt={b.title} className="w-full h-40 object-cover rounded-lg mb-3 border border-gray-200" />
                    )}
                    <h3 className="font-bold text-lg mb-2 leading-tight text-white">{b.title}</h3>
                    <p className="text-sm opacity-80 mb-2 text-[#727FA6]">{b.description}</p>
                    <span className="text-xs text-[#AEA7D9] font-bold">Read more</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
