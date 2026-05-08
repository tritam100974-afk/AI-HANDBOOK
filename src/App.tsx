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
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* Hero Section */}
      <section id="header" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-60 translate-y-1/4 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3" />
              <span>Khám phá công nghệ tương lai</span>
            </div>
            <h1 className="font-serif text-6xl md:text-7xl font-bold leading-[1.1] mb-8 text-slate-900">
              Mọi điều bạn cần biết về <span className="text-indigo-600 italic">AI.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              Trí tuệ nhân tạo đang định hình lại cách chúng ta sống và làm việc. 
              Hãy cùng tìm hiểu cách làm chủ công cụ mạnh mẽ này một cách có trách nhiệm.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#intro" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2 group">
                Bắt đầu học ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#quiz" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all">
                Làm trắc nghiệm
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200/50">
              <img 
                src="/src/assets/images/regenerated_image_1778226051954.jpg" 
                alt="AI Visualization" 
                className="w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decor */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-600/10 rounded-full blur-xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sky-600/10 rounded-full blur-2xl" />
          </motion.div>
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
          <div className="bg-indigo-600 rounded-[2rem] p-8 text-white flex flex-col justify-between">
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

      {/* 2. Lợi ích & Tác hại */}
      <Section id="pros-cons" title="Hai mặt của đồng xu" className="bg-slate-50">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Lợi ích */}
          <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <Lightbulb className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold">Lợi ích vượt trội</h3>
            </div>
            <ul className="space-y-6">
              {[
                { title: "Tăng năng suất", desc: "Xử lý các công việc lặp đi lặp lại chỉ trong vài giây." },
                { title: "Phân tích dữ liệu lớn", desc: "Tìm thấy những quy luật mà mắt người không thể nhận ra." },
                { title: "Hỗ trợ 24/7", desc: "Các chatbot và trợ lý ảo luôn sẵn sàng phục vụ bất kỳ lúc nào." },
                { title: "Y tế & Nghiên cứu", desc: "Giúp chẩn đoán bệnh sớm và phát triển thuốc nhanh hơn." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tác hại */}
          <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-rose-100 rounded-2xl">
                <AlertTriangle className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold">Rủi ro & Tác hại</h3>
            </div>
            <ul className="space-y-6">
              {[
                { title: "Thay thế việc làm", desc: "Tự động hóa có thể khiến nhiều công việc truyền thống biến mất." },
                { title: "Sai lệch dữ liệu", desc: "AI có thể đưa ra kết quả phân biệt đối xử nếu dữ liệu đầu vào bị lỗi." },
                { title: "Deepfakes & Tin giả", desc: "Tạo ra hình ảnh/video giả mạo cực kỳ chân thực để lừa đảo." },
                { title: "Quyền riêng tư", desc: "Nguy cơ rò rỉ thông tin cá nhân qua các mô hình ngôn ngữ lớn." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <XCircle className="w-6 h-6 text-rose-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
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
