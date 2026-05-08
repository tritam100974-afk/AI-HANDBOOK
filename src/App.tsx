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
  ArrowRight,
  Star,
  Sparkles,
  Search,
  LogIn,
  Cursor
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
  subtitle?: string;
}

// --- Icons / Decorative Components ---

const Burst = ({ className = "" }: { className?: string }) => (
  <div className={`burst bg-brand absolute -z-10 animate-pulse ${className}`} style={{ width: '150px', height: '150px' }} />
);

const StudentIcon = ({ type = "boy" }: { type?: "boy" | "girl" | "nerd" }) => {
  const icons = {
    boy: "👦",
    girl: "👧",
    nerd: "🤓"
  };
  return (
    <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center text-5xl student-border student-shadow-sm">
      {icons[type]}
    </div>
  );
};

// --- Components ---

const Section = ({ id, title, subtitle, children, className = "" }: SectionProps) => (
  <section id={id} className={`py-20 px-6 md:px-12 relative ${className}`}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 bg-brand student-border rounded-full font-bold text-xs uppercase tracking-widest mb-4"
        >
          {subtitle || "Kiến thức bổ ích"}
        </motion.div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-navy leading-tight">
          {title}
        </h2>
      </div>
      {children}
    </div>
  </section>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: 'Giới thiệu', href: '#intro' },
    { name: 'Lợi ích', href: '#pros-cons' },
    { name: 'Mẹo dùng', href: '#guide' },
    { name: 'Thử thách', href: '#quiz' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b-4 border-navy">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-brand student-border rounded-xl">
            <Brain className="w-6 h-6 text-navy" />
          </div>
          <span className="font-display font-black text-xl tracking-tight text-navy uppercase">AI FOR STUDENTS</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="text-sm font-black text-navy uppercase tracking-widest hover:text-brand-dark transition-colors"
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
            className="md:hidden bg-white border-b-4 border-navy overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  className="text-xl font-black text-navy uppercase"
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
      text: "Bạn thường dùng AI để làm gì nhất nè?",
      options: [
        { text: "Giải bài tập khó nhằn", points: 10 },
        { text: "Viết văn, làm thơ", points: 8 },
        { text: "Hỏi đáp kiến thức linh tinh", points: 6 },
        { text: "Chưa thử bao giờ luôn", points: 0 },
      ]
    },
    {
      id: 2,
      text: "Khi AI trả lời, bạn có kiểm tra lại không?",
      options: [
        { text: "Tin luôn, AI thông minh mà!", points: 10 },
        { text: "Kiểm tra sơ sơ cho chắc", points: 6 },
        { text: "Luôn tra cứu lại sách giáo khoa", points: 3 },
        { text: "Dùng để tham khảo ý tưởng thôi", points: 2 },
      ]
    },
    {
      id: 3,
      text: "Bạn có biết AI có thể 'chém gió' sai sự thật không?",
      options: [
        { text: "Có biết, nên mình rất cẩn thận", points: 2 },
        { text: "Hơi hơi, nghe loáng thoáng đâu đó", points: 6 },
        { text: "Ủa, AI mà cũng sai được hả?", points: 10 },
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

  const getEvaluation = () => {
    if (totalScore >= 25) return {
      title: "Siêu nhân Công nghệ 🚀",
      desc: "Bạn dùng AI như một trợ lý đắc lực luôn! Nhưng hãy nhớ tự suy nghĩ nhiều hơn để não bộ phát triển nhé.",
      color: "bg-brand"
    };
    if (totalScore >= 15) return {
      title: "Nhà Thám hiểm Tài năng 🕵️",
      desc: "Bạn đang khám phá AI rất đúng cách đó. Hãy học thêm các mẹo đặt câu hỏi để AI giúp bạn tốt hơn nha.",
      color: "bg-sky-200"
    };
    return {
      title: "Người mới Tò mò 🌱",
      desc: "AI còn khá mới mẻ với bạn. Đừng ngại thử bắt đầu bằng việc nhờ AI giải thích một công thức toán khó xem sao!",
      color: "bg-amber-200"
    };
  };

  return (
    <div className="bg-white student-border rounded-[2.5rem] p-8 md:p-12 student-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-rose-400 border border-navy" />
        <div className="w-3 h-3 rounded-full bg-amber-400 border border-navy" />
        <div className="w-3 h-3 rounded-full bg-emerald-400 border border-navy" />
      </div>
      
      {!showResult ? (
        <div>
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-sky-100 rounded-full text-xs font-bold border border-navy mb-4">CÂU HỎI {currentStep + 1}/{questions.length}</span>
            <h3 className="text-3xl font-black text-navy leading-tight">{questions[currentStep].text}</h3>
          </div>
          <div className="grid gap-4">
            {questions[currentStep].options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(opt.points)}
                className="w-full text-left p-6 bg-slate-50 student-border rounded-2xl hover:bg-brand transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-navy">{opt.text}</span>
                <div className="w-8 h-8 rounded-lg bg-white border-2 border-navy group-hover:bg-navy group-hover:text-white flex items-center justify-center transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
          <div className="text-6xl mb-6">🏆</div>
          <h3 className="text-3xl font-black mb-4">BẠN LÀ...</h3>
          <div className={`inline-block p-8 rounded-3xl student-border ${getEvaluation().color} mb-8`}>
            <h4 className="text-2xl font-black mb-2 uppercase tracking-tight">{getEvaluation().title}</h4>
            <p className="font-bold text-navy/70 leading-relaxed max-w-sm mx-auto">{getEvaluation().desc}</p>
          </div>
          <br />
          <button 
            onClick={() => { setCurrentStep(0); setAnswers([]); setShowResult(false); }}
            className="px-8 py-4 bg-brand student-border rounded-2xl font-black student-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            THỬ LẠI LẦN NỮA
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />

      {/* Hero Section - Matching the student handbook style */}
      <section className="pt-32 pb-20 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <div className="relative w-full max-w-5xl">
            {/* Background elements */}
            <Burst className="top-10 left-[-100px] opacity-40 rotate-[15deg]" />
            <div className="absolute -bottom-10 -right-20 w-80 h-80 bg-sky-200 rounded-[30%] rotate-[-15deg] -z-20 opacity-50" />
            
            {/* The Main "Window" Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white student-border rounded-[3rem] p-8 md:p-16 student-shadow relative"
            >
              {/* Card Header with tabs/buttons style */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-brand border-b-4 border-navy rounded-t-[2.8rem] flex items-center justify-between px-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-brand">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="font-black text-navy uppercase tracking-widest text-sm">CHƯƠNG TRÌNH ONLINE</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-navy flex items-center justify-center font-black text-xs">X</div>
                </div>
              </div>

              <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <h1 className="font-display font-black text-6xl md:text-7xl text-navy leading-[0.9] mb-8 uppercase tracking-tighter">
                    Học sinh <br/>
                    <span className="text-brand student-border px-4 py-1.5 inline-block bg-navy rounded-2xl rotate-[-2deg] my-2">LÀM CHỦ</span> <br/>
                    AI 2026
                  </h1>
                  
                  <div className="bg-brand inline-block px-4 py-2 student-border rounded-xl font-bold mb-10 transform rotate-[1deg]">
                    DÀNH CHO HỌC SINH VIỆT NAM 🇻🇳
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a href="#intro" className="px-8 py-4 bg-navy text-brand rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center gap-2">
                      Khám phá ngay
                      <ChevronRight className="w-6 h-6" />
                    </a>
                    <a href="#guide" className="px-8 py-4 bg-brand student-border rounded-2xl font-black text-lg student-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                      Xem bí kíp
                    </a>
                  </div>
                </div>

                <div className="relative group">
                  {/* Stylized Student Illustration Container */}
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="flex flex-col gap-4">
                      <div className="p-4 bg-sky-100 student-border rounded-3xl animate-float">
                        <StudentIcon type="nerd" />
                      </div>
                      <div className="p-4 bg-amber-100 student-border rounded-3xl animate-float-delayed">
                        <StudentIcon type="boy" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="p-4 bg-emerald-100 student-border rounded-[3rem] animate-float-slow">
                        <StudentIcon type="girl" />
                      </div>
                    </div>
                  </div>
                  {/* Speech bubbles and decorative icons */}
                  <div className="absolute top-0 right-0 bg-white student-border p-3 rounded-2xl text-2xl student-shadow-sm -translate-y-1/2 translate-x-1/2 rotate-12">
                    💬
                  </div>
                  <div className="absolute bottom-0 left-0 bg-brand student-border p-3 rounded-full text-2xl shadow-sm translate-y-1/4 -translate-x-1/4 animate-bounce">
                    ⚡️
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section - Cute Icons and Cards */}
      <Section id="intro" title="AI LÀ GÌ VẬY CÀ?" subtitle="BẬT MÍ KIẾN THỨC">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xl font-bold text-navy/80 leading-relaxed">
              Hãy tưởng tượng bạn có một "người bạn robot" siêu thông minh trong máy tính. Người bạn này có thể học hỏi rất nhanh, hiểu ý bạn nói và giúp bạn làm bài tập, vẽ tranh hay dịch tiếng Anh.
            </p>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-brand student-border rounded-2xl flex items-center justify-center text-3xl">🤖</div>
              <div className="w-16 h-16 bg-sky-200 student-border rounded-2xl flex items-center justify-center text-3xl">✨</div>
              <div className="w-16 h-16 bg-amber-200 student-border rounded-2xl flex items-center justify-center text-3xl">📝</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: "🧠", title: "Máy học", desc: "Máy tự tìm ra các quy tắc." },
              { icon: "🗣️", title: "Ngôn ngữ", desc: "Trò chuyện như người thật." },
              { icon: "👁️", title: "Thị giác", desc: "Nhìn và biết cái gì là cái gì." },
              { icon: "🚀", title: "Tương lai", desc: "Làm mọi việc siêu nhanh." },
            ].map((item, i) => (
              <div key={i} className="bg-white student-border rounded-[2rem] p-6 student-shadow-sm hover:-translate-y-1 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-black text-navy uppercase text-sm mb-1">{item.title}</h4>
                <p className="text-xs font-bold text-navy/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pros & Cons Section - Like a scoreboard */}
      <Section id="pros-cons" title="AI: LỢI HẠI RA SAO?" subtitle="CÂN ĐONG ĐO ĐẾM" className="bg-[#F4F4F9]">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Lợi ích */}
          <div className="bg-emerald-50 student-border rounded-[2.5rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-transform">
              <Lightbulb className="w-24 h-24 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
              <span className="p-2 bg-emerald-400 border-2 border-navy rounded-xl">👍</span>
              ĐƯỢC GÌ NÈ?
            </h3>
            <ul className="space-y-6 relative z-10">
              {[
                { title: "Gia sư tận tâm", desc: "Giải thích bài khó bất kể ngày đêm." },
                { title: "Sáng tạo vô đối", desc: "Gợi ý ý tưởng vẽ tranh, viết văn siêu hay." },
                { title: "Bí kíp tiếng Anh", desc: "Luyện nói, dịch thuật chuẩn không cần chỉnh." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-emerald-400 border-2 border-navy rounded-full shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{item.title}</h4>
                    <p className="font-bold text-navy/60">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tác hại */}
          <div className="bg-rose-50 student-border rounded-[2.5rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:-rotate-12 transition-transform">
              <AlertTriangle className="w-24 h-24 text-rose-600" />
            </div>
            <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
              <span className="p-2 bg-rose-400 border-2 border-navy rounded-xl">👎</span>
              CẨN THẬN NHA!
            </h3>
            <ul className="space-y-6 relative z-10">
              {[
                { title: "Lười suy nghĩ", desc: "Quá phụ thuộc AI khiến não mình 'mọc rêu'." },
                { title: "AI hay chém gió", desc: "Nhiều khi thông tin sai bét nhè đó nhen." },
                { title: "Bảo mật thông tin", desc: "Đừng dại mà khai tên tuổi, địa chỉ cho AI." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-rose-400 border-2 border-navy rounded-full shrink-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{item.title}</h4>
                    <p className="font-bold text-navy/60">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Guide Section */}
      <Section id="guide" title="BÍ KÍP CHINH PHỤC AI" subtitle="MẸO CỰC HAY">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-navy rounded-[3rem] p-10 md:p-16 text-white student-border student-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[80px]" />
            <h3 className="text-4xl font-display font-black mb-8 leading-tight">LÀM SAO ĐỂ TRỞ THÀNH <br/><span className="text-brand">"CAO THỦ PROMPT"?</span></h3>
            
            <div className="grid sm:grid-cols-2 gap-8 relative z-10">
              <div className="p-6 bg-white/10 rounded-3xl border-2 border-white/20">
                <div className="text-3xl mb-4">🎭</div>
                <h5 className="text-xl font-black mb-2 text-brand uppercase">Giao Vai Trò</h5>
                <p className="font-bold opacity-70">Hãy thử: "Bạn hãy là một giáo viên dạy Lý lớp 9, hãy giải thích công thức..."</p>
              </div>
              <div className="p-6 bg-white/10 rounded-3xl border-2 border-white/20">
                <div className="text-3xl mb-4">📍</div>
                <h5 className="text-xl font-black mb-2 text-brand uppercase">Cụ thể hóa</h5>
                <p className="font-bold opacity-70">Đừng chỉ bảo "Viết văn", hãy nói "Viết văn kể chuyện dài 200 chữ có dùng từ..."</p>
              </div>
            </div>
          </div>

          <div className="bg-brand student-border rounded-[3rem] p-10 flex flex-col justify-center items-center text-center student-shadow">
            <ShieldCheck className="w-20 h-20 text-navy mb-6" />
            <h4 className="text-2xl font-black mb-4 uppercase">AN TOÀN LÀ TRÊN HẾT!</h4>
            <p className="font-bold text-navy/70 mb-8 italic">"AI như con dao hai lưỡi, dùng khéo thì giỏi, dùng dở thì nguy!"</p>
            <div className="space-y-3 w-full">
              {["Tuyệt đối không đưa mật khẩu cá nhân", "Kiểm tra kỹ trước khi chép bài", "Hỏi ý kiến thầy cô, ba mẹ"].map((txt, i) => (
                <div key={i} className="bg-white/50 py-2 border-2 border-navy rounded-xl text-xs font-black">
                  ✅ {txt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Quiz Section */}
      <Section id="quiz" title="BẠN HIỂU AI ĐẾN ĐÂU?" subtitle="THỬ THÁCH CUỐI CÙNG" className="bg-sky-50">
        <div className="max-w-4xl mx-auto">
          <AIQuiz />
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 border-t-4 border-navy bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-navy rounded-xl">
                <Brain className="w-6 h-6 text-brand" />
              </div>
              <span className="font-display font-black text-2xl text-navy uppercase">AI FOR STUDENTS</span>
            </div>
            <p className="text-navy/50 font-bold max-w-xs text-center md:text-left">
              Trang web giúp học sinh Việt Nam làm chủ trí tuệ nhân tạo một cách an toàn và thông minh.
            </p>
          </div>
          
          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <span className="font-black text-navy uppercase text-xs tracking-widest">HỌC TẬP</span>
              <a href="#" className="font-bold text-navy/60 hover:text-brand-dark">Tài liệu AI</a>
              <a href="#" className="font-bold text-navy/60 hover:text-brand-dark">Khóa học</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-black text-navy uppercase text-xs tracking-widest">LIÊN HỆ</span>
              <a href="#" className="font-bold text-navy/60 hover:text-brand-dark">Fanpage</a>
              <a href="#" className="font-bold text-navy/60 hover:text-brand-dark">Hỗ trợ</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t-2 border-navy/10 text-center">
          <p className="text-xs font-black text-navy/40 uppercase tracking-widest">© 2026 AI FOR STUDENTS PROJECT. MADE WITH ❤️ FOR EDUCATION.</p>
        </div>
      </footer>
    </div>
  );
}
