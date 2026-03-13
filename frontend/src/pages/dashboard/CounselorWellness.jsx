import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
import { Heart, AlertTriangle, TrendingDown } from 'lucide-react';

const CounselorWellness = () => {
  const { user } = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get('/alerts');
        setAlerts(res.data || []);
      } catch {
        setAlerts([]);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <Heart size={32} className="text-secondary" /> My Wellness
      </h1>
      <p className="text-gray-600">Monitor student wellness indicators and high-risk alerts.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-danger rounded-lg"><AlertTriangle size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">High Risk Alerts</p>
            <p className="text-2xl font-bold text-gray-800">{alerts.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><TrendingDown size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Students in Care</p>
            <p className="text-2xl font-bold text-gray-800">24</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-teal-100 text-secondary rounded-lg"><Heart size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Wellness Score (Campus)</p>
            <p className="text-2xl font-bold text-gray-800">72%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Student Wellness Overview</h2>
        <p className="text-gray-600 mb-4">Review high-risk alerts from your Dashboard. Schedule counseling sessions for students who need support.</p>
        {alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.slice(0, 5).map((a) => (
              <div key={a._id} className="p-4 border border-red-100 bg-red-50 rounded-lg flex justify-between items-center">
                <p className="font-semibold text-gray-800">{a.message}</p>
                <span className="text-sm text-gray-500">Score: {a.riskScore}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No active wellness alerts. All students are in good standing.</p>
        )}
      </div>
    </motion.div>
  );
};

export default CounselorWellness;
