// import { useState, useContext, useEffect, useCallback } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { api } from '../../services/api';
// import { motion } from 'framer-motion';
// import { Activity, BookOpen, AlertCircle, MessageCircle } from 'lucide-react';
// import Chatbot from '../../components/Chatbot';

// const StudentDashboard = () => {
//     const { user } = useContext(AuthContext);
//     const [riskData, setRiskData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const fetchRiskData = useCallback(async () => {
//         if (!user?._id) return;
//         try {
//             const res = await api.get(`/ai/risk/${user._id}`);
//             setRiskData(res.data);
//         } catch (error) {
//             console.error("No risk data yet. Submit wellness data first.");
//         } finally {
//             setLoading(false);
//         }
//     }, [user]);

//     useEffect(() => {
//         setLoading(true);
//         fetchRiskData();
//     }, [fetchRiskData]);

//     if (loading) return <div>Loading dashboard...</div>;

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//             <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}</h1>
//             <p className="text-gray-600">Your academic and wellness data is entered by your faculty. View your risk score and chat with the AI assistant below.</p>

//             {/* Quick Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
//                     <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Activity size={24} /></div>
//                     <div>
//                         <p className="text-sm text-gray-500">Risk Score</p>
//                         <p className="text-2xl font-bold text-gray-800">{riskData ? riskData.score : 'N/A'}/100</p>
//                     </div>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
//                     <div className="p-3 bg-green-100 text-green-600 rounded-lg"><BookOpen size={24} /></div>
//                     <div>
//                         <p className="text-sm text-gray-500">Risk Level</p>
//                         <p className={`text-xl font-bold ${riskData?.riskLevel === 'Critical Risk' ? 'text-danger' : 'text-gray-800'}`}>
//                             {riskData ? riskData.riskLevel : 'N/A'}
//                         </p>
//                     </div>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
//                     <div className="p-3 bg-red-100 text-red-600 rounded-lg"><AlertCircle size={24} /></div>
//                     <div>
//                         <p className="text-sm text-gray-500">Counselor Alerts</p>
//                         <p className="text-2xl font-bold text-gray-800">0</p>
//                     </div>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
//                   <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><MessageCircle size={24} /></div>
//                     <div>
//                         <p className="text-sm text-gray-500">Chat Sessions</p>
//                         <p className="text-2xl font-bold text-gray-800">12</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//                <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                    <h2 className="text-xl font-bold mb-4 text-gray-800">Your Analytics Overview</h2>
//                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
//                       <p className="text-gray-400">Chart Visualization Placeholder</p>
//                    </div>
//                </div>

//                {/* Chatbot Integrated Panel */}
//                <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
//                   <div className="p-4 border-b">
//                      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//                         <MessageCircle size={20} className="text-secondary" /> AI Wellness Assistant
//                      </h2>
//                   </div>
//                   <div className="flex-1 p-0 overflow-hidden relative">
//                      <Chatbot />
//                   </div>
//                </div>
//             </div>
//         </motion.div>
//     );
// };

// export default StudentDashboard;




import { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { api } from '../../services/api';
import { motion } from 'framer-motion';
import { Activity, BookOpen, AlertCircle, MessageCircle, ChevronRight, User } from 'lucide-react';
import Chatbot from '../../components/Chatbot';

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const [riskData, setRiskData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRiskData = useCallback(async () => {
        if (!user?._id) return;
        try {
            const res = await api.get(`/ai/risk/${user._id}`);
            setRiskData(res.data);
        } catch (error) {
            console.error("No risk data yet.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        setLoading(true);
        fetchRiskData();
    }, [fetchRiskData]);

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-white">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-indigo-50 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#fcfdfe] text-slate-900 p-4 md:p-8"
        >
            {/* Top Navigation / Header */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
                        <span className="w-8 h-[2px] bg-indigo-600"></span>
                        Student Dashboard
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                        Hello, {user.name.split(' ')[0]}
                    </h1>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full shadow-sm border border-slate-100">
                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                        <User size={20} />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Status</p>
                        <p className="text-xs font-bold text-slate-700">Verified {user.role}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Stats & Analytics */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Hero Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Risk Card */}
                        <div className="group relative overflow-hidden bg-white p-8 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all hover:shadow-indigo-100/50">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:scale-110"></div>
                            <Activity className="text-indigo-600 mb-4" size={28} />
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Wellness Score</p>
                            <h3 className="text-4xl font-black mt-1 text-slate-800">{riskData ? riskData.score : '—'}</h3>
                        </div>

                        {/* Status Card */}
                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                            <BookOpen className="text-emerald-500 mb-4" size={28} />
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Risk Level</p>
                            <h3 className={`text-xl font-bold mt-2 ${riskData?.riskLevel === 'Critical Risk' ? 'text-rose-500' : 'text-slate-800'}`}>
                                {riskData ? riskData.riskLevel : 'Low Risk'}
                            </h3>
                        </div>

                        {/* Alerts Card */}
                        <div className="bg-slate-900 p-8 rounded-[3rem] shadow-xl shadow-slate-200 text-white">
                            <AlertCircle className="text-indigo-400 mb-4" size={28} />
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Pending Alerts</p>
                            <h3 className="text-4xl font-black mt-1">0</h3>
                        </div>
                    </div>

                    {/* Visual Placeholder Section */}
                    <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-[0_30px_60px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold tracking-tight">Engagement History</h2>
                            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors"><ChevronRight /></button>
                        </div>
                        <div className="aspect-[21/9] w-full bg-gradient-to-b from-slate-50 to-white rounded-[2.5rem] border border-dashed border-slate-200 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-slate-300 font-medium text-sm">Visualizing data points...</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: AI Assistant */}
                <div className="lg:col-span-4 h-full min-h-[600px]">
                    <div className="sticky top-8 bg-white h-full rounded-[3.5rem] border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden">
                        <div className="p-8 pb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Live Assistant</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Campus Guide AI</h2>
                        </div>

                        <div className="flex-1 relative bg-slate-50/50">
                            <Chatbot />
                        </div>

                        <div className="p-6 text-center text-[10px] text-slate-400 uppercase tracking-tighter">
                            End-to-End Encrypted Session
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default StudentDashboard;