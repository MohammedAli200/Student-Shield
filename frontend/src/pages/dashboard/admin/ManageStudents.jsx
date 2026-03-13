// import { useEffect, useState } from 'react';
// import { api } from '../../../services/api';
// import { motion } from 'framer-motion';
// import { Users } from 'lucide-react';

// const ManageStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await api.get('/users?role=Student');
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
//         <Users size={32} className="text-primary" /> Manage Students
//       </h1>
//       <p className="text-gray-600">View and manage student accounts.</p>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="text-left p-4 font-semibold text-gray-800">Name</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Email</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Joined</th>
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
//                   <td className="p-4 text-gray-500">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '-'}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default ManageStudents;




import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { motion } from 'framer-motion';
import { Users, Search, MoreHorizontal, UserPlus, Mail, Calendar, ShieldCheck } from 'lucide-react';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/users?role=Student');
        setStudents(res.data || []);
      } catch {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = students.filter(s =>
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="h-96 w-full flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em]">
            <ShieldCheck size={14} />
            Administration
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Student Directory</h1>
          <p className="text-slate-500 text-sm">Review and manage the active student population within the Guardian ecosystem.</p>
        </div>

        <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
          <UserPlus size={16} />
          Onboard Student
        </button>
      </div>

      {/* Utility Bar */}
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="flex-1 flex items-center gap-3 bg-white px-6 py-4 rounded-[1.5rem] border border-slate-100 shadow-sm">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            className="bg-transparent border-none outline-none text-sm font-medium w-full text-slate-800 placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Student List Grid */}
      <div className="max-w-7xl mx-auto bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identity</th>
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Information</th>
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Enrolled</th>
                <th className="text-right px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <Users size={32} />
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No student records found</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s._id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-sm font-black group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          {s.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 tracking-tight">{s.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ID: {s._id.substring(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={14} className="text-slate-300" />
                        <span className="text-xs font-medium">{s.email}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={14} className="text-slate-300" />
                        <span className="text-xs font-medium">
                          {s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-sm transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-6 bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200">
        <div className="flex gap-10">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Total Students</p>
            <p className="text-xl font-black text-white">{students.length}</p>
          </div>
          <div className="w-px h-8 bg-white/10 self-center"></div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Verified Accounts</p>
            <p className="text-xl font-black text-emerald-400">{students.length}</p>
          </div>
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:block">
          Guardian Data Protocol v2.4.0
        </p>
      </div>
    </motion.div>
  );
};

export default ManageStudents;