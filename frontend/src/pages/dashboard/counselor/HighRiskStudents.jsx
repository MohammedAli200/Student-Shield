// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../../context/AuthContext';
// import { api } from '../../../services/api';
// import { motion } from 'framer-motion';
// import { AlertTriangle, Users } from 'lucide-react';

// const HighRiskStudents = () => {
//   const { user } = useContext(AuthContext);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await api.get('/ai/high-risk?threshold=60');
//         setStudents(res.data || []);
//       } catch {
//         setStudents([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <AlertTriangle size={32} className="text-danger" /> High Risk Students
//       </h1>
//       <p className="text-gray-600">Students with elevated risk scores requiring attention.</p>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="text-left p-4 font-semibold text-gray-800">Student</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Email</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Risk Score</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Level</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length === 0 ? (
//               <tr><td colSpan={5} className="p-8 text-center text-gray-500">No high-risk students.</td></tr>
//             ) : (
//               students.map((r) => (
//                 <tr key={r._id} className="border-b hover:bg-gray-50">
//                   <td className="p-4 font-medium">{r.student?.name || 'N/A'}</td>
//                   <td className="p-4 text-gray-600">{r.student?.email || 'N/A'}</td>
//                   <td className="p-4"><span className={`font-bold ${r.score >= 81 ? 'text-red-600' : 'text-amber-600'}`}>{r.score}</span></td>
//                   <td className="p-4">{r.riskLevel}</td>
//                   <td className="p-4"><button className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-blue-800">Review</button></td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default HighRiskStudents;






import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { api } from '../../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, User, ExternalLink, ShieldAlert, Search, Filter, Mail } from 'lucide-react';

const HighRiskStudents = () => {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/ai/high-risk?threshold=60');
        setStudents(res.data || []);
      } catch {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = students.filter(s =>
    s.student?.name?.toLowerCase().includes(filterQuery.toLowerCase())
  );

  if (loading) return (
    <div className="h-96 w-full flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
    >
      {/* Critical Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-[10px] uppercase tracking-[0.3em]">
            <ShieldAlert size={14} className="animate-pulse" />
            Intervention Priority
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Risk Watchlist</h1>
          <p className="text-slate-500 text-sm max-w-md">Predictive modeling has flagged the following profiles for immediate counselor review.</p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-400">
            <Search size={16} />
            <input
              type="text"
              placeholder="Filter name..."
              className="bg-transparent border-none outline-none text-xs font-bold w-32 text-slate-800"
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Watchlist Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Profile</th>
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Risk Score</th>
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Severity Level</th>
                <th className="text-right px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-24 text-center">
                      <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
                        <ShieldAlert size={40} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">No Critical Risks</h3>
                      <p className="text-sm text-slate-400 mt-1">All student scores are currently below the threshold.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <motion.tr
                      layout
                      key={r._id}
                      className="group hover:bg-rose-50/20 transition-all duration-300"
                    >
                      <td className="px-10 py-7">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all ${r.score >= 81 ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'bg-amber-100 text-amber-700'
                            }`}>
                            {r.student?.name?.charAt(0) || <User size={18} />}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800 tracking-tight">{r.student?.name || 'Anonymous'}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Mail size={12} className="text-slate-300" />
                              <p className="text-[10px] text-slate-400 font-bold">{r.student?.email || 'No contact provided'}</p>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-10 py-7 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className={`text-2xl font-black tracking-tighter ${r.score >= 81 ? 'text-rose-600' : 'text-amber-600'
                            }`}>
                            {r.score}
                          </span>
                          <div className="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                            <div
                              className={`h-full ${r.score >= 81 ? 'bg-rose-600' : 'bg-amber-600'}`}
                              style={{ width: `${r.score}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-10 py-7 text-center">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl ${r.score >= 81 ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                          {r.riskLevel}
                        </span>
                      </td>

                      <td className="px-10 py-7 text-right">
                        <button className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:shadow-xl transition-all active:scale-95 group">
                          Review Case
                          <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Watchlist Footer */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200">
        <div className="flex gap-12">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Flags</p>
            <p className="text-2xl font-black">{filtered.length}</p>
          </div>
          <div className="w-px h-10 bg-white/10 self-center"></div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Critical (80+)</p>
            <p className="text-2xl font-black text-rose-500">
              {filtered.filter(s => s.score >= 81).length}
            </p>
          </div>
        </div>
        <div className="mt-6 md:mt-0 text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Version 1.0.4</p>
          <p className="text-[9px] text-slate-600 mt-1">AI-Powered behavioral assessment is live.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HighRiskStudents;