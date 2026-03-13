import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';

const ManageCounselors = () => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/users?role=Counselor');
        setCounselors(res.data || []);
      } catch {
        setCounselors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <UserCheck size={32} className="text-primary" /> Manage Counselors
      </h1>
      <p className="text-gray-600">View and manage counselor accounts.</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-800">Name</th>
              <th className="text-left p-4 font-semibold text-gray-800">Email</th>
            </tr>
          </thead>
          <tbody>
            {counselors.length === 0 ? (
              <tr><td colSpan={2} className="p-8 text-center text-gray-500">No counselors.</td></tr>
            ) : (
              counselors.map((c) => (
                <tr key={c._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{c.name}</td>
                  <td className="p-4 text-gray-600">{c.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageCounselors;
