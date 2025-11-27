'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Mail, Phone, HelpCircle, Upload } from 'lucide-react';
import { validateSupportTicket } from '@/lib/validators';

interface SupportTicketData {
  name: string;
  email: string;
  phone: string;
  requestType: string;
  description: string;
}

export default function SupportTicketForm() {
  const [formData, setFormData] = useState<SupportTicketData>({
    name: '',
    email: '',
    phone: '',
    requestType: '',
    description: ''
  });
  const [errors, setErrors] = useState<Partial<SupportTicketData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const requestTypes = [
    { value: 'product-info', label: 'Thông tin sản phẩm' },
    { value: 'document-support', label: 'Hỗ trợ hồ sơ' },
    { value: 'appointment', label: 'Lịch hẹn' },
    { value: 'feedback', label: 'Phản hồi trải nghiệm' }
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof SupportTicketData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSupportTicket(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log({ type: 'support_ticket', data: formData });
      setShowSuccess(true);
      setFormData({ name: '', email: '', phone: '', requestType: '', description: '' });
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <HelpCircle className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">Đã nhận yêu cầu hỗ trợ</h3>
        <p className="text-sm text-muted-foreground">Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
      </motion.div>
    );
  }

  // Compact helpers
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
            id="support-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
            className={`${fieldBase} ${fieldBorder(errors.name)}`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'support-name-error' : undefined}
          />
          <label htmlFor="support-name" className={labelBase}>Họ & tên *</label>
          {errors.name && <p id="support-name-error" className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <Mail className={iconBase} />
            <input
              type="email"
              id="support-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className={`${fieldBase} ${fieldBorder(errors.email)}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'support-email-error' : undefined}
            />
            <label htmlFor="support-email" className={labelBase}>Email *</label>
            {errors.email && <p id="support-email-error" className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="relative">
            <Phone className={iconBase} />
            <input
              type="tel"
              id="support-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" "
              className="peer w-full h-10 pl-9 pr-3 pt-5 pb-1 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <label htmlFor="support-phone" className={labelBase}>Số điện thoại</label>
          </div>
        </div>

        {/* Request Type (full width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <label htmlFor="requestType" className="block text-[11px] font-medium text-muted-foreground mb-1.5">
              Loại yêu cầu
            </label>
            <select
              id="requestType"
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              className="w-full h-10 px-3 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Chọn loại yêu cầu</option>
              {requestTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-[11px] font-medium text-muted-foreground mb-1.5">Mô tả chi tiết *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Mô tả chi tiết vấn đề hoặc yêu cầu của bạn..."
            className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-150 ${errors.description ? 'border-destructive' : 'border-input'}`}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          {errors.description && <p id="description-error" className="mt-1 text-xs text-destructive">{errors.description}</p>}
        </div>

        {/* File Upload (UI only) */}
        <div>
          <label htmlFor="file-upload" className="block text-[11px] font-medium text-muted-foreground mb-1.5">File đính kèm</label>
          <div className="relative">
            <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <input
              type="file"
              id="file-upload"
              name="file"
              className="w-full h-10 pl-9 pr-3 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-150 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-muted file:text-muted-foreground"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Hỗ trợ: PDF, DOC, DOCX, JPG, PNG (tối đa 10MB)</p>
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
          'Gửi yêu cầu'
        )}
      </button>

      {/* Helper / Privacy */}
      <div className="text-center text-xs text-muted-foreground mt-1">Miễn phí – phản hồi trong 24h – bảo mật</div>
      <p className="text-[11px] text-muted-foreground mt-1 text-center">Bằng việc gửi, bạn đồng ý với Chính sách bảo mật.</p>
    </form>
  );
}
