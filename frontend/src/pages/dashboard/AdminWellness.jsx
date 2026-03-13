import { motion } from 'framer-motion';
import { Heart, BarChart2, Users } from 'lucide-react';

const AdminWellness = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <Heart size={32} className="text-secondary" /> Campus Wellness Overview
      </h1>
      <p className="text-gray-600">Campus-wide student wellness metrics and trends.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-teal-100 text-secondary rounded-lg"><Heart size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Avg Wellness Score</p>
            <p className="text-2xl font-bold text-gray-800">68%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-danger rounded-lg"><BarChart2 size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">High Risk Count</p>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><Users size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Students Monitored</p>
            <p className="text-2xl font-bold text-gray-800">4,520</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Heart size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Interventions (Month)</p>
            <p className="text-2xl font-bold text-gray-800">45</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Campus Wellness Trends</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-400">Wellness distribution and trend charts</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminWellness;
