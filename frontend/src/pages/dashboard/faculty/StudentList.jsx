// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { api } from '../../../services/api';
// import { motion } from 'framer-motion';
// import { Users, FileEdit } from 'lucide-react';

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await api.get('/faculty/students');
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
//         <Users size={32} className="text-primary" /> Students
//       </h1>
//       <p className="text-gray-600">Select a student to enter their academic, behavioral, and wellness data.</p>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="text-left p-4 font-semibold text-gray-800">Name</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Email</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length === 0 ? (
//               <tr><td colSpan={3} className="p-8 text-center text-gray-500">No students.</td></tr>
//             ) : (
//               students.map((s) => (
//                 <tr key={s._id} className="border-b hover:bg-gray-50">
//                   <td className="p-4 font-medium">{s.name}</td>
//                   <td className="p-4 text-gray-600">{s.email}</td>
//                   <td className="p-4">
//                     <Link to="/faculty/enter-data" state={{ studentId: s._id }} className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white text-sm rounded hover:bg-blue-800">
//                       <FileEdit size={14} /> Enter Data
//                     </Link>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default StudentList;




import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileEdit, ChevronRight, Search, Mail, UserCircle } from 'lucide-react';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/faculty/students');
        setStudents(res.data || []);
      } catch {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 space-y-4">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Retrieving Student Roster...</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto p-4 md:p-10 space-y-10"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em]">
            <Users size={14} />
            Academic Division
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Student Directory</h1>
          <p className="text-slate-500 text-sm max-w-md font-medium">Select a profile to initiate behavioral telemetry or update academic records.</p>
        </div>

        <div className="relative group w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600" size={18} />
          <input
            type="text"
            placeholder="Search database..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Profile</th>
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Communication Identity</th>
                <th className="text-right px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-10 py-20 text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-4">
                        <Users size={32} />
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">No records found in current view</p>
                    </td>
                  </tr>
                ) : (
                  students.map((s, idx) => (
                    <motion.tr
                      key={s._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group hover:bg-indigo-50/30 transition-all duration-300"
                    >
                      {/* Name & Avatar */}
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-200">
                            <UserCircle size={24} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800 tracking-tight">{s.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Verified Student</p>
                          </div>
                        </div>
                      </td>

                      {/* Email Identity */}
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-indigo-500 transition-colors">
                            <Mail size={14} />
                          </div>
                          <span className="text-xs font-bold text-slate-600 tracking-tight">{s.email}</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-10 py-6 text-right">
                        <Link
                          to="/faculty/enter-data"
                          state={{ studentId: s._id }}
                          className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          <FileEdit size={14} className="opacity-70" />
                          Record Data
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-white" />
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Total Database Count: <span className="text-indigo-600">{students.length} Records</span>
        </p>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentList;