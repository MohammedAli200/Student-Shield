// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Calendar, Clock, User } from 'lucide-react';

// const ScheduleSessions = () => {
//   const [sessions] = useState([
//     { id: 1, student: 'John Doe', date: '2025-03-15', time: '10:00 AM', status: 'Scheduled' },
//     { id: 2, student: 'Jane Smith', date: '2025-03-16', time: '2:00 PM', status: 'Pending' },
//     { id: 3, student: 'Alex Brown', date: '2025-03-18', time: '11:00 AM', status: 'Completed' },
//   ]);

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <Calendar size={32} className="text-secondary" /> Schedule Counseling Sessions
//       </h1>
//       <p className="text-gray-600">Manage and schedule counseling sessions with students.</p>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="text-left p-4 font-semibold text-gray-800">Student</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Date</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Time</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Status</th>
//               <th className="text-left p-4 font-semibold text-gray-800">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sessions.map((s) => (
//               <tr key={s.id} className="border-b hover:bg-gray-50">
//                 <td className="p-4 font-medium">{s.student}</td>
//                 <td className="p-4">{s.date}</td>
//                 <td className="p-4">{s.time}</td>
//                 <td className="p-4"><span className={`px-2 py-1 rounded text-sm ${s.status === 'Completed' ? 'bg-green-100 text-green-800' : s.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>{s.status}</span></td>
//                 <td className="p-4"><button className="px-3 py-1 bg-secondary text-white text-sm rounded hover:bg-teal-600">View</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <button className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-teal-600 transition">
//         + Schedule New Session
//       </button>
//     </motion.div>
//   );
// };

// export default ScheduleSessions;




import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Plus, MoreVertical, CheckCircle2, Timer, CalendarCheck } from 'lucide-react';

const ScheduleSessions = () => {
  const [sessions] = useState([
    { id: 1, student: 'John Doe', date: '2026-03-15', time: '10:00 AM', status: 'Scheduled' },
    { id: 2, student: 'Jane Smith', date: '2026-03-16', time: '2:00 PM', status: 'Pending' },
    { id: 3, student: 'Alex Brown', date: '2026-03-18', time: '11:00 AM', status: 'Completed' },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Scheduled': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 size={12} />;
      case 'Scheduled': return <CalendarCheck size={12} />;
      default: return <Timer size={12} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-[10px] uppercase tracking-[0.3em]">
            <Calendar size={14} />
            Counseling Core
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Session Planner</h1>
          <p className="text-slate-500 text-sm max-w-md">Coordinate professional interventions and monitor scheduled student dialogues.</p>
        </div>

        <button className="flex items-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-teal-600/20 active:scale-95">
          <Plus size={18} />
          Schedule New Session
        </button>
      </div>

      {/* Sessions Grid/Table Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Information</th>
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date & Timeline</th>
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Appointment Status</th>
                <th className="text-right px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {sessions.map((s) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group hover:bg-teal-50/20 transition-all duration-300"
                  >
                    {/* Student Identity */}
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center transition-all group-hover:bg-teal-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-200">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 tracking-tight">{s.student}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Student ID: #2024-00{s.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Schedule Column */}
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-xl shadow-sm">
                          <Calendar size={14} className="text-teal-500" />
                          <span className="text-xs font-bold text-slate-600">{new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-slate-300" />
                          <span className="text-xs font-bold text-slate-500">{s.time}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-10 py-7">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${getStatusStyle(s.status)}`}>
                        {getStatusIcon(s.status)}
                        {s.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-10 py-7 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="px-5 py-2.5 bg-white border border-slate-100 text-slate-900 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95 shadow-sm">
                          View Details
                        </button>
                        <button className="p-2.5 text-slate-300 hover:text-slate-600 transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200">
        <div className="flex gap-12">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Bookings</p>
            <p className="text-2xl font-black">{sessions.length}</p>
          </div>
          <div className="w-px h-10 bg-white/10 self-center"></div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Upcoming Today</p>
            <p className="text-2xl font-black text-teal-400">01</p>
          </div>
        </div>
        <div className="mt-6 md:mt-0 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Synced: 02:14 PM</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ScheduleSessions;