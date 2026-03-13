import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const HostelRooms = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/resources');
        const hostel = (res.data || []).filter((r) => r.type === 'HostelRoom');
        setResources(hostel.length > 0 ? hostel : [
          { _id: '1', name: 'Boys Hostel A', currentOccupancy: 120, capacity: 150 },
          { _id: '2', name: 'Girls Hostel B', currentOccupancy: 145, capacity: 150 },
        ]);
      } catch {
        setResources([
          { _id: '1', name: 'Boys Hostel A', currentOccupancy: 120, capacity: 150 },
          { _id: '2', name: 'Girls Hostel B', currentOccupancy: 145, capacity: 150 },
        ]);
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
        <Home size={32} className="text-primary" /> Hostel Rooms
      </h1>
      <p className="text-gray-600">Monitor hostel occupancy and room allocation.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((r) => {
          const pct = r.capacity ? Math.round((r.currentOccupancy / r.capacity) * 100) : 0;
          return (
            <motion.div key={r._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800">{r.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{r.currentOccupancy} / {r.capacity} occupied</p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default HostelRooms;
