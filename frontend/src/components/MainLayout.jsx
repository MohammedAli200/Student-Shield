// import { useContext } from 'react';
// import { Outlet, Link, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import {
//   LogOut,
//   Home,
//   User as UserIcon,
//   Activity,
//   Settings,
//   Heart,
//   FileEdit,
//   BookOpen,
//   MessageCircle,
//   Calendar,
//   AlertTriangle,
//   BarChart2,
//   CalendarCheck,
//   Users,
//   UserCheck,
//   Server,
//   Building,
//   FileText,
//   LayoutDashboard,
// } from 'lucide-react';

// const getNavItems = (role) => {
//   const base = `/${role?.toLowerCase()}`;
//   const common = [
//     { to: base, icon: Home, label: 'Dashboard' },
//     { to: `${base}/wellness`, icon: Heart, label: 'My Wellness' },
//     { to: `${base}/profile`, icon: UserIcon, label: 'Profile' },
//     { to: `${base}/settings`, icon: Settings, label: 'Settings' },
//   ];
//   if (role === 'Student') {
//     return [
//       { to: base, icon: Home, label: 'Dashboard' },
//       { to: `${base}/wellness`, icon: Heart, label: 'My Wellness' },
//       { to: `${base}/academic`, icon: BookOpen, label: 'Academic Progress' },
//       { to: `${base}/counseling`, icon: MessageCircle, label: 'Counseling' },
//       { to: `${base}/events`, icon: Calendar, label: 'Campus Events' },
//       { to: `${base}/profile`, icon: UserIcon, label: 'Profile' },
//       { to: `${base}/settings`, icon: Settings, label: 'Settings' },
//     ];
//   }
//   if (role === 'Faculty') {
//     return [
//       { to: base, icon: Home, label: 'Dashboard' },
//       { to: `${base}/enter-data`, icon: FileEdit, label: 'Enter Student Data' },
//       { to: `${base}/students`, icon: Users, label: 'Students' },
//       { to: `${base}/profile`, icon: UserIcon, label: 'Profile' },
//       { to: `${base}/settings`, icon: Settings, label: 'Settings' },
//     ];
//   }
//   if (role === 'Counselor') {
//     return [
//       { to: base, icon: Home, label: 'Dashboard' },
//       { to: `${base}/wellness`, icon: Heart, label: 'My Wellness' },
//       { to: `${base}/high-risk`, icon: AlertTriangle, label: 'High Risk Students' },
//       { to: `${base}/analytics`, icon: BarChart2, label: 'Student Analytics' },
//       { to: `${base}/schedule`, icon: CalendarCheck, label: 'Schedule Sessions' },
//       { to: `${base}/alerts`, icon: AlertTriangle, label: 'Manage Alerts' },
//       { to: `${base}/profile`, icon: UserIcon, label: 'Profile' },
//       { to: `${base}/settings`, icon: Settings, label: 'Settings' },
//     ];
//   }
//   if (role === 'Admin') {
//     return [
//       { to: base, icon: Home, label: 'Dashboard' },
//       { to: `${base}/wellness`, icon: Heart, label: 'Campus Wellness' },
//       { to: `${base}/intelligence`, icon: LayoutDashboard, label: 'Campus Intelligence' },
//       { to: `${base}/students`, icon: Users, label: 'Manage Students' },
//       { to: `${base}/counselors`, icon: UserCheck, label: 'Manage Counselors' },
//       { to: `${base}/facilities`, icon: Server, label: 'Campus Facilities' },
//       { to: `${base}/hostel`, icon: Building, label: 'Hostel Rooms' },
//       { to: `${base}/alerts`, icon: FileText, label: 'Alerts & Logs' },
//       { to: `${base}/profile`, icon: UserIcon, label: 'Profile' },
//       { to: `${base}/settings`, icon: Settings, label: 'Settings' },
//     ];
//   }
//   return common;
// };

// const MainLayout = () => {
//   const { user, logout } = useContext(AuthContext);
//   const location = useLocation();
//   const navItems = getNavItems(user?.role);

//   return (
//     <div className="flex h-screen bg-background text-gray-800">
//       <aside className="w-64 bg-white shadow-md flex flex-col justify-between overflow-y-auto">
//         <div>
//           <div className="p-6 text-center border-b">
//             <h1 className="text-2xl font-bold text-primary">Campus Guardian</h1>
//             <p className="text-xs text-secondary mt-1 tracking-wide uppercase">{user?.role} Portal</p>
//           </div>
//           <nav className="p-4 space-y-1">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = location.pathname === item.to || (item.to !== `/${user?.role?.toLowerCase()}` && location.pathname.startsWith(item.to + '/'));
//               return (
//                 <Link
//                   key={item.to}
//                   to={item.to}
//                   className={`flex items-center gap-3 p-3 rounded-md transition ${
//                     isActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'
//                   }`}
//                 >
//                   <Icon size={20} /> {item.label}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>
//         <div className="p-4 border-t">
//           <button
//             onClick={logout}
//             className="flex items-center gap-3 p-3 w-full rounded-md hover:bg-red-50 text-danger transition"
//           >
//             <LogOut size={20} /> Logout
//           </button>
//         </div>
//       </aside>

//       <main className="flex-1 overflow-y-auto w-full">
//         <header className="bg-white shadow-sm p-4 sticky top-0 z-10 flex justify-end">
//           <div className="flex items-center gap-3">
//             <div className="text-right">
//               <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
//               <p className="text-xs text-gray-500">{user?.email}</p>
//             </div>
//             <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
//               {user?.name?.charAt(0)}
//             </div>
//           </div>
//         </header>
//         <div className="p-8">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MainLayout;




import { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  LogOut, Home, User as UserIcon, Settings, Heart, FileEdit, BookOpen,
  MessageCircle, Calendar, AlertTriangle, BarChart2, CalendarCheck,
  Users, UserCheck, Server, Building, FileText, LayoutDashboard, Sparkles
} from 'lucide-react';

const getNavItems = (role) => {
  const base = `/${role?.toLowerCase()}`;
  const roles = {
    Student: [
      { to: base, icon: Home, label: 'Dashboard' },
      { to: `${base}/wellness`, icon: Heart, label: 'My Wellness' },
      { to: `${base}/academic`, icon: BookOpen, label: 'Academic Progress' },
      { to: `${base}/counseling`, icon: MessageCircle, label: 'Counseling' },
      { to: `${base}/events`, icon: Calendar, label: 'Campus Events' },
    ],
    Faculty: [
      { to: base, icon: Home, label: 'Dashboard' },
      { to: `${base}/enter-data`, icon: FileEdit, label: 'Enter Student Data' },
      { to: `${base}/students`, icon: Users, label: 'Students' },
    ],
    Counselor: [
      { to: base, icon: Home, label: 'Dashboard' },
      { to: `${base}/high-risk`, icon: AlertTriangle, label: 'High Risk' },
      { to: `${base}/analytics`, icon: BarChart2, label: 'Student Analytics' },
      { to: `${base}/schedule`, icon: CalendarCheck, label: 'Schedule Sessions' },
    ],
    Admin: [
      { to: base, icon: Home, label: 'Dashboard' },
      { to: `${base}/intelligence`, icon: LayoutDashboard, label: 'Campus Intel' },
      { to: `${base}/students`, icon: Users, label: 'Manage Students' },
      { to: `${base}/alerts`, icon: FileText, label: 'System Logs' },
    ]
  };

  const menu = roles[role] || [{ to: base, icon: Home, label: 'Dashboard' }];

  // Append common footer items
  return [
    ...menu,
    { to: `${base}/profile`, icon: UserIcon, label: 'Profile' },
    { to: `${base}/settings`, icon: Settings, label: 'Settings' },
  ];
};

const MainLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navItems = getNavItems(user?.role);

  return (
    <div className="flex h-screen bg-[#fcfdfe] overflow-hidden">
      {/* Premium Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-full relative z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Sparkles size={20} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none">Student-Shield</h1>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">Campus Intelligence</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to ||
                (item.to !== `/${user?.role?.toLowerCase()}` && location.pathname.startsWith(item.to + '/'));

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 group ${isActive
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-1'
                    : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                  <Icon size={18} className={`${isActive ? 'text-indigo-400' : 'group-hover:text-indigo-600'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto p-8 border-t border-slate-50">
          <button
            onClick={logout}
            className="flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all active:scale-95"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Floating Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="hidden md:block">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Session Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-slate-700 uppercase">{user?.role} Active</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-1.5 pr-5 rounded-full border border-slate-100">
            <div className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-black">
              {user?.name?.charAt(0)}
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs font-bold text-slate-800">{user?.name}</p>
              <p className="text-[9px] font-medium text-slate-400">{user?.email}</p>
            </div>
          </div>
        </header>

        {/* Content Render Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;