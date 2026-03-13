// import { useEffect, useState } from 'react';
// import { SocketContext } from '../../../context/SocketContext';
// import { api } from '../../../services/api';
// import { useContext } from 'react';
// import { motion } from 'framer-motion';
// import { AlertTriangle, FileText } from 'lucide-react';

// const AlertsLogs = () => {
//   const socket = useContext(SocketContext);
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await api.get('/alerts');
//         setAlerts(res.data || []);
//       } catch {
//         setAlerts([]);
//       }
//     };
//     fetchData();

//     if (socket) {
//       socket.on('newAlert', (a) => setAlerts((prev) => [a, ...prev]));
//       return () => socket.off('newAlert');
//     }
//   }, [socket]);

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <FileText size={32} className="text-primary" /> Alerts & Logs
//       </h1>
//       <p className="text-gray-600">All intervention alerts and system logs.</p>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="text-left p-4 font-semibold text-gray-800">Message</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Student</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Risk Score</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Status</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {alerts.length === 0 ? (
//               <tr><td colSpan={5} className="p-8 text-center text-gray-500">No alerts.</td></tr>
//             ) : (
//               alerts.map((a) => (
//                 <tr key={a._id} className="border-b hover:bg-gray-50">
//                   <td className="p-4 flex items-center gap-2">
//                     <AlertTriangle size={18} className="text-danger" /> {a.message}
//                   </td>
//                   <td className="p-4">{a.student?.name || a.student || 'N/A'}</td>
//                   <td className="p-4 font-bold text-red-600">{a.riskScore}</td>
//                   <td className="p-4">{a.status || 'Open'}</td>
//                   <td className="p-4 text-gray-500">{a.createdAt ? new Date(a.createdAt).toLocaleString() : '-'}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default AlertsLogs;



import { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { api } from '../../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, FileText, Bell, Search, Filter, Clock } from 'lucide-react';

const AlertsLogs = () => {
  const socket = useContext(SocketContext);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/alerts');
        setAlerts(res.data || []);
      } catch {
        setAlerts([]);
      }
    };
    fetchData();

    if (socket) {
      socket.on('newAlert', (a) => setAlerts((prev) => [a, ...prev]));
      return () => socket.off('newAlert');
    }
  }, [socket]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-8"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-[10px] uppercase tracking-[0.3em]">
            <Bell size={14} fill="currentColor" className="animate-pulse" />
            Live Monitoring
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Logs</h1>
          <p className="text-slate-500 text-sm max-w-lg">Real-time intervention triggers and high-priority behavioral alerts.</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-400">
            <Search size={16} />
            <input type="text" placeholder="Search logs..." className="bg-transparent border-none outline-none text-xs font-bold w-32" />
          </div>
          <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Main Logs Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-[3rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Table Header - Custom Flex Header */}
        <div className="grid grid-cols-12 gap-4 px-8 py-6 bg-slate-50/50 border-b border-slate-100">
          <div className="col-span-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Incident Message</div>
          <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Affected Student</div>
          <div className="col-span-1 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Risk</div>
          <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</div>
          <div className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Timestamp</div>
        </div>

        {/* Scrollable Body */}
        <div className="divide-y divide-slate-50">
          <AnimatePresence initial={false}>
            {alerts.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <FileText size={32} />
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Clear Skies. No Alerts.</p>
              </motion.div>
            ) : (
              alerts.map((a) => (
                <motion.div
                  key={a._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="grid grid-cols-12 gap-4 px-8 py-6 hover:bg-slate-50/50 transition-all items-center group"
                >
                  {/* Message Column */}
                  <div className="col-span-5 flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${a.riskScore > 75 ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 tracking-tight leading-tight">{a.message}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">ID: {a._id.substring(0, 8)}</p>
                    </div>
                  </div>

                  {/* Student Column */}
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-[10px] font-black text-indigo-600">
                      {(a.student?.name || a.student || 'N').charAt(0)}
                    </div>
                    <p className="text-xs font-bold text-slate-600">{a.student?.name || a.student || 'Unknown'}</p>
                  </div>

                  {/* Risk Score Column */}
                  <div className="col-span-1 text-center">
                    <span className={`font-mono text-xs font-black px-2 py-1 rounded-lg ${a.riskScore > 75 ? 'text-rose-600 bg-rose-50' : 'text-amber-600 bg-amber-50'
                      }`}>
                      {a.riskScore}
                    </span>
                  </div>

                  {/* Status Column */}
                  <div className="col-span-2 text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-slate-900 group-hover:text-white transition-all">
                      {a.status || 'Open'}
                    </span>
                  </div>

                  {/* Date Column */}
                  <div className="col-span-2 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <Clock size={12} />
                      <p className="text-[10px] font-bold">
                        {a.createdAt ? new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                      </p>
                    </div>
                    <p className="text-[9px] text-slate-300 font-medium mt-0.5">
                      {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '-'}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer System Stats */}
      <div className="max-w-7xl mx-auto flex items-center justify-between p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <FileText size={100} />
        </div>
        <div className="relative z-10 flex gap-10">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Session Alerts</p>
            <p className="text-2xl font-black">{alerts.length}</p>
          </div>
          <div className="w-px h-10 bg-white/10 self-center"></div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Interventions</p>
            <p className="text-2xl font-black text-emerald-400">04</p>
          </div>
        </div>
        <button className="relative z-10 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          Export Audit Log
        </button>
      </div>
    </motion.div>
  );
};

export default AlertsLogs;