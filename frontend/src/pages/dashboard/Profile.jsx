// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { motion } from 'framer-motion';
// import { User as UserIcon, Mail, Shield } from 'lucide-react';

// const Profile = () => {
//   const { user } = useContext(AuthContext);

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <UserIcon size={32} className="text-primary" /> Profile
//       </h1>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center gap-6 mb-6">
//           <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
//             {user?.name?.charAt(0) || '?'}
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
//             <p className="text-gray-500 flex items-center gap-2 mt-1">
//               <Shield size={16} /> {user?.role}
//             </p>
//           </div>
//         </div>

//         <div className="space-y-4 border-t pt-6">
//           <div className="flex items-center gap-3">
//             <Mail size={20} className="text-gray-400" />
//             <div>
//               <p className="text-sm text-gray-500">Email</p>
//               <p className="font-medium text-gray-800">{user?.email}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <Shield size={20} className="text-gray-400" />
//             <div>
//               <p className="text-sm text-gray-500">Role</p>
//               <p className="font-medium text-gray-800">{user?.role}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Profile;




import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { User as UserIcon, Mail, Shield, Award, Calendar, Fingerprint } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em]">
            <Fingerprint size={14} />
            Identity Verification
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Personal Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Avatar & Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[3.5rem] border border-slate-100 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.02)] text-center relative overflow-hidden group">
              {/* Decorative Background Glow */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400"></div>

              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-indigo-100 rounded-[2.5rem] rotate-6 scale-95 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="relative w-full h-full bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-200">
                  {user?.name?.charAt(0) || '?'}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{user?.name}</h2>
              <p className="text-indigo-600 font-bold text-[11px] uppercase tracking-widest mt-1">{user?.role}</p>

              <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
                  <Award size={20} />
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
                  <Calendar size={20} />
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Security Level</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-indigo-500"></div>
                </div>
                <span className="text-xs font-bold italic">Tier 1</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Credentials */}
          <div className="lg:col-span-2">
            <div className="bg-white h-full rounded-[3.5rem] border border-slate-100 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Account Credentials</h3>

              <div className="space-y-10">
                {/* Email Row */}
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Primary Email</p>
                    <p className="text-lg font-bold text-slate-800">{user?.email}</p>
                    <p className="text-xs text-slate-400">Used for institutional communications and login.</p>
                  </div>
                </div>

                {/* Role Row */}
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Shield size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Access Permissions</p>
                    <p className="text-lg font-bold text-slate-800">{user?.role} Privileges</p>
                    <p className="text-xs text-slate-400">Your account is authorized for {user?.role}-level dashboard access.</p>
                  </div>
                </div>

                {/* Account ID / System Info */}
                <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Status</p>
                    <div className="flex items-center gap-2 mt-1 text-emerald-500">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold uppercase">Active Protocol</span>
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-slate-50 text-slate-600 rounded-2xl text-xs font-bold hover:bg-slate-100 transition-all active:scale-95">
                    Download ID
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;