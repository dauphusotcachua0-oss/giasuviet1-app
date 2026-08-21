import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CalendarCheck, CheckCircle2, GraduationCap, Heart, MapPin, Mail, Menu, MessageCircle, Phone, Search, ShieldCheck, Sparkles, Star, Users, X } from 'lucide-react';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import Seo from '@/components/Seo';
import pb from '@/lib/pocketbaseClient';

const IMG = {
  hero: 'https://images.hostinger.com/2106df85-5cf5-4d11-b1d3-678f8c164f23.png',
  family: 'https://images.hostinger.com/973748dc-2f0e-4e6e-b1a8-c34bb5558c0e.png',
  t1: 'https://images.hostinger.com/5b282ad3-edd9-49b5-8665-ed92787fc83d.png',
  t2: 'https://images.hostinger.com/ebf778fd-83d2-424f-a934-84c040fb9a39.png',
  t3: 'https://images.hostinger.com/4f1fcf14-40b4-4b9a-b623-27582ab2ed61.png',
  desk: 'https://images.hostinger.com/0d704398-1bc7-4940-a685-2756d26e5cd4.png',
  kids: 'https://images.hostinger.com/41b1cdc1-c5a4-4e9c-b0b4-a201ddac660d.png',
  online: 'https://images.hostinger.com/97940970-0831-4252-9970-9ef39ff4a8dd.png'
};

const navLinks = [
  { href: '#gioi-thieu', label: 'Giới thiệu' },
  { href: '#dich-vu', label: 'Dịch vụ' },
  { href: '#quy-trinh', label: 'Quy trình' },
  { href: '#loi-ich', label: 'Lợi ích' },
  { href: '#blog', label: 'Tin giáo dục' },
  { href: '#lien-he', label: 'Liên hệ' }
];

const marqueeItems = ['Toán 6-12', 'Tiếng Anh IELTS', 'Ngữ Văn', 'Vật Lý', 'Hoá Học', 'Luyện thi vào 10', 'Tiền tiểu học', 'Tin học', 'Sinh Học', 'Ôn thi THPT Quốc gia'];

const services = [
  {
    icon: BookOpen,
    title: 'Gia sư tại nhà',
    desc: 'Kèm 1-1 tại nhà theo lịch của gia đình, bám sát chương trình của trường và sức học thực tế của con.',
    color: 'from-[hsl(254,82%,60%)] to-[hsl(205,90%,55%)]',
    tag: 'Phổ biến nhất'
  },
  {
    icon: MessageCircle,
    title: 'Gia sư trực tuyến',
    desc: 'Học online qua bảng tương tác, phù hợp với gia đình ở xa trung tâm hoặc lịch học dày đặc.',
    color: 'from-[hsl(168,70%,45%)] to-[hsl(205,90%,55%)]',
    tag: 'Linh hoạt'
  },
  {
    icon: Users,
    title: 'Nhóm nhỏ 2-4 bạn',
    desc: 'Chia sẻ học phí, giữ nguyên sự sát sao. Phù hợp nhóm bạn cùng lớp, cùng mục tiêu ôn thi.',
    color: 'from-[hsl(43,100%,60%)] to-[hsl(340,85%,62%)]',
    tag: 'Tiết kiệm'
  },
  {
    icon: GraduationCap,
    title: 'Luyện thi chuyển cấp',
    desc: 'Lộ trình ôn thi vào 10 và THPT Quốc gia, kiểm tra định kỳ và báo cáo tiến bộ hằng tháng.',
    color: 'from-[hsl(340,85%,62%)] to-[hsl(254,82%,60%)]',
    tag: 'Có lộ trình'
  }
];

const steps = [
  { n: '01', t: 'Gửi yêu cầu', d: 'Phụ huynh mô tả môn học, lớp, thời gian rảnh và mong muốn về gia sư.' },
  { n: '02', t: 'Chọn hồ sơ', d: 'Trong 24 giờ, bạn nhận 3-5 hồ sơ đã xác minh bằng cấp và kinh nghiệm.' },
  { n: '03', t: 'Học thử miễn phí', d: 'Buổi đầu tiên là buổi làm quen. Không phù hợp, bạn được đổi gia sư ngay.' },
  { n: '04', t: 'Đồng hành & báo cáo', d: 'Nhận nhận xét sau mỗi buổi và báo cáo tiến bộ theo tháng từ gia sư.' }
];

const parentBenefits = [
  'Hồ sơ gia sư được xác minh CCCD, bằng cấp và bảng điểm',
  'Buổi học thử miễn phí, đổi gia sư không mất phí',
  'Học phí minh bạch, không thu phí trước từ phụ huynh',
  'Theo dõi tiến bộ của con qua báo cáo hằng tháng'
];

const tutorBenefits = [
  'Nhận lớp gần nhà, đúng môn và đúng khung giờ bạn rảnh',
  'Không phí giữ chỗ, chỉ đóng phí khi nhận lớp thành công',
  'Được hỗ trợ giáo án mẫu và bộ đề luyện thi cập nhật',
  'Thanh toán rõ ràng, có đội ngũ hỗ trợ khi phát sinh'
];

const testimonials = [
  {
    img: IMG.t3,
    name: 'Chị Nguyễn Thu Hà',
    role: 'Phụ huynh lớp 9, Hà Nội',
    quote: 'Con mình mất gốc Toán hình. Sau ba tháng học cùng thầy Duy, con tự tin làm bài và tăng từ 5,5 lên 8,0.'
  },
  {
    img: IMG.t1,
    name: 'Trần Quốc Duy',
    role: 'Sinh viên Bách Khoa, gia sư Toán',
    quote: 'Mình nhận lớp cách nhà 2km, giờ dạy khớp lịch học trên trường. Trung tâm hỗ trợ rất nhanh khi cần đổi lịch.'
  },
  {
    img: IMG.t2,
    name: 'Cô Lê Phương Anh',
    role: 'Giáo viên Tiếng Anh, Đà Nẵng',
    quote: 'Phụ huynh được xác minh trước nên mình yên tâm. Ba năm dạy ở đây mình chưa gặp trường hợp nào phiền phức.'
  }
];

const posts = [
  {
    img: IMG.desk,
    tag: 'Ôn thi',
    date: '12/03/2025',
    title: 'Lộ trình 90 ngày ôn thi vào lớp 10 môn Toán',
    excerpt: 'Chia giai đoạn củng cố nền, luyện dạng và chạy đề để con không học dồn vào tháng cuối.'
  },
  {
    img: IMG.kids,
    tag: 'Tiểu học',
    date: '28/02/2025',
    title: 'Khi nào nên cho con học thêm ở bậc tiểu học?',
    excerpt: 'Ba dấu hiệu cho thấy con thực sự cần gia sư, và ba trường hợp nên để con tự học trước.'
  },
  {
    img: IMG.online,
    tag: 'Tiếng Anh',
    date: '05/02/2025',
    title: 'Học Tiếng Anh online hiệu quả cho học sinh cấp 3',
    excerpt: 'Cách sắp xếp 45 phút mỗi buổi để vừa luyện nghe, vừa giữ nhịp từ vựng đều đặn.'
  }
];

const faqs = [
  {
    q: 'Phụ huynh có phải trả phí cho trung tâm không?',
    a: 'Không. Việc tìm và giới thiệu gia sư hoàn toàn miễn phí với phụ huynh. Gia đình chỉ trả học phí trực tiếp cho gia sư sau buổi học thử.'
  },
  {
    q: 'Bao lâu thì có gia sư?',
    a: 'Trung bình 24 giờ với các môn phổ biến tại Hà Nội, TP.HCM, Đà Nẵng. Các môn đặc thù có thể cần 2-3 ngày.'
  },
  {
    q: 'Nếu con không hợp gia sư thì sao?',
    a: 'Bạn báo cho đội ngũ hỗ trợ và được đổi gia sư khác miễn phí, không giới hạn số lần trong tháng đầu.'
  }
];

const Blob = ({ className }) => (
  <div aria-hidden className={`pointer-events-none absolute rounded-full blur-3xl opacity-60 ${className}`} />
);

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    role: 'phu_huynh',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.value
    }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await pb.collection('contact_requests').create(form);
      setStatus('success');
      setForm({
        full_name: '',
        phone: '',
        email: '',
        role: form.role,
        subject: '',
        message: ''
      });
    } catch (err) {
      setStatus('error');
      setError(err?.message || 'Không gửi được yêu cầu. Vui lòng thử lại hoặc gọi hotline.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Helmet>
        <title>GiaSuViet - Kết nối gia sư uy tín với phụ huynh và học sinh</title>
        <meta
          name="description"
          content="Nền tảng kết nối gia sư tại nhà và trực tuyến với phụ huynh, học sinh trên toàn quốc. Hồ sơ gia sư được xác minh, học thử miễn phí, đổi gia sư không mất phí."
        />
      </Helmet>
      <Seo
        title="GiaSuViet - Kết nối gia sư uy tín với phụ huynh và học sinh"
        description="Tìm gia sư phù hợp trong 24 giờ hoặc nhận lớp dạy gần nhà. Hồ sơ xác minh, học thử miễn phí."
        image={IMG.hero}
        siteName="GiaSuViet"
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex h-[72px] w-full max-w-[80rem] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[hsl(254,82%,60%)] via-[hsl(340,85%,62%)] to-[hsl(43,100%,60%)] text-white shadow-lg shadow-[hsl(254,82%,60%)]/30">
              <GraduationCap className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">GiaSuViet</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-[hsl(254,82%,60%)]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:0343651202"
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-[hsl(254,82%,60%)] hover:text-[hsl(254,82%,60%)]"
            >
              <Phone className="h-4 w-4" /> 0343 651 202
            </a>
            <a
              href="#lien-he"
              className="rounded-full bg-[hsl(254,82%,60%)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[hsl(254,82%,60%)]/30 transition-transform active:scale-[0.97]"
            >
              Đăng ký ngay
            </a>
          </div>

          <button
            type="button"
            aria-label="Mở menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-border lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-background px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium hover:bg-muted"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:0343651202"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[hsl(254,82%,60%)] px-5 py-3.5 text-base font-semibold text-white"
              >
                <Phone className="h-4 w-4" /> Gọi 0343 651 202
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <Blob className="-left-24 -top-24 h-[26rem] w-[26rem] bg-[hsl(254,82%,60%)]/25" />
        <Blob className="right-[-6rem] top-24 h-[22rem] w-[22rem] bg-[hsl(43,100%,60%)]/35" />
        <Blob className="bottom-0 left-1/3 h-[18rem] w-[18rem] bg-[hsl(168,70%,45%)]/25" />

        <div className="relative mx-auto grid w-full max-w-[80rem] items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-[hsl(254,82%,60%)]/25 bg-white/70 px-4 py-2 text-sm font-semibold text-[hsl(254,82%,45%)] shadow-sm"
            >
              <Sparkles className="h-4 w-4" /> Hơn 12.000 lớp đã được kết nối
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
              className="font-display mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]"
            >
              Tìm đúng gia sư,{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[hsl(254,82%,55%)] via-[hsl(340,85%,58%)] to-[hsl(25,95%,55%)] bg-clip-text text-transparent">
                  học đúng cách
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 300 18"
                  className="absolute -bottom-1 left-0 h-3 w-full text-[hsl(43,100%,60%)]"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 12 C 60 2, 120 16, 180 8 S 280 4, 298 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br className="hidden sm:block" /> tiến bộ thấy rõ từng tháng.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              GiaSuViet kết nối phụ huynh, học sinh với sinh viên giỏi và giáo viên có kinh nghiệm.
              Hồ sơ được xác minh, buổi học thử miễn phí, đổi gia sư bất cứ lúc nào nếu chưa phù hợp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: 'easeOut' }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#lien-he"
                onClick={() => setForm((f) => ({ ...f, role: 'phu_huynh' }))}
                className="group flex min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-[hsl(254,82%,60%)] px-7 text-base font-bold text-white shadow-xl shadow-[hsl(254,82%,60%)]/30 transition-transform active:scale-[0.98]"
              >
                <Search className="h-5 w-5" /> Tôi muốn tìm gia sư
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#lien-he"
                onClick={() => setForm((f) => ({ ...f, role: 'gia_su' }))}
                className="group flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border-2 border-[hsl(240,30%,14%)] bg-[hsl(43,100%,60%)] px-7 text-base font-bold text-[hsl(240,40%,12%)] shadow-[4px_4px_0_0_hsl(240,30%,14%)] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_hsl(240,30%,14%)]"
              >
                <GraduationCap className="h-5 w-5" /> Tôi muốn trở thành gia sư
              </a>
            </motion.div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                { v: 12000, s: '+', l: 'Lớp đã kết nối' },
                { v: 4800, s: '+', l: 'Gia sư xác minh' },
                { v: 24, s: 'h', l: 'Thời gian phản hồi' }
              ].map((x) => (
                <div key={x.l} className="rounded-2xl border border-border bg-white/70 p-4">
                  <p className="font-display text-2xl font-extrabold text-[hsl(254,82%,50%)] sm:text-3xl">
                    <CountUp value={x.v} suffix={x.s} />
                  </p>
                  <p className="mt-1 text-xs font-medium leading-snug text-muted-foreground">{x.l}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -inset-3 rotate-3 rounded-[2.4rem] bg-gradient-to-br from-[hsl(254,82%,60%)] via-[hsl(340,85%,62%)] to-[hsl(43,100%,60%)] opacity-25" />
            <img
              src={IMG.hero}
              alt="Gia sư đang kèm học sinh trung học làm bài tập tại nhà"
              className="relative aspect-[3/2] w-full rounded-[2rem] border-4 border-white object-cover shadow-2xl"
              loading="eager"
            />
            <div className="animate-floaty absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-xl sm:-left-8">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[hsl(168,70%,45%)]/15 text-[hsl(168,70%,32%)]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold">Hồ sơ đã xác minh</p>
                <p className="text-xs text-muted-foreground">CCCD, bằng cấp, bảng điểm</p>
              </div>
            </div>
            <div className="absolute -top-5 right-2 rounded-2xl border border-border bg-white px-4 py-3 shadow-xl">
              <div className="flex items-center gap-1 text-[hsl(43,100%,45%)]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">4,9/5 từ 2.130 phụ huynh</p>
            </div>
          </motion.div>
        </div>

        {/* Marquee */}
        <div className="relative border-y border-border bg-[hsl(240,30%,14%)] py-3.5">
          <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((m, i) => (
              <span key={`${m}-${i}`} className="flex items-center gap-10 text-sm font-semibold uppercase tracking-wide text-white/85">
                {m}
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(43,100%,60%)]" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Giới thiệu */}
      <section id="gioi-thieu" className="mx-auto w-full max-w-[72rem] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <img
                src={IMG.family}
                alt="Phụ huynh và con cùng xem lịch học trên máy tính"
                className="w-full rounded-[2rem] object-cover shadow-xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 right-4 hidden rounded-2xl bg-[hsl(254,82%,60%)] px-5 py-4 text-white shadow-xl sm:block">
                <p className="font-display text-2xl font-extrabold">
                  <CountUp value={93} suffix="%" />
                </p>
                <p className="text-xs opacity-90">gia đình tiếp tục sau tháng đầu</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(340,85%,55%)]">Về GiaSuViet</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold leading-tight sm:text-[2.6rem]">
              Một nơi cho hai nhu cầu: tìm gia sư và tìm lớp dạy.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Chúng tôi bắt đầu từ một câu hỏi rất quen thuộc của phụ huynh Việt: làm sao biết người đến dạy
              con mình là ai? Từ năm 2019, GiaSuViet xây dựng quy trình xác minh hồ sơ, ghép lớp theo học lực
              và theo dõi tiến bộ, để cả gia đình và gia sư đều yên tâm.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Heart, t: 'Ghép theo tính cách', d: 'Không chỉ đúng môn, còn hợp cách học của con.' },
                { icon: MapPin, t: 'Phủ 34 tỉnh thành', d: 'Dạy tại nhà ở đô thị lớn, online toàn quốc.' },
                { icon: CalendarCheck, t: 'Lịch học linh hoạt', d: 'Đổi buổi, đổi giờ báo trước 12 tiếng.' },
                { icon: ShieldCheck, t: 'Cam kết rõ ràng', d: 'Không hợp là đổi, không phát sinh phí ẩn.' }
              ].map((f) => (
                <div key={f.t} className="rounded-2xl border border-border bg-white p-5">
                  <f.icon className="h-6 w-6 text-[hsl(254,82%,55%)]" strokeWidth={2} />
                  <p className="mt-3 font-bold">{f.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Dịch vụ */}
      <section id="dich-vu" className="relative overflow-hidden bg-[hsl(250,40%,97%)] py-20 lg:py-28">
        <Blob className="right-[-8rem] top-10 h-[24rem] w-[24rem] bg-[hsl(340,85%,62%)]/15" />
        <div className="relative mx-auto w-full max-w-[80rem] px-5 sm:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(254,82%,55%)]">Giải pháp học tập</p>
              <h2 className="font-display mt-3 text-3xl font-extrabold leading-tight sm:text-[2.6rem]">
                Bốn hình thức học, chọn theo điều kiện của gia đình
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <article className="group h-full overflow-hidden rounded-[1.75rem] border border-border bg-white p-7 transition-transform duration-300 hover:-translate-y-1.5">
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg`}>
                      <s.icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <span className="rounded-full bg-[hsl(43,100%,60%)]/25 px-3 py-1.5 text-xs font-bold text-[hsl(30,90%,32%)]">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-2xl font-bold">{s.title}</h3>
                  <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">{s.desc}</p>
                  <a href="#lien-he" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[hsl(254,82%,52%)]">
                    Nhận tư vấn <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quy trình */}
      <section id="quy-trinh" className="mx-auto w-full max-w-[80rem] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(168,70%,35%)]">Quy trình kết nối</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold leading-tight sm:text-[2.6rem]">
              Từ yêu cầu đến buổi học đầu tiên chỉ trong 24 giờ
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-9 hidden h-1 rounded-full bg-gradient-to-r from-[hsl(254,82%,60%)] via-[hsl(340,85%,62%)] to-[hsl(43,100%,60%)] lg:block"
          />
          <ol className="grid gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="relative">
                  <span className="font-display relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl border-4 border-background bg-[hsl(240,30%,14%)] text-2xl font-extrabold text-white shadow-lg">
                    {s.n}
                  </span>
                  <h3 className="font-display mt-5 text-xl font-bold">{s.t}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Lợi ích - hai nhóm */}
      <section id="loi-ich" className="relative overflow-hidden bg-[hsl(240,30%,14%)] py-20 text-white lg:py-28">
        <Blob className="left-[-6rem] top-6 h-[22rem] w-[22rem] bg-[hsl(254,82%,60%)]/40" />
        <Blob className="bottom-[-6rem] right-[-4rem] h-[20rem] w-[20rem] bg-[hsl(340,85%,62%)]/30" />
        <div className="relative mx-auto w-full max-w-[72rem] px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display max-w-2xl text-3xl font-extrabold leading-tight sm:text-[2.6rem]">
              Lợi ích rõ ràng cho cả hai phía
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              {
                title: 'Dành cho phụ huynh & học sinh',
                items: parentBenefits,
                cta: 'Tôi muốn tìm gia sư',
                role: 'phu_huynh',
                accent: 'hsl(43,100%,60%)'
              },
              {
                title: 'Dành cho sinh viên & giáo viên',
                items: tutorBenefits,
                cta: 'Tôi muốn trở thành gia sư',
                role: 'gia_su',
                accent: 'hsl(168,70%,50%)'
              }
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-8 backdrop-blur-sm">
                  <h3 className="font-display text-2xl font-bold" style={{ color: b.accent }}>
                    {b.title}
                  </h3>
                  <ul className="mt-6 flex-1 space-y-4">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[0.98rem] leading-relaxed text-white/85">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: b.accent }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#lien-he"
                    onClick={() => setForm((f) => ({ ...f, role: b.role }))}
                    className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-white px-6 font-bold text-[hsl(240,30%,14%)] transition-transform active:scale-[0.98]"
                  >
                    {b.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cảm nhận */}
      <section className="mx-auto w-full max-w-[80rem] px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <h2 className="font-display max-w-xl text-3xl font-extrabold leading-tight sm:text-[2.6rem]">
            Người trong cuộc nói gì
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className={`h-full rounded-[1.75rem] border border-border bg-white p-7 ${i === 1 ? 'md:-translate-y-5' : ''}`}>
                <div className="flex items-center gap-1 text-[hsl(43,100%,45%)]">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-[1.02rem] leading-relaxed text-foreground/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="bg-[hsl(250,40%,97%)] py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[80rem] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(340,85%,55%)]">Tin giáo dục</p>
                <h2 className="font-display mt-3 text-3xl font-extrabold sm:text-[2.6rem]">Góc kinh nghiệm học tập</h2>
              </div>
              <a href="#lien-he" className="inline-flex items-center gap-2 text-sm font-bold text-[hsl(254,82%,52%)]">
                Nhận bài viết qua email <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group h-full overflow-hidden rounded-[1.75rem] border border-border bg-white">
                  <div className="overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs font-semibold">
                      <span className="rounded-full bg-[hsl(254,82%,60%)]/12 px-3 py-1 text-[hsl(254,82%,48%)]">{p.tag}</span>
                      <span className="text-muted-foreground">{p.date}</span>
                    </div>
                    <h3 className="font-display mt-3 text-xl font-bold leading-snug">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Liên hệ */}
      <section id="lien-he" className="relative overflow-hidden py-20 lg:py-28">
        <Blob className="left-[-8rem] top-16 h-[22rem] w-[22rem] bg-[hsl(168,70%,45%)]/25" />
        <div className="relative mx-auto grid w-full max-w-[76rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[hsl(254,82%,55%)]">Liên hệ</p>
              <h2 className="font-display mt-3 text-3xl font-extrabold leading-tight sm:text-[2.6rem]">
                Gửi yêu cầu, đội ngũ gọi lại trong 24 giờ
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                Dù bạn là phụ huynh cần tìm gia sư cho con hay là sinh viên, giáo viên muốn nhận lớp,
                hãy để lại thông tin. Chúng tôi hoàn toàn miễn phí tư vấn.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: Phone, t: 'Hotline & Zalo', d: '0343 651 202' },
                  { icon: Mail, t: 'Email', d: 'hotro@giasuviet.vn' },
                  { icon: MapPin, t: 'Văn phòng', d: '186 Trần Duy Hưng, Hà Nội' }
                ].map((c) => (
                  <div key={c.t} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[hsl(254,82%,60%)]/12 text-[hsl(254,82%,50%)]">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{c.t}</p>
                      <p className="font-bold">{c.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                {faqs.map((f) => (
                  <details key={f.q} className="group rounded-2xl border border-border bg-white p-5">
                    <summary className="cursor-pointer list-none font-semibold marker:hidden">
                      <span className="flex items-center justify-between gap-4">
                        {f.q}
                        <span className="text-[hsl(254,82%,55%)] transition-transform group-open:rotate-45">+</span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="rounded-[2rem] border border-border bg-white p-7 shadow-xl sm:p-9">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: 'phu_huynh', l: 'Tôi tìm gia sư' },
                  { v: 'gia_su', l: 'Tôi làm gia sư' }
                ].map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, role: o.v }))}
                    className={`min-h-[52px] rounded-2xl border-2 px-4 text-sm font-bold transition-colors ${
                      form.role === o.v
                        ? 'border-[hsl(254,82%,60%)] bg-[hsl(254,82%,60%)] text-white'
                        : 'border-border bg-white text-muted-foreground hover:border-[hsl(254,82%,60%)]/50'
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="full_name" className="text-sm font-semibold">Họ và tên *</label>
                  <input
                    id="full_name"
                    required
                    value={form.full_name}
                    onChange={update('full_name')}
                    placeholder="Nguyễn Minh Anh"
                    className="min-h-[50px] rounded-xl border border-input bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-[hsl(254,82%,60%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-semibold">Số điện thoại *</label>
                  <input
                    id="phone"
                    required
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="09xx xxx xxx"
                    className="min-h-[50px] rounded-xl border border-input bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-[hsl(254,82%,60%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="email@vidu.com"
                    className="min-h-[50px] rounded-xl border border-input bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-[hsl(254,82%,60%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-semibold">Môn học / lớp</label>
                  <input
                    id="subject"
                    value={form.subject}
                    onChange={update('subject')}
                    placeholder="Toán lớp 9"
                    className="min-h-[50px] rounded-xl border border-input bg-background px-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-[hsl(254,82%,60%)]"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold">Nội dung</label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Khu vực, khung giờ mong muốn, mục tiêu học tập..."
                  className="rounded-xl border border-input bg-background p-4 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-[hsl(254,82%,60%)]"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-6 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-[hsl(254,82%,60%)] text-base font-bold text-white shadow-lg shadow-[hsl(254,82%,60%)]/30 transition-transform active:scale-[0.98] disabled:opacity-70"
              >
                {status === 'loading' ? 'Đang gửi...' : 'Gửi yêu cầu miễn phí'}
                {status !== 'loading' && <ArrowRight className="h-5 w-5" />}
              </button>

              {status === 'success' && (
                <p className="mt-4 flex items-center gap-2 rounded-xl bg-[hsl(168,70%,45%)]/12 p-4 text-sm font-semibold text-[hsl(168,70%,28%)]">
                  <CheckCircle2 className="h-5 w-5" /> Đã nhận yêu cầu. Chúng tôi sẽ liên hệ trong 24 giờ.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 rounded-xl bg-destructive/10 p-4 text-sm font-semibold text-destructive">{error}</p>
              )}
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Thông tin của bạn được bảo mật và chỉ dùng để tư vấn ghép lớp.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-[hsl(240,30%,14%)] text-white/75">
        <div className="mx-auto w-full max-w-[80rem] px-5 py-16 sm:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[hsl(254,82%,60%)] via-[hsl(340,85%,62%)] to-[hsl(43,100%,60%)] text-white">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <span className="font-display text-xl font-extrabold text-white">GiaSuViet</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed">
                Nền tảng kết nối gia sư uy tín với phụ huynh và học sinh trên toàn quốc, hoạt động từ 2019.
              </p>
            </div>

            <div>
              <p className="font-display text-base font-bold text-white">Khám phá</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition-colors hover:text-[hsl(43,100%,60%)]">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display text-base font-bold text-white">Môn học</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {['Toán 6-12', 'Tiếng Anh & IELTS', 'Ngữ Văn', 'Vật Lý - Hoá Học', 'Tiền tiểu học'].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display text-base font-bold text-white">Liên hệ</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>Hotline: 0343 651 202</li>
                <li>Email: hotro@giasuviet.vn</li>
                <li>186 Trần Duy Hưng, Hà Nội</li>
                <li>Thứ 2 - Chủ nhật: 8:00 - 21:00</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} GiaSuViet. Bản quyền thuộc Công ty TNHH Giáo dục GiaSuViet.</p>
            <p>Chính sách bảo mật · Điều khoản sử dụng</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;