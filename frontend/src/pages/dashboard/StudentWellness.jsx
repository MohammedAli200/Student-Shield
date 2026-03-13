// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { motion } from 'framer-motion';
// import { Activity, MessageCircle, Heart } from 'lucide-react';
// import Chatbot from '../../components/Chatbot';

// const StudentWellness = () => {
//   const { user } = useContext(AuthContext);

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <Heart size={32} className="text-secondary" /> My Wellness
//       </h1>
//       <p className="text-gray-600">Track your mood, stress levels, and connect with the AI wellness assistant.</p>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
//             <Activity size={22} className="text-secondary" /> Daily Check-in
//           </h2>
//           <p className="text-gray-600 mb-4">
//             Your academic, behavioral, and wellness data is entered by your faculty. Once data is submitted, your risk score is updated automatically.
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
//               <p className="text-sm font-semibold text-teal-800">Mood & Stress</p>
//               <p className="text-sm text-gray-600 mt-1">Track how you feel each day</p>
//             </div>
//             <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
//               <p className="text-sm font-semibold text-teal-800">Sleep & Activity</p>
//               <p className="text-sm text-gray-600 mt-1">Monitor sleep and participation</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[400px]">
//           <div className="p-4 border-b">
//             <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//               <MessageCircle size={20} className="text-secondary" /> AI Wellness Assistant
//             </h2>
//           </div>
//           <div className="flex-1 min-h-[300px]">
//             <Chatbot />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default StudentWellness;





import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Activity, MessageCircle, Heart, Sparkles, Sun, Moon } from 'lucide-react';
import Chatbot from '../../components/Chatbot';

const StudentWellness = () => {
  const { user } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
    >
      {/* Page Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-[0.2em]">
            <Heart size={14} fill="currentColor" />
            Mind & Soul
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            My Wellness
          </h1>
          <p className="text-slate-500 text-sm max-w-xl">
            A sanctuary for your mental health. Monitor your Faculty-led assessments and engage with your personal AI guide.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-[10px] font-bold text-teal-700">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-xs font-semibold text-slate-600">Join 40+ students online</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Metrics & Content */}
        <div className="lg:col-span-7 space-y-8">

          {/* Daily Check-in Main Card */}
          <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-[0_30px_60px_rgba(0,0,0,0.02)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Heart size={120} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                  <Activity size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Status Overview</h2>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Your data is meticulously recorded by authorized faculty members.
                This includes behavioral observations and academic performance
                to ensure a balanced support system.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group p-6 bg-slate-50 rounded-[2.5rem] border border-transparent transition-all hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-teal-900/5">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 transition-transform">
                    <Sun size={20} />
                  </div>
                  <p className="text-sm font-bold text-slate-800">Mood & Stress</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Daily emotional tracking via faculty observation.</p>
                </div>

                <div className="group p-6 bg-slate-50 rounded-[2.5rem] border border-transparent transition-all hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:shadow-indigo-900/5">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                    <Moon size={20} />
                  </div>
                  <p className="text-sm font-bold text-slate-800">Sleep & Activity</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Participation and energy levels in campus life.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-teal-900 p-10 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-teal-900/20 relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-teal-800 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-[10px] uppercase tracking-widest">
                <Sparkles size={14} />
                Wellness Tip
              </div>
              <h3 className="text-2xl font-bold tracking-tight">Take a 5-minute breather.</h3>
              <p className="text-teal-100/70 text-sm leading-relaxed">Research shows that short, intentional breaks significantly reduce cortisol levels during peak study hours.</p>
            </div>
            <button className="relative z-10 whitespace-nowrap bg-white text-teal-900 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-teal-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Column: AI Assistant */}
        <div className="lg:col-span-5 flex flex-col h-[700px]">
          <div className="bg-white h-full rounded-[3.5rem] border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden relative">
            <div className="p-8 pb-6 border-b border-slate-50">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                </span>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Always Listening</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <MessageCircle className="text-teal-600" /> Wellness Guide
              </h2>
            </div>

            <div className="flex-1 bg-slate-50/30 overflow-hidden relative">
              <Chatbot />
            </div>

            <div className="p-6 bg-white border-t border-slate-50">
              <p className="text-[10px] text-center text-slate-400 font-medium">
                This AI is a support tool, not a medical professional. If you are in crisis, please contact campus security immediately.
              </p>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default StudentWellness;