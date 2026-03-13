// import { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('Student');
//     const [error, setError] = useState('');
//     const { register } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const user = await register(name, email, password, role);
//             if (user.role === 'Student') navigate('/student');
//             if (user.role === 'Faculty') navigate('/faculty');
//             if (user.role === 'Counselor') navigate('/counselor');
//             if (user.role === 'Admin') navigate('/admin');
//         } catch (err) {
//             setError(err);
//         }
//     };

//     return (
//         <div className="flex h-screen bg-gray-100 justify-center items-center">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
//                 <h1 className="text-2xl font-bold text-primary mb-2">Campus Guardian</h1>
//                 <p className="text-sm text-gray-500 mb-6">Create your account</p>
//                 {error && <div className="bg-red-100 text-danger p-2 rounded mb-4 text-sm">{error}</div>}

//                 <form onSubmit={handleSubmit} className="space-y-4 text-left">
//                     <div>
//                         <input 
//                             type="text" 
//                             placeholder="Full Name" 
//                             className="w-full p-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//                             value={name} onChange={(e) => setName(e.target.value)} required 
//                         />
//                     </div>
//                     <div>
//                         <input 
//                             type="email" 
//                             placeholder="Email Address" 
//                             className="w-full p-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//                             value={email} onChange={(e) => setEmail(e.target.value)} required 
//                         />
//                     </div>
//                     <div>
//                         <input 
//                             type="password" 
//                             placeholder="Password" 
//                             className="w-full p-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//                             value={password} onChange={(e) => setPassword(e.target.value)} required 
//                         />
//                     </div>
//                     <div>
//                         <select 
//                             className="w-full p-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
//                             value={role} onChange={(e) => setRole(e.target.value)}
//                         >
//                             <option value="Student">Student</option>
//                             <option value="Faculty">Faculty</option>
//                             <option value="Counselor">Counselor</option>
//                             <option value="Admin">Admin</option>
//                         </select>
//                     </div>
//                     <button type="submit" className="w-full bg-primary text-white p-3 rounded font-semibold hover:bg-blue-800 transition mt-2">
//                        Register
//                     </button>
//                 </form>
//                 <div className="mt-4 text-sm">
//                     <p className="text-gray-600">Already have an account? <Link to="/login" className="text-secondary font-semibold">Login</Link></p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;




import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await register(name, email, password, role);
            if (user.role === 'Student') navigate('/student');
            if (user.role === 'Faculty') navigate('/faculty');
            if (user.role === 'Counselor') navigate('/counselor');
            if (user.role === 'Admin') navigate('/admin');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#fdfeff] font-sans py-12">
            {/* Ambient Background Accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-indigo-50/60 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white m-4 overflow-hidden">

                {/* Left Side: Onboarding Content */}
                <div className="hidden md:flex flex-col justify-between w-5/12 bg-gradient-to-br from-blue-50 to-indigo-50 p-12 border-r border-slate-100">
                    <div>
                        <div className="w-10 h-10 bg-indigo-600 rounded-2xl mb-6 shadow-lg shadow-indigo-200 flex items-center justify-center text-white font-bold text-xl">
                            C
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                            Join the <br /> Community.
                        </h2>
                        <p className="mt-4 text-slate-500 text-sm leading-relaxed">
                            Create your specialized account to access personalized campus services and security features.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 opacity-60">
                            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Encrypted Data</span>
                        </div>
                        <div className="flex items-center space-x-3 opacity-60">
                            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Verified Roles</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="w-full md:w-7/12 p-10 md:p-14">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h1>
                        <p className="text-slate-400 text-sm mt-1">Start your journey with Campus Guardian.</p>
                    </div>

                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-2xl bg-red-50 text-red-600 text-xs border border-red-100 animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full bg-slate-50 border-none p-4 rounded-2xl text-slate-700 text-sm transition-all focus:ring-2 focus:ring-indigo-100 focus:bg-white ring-1 ring-slate-100"
                                value={name} onChange={(e) => setName(e.target.value)} required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@institution.edu"
                                className="w-full bg-slate-50 border-none p-4 rounded-2xl text-slate-700 text-sm transition-all focus:ring-2 focus:ring-indigo-100 focus:bg-white ring-1 ring-slate-100"
                                value={email} onChange={(e) => setEmail(e.target.value)} required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-slate-50 border-none p-4 rounded-2xl text-slate-700 text-sm transition-all focus:ring-2 focus:ring-indigo-100 focus:bg-white ring-1 ring-slate-100"
                                    value={password} onChange={(e) => setPassword(e.target.value)} required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">User Role</label>
                                <select
                                    className="w-full bg-slate-50 border-none p-4 rounded-2xl text-slate-700 text-sm transition-all focus:ring-2 focus:ring-indigo-100 focus:bg-white ring-1 ring-slate-100 appearance-none"
                                    value={role} onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Counselor">Counselor</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 py-4 rounded-2xl font-bold text-white text-sm transition-all hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-100 active:scale-[0.97] mt-2"
                        >
                            Complete Registration
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-400 text-sm font-medium">
                            Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-bold ml-1">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;