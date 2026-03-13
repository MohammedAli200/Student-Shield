import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { api } from '../../../services/api';
import { motion } from 'framer-motion';
import { Heart, Loader2, CheckCircle } from 'lucide-react';

const MOODS = ['Happy', 'Neutral', 'Sad', 'Stressed', 'Burnout', 'Critical'];

const MoodCheckin = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    academic: { attendancePercentage: 75, assignmentSubmissionRate: 80, gpa: 7, courseBacklogCount: 0 },
    behavior: { libraryUsageHoursPerWeek: 5, campusEventParticipation: 2, socialActivityParticipation: 3 },
    wellness: { mood: 'Neutral', stressLevel: 5, sleepHours: 7, notes: '' },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await api.post('/student/data', form);
      await api.post('/ai/analyze', {});
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <Heart size={32} className="text-secondary" /> Wellness Check-in
      </h1>
      <p className="text-gray-600">Submit your academic, behavioral, and wellness data for risk assessment.</p>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
          <CheckCircle size={24} /> Data submitted & analyzed successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Academic Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attendance %</label>
              <input type="number" min="0" max="100" className="w-full p-2 border rounded"
                value={form.academic.attendancePercentage} onChange={(e) => setForm({ ...form, academic: { ...form.academic, attendancePercentage: +e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Submission %</label>
              <input type="number" min="0" max="100" className="w-full p-2 border rounded"
                value={form.academic.assignmentSubmissionRate} onChange={(e) => setForm({ ...form, academic: { ...form.academic, assignmentSubmissionRate: +e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
              <input type="number" step="0.1" min="0" max="10" className="w-full p-2 border rounded"
                value={form.academic.gpa} onChange={(e) => setForm({ ...form, academic: { ...form.academic, gpa: +e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Backlog Count</label>
              <input type="number" min="0" className="w-full p-2 border rounded"
                value={form.academic.courseBacklogCount} onChange={(e) => setForm({ ...form, academic: { ...form.academic, courseBacklogCount: +e.target.value } })} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Behavioral Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Library Hours/Week</label>
              <input type="number" min="0" className="w-full p-2 border rounded"
                value={form.behavior.libraryUsageHoursPerWeek} onChange={(e) => setForm({ ...form, behavior: { ...form.behavior, libraryUsageHoursPerWeek: +e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campus Events Participation</label>
              <input type="number" min="0" className="w-full p-2 border rounded"
                value={form.behavior.campusEventParticipation} onChange={(e) => setForm({ ...form, behavior: { ...form.behavior, campusEventParticipation: +e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Social Activities</label>
              <input type="number" min="0" className="w-full p-2 border rounded"
                value={form.behavior.socialActivityParticipation} onChange={(e) => setForm({ ...form, behavior: { ...form.behavior, socialActivityParticipation: +e.target.value } })} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Self Report (Mood & Wellness)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button key={m} type="button"
                    className={`px-4 py-2 rounded-full text-sm ${form.wellness.mood === m ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setForm({ ...form, wellness: { ...form.wellness, mood: m } })}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stress Level (1-10)</label>
              <input type="number" min="1" max="10" className="w-full p-2 border rounded"
                value={form.wellness.stressLevel} onChange={(e) => setForm({ ...form, wellness: { ...form.wellness, stressLevel: +e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sleep Hours</label>
              <input type="number" min="0" max="24" className="w-full p-2 border rounded"
                value={form.wellness.sleepHours} onChange={(e) => setForm({ ...form, wellness: { ...form.wellness, sleepHours: +e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea rows={3} className="w-full p-2 border rounded" placeholder="How are you feeling?"
                value={form.wellness.notes} onChange={(e) => setForm({ ...form, wellness: { ...form.wellness, notes: e.target.value } })} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="px-6 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-teal-600 transition flex items-center gap-2 disabled:opacity-50">
          {loading ? <Loader2 size={20} className="animate-spin" /> : null} Submit Check-in
        </button>
      </form>
    </motion.div>
  );
};

export default MoodCheckin;
