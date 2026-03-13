// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { SocketContext } from '../../context/SocketContext';
// import { api } from '../../services/api';
// import { motion, AnimatePresence } from 'framer-motion';
// import { AlertTriangle, Users, BookOpen } from 'lucide-react';

// const CounselorDashboard = () => {
//     const { user } = useContext(AuthContext);
//     const socket = useContext(SocketContext);
//     const [alerts, setAlerts] = useState([]);

//     useEffect(() => {
//         const fetchAlerts = async () => {
//             try {
//                 const res = await api.get('/alerts');
//                 setAlerts(res.data);
//             } catch (error) {
//                 console.error('Error fetching alerts', error);
//             }
//         };

//         fetchAlerts();

//         if (socket) {
//             socket.on('newAlert', (alert) => {
//                 setAlerts(prev => [alert, ...prev]);
//             });
//         }

//         return () => {
//             if (socket) socket.off('newAlert');
//         };
//     }, [socket, user]);

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//             <h1 className="text-3xl font-bold text-gray-800">Counselor Dashboard</h1>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
//                    <div>
//                        <p className="text-gray-500 font-medium">Active Alerts</p>
//                        <h2 className="text-3xl font-bold text-danger">{alerts.length}</h2>
//                    </div>
//                    <div className="bg-red-100 p-4 rounded-full text-danger"><AlertTriangle size={32} /></div>
//                </div>
//                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
//                    <div>
//                        <p className="text-gray-500 font-medium">Assigned Students</p>
//                        <h2 className="text-3xl font-bold text-primary">24</h2>
//                    </div>
//                    <div className="bg-blue-100 p-4 rounded-full text-primary"><Users size={32} /></div>
//                </div>
//                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
//                    <div>
//                        <p className="text-gray-500 font-medium">Pending Sessions</p>
//                        <h2 className="text-3xl font-bold text-secondary">5</h2>
//                    </div>
//                    <div className="bg-teal-100 p-4 rounded-full text-secondary"><BookOpen size={32} /></div>
//                </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-xl font-bold mb-4 text-gray-800">Recent High Risk Alerts</h2>
//                 {alerts.length === 0 ? (
//                     <p className="text-gray-500">No active alerts. Good job!</p>
//                 ) : (
//                     <div className="space-y-3">
//                         <AnimatePresence>
//                             {alerts.map(alert => (
//                                 <motion.div 
//                                     key={alert._id} 
//                                     initial={{ opacity: 0, y: 10 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0 }}
//                                     className="p-4 border border-red-200 bg-red-50 rounded-lg flex justify-between items-center"
//                                 >
//                                     <div>
//                                         <p className="text-danger font-semibold flex items-center gap-2">
//                                             <AlertTriangle size={18} /> {alert.message}
//                                         </p>
//                                         <p className="text-sm text-gray-600 mt-1">Student ID: {alert.student?._id || alert.student}</p>
//                                     </div>
//                                     <button className="px-4 py-2 bg-white border border-danger text-danger rounded hover:bg-danger hover:text-white transition text-sm shadow-sm">
//                                         Review Case
//                                     </button>
//                                 </motion.div>
//                             ))}
//                         </AnimatePresence>
//                     </div>
//                 )}
//             </div>
//         </motion.div>
//     );
// };

// export default CounselorDashboard;





import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import { api } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Users, BookOpen, ChevronRight, Activity, ShieldAlert, HeartPulse } from 'lucide-react';

const CounselorDashboard = () => {
    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await api.get('/alerts');
                setAlerts(res.data);
            } catch (error) {
                console.error('Error fetching alerts', error);
            }
        };

        fetchAlerts();

        if (socket) {
            socket.on('newAlert', (alert) => {
                setAlerts(prev => [alert, ...prev]);
            });
        }

        return () => { if (socket) socket.off('newAlert'); };
    }, [socket, user]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
        >
            {/* Header with Presence Status */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-rose-600 font-bold text-[10px] uppercase tracking-[0.3em]">
                        <HeartPulse size={14} className="animate-pulse" />
                        Live Monitoring Active
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Counselor Portal</h1>
                    <p className="text-slate-500 text-sm font-medium">Monitoring behavioral trends and psychological safety alerts.</p>
                </div>

                <div className="flex items-center gap-4 px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Counselor Duty</p>
                        <p className="text-xs font-bold text-slate-900">{user?.name || "Active Session"}</p>
                    </div>
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0) || "C"}
                    </div>
                </div>
            </div>

            {/* Response Metrics Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Critical Alerts', val: alerts.length, icon: <AlertTriangle />, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
                    { label: 'Student Roster', val: '24', icon: <Users />, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
                    { label: 'Pending Sessions', val: '05', icon: <BookOpen />, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
                ].map((kpi, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className={`bg-white p-8 rounded-[2.5rem] border ${kpi.border} shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex items-center justify-between relative overflow-hidden group`}
                    >
                        <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 ${kpi.color}`}>
                            {kpi.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{kpi.label}</p>
                            <h2 className={`text-4xl font-black ${kpi.color} tracking-tighter`}>{kpi.val}</h2>
                        </div>
                        <div className={`w-14 h-14 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center`}>
                            {kpi.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Alert Response Center */}
            <div className="max-w-7xl mx-auto bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] p-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                            <ShieldAlert size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Active Intervention Queue</h2>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-2 bg-slate-50 rounded-full">
                        {alerts.length} Flagged Profiles
                    </div>
                </div>

                {alerts.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mb-6">
                            <Activity size={40} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">All Clear</h3>
                        <p className="text-slate-400 text-sm mt-1">No active behavioral risks detected in the last cycle.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {alerts.map((alert, idx) => (
                                <motion.div
                                    key={alert._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-rose-200 hover:shadow-xl hover:shadow-rose-900/5 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                                            <AlertTriangle size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-black text-slate-800 tracking-tight leading-snug">{alert.message}</p>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-md">Critical</span>
                                                <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {alert.student?._id?.substring(0, 8) || "REF-TEMP"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-200 transition-all active:scale-95">
                                        Begin Case Review
                                        <ChevronRight size={14} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default CounselorDashboard;