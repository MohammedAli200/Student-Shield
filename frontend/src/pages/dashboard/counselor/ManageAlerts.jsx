import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { SocketContext } from '../../../context/SocketContext';
import { api } from '../../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const ManageAlerts = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
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

    if (socket) {
      socket.on('newAlert', (alert) => setAlerts((prev) => [alert, ...prev]));
      return () => socket.off('newAlert');
    }
  }, [socket]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <AlertTriangle size={32} className="text-danger" /> Intervention Alerts
      </h1>
      <p className="text-gray-600">Review and manage early intervention alerts for at-risk students.</p>

      <div className="space-y-4">
        <AnimatePresence>
          {alerts.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">No active alerts.</div>
          ) : (
            alerts.map((alert) => (
              <motion.div
                key={alert._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-6 bg-white rounded-xl border border-red-100 bg-red-50/50 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-danger" /> {alert.message}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Student: {alert.student?.name || alert.student || 'N/A'}</p>
                  <p className="text-sm text-gray-500">Risk Score: {alert.riskScore} | Status: {alert.status || 'Open'}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition text-sm">Review Case</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">Resolve</button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ManageAlerts;
