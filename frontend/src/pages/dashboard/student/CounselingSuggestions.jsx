// import { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../../context/AuthContext';
// import { api } from '../../../services/api';
// import { motion } from 'framer-motion';
// import { MessageCircle, Calendar, Heart, ExternalLink } from 'lucide-react';

// const CounselingSuggestions = () => {
//   const { user } = useContext(AuthContext);
//   const [riskData, setRiskData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user?._id) return;
//       try {
//         const riskRes = await api.get(`/ai/risk/${user._id}`);
//         setRiskData(riskRes.data);
//       } catch {
//         setRiskData(null);
//       }
//     };
//     fetchData();
//   }, [user?._id]);

//   const score = riskData?.score;
//   const level = riskData?.riskLevel;
//   const needsCounseling = score != null && score > 60;

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <MessageCircle size={32} className="text-secondary" /> Counseling & Support
//       </h1>
//       <p className="text-gray-600">Recommendations and resources based on your wellness assessment.</p>

//       {riskData && (
//         <div className={`p-6 rounded-xl border ${needsCounseling ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
//           <h2 className="text-lg font-bold text-gray-800 mb-2">Your Risk Level: {level || 'N/A'}</h2>
//           <p className="text-gray-700">
//             {needsCounseling
//               ? 'Based on your data, we recommend scheduling a counseling session. Our counselors are here to support you.'
//               : 'Your wellness indicators look stable. Keep up healthy habits and check in regularly.'}
//           </p>
//         </div>
//       )}

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//         <h2 className="text-lg font-bold text-gray-800 mb-4">Resources</h2>
//         <ul className="space-y-3">
//           <li className="flex items-center gap-3">
//             <Heart size={20} className="text-secondary" />
//             <span>Campus Crisis Line: 1-800-273-8255</span>
//           </li>
//           <li className="flex items-center gap-3">
//             <Calendar size={20} className="text-secondary" />
//             <span>Book a counseling session at the Student Wellness Center</span>
//           </li>
//           <li className="flex items-center gap-3">
//             <ExternalLink size={20} className="text-secondary" />
//             <a href="#" className="text-secondary hover:underline">Mental Health Resources</a>
//           </li>
//         </ul>
//       </div>
//     </motion.div>
//   );
// };

// export default CounselingSuggestions;




import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { api } from '../../../services/api';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Heart, ExternalLink, ShieldAlert, CheckCircle2, PhoneCall } from 'lucide-react';

const CounselingSuggestions = () => {
  const { user } = useContext(AuthContext);
  const [riskData, setRiskData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;
      try {
        const riskRes = await api.get(`/ai/risk/${user._id}`);
        setRiskData(riskRes.data);
      } catch {
        setRiskData(null);
      }
    };
    fetchData();
  }, [user?._id]);

  const score = riskData?.score;
  const level = riskData?.riskLevel;
  const needsCounseling = score != null && score > 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
    >
      {/* Header Section */}
      <div className="max-w-4xl mx-auto space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em]">
          <Heart size={14} fill="currentColor" />
          Support Network
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Counseling & Guidance</h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto md:mx-0">
          Personalized resources and professional support pathways tailored to your current wellness metrics.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">

        {/* Risk Assessment Card */}
        {riskData && (
          <div className={`relative overflow-hidden p-10 rounded-[3.5rem] border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-500 ${needsCounseling
              ? 'bg-amber-50/50 border-amber-100'
              : 'bg-emerald-50/50 border-emerald-100'
            }`}>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${needsCounseling ? 'bg-amber-500 text-white shadow-amber-200' : 'bg-emerald-500 text-white shadow-emerald-200'
                }`}>
                {needsCounseling ? <ShieldAlert size={36} /> : <CheckCircle2 size={36} />}
              </div>

              <div className="flex-1 text-center md:text-left space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Status</p>
                <h2 className={`text-2xl font-bold tracking-tight ${needsCounseling ? 'text-amber-800' : 'text-emerald-800'}`}>
                  {level || 'Normal Analysis'}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
                  {needsCounseling
                    ? 'Our AI analysis suggests a counseling check-in might be beneficial. Speaking with a professional can provide valuable perspective and stress-management tools.'
                    : 'Your wellness indicators are currently within a stable range. Continuing your current healthy routines and regular check-ins is recommended.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Book a Session Card */}
          <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] group hover:shadow-indigo-100/50 transition-all">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Calendar size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Book a Session</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">Schedule a confidential 1-on-1 meeting at the Student Wellness Center.</p>
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors">
              Find Available Times
            </button>
          </div>

          {/* Emergency Support Card */}
          <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl shadow-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-white/10 text-rose-400 rounded-2xl flex items-center justify-center mb-6">
                <PhoneCall size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Crisis Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Immediate assistance is available 24/7. You are never alone.</p>
            </div>
            <div className="mt-8 flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className="text-sm font-black tracking-tight">1-800-273-8255</span>
              <span className="text-[10px] font-bold uppercase text-rose-400 px-2 py-1 bg-rose-400/10 rounded-lg">Call Now</span>
            </div>
          </div>
        </div>

        {/* External Resources List */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Additional Resources</h2>
          <div className="space-y-4">
            {[
              { label: 'Mental Health Toolkits', link: '#' },
              { label: 'Stress Management Guides', link: '#' },
              { label: 'Peer Support Groups', link: '#' }
            ].map((item, i) => (
              <a key={i} href={item.link} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition-colors group">
                <div className="flex items-center gap-3">
                  <ExternalLink size={18} className="text-slate-300 group-hover:text-indigo-600" />
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </div>
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-300 group-hover:text-indigo-600 shadow-sm transition-all">
                  <ExternalLink size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default CounselingSuggestions;