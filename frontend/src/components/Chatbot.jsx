// // // import { useState } from 'react';
// // // import { api } from '../services/api';
// // // import { Send, Loader2 } from 'lucide-react';

// // // const Chatbot = () => {
// // //   const [messages, setMessages] = useState([
// // //     { text: "Hello! I'm your AI wellness assistant. How are you feeling today?", sender: 'bot' },
// // //   ]);
// // //   const [input, setInput] = useState('');
// // //   const [loading, setLoading] = useState(false);

// // //   const sendMessage = async () => {
// // //     if (!input.trim() || loading) return;

// // //     const userMsg = { text: input.trim(), sender: 'user' };
// // //     setMessages((prev) => [...prev, userMsg]);
// // //     setInput('');
// // //     setLoading(true);

// // //     try {
// // //       const res = await api.post('/chat/message', { message: userMsg.text });
// // //       // Backend returns { response } or full chatLog with response property
// // //       const botText = res.data?.response || res.data?.message || "I'm here to listen. How can I support you today?";
// // //       setMessages((prev) => [...prev, { text: botText, sender: 'bot' }]);
// // //     } catch (error) {
// // //       console.error('Chat error', error);
// // //       const errMsg = error.response?.status === 401
// // //         ? 'Please log in again to use the chat.'
// // //         : error.response?.data?.error || 'Unable to connect. Please try again.';
// // //       setMessages((prev) => [...prev, { text: errMsg, sender: 'bot' }]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col h-full min-h-[300px] bg-gray-50 relative">
// // //       <div className="flex-1 p-4 overflow-y-auto space-y-4">
// // //         {messages.map((msg, i) => (
// // //           <div
// // //             key={i}
// // //             className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// // //           >
// // //             <div
// // //               className={`p-3 rounded-xl max-w-[85%] shadow-sm ${
// // //                 msg.sender === 'user'
// // //                   ? 'bg-primary text-white rounded-br-none'
// // //                   : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
// // //               }`}
// // //             >
// // //               {msg.text}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="p-4 border-t bg-white">
// // //         <div className="flex items-center gap-2">
// // //           <input
// // //             type="text"
// // //             value={input}
// // //             onChange={(e) => setInput(e.target.value)}
// // //             onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
// // //             placeholder="Type a message..."
// // //             className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-secondary text-sm disabled:opacity-50"
// // //             disabled={loading}
// // //           />
// // //           <button
// // //             onClick={sendMessage}
// // //             disabled={loading}
// // //             className="p-2 bg-secondary text-white rounded-full hover:bg-teal-600 transition shadow disabled:opacity-50 flex items-center justify-center min-w-[40px]"
// // //           >
// // //             {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Chatbot;



// // import { useState, useEffect, useRef } from 'react';
// // import { api } from '../services/api';
// // import { Send, Loader2, Bot, User } from 'lucide-react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // const Chatbot = () => {
// //   const [messages, setMessages] = useState([
// //     { text: "Hello! I'm your AI wellness assistant. How are you feeling today?", sender: 'bot', timestamp: new Date() },
// //   ]);
// //   const [input, setInput] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   // Ref for auto-scrolling
// //   const scrollRef = useRef(null);

// //   // Auto-scroll to bottom whenever messages change
// //   useEffect(() => {
// //     if (scrollRef.current) {
// //       scrollRef.current.scrollTo({
// //         top: scrollRef.current.scrollHeight,
// //         behavior: 'smooth',
// //       });
// //     }
// //   }, [messages, loading]);

// //   const sendMessage = async () => {
// //     const trimmedInput = input.trim();
// //     if (!trimmedInput || loading) return;

// //     // 1. Create User Message
// //     const userMsg = { text: trimmedInput, sender: 'user', timestamp: new Date() };

// //     // 2. Clear input and add user message immediately
// //     setInput('');
// //     setMessages((prev) => [...prev, userMsg]);
// //     setLoading(true);

// //     try {
// //       // 3. API Call - Ensure the endpoint matches your backend
// //       const res = await api.post('/chat/message', { message: trimmedInput });

// //       // 4. Extract response with fallback chain
// //       const botText = res.data?.response || res.data?.message || "I'm processing that. Could you tell me more?";

// //       setMessages((prev) => [...prev, {
// //         text: botText,
// //         sender: 'bot',
// //         timestamp: new Date()
// //       }]);
// //     } catch (error) {
// //       console.error('Chat error:', error);

// //       let errorText = 'Unable to connect to the wellness core. Please try again.';
// //       if (error.response?.status === 401) errorText = 'Session expired. Please log in again.';
// //       else if (error.response?.data?.error) errorText = error.response.data.error;

// //       setMessages((prev) => [...prev, {
// //         text: errorText,
// //         sender: 'bot',
// //         isError: true,
// //         timestamp: new Date()
// //       }]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-full min-h-[450px] bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-2xl">
// //       {/* Chat Header */}
// //       <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
// //         <div className="flex items-center gap-3">
// //           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
// //             <Bot size={20} />
// //           </div>
// //           <div>
// //             <h3 className="text-sm font-black text-slate-800 tracking-tight">Wellness AI</h3>
// //             <div className="flex items-center gap-1.5">
// //               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
// //               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Always Listening</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Message Area */}
// //       <div
// //         ref={scrollRef}
// //         className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide"
// //       >
// //         <AnimatePresence>
// //           {messages.map((msg, i) => (
// //             <motion.div
// //               key={i}
// //               initial={{ opacity: 0, y: 10, scale: 0.95 }}
// //               animate={{ opacity: 1, y: 0, scale: 1 }}
// //               className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// //             >
// //               <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
// //                 <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-slate-200 text-slate-500' : 'bg-indigo-100 text-indigo-600'
// //                   }`}>
// //                   {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
// //                 </div>

// //                 <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
// //                     ? 'bg-indigo-600 text-white rounded-br-none'
// //                     : msg.isError
// //                       ? 'bg-rose-50 text-rose-600 border border-rose-100 rounded-bl-none'
// //                       : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
// //                   }`}>
// //                   {msg.text}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </AnimatePresence>

// //         {loading && (
// //           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-center gap-2">
// //             <div className="bg-white border border-slate-100 p-3 rounded-2xl flex gap-1">
// //               <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
// //               <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
// //               <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
// //             </div>
// //           </motion.div>
// //         )}
// //       </div>

// //       {/* Input Area */}
// //       <div className="p-4 bg-white border-t border-slate-100">
// //         <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-[2rem] border border-slate-100 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
// //           <input
// //             type="text"
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
// //             placeholder="Share what's on your mind..."
// //             className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-slate-700 font-medium placeholder:text-slate-400"
// //             disabled={loading}
// //           />
// //           <button
// //             onClick={sendMessage}
// //             disabled={loading || !input.trim()}
// //             className="w-10 h-10 bg-indigo-600 text-white rounded-full hover:bg-slate-900 transition-all shadow-lg shadow-indigo-200 disabled:opacity-30 disabled:shadow-none flex items-center justify-center"
// //           >
// //             {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
// //           </button>
// //         </div>
// //         <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-[0.2em] mt-3">
// //           AI Monitoring Active • Privacy Encrypted
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chatbot;




// import { useState, useEffect, useRef } from 'react';
// import { api } from '../services/api';
// import { Send, Loader2, Bot, Sparkles, User, AlertCircle } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     { text: "System Online. I am your AI Wellness assistant. How are you feeling today?", sender: 'bot' },
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const scrollRef = useRef(null);

//   // Auto-scroll to bottom whenever messages change
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         top: scrollRef.current.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }, [messages, loading]);

//   const sendMessage = async () => {
//     const trimmedInput = input.trim();
//     if (!trimmedInput || loading) return;

//     // 1. Update UI for User Message
//     const userMsg = { text: trimmedInput, sender: 'user' };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput('');
//     setLoading(true);

//     try {
//       // 2. API Call - Sending the message to backend
//       const res = await api.post('/chat/message', { message: trimmedInput });

//       // 3. Robust Data Extraction
//       // This checks every possible field your backend might be using
//       const botReply =
//         res.data?.response ||
//         res.data?.message ||
//         res.data?.botReply ||
//         res.data?.text ||
//         "I processed your request, but the response format was empty.";

//       setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }]);
//     } catch (error) {
//       console.error('Chat API Error:', error);

//       // 4. Error Handling
//       const errorMsg = error.response?.data?.message || error.response?.data?.error || "Connection failed. Please check if the server is running.";
//       setMessages((prev) => [...prev, { text: errorMsg, sender: 'bot', isError: true }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[550px] w-full bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
//       {/* Header */}
//       <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
//             <Bot size={22} />
//           </div>
//           <div>
//             <h3 className="text-sm font-black tracking-tight uppercase">Wellness Core</h3>
//             <div className="flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
//               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Intelligence</span>
//             </div>
//           </div>
//         </div>
//         <Sparkles size={18} className="text-indigo-400 opacity-50" />
//       </div>

//       {/* Message Feed */}
//       <div
//         ref={scrollRef}
//         className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50 scroll-smooth"
//       >
//         <AnimatePresence>
//           {messages.map((msg, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
//                 <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-slate-200 text-slate-500' : 'bg-indigo-100 text-indigo-600'
//                   }`}>
//                   {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
//                 </div>

//                 <div className={`p-4 rounded-[1.5rem] text-sm font-medium shadow-sm leading-relaxed ${msg.sender === 'user'
//                     ? 'bg-indigo-600 text-white rounded-br-none shadow-indigo-100'
//                     : msg.isError
//                       ? 'bg-rose-50 text-rose-600 border border-rose-100 rounded-bl-none'
//                       : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
//                   }`}>
//                   {msg.isError && <AlertCircle size={14} className="inline mr-2 mb-0.5" />}
//                   {msg.text}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {loading && (
//           <div className="flex justify-start">
//             <div className="bg-white border border-slate-100 p-4 rounded-2xl flex gap-1.5 shadow-sm">
//               <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//               <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//               <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Input Terminal */}
//       <div className="p-5 bg-white border-t border-slate-100">
//         <div className="flex items-center gap-3 bg-slate-100 p-2 pl-5 rounded-[2rem] border border-transparent focus-within:border-indigo-500/20 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all duration-300">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//             placeholder="Describe your current state..."
//             className="flex-1 bg-transparent py-2 outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium"
//             disabled={loading}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading || !input.trim()}
//             className="w-11 h-11 bg-indigo-600 text-white rounded-full hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-200 disabled:opacity-30 disabled:shadow-none disabled:scale-100 flex items-center justify-center"
//           >
//             {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
//           </button>
//         </div>
//         <p className="text-[9px] text-center text-slate-400 font-black uppercase tracking-[0.25em] mt-4">
//           Secured AI Processing • End-to-End Encryption
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


import { useState, useEffect, useRef } from "react";
import { api } from "../services/api";
import { Send, Loader2, Bot, User, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello 👋 I'm your AI Wellness Assistant. How are you feeling today?",
      sender: "bot"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  // auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);


  const sendMessage = async () => {

    const message = input.trim();
    if (!message || loading) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: "user"
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {

      const response = await api.post("/chat/message", {
        message: message
      });

      const botReply =
        response.data?.reply ||
        response.data?.response ||
        response.data?.message ||
        "I'm not sure how to respond to that.";

      const botMessage = {
        id: Date.now() + 1,
        text: botReply,
        sender: "bot"
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {

      const errorMessage = {
        id: Date.now() + 2,
        text:
          err.response?.data?.message ||
          "⚠️ Server connection failed. Make sure backend is running.",
        sender: "bot",
        isError: true
      };

      setMessages((prev) => [...prev, errorMessage]);

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-[550px] w-full bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center">
            <Bot size={22} />
          </div>

          <div>
            <h3 className="text-sm font-black uppercase">Wellness Core</h3>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              AI Active
            </div>
          </div>

        </div>

        <Sparkles size={18} />
      </div>


      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto space-y-5 bg-slate-50"
      >

        <AnimatePresence>

          {messages.map((msg) => (

            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
                }`}
            >

              <div
                className={`flex items-end gap-2 max-w-[80%] ${msg.sender === "user"
                    ? "flex-row-reverse"
                    : "flex-row"
                  }`}
              >

                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${msg.sender === "user"
                      ? "bg-gray-200"
                      : "bg-indigo-100"
                    }`}
                >
                  {msg.sender === "user" ? (
                    <User size={14} />
                  ) : (
                    <Bot size={14} />
                  )}
                </div>


                <div
                  className={`p-4 rounded-2xl text-sm ${msg.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : msg.isError
                        ? "bg-red-50 text-red-600 border"
                        : "bg-white border text-gray-700"
                    }`}
                >

                  {msg.isError && (
                    <AlertCircle
                      size={14}
                      className="inline mr-1"
                    />
                  )}

                  {msg.text}

                </div>

              </div>

            </motion.div>

          ))}

        </AnimatePresence>


        {loading && (
          <div className="flex gap-2">
            <Loader2 className="animate-spin" />
            <span className="text-sm text-gray-500">
              AI is thinking...
            </span>
          </div>
        )}

      </div>


      {/* Input */}
      <div className="p-4 border-t bg-white">

        <div className="flex gap-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 border rounded-full outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Chatbot;