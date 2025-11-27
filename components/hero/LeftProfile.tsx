import { CheckCircle, TrendingUp, Clock, Shield, Star, Users, Zap } from 'lucide-react';

export default function LeftProfile() {
  const services = [
    { icon: <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />, text: 'Tư vấn tài chính cá nhân hoá' },
    { icon: <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />, text: 'Kế hoạch AUM & dòng tiền' },
    { icon: <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />, text: 'Onboarding nhanh chóng' },
    { icon: <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />, text: 'Bảo mật thông tin tuyệt đối' },
  ];

  const stats = [
    { icon: <Users className="w-3.5 h-3.5 lg:w-4 lg:h-4" />, text: '150+ KH cá nhân' },
    { icon: <Star className="w-3.5 h-3.5 lg:w-4 lg:h-4" />, text: '4.9★ review' },
    { icon: <Zap className="w-3.5 h-3.5 lg:w-4 lg:h-4" />, text: '<24h> phản hồi' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Wrapper: Profile + Headline (mobile: 1 hàng) */}
      <div className="flex items-center gap-3 lg:flex-row lg:items-start lg:gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="w-[56px] h-[56px] lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden shadow-xl ring-1 ring-black/5 bg-gradient-to-b from-[#C9A227]/20 via-[#B8891A]/10 to-transparent">
            <img
              src="/Ava_tin.png"
              alt="Premier Relationship Manager"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Headline */}
        <div className="flex-1 min-w-0 lg:text-left space-y-2 lg:space-y-4">
          <div>
            <h1 className="text-base lg:text-3xl font-semibold tracking-tight text-white leading-tight line-clamp-2">
              Kết nối tài chính toàn cầu – Trải nghiệm Premier dành riêng cho bạn
            </h1>
            <div className="w-10 h-0.5 bg-primary mt-2 lg:w-14 lg:mt-4" />
          </div>
        </div>
      </div>

      {/* Mô tả */}
      <p className="text-sm lg:text-lg/7 text-muted-foreground font-medium text-left">
        Đồng hành cùng khách hàng quản lý tài sản xuyên biên giới, tận hưởng dịch vụ ưu tiên và những đặc quyền phong cách sống đỉnh cao.
      </p>

      {/* Service Bullets + Stat Chips */}
      <div className="space-y-4 lg:space-y-6">
        {/* Services: mobile = 2 cột */}
        <ul className="grid grid-cols-2 gap-x-3 gap-y-2 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-3">
          {services.map((service, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-left"
            >
              {service.icon}
              <span className="text-[13px] lg:text-base text-muted-foreground">{service.text}</span>
            </li>
          ))}
        </ul>

        {/* Stat chips: nén kích thước trên mobile */}
        <div className="flex flex-nowrap gap-2 lg:gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] lg:text-sm shadow-sm bg-white/30 text-white backdrop-blur-sm"
            >
              {stat.icon}
              <span className="truncate">{stat.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA: mobile xếp dọc gọn, desktop giữ 2 nút ngang */}
      <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
        <a
          href="#contact"
          className="inline-flex items-center justify-center px-4 py-2.5 lg:px-6 lg:py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
        >
          Đặt lịch tư vấn miễn phí
        </a>
        <a
          href="#about"
          className="inline-flex items-center justify-center px-4 py-2.5 lg:px-6 lg:py-3 text-primary hover:underline underline-offset-4 transition-colors duration-200"
        >
          Khám phá HSBC Premier
        </a>
      </div>
    </div>
  );
}
