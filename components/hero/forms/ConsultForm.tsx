'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Mail, Phone, MessageCircle, Clock } from 'lucide-react';
import { validateConsult } from '@/lib/validators';

interface ConsultData {
  name: string;
  email: string;
  phone: string;
  topic: string;
  channel: string;
  preferredTime: string;
  content: string;
}

export default function ConsultForm() {
  const [formData, setFormData] = useState<ConsultData>({
    name: '',
    email: '',
    phone: '',
    topic: '',
    channel: '',
    preferredTime: '',
    content: ''
  });
  const [errors, setErrors] = useState<Partial<ConsultData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const topics = [
    { value: 'account-opening', label: 'Mở tài khoản Premier' },
    { value: 'wealth-management', label: 'Quản lý tài sản' },
    { value: 'insurance', label: 'Sản phẩm bảo hiểm' },
    { value: 'other', label: 'Khác' }
  ];

  const channels = [
    { value: 'zalo', label: 'Zalo' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'teams', label: 'Microsoft Teams' },
    { value: 'google-meet', label: 'Google Meet' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ConsultData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateConsult(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log({ type: 'consult', data: formData });
      setShowSuccess(true);
      setFormData({ name: '', email: '', phone: '', topic: '', channel: '', preferredTime: '', content: '' });
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <MessageCircle className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">Đã nhận yêu cầu tư vấn</h3>
        <p className="text-sm text-muted-foreground">Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>
      </motion.div>
    );
  }

  // utility classes for compact fields
  const fieldBase =
    'peer w-full h-10 pl-9 pr-3 pt-5 pb-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150';
  const fieldBorder = (hasErr?: string) => (hasErr ? 'border-destructive' : 'border-input');
  const labelBase =
    'absolute left-9 top-1.5 text-[11px] font-medium text-muted-foreground transition-all duration-150 ' +
    'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[13px] ' +
    'peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:translate-y-0';
  const iconBase = 'absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-3">
        {/* Name */}
        <div className="relative">
          <User className={iconBase} />
          <input
            type="text"
            id="consult-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
            className={`${fieldBase} ${fieldBorder(errors.name)}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'consult-name-error' : undefined}
          />
          <label htmlFor="consult-name" className={labelBase}>Họ & tên *</label>
          {errors.name && <p id="consult-name-error" className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <Mail className={iconBase} />
            <input
              type="email"
              id="consult-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className={`${fieldBase} ${fieldBorder(errors.email)}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'consult-email-error' : undefined}
            />
            <label htmlFor="consult-email" className={labelBase}>Email *</label>
            {errors.email && <p id="consult-email-error" className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="relative">
            <Phone className={iconBase} />
            <input
              type="tel"
              id="consult-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" "
              className={`${fieldBase} ${fieldBorder(errors.phone)}`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'consult-phone-error' : undefined}
            />
            <label htmlFor="consult-phone" className={labelBase}>Số điện thoại</label>
            {errors.phone && <p id="consult-phone-error" className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
        </div>

        {/* Topic + Channel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label htmlFor="topic" className="block text-[11px] font-medium text-muted-foreground mb-1.5">Chủ đề tư vấn</label>
            <select
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full h-10 px-3 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Chọn chủ đề</option>
              {topics.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="channel" className="block text-[11px] font-medium text-muted-foreground mb-1.5">Kênh mong muốn</label>
            <select
              id="channel"
              name="channel"
              value={formData.channel}
              onChange={handleChange}
              className="w-full h-10 px-3 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Chọn kênh</option>
              {channels.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        {/* Preferred Time */}
        <div className="relative">
          <Clock className={iconBase} />
          <input
            type="text"
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full h-10 pl-9 pr-3 pt-5 pb-1 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <label htmlFor="preferredTime" className={labelBase}>Thời gian thuận tiện</label>
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-[11px] font-medium text-muted-foreground mb-1.5">Nội dung chính</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={3}
            placeholder="Mô tả ngắn gọn về nhu cầu tư vấn..."
            className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        data-analytics="hero.cta.submit"
        className="w-full h-11 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Đang xử lý...
          </>
        ) : (
          'Yêu cầu tư vấn'
        )}
      </button>

      {/* Helper */}
      <div className="text-center text-xs text-muted-foreground mt-1">
        Miễn phí – phản hồi trong 24h – bảo mật
      </div>
      <p className="text-[11px] text-muted-foreground mt-1 text-center">
        Bằng việc gửi, bạn đồng ý với Chính sách bảo mật.
      </p>
    </form>
  );
}
