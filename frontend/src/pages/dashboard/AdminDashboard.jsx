// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { SocketContext } from '../../context/SocketContext';
// import { api } from '../../services/api';
// import { motion } from 'framer-motion';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { Server, Users, Bolt, Droplet } from 'lucide-react';

// const AdminDashboard = () => {
//     const { user } = useContext(AuthContext);
//     const socket = useContext(SocketContext);
//     const [resources, setResources] = useState([]);

//     useEffect(() => {
//         const fetchResources = async () => {
//             try {
//                 const res = await api.get('/resources');
//                 setResources(Array.isArray(res.data) && res.data.length > 0 ? res.data : [
//                     { _id: '1', name: 'Boys Hostel A', type: 'HostelRoom', currentOccupancy: 120, capacity: 150 },
//                     { _id: '2', name: 'Girls Hostel B', type: 'HostelRoom', currentOccupancy: 145, capacity: 150 },
//                     { _id: '3', name: 'Main Library', type: 'StudyRoom', currentOccupancy: 80, capacity: 200 }
//                 ]);
//             } catch {
//                 setResources([
//                     { _id: '1', name: 'Boys Hostel A', type: 'HostelRoom', currentOccupancy: 120, capacity: 150 },
//                     { _id: '2', name: 'Girls Hostel B', type: 'HostelRoom', currentOccupancy: 145, capacity: 150 },
//                     { _id: '3', name: 'Main Library', type: 'StudyRoom', currentOccupancy: 80, capacity: 200 }
//                 ]);
//             }
//         };

//         fetchResources();

//         if (socket) {
//             socket.on('resourceUpdated', (updatedResource) => {
//                 setResources(prev => prev.map(r => r._id === updatedResource._id ? updatedResource : r));
//             });
//         }

//         return () => {
//             if (socket) socket.off('resourceUpdated');
//         };
//     }, [socket]);

//     const chartData = resources.map(r => ({
//         name: r.name,
//         Occupancy: r.currentOccupancy,
//         Capacity: r.capacity
//     }));

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//             <h1 className="text-3xl font-bold text-gray-800">Admin Smart Campus Panel</h1>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
//                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><Users size={24} /></div>
//                    <div>
//                        <p className="text-sm text-gray-500">Total Students</p>
//                        <p className="text-2xl font-bold text-gray-800">4,520</p>
//                    </div>
//                </div>
//                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
//                    <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Server size={24} /></div>
//                    <div>
//                        <p className="text-sm text-gray-500">Active Sensors</p>
//                        <p className="text-2xl font-bold text-gray-800">128</p>
//                    </div>
//                </div>
//                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
//                    <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg"><Bolt size={24} /></div>
//                    <div>
//                        <p className="text-sm text-gray-500">Energy Load</p>
//                        <p className="text-2xl font-bold text-gray-800">1.2 MW</p>
//                    </div>
//                </div>
//                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
//                   <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Droplet size={24} /></div>
//                    <div>
//                        <p className="text-sm text-gray-500">Water Usage</p>
//                        <p className="text-2xl font-bold text-gray-800">8.5 kL</p>
//                    </div>
//                </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                    <h2 className="text-xl font-bold mb-4 text-gray-800">Campus Facility Occupancy</h2>
//                    <div className="h-64">
//                        <ResponsiveContainer width="100%" height="100%">
//                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//                                <XAxis dataKey="name" />
//                                <YAxis />
//                                <Tooltip />
//                                <Bar dataKey="Occupancy" fill="#14B8A6" radius={[4, 4, 0, 0]} />
//                                <Bar dataKey="Capacity" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
//                            </BarChart>
//                        </ResponsiveContainer>
//                    </div>
//                </div>

//                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                    <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
//                    <div className="space-y-4">
//                        <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition cursor-pointer flex justify-between items-center group">
//                            <span className="font-semibold text-gray-700 group-hover:text-primary">Manage Users (Students/Counselors)</span>
//                            <span className="text-gray-400 group-hover:text-primary">→</span>
//                        </button>
//                        <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition cursor-pointer flex justify-between items-center group">
//                            <span className="font-semibold text-gray-700 group-hover:text-primary">View Global Dashboard</span>
//                            <span className="text-gray-400 group-hover:text-primary">→</span>
//                        </button>
//                        <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition cursor-pointer flex justify-between items-center group">
//                            <span className="font-semibold text-gray-700 group-hover:text-primary">Predictive Heatmaps</span>
//                            <span className="text-gray-400 group-hover:text-primary">→</span>
//                        </button>
//                    </div>
//                </div>
//             </div>
//         </motion.div>
//     );
// };

// export default AdminDashboard;




import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { Server, Users, Bolt, Droplet, ArrowRight, Cpu, Activity, ShieldCheck } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await api.get('/resources');
                setResources(Array.isArray(res.data) && res.data.length > 0 ? res.data : [
                    { _id: '1', name: 'Boys Hostel A', type: 'HostelRoom', currentOccupancy: 120, capacity: 150 },
                    { _id: '2', name: 'Girls Hostel B', type: 'HostelRoom', currentOccupancy: 145, capacity: 150 },
                    { _id: '3', name: 'Main Library', type: 'StudyRoom', currentOccupancy: 80, capacity: 200 }
                ]);
            } catch {
                setResources([
                    { _id: '1', name: 'Boys Hostel A', type: 'HostelRoom', currentOccupancy: 120, capacity: 150 },
                    { _id: '2', name: 'Girls Hostel B', type: 'HostelRoom', currentOccupancy: 145, capacity: 150 },
                    { _id: '3', name: 'Main Library', type: 'StudyRoom', currentOccupancy: 80, capacity: 200 }
                ]);
            }
        };

        fetchResources();

        if (socket) {
            socket.on('resourceUpdated', (updatedResource) => {
                setResources(prev => prev.map(r => r._id === updatedResource._id ? updatedResource : r));
            });
        }

        return () => { if (socket) socket.off('resourceUpdated'); };
    }, [socket]);

    const chartData = resources.map(r => ({
        name: r.name.split(' ').pop(), // Shortened name for cleaner X-Axis
        Occupancy: r.currentOccupancy,
        Capacity: r.capacity,
        percentage: Math.round((r.currentOccupancy / r.capacity) * 100)
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
        >
            {/* Top Branding & Status */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em]">
                        <Cpu size={14} className="animate-spin-slow" />
                        System Core v4.2
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Campus Control</h1>
                    <p className="text-slate-500 text-sm font-medium">Global infrastructure and user management portal.</p>
                </div>

                <div className="flex items-center gap-4 px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <div className="h-8 w-px bg-slate-100"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                        1 Admins <br /> <span className="text-emerald-500">Online</span>
                    </p>
                </div>
            </div>

            {/* Telemetry KPI Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Students', val: '4,520', icon: <Users />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Active Nodes', val: '128', icon: <Server />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Grid Load', val: '1.2 MW', icon: <Bolt />, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Hydraulics', val: '8.5 kL', icon: <Droplet />, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                ].map((kpi, i) => (
                    <motion.div
                        whileHover={{ y: -5 }}
                        key={i}
                        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all"
                    >
                        <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center mb-6`}>
                            {kpi.icon}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                        <p className="text-3xl font-black text-slate-900 mt-1">{kpi.val}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Infrastructure Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Large Chart Container */}
                <div className="lg:col-span-2 bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Facility Saturation</h2>
                        <div className="flex gap-2">
                            <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-wider">Live Flux</div>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} barGap={15}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                                <Bar dataKey="Occupancy" fill="#6366f1" radius={[10, 10, 10, 10]} barSize={35} />
                                <Bar dataKey="Capacity" fill="#e2e8f0" radius={[10, 10, 10, 10]} barSize={35} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Command Center Quick Actions */}
                <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl shadow-slate-200 flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center">
                            <ShieldCheck size={20} />
                        </div>
                        <h2 className="text-lg font-bold">Admin Console</h2>
                    </div>

                    <div className="space-y-4 flex-1">
                        {[
                            { title: 'User Identity Hub', desc: 'Manage Roles & Access', color: 'bg-indigo-500' },
                            { title: 'Campus Intelligence', desc: 'View AI Predictive Heatmaps', color: 'bg-emerald-500' },
                            { title: 'Global Settings', desc: 'System-wide configuration', color: 'bg-amber-500' }
                        ].map((action, i) => (
                            <button key={i} className="w-full text-left p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-1 h-full ${action.color}`}></div>
                                <div className="flex justify-between items-center relative z-10">
                                    <div>
                                        <p className="text-[13px] font-bold text-white tracking-tight">{action.title}</p>
                                        <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">{action.desc}</p>
                                    </div>
                                    <ArrowRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Secure Node 01-A Active</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;