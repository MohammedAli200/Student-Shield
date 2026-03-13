// import { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { motion } from 'framer-motion';
// import { FileEdit, Users } from 'lucide-react';

// const FacultyDashboard = () => {
//   const { user } = useContext(AuthContext);

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}</h1>
//       <p className="text-gray-600">Enter and manage student academic, behavioral, and wellness data. Only Faculty can enter this data.</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Link to="/faculty/enter-data" className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-primary text-white rounded-lg"><FileEdit size={28} /></div>
//             <div>
//               <h2 className="text-lg font-bold text-gray-800">Enter Student Data</h2>
//               <p className="text-sm text-gray-600">Submit attendance, GPA, behavior & wellness for students</p>
//             </div>
//           </div>
//         </Link>
//         <Link to="/faculty/students" className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-secondary text-white rounded-lg"><Users size={28} /></div>
//             <div>
//               <h2 className="text-lg font-bold text-gray-800">View Students</h2>
//               <p className="text-sm text-gray-600">Browse student list to enter data</p>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </motion.div>
//   );
// };

// export default FacultyDashboard;




import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FileEdit, Users, LayoutDashboard, ChevronRight, Activity, ShieldCheck, Zap } from 'lucide-react';

const FacultyDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-12"
    >
      {/* Welcome & System Status Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em]">
            <LayoutDashboard size={14} />
            Faculty Control Plane
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Welcome back, <span className="text-indigo-600">{user?.name?.split(' ')[0] || 'Professor'}</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-md font-medium">
            You are currently authorized to input telemetry and manage behavioral records for your assigned divisions.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-6 px-8 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Access Level</span>
            <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" /> Authorized Faculty
            </span>
          </div>
          <div className="w-px h-8 bg-slate-100"></div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active System</span>
            <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <Zap size={14} className="text-amber-500" /> AI Core 3.0
            </span>
          </div>
        </div>
      </div>

      {/* Main Action Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            to: "/faculty/enter-data",
            title: "Data Intake Terminal",
            desc: "Input attendance, GPA, and behavioral metrics directly into the predictive core.",
            icon: <FileEdit size={32} />,
            color: "indigo",
            delay: 0.1
          },
          {
            to: "/faculty/students",
            title: "Student Roster",
            desc: "Browse the student database to review profiles or select subjects for data entry.",
            icon: <Users size={32} />,
            color: "teal",
            delay: 0.2
          }
        ].map((action, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: action.delay }}
          >
            <Link
              to={action.to}
              className="group block relative p-10 bg-white rounded-[3.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Background Accent Gradient */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-${action.color}-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-700`}></div>

              <div className="relative flex items-start gap-8">
                <div className={`p-5 bg-${action.color}-600 text-white rounded-[2rem] shadow-xl shadow-${action.color}-500/20 group-hover:rotate-6 transition-transform duration-500`}>
                  {action.icon}
                </div>

                <div className="space-y-3 flex-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{action.title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {action.desc}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest group-hover:gap-4 transition-all">
                    Initialize Module <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Faculty Briefing Card */}
      <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl shadow-slate-200 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 p-10 opacity-10 pointer-events-none">
          <Activity size={180} />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-black tracking-tight">System Operational Briefing</h3>
            <p className="text-slate-400 text-sm max-w-xl font-medium">
              Student metrics entered today will be analyzed by the AI core at midnight. High-risk alerts will be routed to the Counseling Department immediately.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Reports Due</p>
              <p className="text-xl font-black">12</p>
            </div>
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Alerts Run</p>
              <p className="text-xl font-black text-indigo-400">00</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FacultyDashboard;