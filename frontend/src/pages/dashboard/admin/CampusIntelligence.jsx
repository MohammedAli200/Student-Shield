// // import { useEffect, useState } from 'react';
// // import { api } from '../../../services/api';
// // import { motion } from 'framer-motion';
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
// // import { Activity, Droplet, Bolt } from 'lucide-react';

// // const CampusIntelligence = () => {
// //   const [highRisk, setHighRisk] = useState([]);
// //   const [resources, setResources] = useState([]);
// //   const [alerts, setAlerts] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [riskRes, resRes, alertsRes] = await Promise.all([
// //           api.get('/ai/high-risk?threshold=0').catch(() => ({ data: [] })),
// //           api.get('/resources').catch(() => ({ data: [] })),
// //           api.get('/alerts').catch(() => ({ data: [] })),
// //         ]);
// //         setHighRisk(riskRes.data || []);
// //         setResources(Array.isArray(resRes.data) && resRes.data.length > 0 ? resRes.data : [
// //           { name: 'Hostel A', currentOccupancy: 120, capacity: 150 },
// //           { name: 'Hostel B', currentOccupancy: 145, capacity: 150 },
// //           { name: 'Library', currentOccupancy: 80, capacity: 200 },
// //         ]);
// //         setAlerts(alertsRes.data || []);
// //       } catch {
// //         setHighRisk([]);
// //         setResources([]);
// //         setAlerts([]);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const levelCounts = { 'Low Risk': 0, 'Medium Risk': 0, 'High Risk': 0, 'Critical Risk': 0 };
// //   highRisk.forEach((r) => { if (r.riskLevel) levelCounts[r.riskLevel] = (levelCounts[r.riskLevel] || 0) + 1; });
// //   const pieData = Object.entries(levelCounts).filter(([, v]) => v > 0).map(([n, v]) => ({ name: n, value: v }));
// //   const COLORS = ['#22c55e', '#eab308', '#f97316', '#ef4444'];

// //   const barData = resources.map((r) => ({ name: r.name || 'Resource', occupancy: r.currentOccupancy ?? 0, capacity: r.capacity ?? 100 }));
// //   const trendData = [
// //     { week: 'W1', stress: 65 }, { week: 'W2', stress: 68 }, { week: 'W3', stress: 70 }, { week: 'W4', stress: 67 },
// //   ];

// //   return (
// //     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
// //       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
// //         <Activity size={32} className="text-primary" /> Campus Intelligence Dashboard
// //       </h1>
// //       <p className="text-gray-600">Digital twin: stress heatmap, dropout risk, occupancy & energy analytics.</p>

// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
// //           <div className="p-3 bg-blue-100 text-primary rounded-lg"><Activity size={24} /></div>
// //           <div>
// //             <p className="text-sm text-gray-500">Students Assessed</p>
// //             <p className="text-2xl font-bold text-gray-800">{highRisk.length}</p>
// //           </div>
// //         </div>
// //         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
// //           <div className="p-3 bg-red-100 text-danger rounded-lg">!</div>
// //           <div>
// //             <p className="text-sm text-gray-500">Active Alerts</p>
// //             <p className="text-2xl font-bold text-gray-800">{alerts.length}</p>
// //           </div>
// //         </div>
// //         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
// //           <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><Bolt size={24} /></div>
// //           <div>
// //             <p className="text-sm text-gray-500">Energy (kW)</p>
// //             <p className="text-2xl font-bold text-gray-800">1.2k</p>
// //           </div>
// //         </div>
// //         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
// //           <div className="p-3 bg-teal-100 text-secondary rounded-lg"><Droplet size={24} /></div>
// //           <div>
// //             <p className="text-sm text-gray-500">Water (kL)</p>
// //             <p className="text-2xl font-bold text-gray-800">8.5</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //           <h2 className="text-lg font-bold mb-4 text-gray-800">Dropout Risk Distribution</h2>
// //           {pieData.length > 0 ? (
// //             <div className="h-64">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <PieChart>
// //                   <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
// //                     {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
// //                   </Pie>
// //                   <Tooltip />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </div>
// //           ) : (
// //             <div className="h-64 flex items-center justify-center text-gray-500">No risk data</div>
// //           )}
// //         </div>
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //           <h2 className="text-lg font-bold mb-4 text-gray-800">Hostel & Facility Occupancy</h2>
// //           <div className="h-64">
// //             <ResponsiveContainer width="100%" height="100%">
// //               <BarChart data={barData}>
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Bar dataKey="occupancy" fill="#14B8A6" radius={[4, 4, 0, 0]} name="Occupancy" />
// //                 <Bar dataKey="capacity" fill="#1e3a8a" radius={[4, 4, 0, 0]} name="Capacity" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
// //         <h2 className="text-lg font-bold mb-4 text-gray-800">Campus Stress Trend (Weekly)</h2>
// //         <div className="h-64">
// //           <ResponsiveContainer width="100%" height="100%">
// //             <LineChart data={trendData}>
// //               <XAxis dataKey="week" />
// //               <YAxis />
// //               <Tooltip />
// //               <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Avg Stress Score" />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default CampusIntelligence;




// import { useEffect, useState } from 'react';
// import { api } from '../../../services/api';
// import { motion } from 'framer-motion';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend
// } from 'recharts';
// import { Activity, Droplet, Bolt, ShieldAlert, Users, Zap, Waves, Target, Utensils } from 'lucide-react';

// const CampusIntelligence = () => {
//   const [highRisk, setHighRisk] = useState([]);
//   const [resources, setResources] = useState([]);
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [riskRes, resRes, alertsRes] = await Promise.all([
//           api.get('/ai/high-risk?threshold=0').catch(() => ({ data: [] })),
//           api.get('/resources').catch(() => ({ data: [] })),
//           api.get('/alerts').catch(() => ({ data: [] })),
//         ]);
//         setHighRisk(riskRes.data || []);

//         // Added 'Central Mess' to the fallback/mock data
//         setResources(Array.isArray(resRes.data) && resRes.data.length > 0 ? resRes.data : [
//           { name: 'Hostel A', currentOccupancy: 120, capacity: 150 },
//           { name: 'Hostel B', currentOccupancy: 145, capacity: 150 },
//           { name: 'Library', currentOccupancy: 80, capacity: 200 },
//           { name: 'Central Mess', currentOccupancy: 190, capacity: 200 }, // Mess Tracking
//         ]);
//         setAlerts(alertsRes.data || []);
//       } catch {
//         setHighRisk([]); setResources([]); setAlerts([]);
//       }
//     };
//     fetchData();
//   }, []);

//   const levelCounts = { 'Low Risk': 0, 'Medium Risk': 0, 'High Risk': 0, 'Critical Risk': 0 };
//   highRisk.forEach((r) => { if (r.riskLevel) levelCounts[r.riskLevel] = (levelCounts[r.riskLevel] || 0) + 1; });
//   const pieData = Object.entries(levelCounts).filter(([, v]) => v > 0).map(([n, v]) => ({ name: n, value: v }));
//   const COLORS = ['#10b981', '#f59e0b', '#f97316', '#ef4444'];

//   const barData = resources.map((r) => ({
//     name: r.name,
//     occupancy: r.currentOccupancy,
//     capacity: r.capacity,
//     // Calculate if it's near critical capacity (>90%)
//     isCritical: (r.currentOccupancy / r.capacity) > 0.9
//   }));

//   const trendData = [
//     { week: 'W1', stress: 65 }, { week: 'W2', stress: 68 }, { week: 'W3', stress: 70 }, { week: 'W4', stress: 67 },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="min-h-screen bg-[#f8fafc] p-6 md:p-10 space-y-10"
//     >
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">
//             <Target size={14} /> Global Intelligence Node
//           </div>
//           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Campus Analytics</h1>
//           <p className="text-slate-500 text-sm mt-1">Telemetry overview for facilities, behavior, and utility consumption.</p>
//         </div>
//         <div className="flex gap-3">
//           <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
//             <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
//             <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">Systems Active</span>
//           </div>
//         </div>
//       </div>

//       {/* KPI Cards Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {[
//           { label: 'Total Assessed', val: highRisk.length, icon: <Users />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
//           { label: 'Critical Alerts', val: alerts.length, icon: <ShieldAlert />, color: 'text-rose-600', bg: 'bg-rose-50' },
//           { label: 'Grid Load (kW)', val: '1.2k', icon: <Zap />, color: 'text-amber-600', bg: 'bg-amber-50' },
//           { label: 'Mess Influx', val: barData.find(b => b.name === 'Central Mess')?.occupancy || 0, icon: <Utensils />, color: 'text-orange-600', bg: 'bg-orange-50' },
//         ].map((kpi, i) => (
//           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] group hover:border-indigo-100 transition-colors">
//             <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center mb-6`}>
//               {kpi.icon}
//             </div>
//             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{kpi.label}</p>
//             <p className="text-3xl font-black text-slate-900 mt-1 tracking-tight">{kpi.val}</p>
//           </div>
//         ))}
//       </div>

//       {/* Facility & Risk Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

//         {/* Occupancy Chart with Mess Integration */}
//         <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
//           <div className="flex justify-between items-start mb-8">
//             <div>
//               <h2 className="text-xl font-black text-slate-800 tracking-tight">Facility Capacity</h2>
//               <p className="text-xs text-slate-400 font-bold uppercase mt-1">Real-time occupancy vs total limit</p>
//             </div>
//             <Utensils size={20} className="text-slate-200" />
//           </div>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={barData} barGap={12}>
//                 <CartesianGrid vertical={false} stroke="#f1f5f9" />
//                 <XAxis
//                   dataKey="name"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
//                   dy={10}
//                 />
//                 <YAxis hide />
//                 <Tooltip
//                   cursor={{ fill: '#f8fafc' }}
//                   contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
//                 />
//                 <Bar dataKey="capacity" fill="#e2e8f0" radius={[10, 10, 10, 10]} barSize={24} />
//                 <Bar
//                   dataKey="occupancy"
//                   radius={[10, 10, 10, 10]}
//                   barSize={24}
//                 >
//                   {barData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={entry.isCritical ? '#f43f5e' : '#6366f1'}
//                     />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Dropout Risk Pie */}
//         <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
//           <h2 className="text-xl font-black text-slate-800 mb-8 tracking-tight">Behavioral Risk Distribution</h2>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   innerRadius={80}
//                   outerRadius={110}
//                   paddingAngle={10}
//                   dataKey="value"
//                   stroke="none"
//                 >
//                   {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} cornerRadius={12} />)}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{ borderRadius: '20px', border: 'none', padding: '15px' }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="grid grid-cols-2 gap-4 mt-4">
//             {pieData.map((item, i) => (
//               <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
//                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
//                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
//                 <span className="ml-auto font-black text-slate-900">{item.value}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Stress Trend (Full Width) */}
//       <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl shadow-slate-200 overflow-hidden relative">
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
//         <div className="relative z-10">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
//             <div>
//               <h2 className="text-2xl font-black tracking-tight">Campus Stress Telemetry</h2>
//               <p className="text-slate-400 text-sm mt-1">Weekly biometric trend analysis across all students.</p>
//             </div>
//             <div className="flex gap-2">
//               <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-rose-400">Trend: Rising</div>
//             </div>
//           </div>
//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={trendData}>
//                 <defs>
//                   <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
//                     <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
//                 <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 800 }} dy={10} />
//                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '15px', color: '#fff' }} />
//                 <Area
//                   type="monotone"
//                   dataKey="stress"
//                   stroke="#ef4444"
//                   strokeWidth={4}
//                   fillOpacity={1}
//                   fill="url(#colorStress)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CampusIntelligence;




import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid
} from 'recharts';
import { Activity, Droplet, Bolt, ShieldAlert, Users, Zap, Waves, Target, Utensils } from 'lucide-react';

const CampusIntelligence = () => {
  const [highRisk, setHighRisk] = useState([]);
  const [resources, setResources] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [riskRes, resRes, alertsRes] = await Promise.all([
          api.get('/ai/high-risk?threshold=0').catch(() => ({ data: [] })),
          api.get('/resources').catch(() => ({ data: [] })),
          api.get('/alerts').catch(() => ({ data: [] })),
        ]);
        setHighRisk(riskRes.data || []);

        // Ensure Central Mess is included in the data mapping
        setResources(Array.isArray(resRes.data) && resRes.data.length > 0 ? resRes.data : [
          { name: 'Hostel A', currentOccupancy: 120, capacity: 150 },
          { name: 'Hostel B', currentOccupancy: 145, capacity: 150 },
          { name: 'Library', currentOccupancy: 80, capacity: 200 },
          { name: 'Central Mess', currentOccupancy: 185, capacity: 200 }, // Added Mess
        ]);
        setAlerts(alertsRes.data || []);
      } catch {
        setHighRisk([]); setResources([]); setAlerts([]);
      }
    };
    fetchData();
  }, []);

  const levelCounts = { 'Low Risk': 0, 'Medium Risk': 0, 'High Risk': 0, 'Critical Risk': 0 };
  highRisk.forEach((r) => { if (r.riskLevel) levelCounts[r.riskLevel] = (levelCounts[r.riskLevel] || 0) + 1; });
  const pieData = Object.entries(levelCounts).filter(([, v]) => v > 0).map(([n, v]) => ({ name: n, value: v }));
  const COLORS = ['#10b981', '#f59e0b', '#f97316', '#ef4444'];

  const barData = resources.map((r) => ({
    name: r.name,
    occupancy: r.currentOccupancy,
    capacity: r.capacity,
    isCritical: (r.currentOccupancy / r.capacity) > 0.9
  }));

  const trendData = [
    { week: 'W1', stress: 65 }, { week: 'W2', stress: 68 }, { week: 'W3', stress: 70 }, { week: 'W4', stress: 67 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#f8fafc] p-6 md:p-10 space-y-10"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">
            <Target size={14} /> Global Intelligence Node
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Campus Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time telemetry for facilities, behavior, and utilities.</p>
        </div>
        <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">Core Active</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Assessed', val: highRisk.length, icon: <Users />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Critical Alerts', val: alerts.length, icon: <ShieldAlert />, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Grid Load (kW)', val: '1.2k', icon: <Zap />, color: 'text-amber-600', bg: 'bg-amber-50' },
          {
            label: 'Mess Influx',
            val: barData.find(b => b.name === 'Central Mess')?.occupancy || '0',
            icon: <Utensils />,
            color: 'text-orange-600',
            bg: 'bg-orange-50'
          },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] group hover:border-indigo-200 transition-all">
            <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center mb-6`}>
              {kpi.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{kpi.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{kpi.val}</p>
          </div>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Updated Facility Bar Chart */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Facility Capacity</h2>
            <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Activity size={18} /></div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barGap={12}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                  dy={10}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="capacity" fill="#e2e8f0" radius={[10, 10, 10, 10]} barSize={24} />
                <Bar dataKey="occupancy" radius={[10, 10, 10, 10]} barSize={24}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isCritical ? '#f43f5e' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Pie */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
          <h2 className="text-xl font-black text-slate-800 mb-8 tracking-tight">Behavioral Risk Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} cornerRadius={12} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                <span className="ml-auto font-black text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Stress Full-Width Chart */}
      <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black tracking-tight mb-2">Campus Stress Telemetry</h2>
          <p className="text-slate-400 text-sm mb-10">Aggregated biometric signals from connected campus IoT nodes.</p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 800 }} dy={10} />
                <Area type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={4} fill="url(#colorStress)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CampusIntelligence;