// import { useContext, useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { AuthContext } from '../../../context/AuthContext';
// import { api } from '../../../services/api';
// import { motion } from 'framer-motion';
// import { FileEdit, Loader2, CheckCircle } from 'lucide-react';

// const MOODS = ['Happy', 'Neutral', 'Sad', 'Stressed', 'Burnout', 'Critical'];

// const EnterStudentData = () => {
//   const { user } = useContext(AuthContext);
//   const location = useLocation();
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(location.state?.studentId || '');
//   const [loading, setLoading] = useState(false);
//   const [loadingStudents, setLoadingStudents] = useState(true);
//   const [success, setSuccess] = useState(false);
//   const [form, setForm] = useState({
//     academic: { attendancePercentage: 75, assignmentSubmissionRate: 80, gpa: 7, courseBacklogCount: 0 },
//     behavior: { libraryUsageHoursPerWeek: 5, campusEventParticipation: 2, socialActivityParticipation: 3 },
//     wellness: { mood: 'Neutral', stressLevel: 5, sleepHours: 7, notes: '' },
//   });

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await api.get('/faculty/students');
//         setStudents(res.data || []);
//         if (res.data?.length > 0 && !selectedStudent && !location.state?.studentId) setSelectedStudent(res.data[0]._id);
//       } catch {
//         setStudents([]);
//       } finally {
//         setLoadingStudents(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedStudent) return;
//     setLoading(true);
//     setSuccess(false);
//     try {
//       await api.post('/faculty/student-data', {
//         studentId: selectedStudent,
//         academic: form.academic,
//         behavior: form.behavior,
//         wellness: form.wellness,
//       });
//       await api.post('/ai/analyze', { studentId: selectedStudent });
//       setSuccess(true);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loadingStudents) return <div>Loading students...</div>;

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <FileEdit size={32} className="text-primary" /> Enter Student Data
//       </h1>
//       <p className="text-gray-600">Submit attendance, academic, behavioral, and wellness data for students. Only Faculty can enter this data.</p>

//       {success && (
//         <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
//           <CheckCircle size={24} /> Data submitted & risk analysis run successfully.
//         </div>
//       )}

//       {students.length === 0 ? (
//         <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-amber-800">No students in the system yet.</div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
//             <select
//               value={selectedStudent}
//               onChange={(e) => setSelectedStudent(e.target.value)}
//               className="w-full p-3 border rounded"
//               required
//             >
//               <option value="">-- Select Student --</option>
//               {students.map((s) => (
//                 <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
//               ))}
//             </select>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h2 className="text-lg font-bold text-gray-800 mb-4">Academic Indicators</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Attendance %</label>
//                 <input type="number" min="0" max="100" className="w-full p-2 border rounded"
//                   value={form.academic.attendancePercentage} onChange={(e) => setForm({ ...form, academic: { ...form.academic, attendancePercentage: +e.target.value } })} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Submission %</label>
//                 <input type="number" min="0" max="100" className="w-full p-2 border rounded"
//                   value={form.academic.assignmentSubmissionRate} onChange={(e) => setForm({ ...form, academic: { ...form.academic, assignmentSubmissionRate: +e.target.value } })} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
//                 <input type="number" step="0.1" min="0" max="10" className="w-full p-2 border rounded"
//                   value={form.academic.gpa} onChange={(e) => setForm({ ...form, academic: { ...form.academic, gpa: +e.target.value } })} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Course Backlog Count</label>
//                 <input type="number" min="0" className="w-full p-2 border rounded"
//                   value={form.academic.courseBacklogCount} onChange={(e) => setForm({ ...form, academic: { ...form.academic, courseBacklogCount: +e.target.value } })} />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h2 className="text-lg font-bold text-gray-800 mb-4">Behavioral Indicators</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Library Hours/Week</label>
//                 <input type="number" min="0" className="w-full p-2 border rounded"
//                   value={form.behavior.libraryUsageHoursPerWeek} onChange={(e) => setForm({ ...form, behavior: { ...form.behavior, libraryUsageHoursPerWeek: +e.target.value } })} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Campus Events Participation</label>
//                 <input type="number" min="0" className="w-full p-2 border rounded"
//                   value={form.behavior.campusEventParticipation} onChange={(e) => setForm({ ...form, behavior: { ...form.behavior, campusEventParticipation: +e.target.value } })} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Social Activities</label>
//                 <input type="number" min="0" className="w-full p-2 border rounded"
//                   value={form.behavior.socialActivityParticipation} onChange={(e) => setForm({ ...form, behavior: { ...form.behavior, socialActivityParticipation: +e.target.value } })} />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h2 className="text-lg font-bold text-gray-800 mb-4">Wellness Indicators</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
//                 <div className="flex flex-wrap gap-2">
//                   {MOODS.map((m) => (
//                     <button key={m} type="button"
//                       className={`px-4 py-2 rounded-full text-sm ${form.wellness.mood === m ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-700'}`}
//                       onClick={() => setForm({ ...form, wellness: { ...form.wellness, mood: m } })}>
//                       {m}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Stress Level (1-10)</label>
//                 <input type="number" min="1" max="10" className="w-full p-2 border rounded"
//                   value={form.wellness.stressLevel} onChange={(e) => setForm({ ...form, wellness: { ...form.wellness, stressLevel: +e.target.value } })} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Sleep Hours</label>
//                 <input type="number" min="0" max="24" className="w-full p-2 border rounded"
//                   value={form.wellness.sleepHours} onChange={(e) => setForm({ ...form, wellness: { ...form.wellness, sleepHours: +e.target.value } })} />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
//                 <textarea rows={3} className="w-full p-2 border rounded" placeholder="Observations..."
//                   value={form.wellness.notes} onChange={(e) => setForm({ ...form, wellness: { ...form.wellness, notes: e.target.value } })} />
//               </div>
//             </div>
//           </div>

//           <button type="submit" disabled={loading}
//             className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-800 transition flex items-center gap-2 disabled:opacity-50">
//             {loading ? <Loader2 size={20} className="animate-spin" /> : null} Submit Student Data
//           </button>
//         </form>
//       )}
//     </motion.div>
//   );
// };

// export default EnterStudentData;




import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { api } from '../../../services/api';
import { motion } from 'framer-motion';
import { FileEdit, Loader2, CheckCircle, GraduationCap, Brain, Activity, ClipboardCheck, Sparkles, UserCheck, Moon } from 'lucide-react';

const MOODS = ['Happy', 'Neutral', 'Sad', 'Stressed', 'Burnout', 'Critical'];

const EnterStudentData = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(location.state?.studentId || '');
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    academic: { attendancePercentage: 75, assignmentSubmissionRate: 80, gpa: 7, courseBacklogCount: 0 },
    behavior: { libraryUsageHoursPerWeek: 5, campusEventParticipation: 2, socialActivityParticipation: 3 },
    wellness: { mood: 'Neutral', stressLevel: 5, sleepHours: 7, notes: '' },
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/faculty/students');
        setStudents(res.data || []);
        if (res.data?.length > 0 && !selectedStudent && !location.state?.studentId) setSelectedStudent(res.data[0]._id);
      } catch {
        setStudents([]);
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchStudents();
  }, [location.state?.studentId, selectedStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;
    setLoading(true);
    setSuccess(false);
    try {
      await api.post('/faculty/student-data', {
        studentId: selectedStudent,
        academic: form.academic,
        behavior: form.behavior,
        wellness: form.wellness,
      });
      await api.post('/ai/analyze', { studentId: selectedStudent });
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingStudents) return (
    <div className="flex flex-col items-center justify-center h-96 space-y-4">
      <Loader2 size={40} className="text-blue-600 animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Class Roster...</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-4 md:p-10 space-y-10"
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.3em]">
          <ClipboardCheck size={14} />
          Data Entry Terminal
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Student Assessment</h1>
        <p className="text-slate-500 text-sm max-w-2xl font-medium">Capture behavioral and academic telemetry to power predictive wellness insights.</p>
      </div>

      {success && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex items-center gap-4 text-emerald-800 shadow-xl shadow-emerald-500/5"
        >
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="font-black text-sm uppercase tracking-tight">Assessment Recorded</p>
            <p className="text-xs font-medium opacity-80">Data submitted and AI risk analysis has been triggered successfully.</p>
          </div>
        </motion.div>
      )}

      {students.length === 0 ? (
        <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
          <GraduationCap size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No students registered in your division.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Target Student Selection */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><UserCheck size={18} /></div>
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Primary Subject</h2>
            </div>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full p-5 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold text-sm focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
              required
            >
              <option value="">-- Choose a student --</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>{s.name} — ({s.email})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Academic Indicators */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><GraduationCap size={18} /></div>
                <h2 className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Academic Metrics</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Attendance %', field: 'attendancePercentage', min: 0, max: 100 },
                  { label: 'Submissions %', field: 'assignmentSubmissionRate', min: 0, max: 100 },
                  { label: 'GPA', field: 'gpa', min: 0, max: 10, step: 0.1 },
                  { label: 'Backlogs', field: 'courseBacklogCount', min: 0 },
                ].map((input) => (
                  <div key={input.field}>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{input.label}</label>
                    <input
                      type="number"
                      step={input.step || 1}
                      min={input.min}
                      max={input.max}
                      className="w-full p-4 bg-slate-50 border-none rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                      value={form.academic[input.field]}
                      onChange={(e) => setForm({ ...form, academic: { ...form.academic, [input.field]: +e.target.value } })}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Behavioral Indicators */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><Activity size={18} /></div>
                <h2 className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Behavioral Flux</h2>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'Library Usage (Hrs/Wk)', field: 'libraryUsageHoursPerWeek' },
                  { label: 'Campus Event Participation', field: 'campusEventParticipation' },
                  { label: 'Social Activity Rate', field: 'socialActivityParticipation' },
                ].map((input) => (
                  <div key={input.field}>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{input.label}</label>
                    <input
                      type="number"
                      className="w-full p-4 bg-slate-50 border-none rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                      value={form.behavior[input.field]}
                      onChange={(e) => setForm({ ...form, behavior: { ...form.behavior, [input.field]: +e.target.value } })}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wellness Indicators (Dark Section) */}
          <div className="bg-slate-900 rounded-[3rem] shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Brain size={180} />
            </div>

            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20"><Brain size={22} /></div>
              <h2 className="text-xl font-black tracking-tight">Wellness Core Assessment</h2>
            </div>

            <div className="space-y-10">
              {/* Mood Pills */}
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Current Emotional State</label>
                <div className="flex flex-wrap gap-3">
                  {MOODS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 ${form.wellness.mood === m
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/40 scale-105'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                        }`}
                      onClick={() => setForm({ ...form, wellness: { ...form.wellness, mood: m } })}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Stress Intensity (1-10)</label>
                    <span className="text-xs font-black text-blue-400">{form.wellness.stressLevel} / 10</span>
                  </div>
                  <input
                    type="range" min="1" max="10"
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    value={form.wellness.stressLevel}
                    onChange={(e) => setForm({ ...form, wellness: { ...form.wellness, stressLevel: +e.target.value } })}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Moon size={14} className="text-slate-500" />
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sleep Cycle (Hours)</label>
                  </div>
                  <input
                    type="number" min="0" max="24"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={form.wellness.sleepHours}
                    onChange={(e) => setForm({ ...form, wellness: { ...form.wellness, sleepHours: +e.target.value } })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Qualitative Observations</label>
                <textarea
                  rows={4}
                  className="w-full p-5 bg-white/5 border border-white/10 rounded-[2rem] text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                  placeholder="Enter notes on student behavior, social withdrawal, or significant changes..."
                  value={form.wellness.notes}
                  onChange={(e) => setForm({ ...form, wellness: { ...form.wellness, notes: e.target.value } })}
                />
              </div>
            </div>
          </div>

          {/* Submission Action */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading}
              className="group relative px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-900 transition-all flex items-center gap-3 disabled:opacity-50 shadow-2xl shadow-blue-500/20 active:scale-95"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />}
              Commit Assessment to Core
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default EnterStudentData;