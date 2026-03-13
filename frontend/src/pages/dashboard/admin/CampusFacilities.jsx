import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { api } from '../../../services/api';
import { motion } from 'framer-motion';
import { Server, Edit2 } from 'lucide-react';

const CampusFacilities = () => {
  const socket = useContext(SocketContext);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/resources');
        setResources(Array.isArray(res.data) ? res.data : []);
      } catch {
        setResources([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    if (socket) {
      socket.on('resourceUpdated', (r) => setResources((prev) => prev.map((x) => (x._id === r._id ? r : x))));
      return () => socket.off('resourceUpdated');
    }
  }, [socket]);

  if (loading) return <div>Loading...</div>;

  const fallback = [
    { _id: '1', name: 'Boys Hostel A', type: 'HostelRoom', capacity: 150, currentOccupancy: 120, energyCurrentUsage: 0, waterCurrentUsage: 0 },
    { _id: '2', name: 'Girls Hostel B', type: 'HostelRoom', capacity: 150, currentOccupancy: 145, energyCurrentUsage: 0, waterCurrentUsage: 0 },
    { _id: '3', name: 'Main Library', type: 'StudyRoom', capacity: 200, currentOccupancy: 80, energyCurrentUsage: 0, waterCurrentUsage: 0 },
    { _id: '4', name: 'Block A Classrooms', type: 'Classroom', capacity: 500, currentOccupancy: 320, energyCurrentUsage: 0, waterCurrentUsage: 0 },
    { _id: '5', name: 'Power Plant', type: 'EnergyZone', capacity: null, currentOccupancy: null, energyCurrentUsage: 1200, waterCurrentUsage: 0 },
  ];
  const list = resources.length > 0 ? resources : fallback;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <Server size={32} className="text-primary" /> Campus Facilities
      </h1>
      <p className="text-gray-600">Monitor and manage campus facilities.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((r) => (
          <motion.div key={r._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6" whileHover={{ y: -2 }}>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-secondary bg-teal-50 px-2 py-1 rounded">{r.type}</span>
                <h3 className="text-lg font-bold text-gray-800 mt-2">{r.name}</h3>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              {r.capacity != null && <p>Occupancy: {r.currentOccupancy ?? 0} / {r.capacity}</p>}
              {r.energyCurrentUsage > 0 && <p>Energy: {r.energyCurrentUsage} kW</p>}
              {r.waterCurrentUsage > 0 && <p>Water: {r.waterCurrentUsage} L</p>}
            </div>
            <button className="mt-4 flex items-center gap-2 text-secondary text-sm font-medium hover:underline">
              <Edit2 size={14} /> Update
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CampusFacilities;
