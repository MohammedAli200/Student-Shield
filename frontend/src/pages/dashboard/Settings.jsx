// import { useContext, useState } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { motion } from 'framer-motion';
// import { Settings as SettingsIcon, Bell, Moon } from 'lucide-react';

// const Settings = () => {
//   const { user } = useContext(AuthContext);
//   const [notifications, setNotifications] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <SettingsIcon size={32} className="text-primary" /> Settings
//       </h1>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
//         <h2 className="text-lg font-semibold text-gray-800">Preferences</h2>

//         <div className="flex items-center justify-between py-3 border-b border-gray-100">
//           <div className="flex items-center gap-3">
//             <Bell size={20} className="text-gray-500" />
//             <div>
//               <p className="font-medium text-gray-800">Email Notifications</p>
//               <p className="text-sm text-gray-500">Receive alerts and updates via email</p>
//             </div>
//           </div>
//           <button
//             onClick={() => setNotifications(!notifications)}
//             className={`w-12 h-6 rounded-full transition ${notifications ? 'bg-secondary' : 'bg-gray-300'}`}
//           >
//             <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0.5'}`} />
//           </button>
//         </div>

//         <div className="flex items-center justify-between py-3 border-b border-gray-100">
//           <div className="flex items-center gap-3">
//             <Moon size={20} className="text-gray-500" />
//             <div>
//               <p className="font-medium text-gray-800">Dark Mode</p>
//               <p className="text-sm text-gray-500">Switch to dark theme</p>
//             </div>
//           </div>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`w-12 h-6 rounded-full transition ${darkMode ? 'bg-primary' : 'bg-gray-300'}`}
//           >
//             <span className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
//           </button>
//         </div>

//         <div className="pt-4">
//           <h3 className="text-sm font-medium text-gray-500 mb-2">Account</h3>
//           <p className="text-sm text-gray-600">Logged in as <strong>{user?.email}</strong></p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Settings;




import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Moon, User, ShieldCheck, Mail } from 'lucide-react';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
    >
      {/* Header Section */}
      <div className="max-w-3xl mx-auto space-y-2">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em]">
          <SettingsIcon size={14} />
          Configuration
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account preferences and security protocols.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* Profile Identity Card */}
        <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-blue-400 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
            <User size={36} strokeWidth={1.5} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-slate-800">{user?.name || "User Profile"}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck size={12} /> {user?.role}
              </span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Mail size={12} /> {user?.email}
              </span>
            </div>
          </div>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-6 py-3 rounded-2xl transition-all active:scale-95">
            Edit Profile
          </button>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] space-y-8">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Preferences</h2>

          {/* Notification Toggle */}
          <div className="group flex items-center justify-between py-2">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bell size={22} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Email Notifications</p>
                <p className="text-xs text-slate-400">Receive critical alerts and system updates</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 rounded-full transition-all duration-300 relative ${notifications ? 'bg-slate-900' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <div className="group flex items-center justify-between py-2">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Moon size={22} />
              </div>
              <div>
                <p className="font-bold text-slate-800">Visual Appearance</p>
                <p className="text-xs text-slate-400">Switch between light and dark mode</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-8 rounded-full transition-all duration-300 relative ${darkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Danger Zone */}
          <div className="pt-8 border-t border-slate-50">
            <div className="flex items-center justify-between p-6 bg-rose-50/50 rounded-[2.5rem] border border-rose-100/50">
              <div>
                <p className="text-sm font-bold text-rose-900">Account Access</p>
                <p className="text-[11px] text-rose-700/60 font-medium">Permanently log out of this session</p>
              </div>
              <button className="px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200">
                Sign Out
              </button>
            </div>
          </div>

        </div>

        <p className="text-center text-slate-300 text-[10px] uppercase tracking-widest font-bold">
          Campus Guardian Protocol v2.4.0
        </p>
      </div>
    </motion.div>
  );
};

export default Settings;