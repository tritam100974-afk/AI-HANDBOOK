import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Lightbulb, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  BarChart3,
  BookOpen,
  Zap,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

// --- Types ---
interface Question {
  id: number;
  text: string;
  options: { text: string; points: number }[];
}

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

// --- Components ---

const Section = ({ id, title, children, className = "" }: SectionProps) => (
  <section id={id} className={`py-24 px-6 md:px-12 lg:px-24 ${className}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <h2 className="font-serif text-4xl md:text-5xl font-bold mb-12 text-slate-900 tracking-tight">
        {title}
      </h2>
      {children}
    </motion.div>
  </section>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: 'Giới thiệu', href: '#intro' },
    { name: 'Lợi ích & Tác hại', href: '#pros-cons' },
    { name: 'Hướng dẫn', href: '#guide' },
    { name: 'Trắc nghiệm', href: '#quiz' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 border-l-2 border-slate-200 pl-3">AI HANDBOOK</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  className="text-base font-medium text-slate-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AIQuiz = () => {
  const questions: Question[] = [
    {
      id: 1,
      text: "Bạn sử dụng AI với tần suất như thế nào trong công việc/học tập?",
      options: [
        { text: "Hầu như mỗi ngày", points: 10 },
        { text: "Vài lần một tuần", points: 7 },
        { text: "Thỉnh thoảng mới dùng", points: 4 },
        { text: "Chưa bao giờ sử dụng", points: 0 },
      ]
    },
    {
      id: 2,
      text: "Khi AI đưa ra một câu trả lời, bạn thường làm gì?",
      options: [
        { text: "Tin tưởng tuyệt đối và dùng ngay", points: 10 },
        { text: "Kiểm tra sơ qua rồi dùng", points: 7 },
        { text: "Luôn đối chiếu với các nguồn uy tín khác", points: 4 },
        { text: "Dùng AI chỉ để lấy ý tưởng ban đầu", points: 2 },
      ]
    },
    {
      id: 3,
      text: "Bạn đã từng thử yêu cầu AI giải quyết các vấn đề phức tạp chưa?",
      options: [
        { text: "Thường xuyên, AI là trợ lý chính", points: 10 },
        { text: "Có, nhưng chỉ với một số việc", points: 7 },
        { text: "Rất hiếm khi", points: 3 },
        { text: "Chưa từng", points: 0 },
      ]
    },
    {
      id: 4,
      text: "Bạn có biết về các rủi ro bảo mật thông tin khi dùng AI không?",
      options: [
        { text: "Biết rất rõ và luôn cẩn thận", points: 2 },
        { text: "Có nghe qua nhưng không để ý lắm", points: 7 },
        { text: "Hoàn toàn không biết", points: 10 },
      ]
    },
    {
      id: 5,
      text: "Bạn cảm thấy thế nào về tương lai khi AI ngày càng phát triển?",
      options: [
        { text: "Hào hứng và sẵn sàng thích nghi", points: 10 },
        { text: "Hơi lo lắng nhưng vẫn tìm hiểu", points: 7 },
        { text: "Sợ hãi và muốn né tránh", points: 3 },
        { text: "Không quan tâm", points: 0 },
      ]
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const totalScore = useMemo(() => answers.reduce((a, b) => a + b, 0), [answers]);

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const getEvaluation = () => {
    if (totalScore >= 40) return {
      title: "Người dẫn đầu xu hướng (Trendsetter)",
      desc: "Bạn là một người am hiểu và sử dụng AI cực kỳ hiệu quả. Hãy tiếp tục duy trì sự tỉnh táo để không quá phụ thuộc nhé!",
      color: "text-indigo-600"
    };
    if (totalScore >= 25) return {
      title: "Cộng tác viên tiềm năng (Explorer)",
      desc: "Bạn đang khám phá AI một cách đúng hướng. Hãy tìm hiểu thêm các kỹ thuật nhắc (prompt) để tối ưu công việc hơn.",
      color: "text-emerald-600"
    };
    return {
      title: "Người mới bắt đầu (Beginner)",
      desc: "Bạn chưa thực sự tin tưởng hoặc chưa biết cách tận dụng AI. Đừng lo, hãy bắt đầu từ những việc nhỏ nhất!",
      color: "text-amber-600"
    };
  };

  return (
    <div className="bg-slate-50 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
      {!showResult ? (
        <div>
          <div className="flex justify-between items-end mb-8">
            <div className="flex-1">
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Câu hỏi {currentStep + 1}/{questions.length}</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2 leading-tight">{questions[currentStep].text}</h3>
            </div>
            <BarChart3 className="text-slate-300 w-12 h-12 hidden md:block ml-4" />
          </div>
          <div className="grid gap-4">
            {questions[currentStep].options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(opt.points)}
                className="w-full text-left p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all group flex justify-between items-center"
              >
                <span className="font-medium text-slate-700 group-hover:text-indigo-900">{opt.text}</span>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500" />
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="inline-flex p-4 bg-indigo-100 rounded-full mb-6">
            <CheckCircle2 className="w-12 h-12 text-indigo-600" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-2">Kết quả của bạn</h3>
          <p className="text-slate-500 mb-4">Tổng điểm: <span className="font-bold text-slate-900">{totalScore}</span></p>
          
          <div className="max-w-md mx-auto mb-10 p-8 bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-slate-100">
            <h4 className={`text-2xl font-bold mb-4 ${getEvaluation().color}`}>{getEvaluation().title}</h4>
            <p className="text-slate-600 leading-relaxed">{getEvaluation().desc}</p>
          </div>
          
          <button 
            onClick={resetQuiz}
            className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
          >
            Làm lại trắc nghiệm
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 relative">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-sky-50/50 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      {/* Hero Section - Revamped */}
      <section id="header" className="relative pt-40 pb-32 md:pt-60 md:pb-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Floating Data Chips - Fills the "Empty" space */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute top-0 right-[15%] glass px-6 py-4 rounded-2xl shadow-xl shadow-indigo-100/50 animate-float flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none mb-1">Neural Net</p>
                <p className="text-sm font-bold text-slate-800">Processing Data...</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="absolute bottom-10 left-[5%] glass px-6 py-4 rounded-full shadow-xl shadow-sky-100/50 animate-float-delayed flex items-center gap-3"
            >
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-bold text-slate-700">Real-time Analysis</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="absolute top-40 left-[10%] glass-dark px-5 py-3 rounded-2xl shadow-2xl animate-float-slow text-white flex flex-col gap-1"
            >
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-slate-700 rounded-full" />
                <div className="w-2 h-2 bg-slate-700 rounded-full" />
              </div>
              <p className="text-[10px] font-mono tracking-tighter opacity-70">GEN_COMPLETED v4.0</p>
            </motion.div>
          </div>

          <div className="flex flex-col items-center text-center max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-10">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                <span>AI Handbook Project 2024</span>
              </div>
              <h1 className="font-serif text-7xl md:text-9xl font-bold leading-[0.85] mb-10 text-slate-900 tracking-tightest">
                Tương lai <br /> 
                <span className="text-indigo-600 italic">bắt đầu</span> từ đây.
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
                Trí tuệ nhân tạo không thay thế con người, nhưng con người <span className="text-slate-900 font-medium">biết sử dụng AI</span> sẽ thay thế những người không biết.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#intro" className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-200 hover:bg-slate-900 hover:-translate-y-1 transition-all flex items-center gap-3 group">
                  Khám phá ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#quiz" className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:border-indigo-600 hover:-translate-y-1 transition-all">
                  Làm trắc nghiệm
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1. Giới thiệu về AI */}
      <Section id="intro" title="Trí tuệ nhân tạo là gì?">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Trí tuệ nhân tạo (AI - Artificial Intelligence) là khả năng của một hệ thống máy tính có thể mô phỏng các quá trình suy nghĩ và học tập của con người. 
              Nó không chỉ là những dòng code khô khan, mà là sự tổng hợp của toán học, ngôn ngữ và logic để giải quyết các vấn đề phức tạp.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Machine Learning", desc: "Máy tính học từ dữ liệu để cải thiện hiệu suất mà không cần lập trình rõ ràng." },
                { title: "Natural Language", desc: "Xử lý và hiểu ngôn ngữ con người như các trợ lý ảo Siri, ChatGPT." },
                { title: "Computer Vision", desc: "Nhận diện hình ảnh và video, nền tảng cho xe tự lái." },
                { title: "Expert Systems", desc: "Mô phỏng khả năng ra quyết định của các chuyên gia trong một lĩnh vực." },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-indigo-600 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
            <BookOpen className="w-12 h-12 opacity-50 mb-8" />
            <div>
              <blockquote className="text-2xl font-serif italic mb-6">
                "AI là 'điện' mới. Nó sẽ làm thay đổi mọi ngành công nghiệp giống như điện đã làm cách đây 100 năm."
              </blockquote>
              <p className="font-bold text-indigo-200">— Andrew Ng</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Bento Grid Section */}
      <Section id="pros-cons" title="Lợi ích & Thách thức" className="bg-slate-50">
        <div className="grid md:grid-cols-3 gap-6 auto-rows-[240px]">
          {/* Main Benefit Block */}
          <div className="md:col-span-2 row-span-2 bg-indigo-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
            <div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-serif font-bold mb-4">Cách mạng năng suất</h3>
              <p className="text-indigo-100 text-lg max-w-md leading-relaxed">
                Xử lý dữ liệu, viết mã, tạo nội dung trong tích tắc. AI giúp giải phóng con người khỏi những tác vụ lặp đi lặp lại để tập trung vào sự sáng tạo cốt lõi.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase">+300% Hiệu quả</span>
              <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase">Xử lý 24/7</span>
            </div>
          </div>

          {/* Small Benefit Block 1 */}
          <div className="bg-emerald-500 rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
            <Lightbulb className="w-10 h-10 mb-4" />
            <div>
              <h4 className="text-xl font-bold mb-2">Y tế thông minh</h4>
              <p className="text-emerald-50 opacity-80 text-sm">Chẩn đoán bệnh sớm và phát hiện ung thư với độ chính xác vượt tầm mắt người.</p>
            </div>
          </div>

          {/* Small Benefit Block 2 */}
          <div className="bg-sky-500 rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
            <BookOpen className="w-10 h-10 mb-4" />
            <div>
              <h4 className="text-xl font-bold mb-2">Cá nhân hóa giáo dục</h4>
              <p className="text-sky-50 opacity-80 text-sm">Lộ trình học tập được thiết kế riêng cho từng cá nhân dựa trên năng lực.</p>
            </div>
          </div>

          {/* Danger Block */}
          <div className="md:col-span-3 bg-white border border-slate-200 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="p-6 bg-rose-50 rounded-3xl shrink-0">
              <AlertTriangle className="w-12 h-12 text-rose-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Đối mặt với rủi ro</h3>
              <div className="grid sm:grid-cols-3 gap-8">
                <div>
                  <p className="font-bold text-slate-900 mb-1">Mất việc làm</p>
                  <p className="text-sm text-slate-500 leading-relaxed">Nhiều công việc lao động tay chân và văn phòng đang bị thay thế.</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Tin giả & Deepfake</p>
                  <p className="text-sm text-slate-500 leading-relaxed">Công cụ AI tạo ra nội dung giả mạo tinh vi gây nhiễu loạn xã hội.</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">Bảo mật dữ liệu</p>
                  <p className="text-sm text-slate-500 leading-relaxed">Thông tin nhạy cảm có thể bị rò rỉ qua các mô hình AI trực tuyến.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Hướng dẫn sử dụng đúng */}
      <Section id="guide" title="Sử dụng AI đúng cách">
        <div className="bg-slate-950 text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          {/* Overlay glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] -z-0" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16">
            <div>
              <ShieldCheck className="w-16 h-16 text-indigo-400 mb-8" />
              <h3 className="text-4xl font-serif font-bold mb-6 text-white">Nguyên tắc "3 KHÔNG" khi dùng AI</h3>
              <p className="text-slate-400 text-lg mb-10">
                Làm chủ AI không chỉ là biết cách ra lệnh, mà còn là biết cách bảo vệ bản thân và giữ vững đạo đức nghề nghiệp.
              </p>
              
              <div className="space-y-4">
                {[
                  "KHÔNG chia sẻ thông tin cá nhân, mật khẩu, dữ liệu công ty nhạy cảm.",
                  "KHÔNG tin tưởng hoàn toàn vào kết quả của AI mà không kiểm chứng.",
                  "KHÔNG sử dụng AI để tạo ra các nội dung gây hại hoặc lừa đảo."
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center font-bold text-indigo-400">
                      {i + 1}
                    </div>
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
                <Menu className="w-5 h-5 text-indigo-400" />
                Mẹo tối ưu câu lệnh (Prompt)
              </h4>
              <div className="grid gap-6">
                {[
                  { title: "Giao vai trò", text: "Hãy bắt đầu bằng: 'Bạn là một chuyên gia về...'" },
                  { title: "Cung cấp ngữ cảnh", text: "Giải thích rõ mục đích và đối tượng mục tiêu của nội dung." },
                  { title: "Nêu rõ định dạng", text: "Yêu cầu AI trả về dưới dạng bảng, gạch đầu dòng, hoặc đoạn văn ngắn." }
                ].map((tip, i) => (
                  <div key={i} className="group">
                    <p className="text-indigo-300 font-bold mb-1 opacity-60">#{i + 1}</p>
                    <h5 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors text-white">{tip.title}</h5>
                    <p className="text-slate-400">{tip.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm font-medium text-slate-500 italic">"Hãy đối xử với AI như một trợ lý thông minh nhưng cần sự giám sát của bạn."</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Bài trắc nghiệm */}
      <Section id="quiz" title="Kiểm tra mức độ sử dụng AI của bạn">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-slate-600 mb-12">
            Bạn đang ở đâu trong cuộc cách mạng công nghệ này? Hãy trả lời 5 câu hỏi dưới đây để biết kết quả nhé!
          </p>
          <div className="text-left">
            <AIQuiz />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-900 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">AI HANDBOOK</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs text-center md:text-left">
              Trang web giáo dục vì một cộng đồng sử dụng AI thông minh và có trách nhiệm.
            </p>
          </div>
          
          <div className="flex gap-12 text-sm font-medium text-slate-500">
            <div className="flex flex-col gap-3">
              <span className="text-slate-900 font-bold uppercase tracking-widest text-[10px]">Tài nguyên</span>
              <a href="#" className="hover:text-indigo-600">Blog cá nhân</a>
              <a href="#" className="hover:text-indigo-600">Khóa học AI</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-slate-900 font-bold uppercase tracking-widest text-[10px]">Cộng đồng</span>
              <a href="#" className="hover:text-indigo-600">Facebook Group</a>
              <a href="#" className="hover:text-indigo-600">Discord</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400">© 2024 AI Handbook Project. Hướng tới tương lai số văn minh.</p>
        </div>
      </footer>
    </div>
  );
}
