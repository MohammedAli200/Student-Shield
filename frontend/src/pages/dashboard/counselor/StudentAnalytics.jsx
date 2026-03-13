// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../../context/AuthContext';
// import { api } from '../../../services/api';
// import { motion } from 'framer-motion';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { BarChart2 } from 'lucide-react';

// const StudentAnalytics = () => {
//   const [highRisk, setHighRisk] = useState([]);
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [riskRes, alertsRes] = await Promise.all([
//           api.get('/ai/high-risk?threshold=0'),
//           api.get('/alerts'),
//         ]);
//         setHighRisk(riskRes.data || []);
//         setAlerts(alertsRes.data || []);
//       } catch {
//         setHighRisk([]);
//         setAlerts([]);
//       }
//     };
//     fetchData();
//   }, []);

//   const levelCounts = { 'Low Risk': 0, 'Medium Risk': 0, 'High Risk': 0, 'Critical Risk': 0 };
//   highRisk.forEach((r) => {
//     if (r.riskLevel) levelCounts[r.riskLevel] = (levelCounts[r.riskLevel] || 0) + 1;
//   });
//   const pieData = Object.entries(levelCounts).filter(([, v]) => v > 0).map(([n, v]) => ({ name: n, value: v }));

//   const COLORS = ['#22c55e', '#eab308', '#f97316', '#ef4444'];

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <BarChart2 size={32} className="text-primary" /> Student Analytics
//       </h1>
//       <p className="text-gray-600">Risk distribution and behavior indicators across students.</p>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">Total Assessed</p>
//           <p className="text-2xl font-bold text-gray-800">{highRisk.length}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">Active Alerts</p>
//           <p className="text-2xl font-bold text-danger">{alerts.length}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">High Risk</p>
//           <p className="text-2xl font-bold text-amber-600">{highRisk.filter((r) => r.score >= 61 && r.score <= 80).length}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//           <p className="text-sm text-gray-500">Critical</p>
//           <p className="text-2xl font-bold text-red-600">{highRisk.filter((r) => r.score >= 81).length}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-bold mb-4 text-gray-800">Risk Distribution</h2>
//           {pieData.length > 0 ? (
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
//                     {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           ) : (
//             <p className="text-gray-500 py-8 text-center">No risk data yet.</p>
//           )}
//         </div>
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-bold mb-4 text-gray-800">Recent Alerts</h2>
//           {alerts.length === 0 ? (
//             <p className="text-gray-500">No alerts.</p>
//           ) : (
//             <div className="space-y-2 max-h-64 overflow-y-auto">
//               {alerts.slice(0, 10).map((a) => (
//                 <div key={a._id} className="p-3 bg-red-50 rounded border border-red-100">
//                   <p className="text-sm font-medium text-gray-800">{a.message}</p>
//                   <p className="text-xs text-gray-500">Score: {a.riskScore}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default StudentAnalytics;





import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { api } from '../../../services/api';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BarChart2, Activity, ShieldAlert, Users, TrendingUp, Clock, ChevronRight } from 'lucide-react';

const StudentAnalytics = () => {
  const [highRisk, setHighRisk] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [riskRes, alertsRes] = await Promise.all([
          api.get('/ai/high-risk?threshold=0'),
          api.get('/alerts'),
        ]);
        setHighRisk(riskRes.data || []);
        setAlerts(alertsRes.data || []);
      } catch {
        setHighRisk([]);
        setAlerts([]);
      }
    };
    fetchData();
  }, []);

  const levelCounts = { 'Low Risk': 0, 'Medium Risk': 0, 'High Risk': 0, 'Critical Risk': 0 };
  highRisk.forEach((r) => {
    if (r.riskLevel) levelCounts[r.riskLevel] = (levelCounts[r.riskLevel] || 0) + 1;
  });

  const pieData = Object.entries(levelCounts)
    .filter(([, v]) => v > 0)
    .map(([n, v]) => ({ name: n, value: v }));

  const COLORS = ['#10b981', '#f59e0b', '#f97316', '#ef4444'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
    >
      {/* Analytics Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">
          <TrendingUp size={14} /> Population Intelligence
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Student Analytics</h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Distribution of risk factors and real-time behavioral indicators.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Clock size={14} className="text-indigo-500" />
            Updated: Just Now
          </div>
        </div>
      </div>

      {/* Metric Tiles */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Assessed', val: highRisk.length, icon: <Users />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Active Alerts', val: alerts.length, icon: <ShieldAlert />, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'High Risk', val: highRisk.filter(r => r.score >= 61 && r.score <= 80).length, icon: <Activity />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Critical', val: highRisk.filter(r => r.score >= 81).length, icon: <ShieldAlert />, color: 'text-rose-700', bg: 'bg-rose-100' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.02)] group hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-500">
            <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
              {kpi.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{kpi.label}</p>
            <p className={`text-3xl font-black mt-1 ${kpi.color}`}>{kpi.val}</p>
          </div>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Risk Donut Chart */}
        <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Risk Distribution</h2>
            <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
              <BarChart2 size={18} />
            </div>
          </div>
          {pieData.length > 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                    <span className="ml-auto text-xs font-black text-slate-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm font-bold uppercase tracking-widest">
              No telemetry data available
            </div>
          )}
        </div>

        {/* Recent Alerts Feed */}
        <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Live Incident Feed</h2>
            <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-wider">Live</span>
          </div>

          {alerts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center pb-10">
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mb-4">
                <ShieldAlert size={32} />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No active incidents</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {alerts.slice(0, 10).map((a) => (
                <div key={a._id} className="group p-5 bg-white border border-slate-100 rounded-3xl hover:border-rose-200 hover:shadow-lg hover:shadow-rose-900/5 transition-all flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${a.riskScore >= 80 ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                    <ShieldAlert size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 tracking-tight line-clamp-1">{a.message}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score: {a.riskScore}</span>
                      <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Just Now</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-rose-500 transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StudentAnalytics;