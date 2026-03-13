// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../../context/AuthContext';
// import { api } from '../../../services/api';
// import { motion } from 'framer-motion';
// import { BookOpen, TrendingUp, BarChart3 } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// const AcademicProgress = () => {
//   const { user } = useContext(AuthContext);
//   const [data, setData] = useState({ academic: null, behavior: null, wellness: [] });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?._id) return;
//       try {
//         const res = await api.get(`/student/${user._id}`);
//         setData(res.data);
//       } catch {
//         setData({ academic: null, behavior: null, wellness: [] });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [user?._id]);

//   if (loading) return <div>Loading...</div>;

//   const academic = data.academic;
//   const chartData = academic ? [
//     { name: 'Attendance', value: academic.attendancePercentage, fill: '#14B8A6' },
//     { name: 'Assignments', value: academic.assignmentSubmissionRate, fill: '#1e3a8a' },
//     { name: 'GPA (×10)', value: Math.min(100, academic.gpa * 10), fill: '#6366f1' },
//   ] : [];

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <BookOpen size={32} className="text-primary" /> Academic Progress
//       </h1>
//       <p className="text-gray-600">Your academic performance and behavioral indicators.</p>

//       {!academic ? (
//         <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-800">
//           <p>No academic data yet. Submit a wellness check-in to see your progress.</p>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <p className="text-sm text-gray-500">Attendance</p>
//               <p className="text-2xl font-bold text-gray-800">{academic.attendancePercentage}%</p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <p className="text-sm text-gray-500">Assignment Rate</p>
//               <p className="text-2xl font-bold text-gray-800">{academic.assignmentSubmissionRate}%</p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <p className="text-sm text-gray-500">GPA</p>
//               <p className="text-2xl font-bold text-gray-800">{academic.gpa}</p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <p className="text-sm text-gray-500">Backlog</p>
//               <p className="text-2xl font-bold text-gray-800">{academic.courseBacklogCount}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//               <h2 className="text-lg font-bold mb-4 text-gray-800">Performance Overview</h2>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={chartData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//               <h2 className="text-lg font-bold mb-4 text-gray-800">Behavioral Activity</h2>
//               {data.behavior ? (
//                 <div className="space-y-4">
//                   <div className="flex justify-between"><span>Library hrs/week</span><span className="font-bold">{data.behavior.libraryUsageHoursPerWeek}</span></div>
//                   <div className="flex justify-between"><span>Campus events</span><span className="font-bold">{data.behavior.campusEventParticipation}</span></div>
//                   <div className="flex justify-between"><span>Social activities</span><span className="font-bold">{data.behavior.socialActivityParticipation}</span></div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No behavioral data.</p>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </motion.div>
//   );
// };

// export default AcademicProgress;





import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { api } from '../../../services/api';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, BarChart3, Award, Globe, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const AcademicProgress = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({ academic: null, behavior: null, wellness: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;
      try {
        const res = await api.get(`/student/${user._id}`);
        setData(res.data);
      } catch {
        setData({ academic: null, behavior: null, wellness: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?._id]);

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#fcfdfe]">
      <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );

  const academic = data.academic;
  const chartData = academic ? [
    { name: 'Attendance', value: academic.attendancePercentage, color: '#6366f1' },
    { name: 'Assignments', value: academic.assignmentSubmissionRate, color: '#10b981' },
    { name: 'GPA Index', value: Math.min(100, academic.gpa * 10), color: '#f59e0b' },
  ] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto space-y-2">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.3em]">
          <TrendingUp size={14} />
          Performance Metrics
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Academic Journey</h1>
        <p className="text-slate-500 text-sm max-w-lg">A comprehensive overview of your scholastic standing and campus engagement.</p>
      </div>

      {!academic ? (
        <div className="max-w-7xl mx-auto bg-white rounded-[3rem] border-2 border-dashed border-slate-100 p-20 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300">
            <BarChart3 size={40} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">No Academic Records Found</h2>
          <p className="text-slate-400 text-sm mt-2">Data will appear here once your faculty submits your first assessment.</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Top KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Attendance', val: `${academic.attendancePercentage}%`, icon: <Activity />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Submissions', val: `${academic.assignmentSubmissionRate}%`, icon: <Globe />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Current GPA', val: academic.gpa, icon: <Award />, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Backlogs', val: academic.courseBacklogCount, icon: <BookOpen />, color: 'text-rose-600', bg: 'bg-rose-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:scale-[1.03] transition-transform">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800 mt-1">{stat.val}</p>
              </div>
            ))}
          </div>

          {/* Charts & Behavioral Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Visual Analytics */}
            <div className="lg:col-span-3 bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Performance Overview</h2>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={40}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Behavioral Insights */}
            <div className="lg:col-span-2 bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl shadow-slate-200">
              <h2 className="text-lg font-bold mb-8">Behavioral Engagement</h2>
              {data.behavior ? (
                <div className="space-y-6">
                  {[
                    { label: 'Library Utilization', val: `${data.behavior.libraryUsageHoursPerWeek}h/wk`, color: 'bg-indigo-500' },
                    { label: 'Campus Participation', val: `${data.behavior.campusEventParticipation} events`, color: 'bg-emerald-500' },
                    { label: 'Social Integration', val: `${data.behavior.socialActivityParticipation} level`, color: 'bg-rose-500' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                        <span className="text-sm font-black">{item.val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '70%' }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className={`h-full ${item.color} rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-10 p-6 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                      Note: These metrics are updated weekly by your campus mentors.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 italic text-sm">
                  Awaiting behavioral synchronization...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AcademicProgress;