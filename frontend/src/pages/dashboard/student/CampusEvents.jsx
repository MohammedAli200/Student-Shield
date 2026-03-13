// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Calendar, MapPin, Users } from 'lucide-react';

// const MOCK_EVENTS = [
//   { id: 1, title: 'Campus Wellness Week', date: '2025-03-15', location: 'Main Auditorium', type: 'Wellness' },
//   { id: 2, title: 'Study Skills Workshop', date: '2025-03-18', location: 'Library Room A', type: 'Academic' },
//   { id: 3, title: 'Stress Management Seminar', date: '2025-03-20', location: 'Student Center', type: 'Wellness' },
//   { id: 4, title: 'Sports Day', date: '2025-03-22', location: 'Sports Complex', type: 'Social' },
//   { id: 5, title: 'Career Fair', date: '2025-03-25', location: 'Convocation Hall', type: 'Career' },
// ];

// const CampusEvents = () => {
//   const [events] = useState(MOCK_EVENTS);

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//         <Calendar size={32} className="text-primary" /> Campus Events
//       </h1>
//       <p className="text-gray-600">Upcoming campus activities and wellness events.</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map((event) => (
//           <motion.div
//             key={event.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
//           >
//             <span className="text-xs font-semibold text-secondary bg-teal-50 px-2 py-1 rounded">{event.type}</span>
//             <h3 className="text-lg font-bold text-gray-800 mt-3">{event.title}</h3>
//             <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm">
//               <Calendar size={16} /> {event.date}
//             </div>
//             <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
//               <MapPin size={16} /> {event.location}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default CampusEvents;



import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, ArrowUpRight, Clock } from 'lucide-react';

const MOCK_EVENTS = [
  { id: 1, title: 'Campus Wellness Week', date: '2025-03-15', location: 'Main Auditorium', type: 'Wellness', color: 'indigo' },
  { id: 2, title: 'Study Skills Workshop', date: '2025-03-18', location: 'Library Room A', type: 'Academic', color: 'blue' },
  { id: 3, title: 'Stress Management Seminar', date: '2025-03-20', location: 'Student Center', type: 'Wellness', color: 'indigo' },
  { id: 4, title: 'Sports Day', date: '2025-03-22', location: 'Sports Complex', type: 'Social', color: 'rose' },
  { id: 5, title: 'Career Fair', date: '2025-03-25', location: 'Convocation Hall', type: 'Career', color: 'emerald' },
];

const CampusEvents = () => {
  const [events] = useState(MOCK_EVENTS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 space-y-10"
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em]">
            <Sparkles size={14} />
            Student Life
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Campus Events</h1>
          <p className="text-slate-500 text-sm max-w-lg">Discover workshops, seminars, and wellness activities tailored for your growth.</p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
          <button className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg">Upcoming</button>
          <button className="px-6 py-2 text-slate-400 text-xs font-bold rounded-xl hover:text-slate-600">Past</button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-[3rem] border border-slate-100 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all duration-500"
          >
            {/* Top Row: Type & Action */}
            <div className="flex justify-between items-start mb-6">
              <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full 
                    ${event.type === 'Wellness' ? 'bg-indigo-50 text-indigo-600' :
                  event.type === 'Academic' ? 'bg-blue-50 text-blue-600' :
                    event.type === 'Social' ? 'bg-rose-50 text-rose-600' :
                      'bg-emerald-50 text-emerald-600'}`}>
                {event.type}
              </span>
              <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <ArrowUpRight size={18} />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors mb-4">
              {event.title}
            </h3>

            {/* Details */}
            <div className="space-y-3 mt-6 pt-6 border-t border-slate-50">
              <div className="flex items-center gap-3 text-slate-500">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                  <Calendar size={14} className="text-slate-400" />
                </div>
                <span className="text-xs font-bold">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                  <MapPin size={14} className="text-slate-400" />
                </div>
                <span className="text-xs font-medium">{event.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                  <Clock size={14} className="text-slate-400" />
                </div>
                <span className="text-xs font-medium">10:00 AM - 02:00 PM</span>
              </div>
            </div>

            {/* Hover Decor */}
            <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Register Now</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Suggestion Banner */}
      <div className="max-w-7xl mx-auto mt-20 p-10 bg-slate-900 rounded-[3.5rem] shadow-2xl shadow-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">Can't find what you're looking for?</h2>
          <p className="text-slate-400 text-sm mt-1">Suggest a wellness event or workshop to the administration.</p>
        </div>
        <button className="relative z-10 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-all active:scale-95 shadow-lg">
          Suggest Event
        </button>
      </div>
    </motion.div>
  );
};

export default CampusEvents;