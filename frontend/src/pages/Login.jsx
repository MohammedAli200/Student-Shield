import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user.role === 'Student') navigate('/student');
            if (user.role === 'Faculty') navigate('/faculty');
            if (user.role === 'Counselor') navigate('/counselor');
            if (user.role === 'Admin') navigate('/admin');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#fdfeff] font-sans">
            {/* Soft Pastel Background Accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] bg-purple-50/60 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white m-4 overflow-hidden">

                {/* Left Side: Visual/Branding Section */}
                <div className="hidden md:flex flex-col justify-between w-5/12 bg-gradient-to-br from-indigo-50 to-blue-50 p-12 border-r border-slate-100">
                    <div>
                        <div className="w-10 h-10 bg-indigo-600 rounded-2xl mb-6 shadow-lg shadow-indigo-200 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 leading-tight">Securing your <br /> academic journey.</h2>
                        <p className="mt-4 text-slate-500 text-sm leading-relaxed">Access the unified portal for students, faculty, and administration.</p>
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                        Institutional Grade Security
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-7/12 p-10 md:p-16">
                    <div className="mb-10">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
                        <p className="text-slate-400 text-sm mt-1">Please enter your details to continue.</p>
                    </div>

                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-2xl bg-red-50 text-red-600 text-xs border border-red-100 flex items-center animate-pulse">
                            <span className="mr-2 italic font-bold">!</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@college.edu"
                                className="w-full bg-slate-50 border-none p-4 rounded-2xl text-slate-700 text-sm transition-all focus:ring-2 focus:ring-indigo-100 focus:bg-white ring-1 ring-slate-100"
                                value={email} onChange={(e) => setEmail(e.target.value)} required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border-none p-4 rounded-2xl text-slate-700 text-sm transition-all focus:ring-2 focus:ring-indigo-100 focus:bg-white ring-1 ring-slate-100"
                                value={password} onChange={(e) => setPassword(e.target.value)} required
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs px-1">
                            <label className="flex items-center text-slate-500 cursor-pointer">
                                <input type="checkbox" className="mr-2 accent-indigo-600" /> Remember me
                            </label>
                            <span className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700">Forgot Password?</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 py-4 rounded-2xl font-bold text-white text-sm transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-100 active:scale-[0.97]"
                        >
                            Sign In to Portal
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-400 text-sm">
                            Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-bold ml-1 transition-colors">Join now</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;