'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Phone, Calendar, Clock, MessageSquare } from 'lucide-react';
import { validateAppointment } from '@/lib/validators';

interface AppointmentData {
  name: string;
  phone: string;
  email: string;
  meetingType: string;
  date: string;
  time: string;
  notes: string;
}

export default function AppointmentForm() {
  const [formData, setFormData] = useState<AppointmentData>({
    name: '',
    phone: '',
    email: '',
    meetingType: '',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<AppointmentData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const meetingTypes = [
    { value: 'in-person', label: 'Trực tiếp tại chi nhánh' },
    { value: 'video-call', label: 'Video call' },
    { value: 'phone-call', label: 'Điện thoại' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof AppointmentData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateAppointment(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log({ type: 'appointment', data: formData });

      setShowSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        meetingType: '',
        date: '',
        time: '',
        notes: '',
      });
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Calendar className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">Đã nhận thông tin</h3>
        <p className="text-muted-foreground text-sm">Chúng tôi sẽ liên hệ sớm.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-3">
        {/* Name */}
        <div className="relative">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              className={`peer w-full pl-9 pr-3 pt-5 pb-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.name ? 'border-destructive' : 'border-input'
              }`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            <label
              htmlFor="name"
              className="absolute left-9 top-1.5 text-[11px] font-medium text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:translate-y-0"
            >
              Họ & tên *
            </label>
          </div>
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone & Email on the same row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Email */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className={`peer w-full pl-9 pr-3 pt-5 pb-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.email ? 'border-destructive' : 'border-input'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            <label
              htmlFor="email"
              className="absolute left-9 top-1.5 text-[11px] font-medium text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:translate-y-0"
            >
              Email
            </label>
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" "
              className={`peer w-full pl-9 pr-3 pt-5 pb-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                errors.phone ? 'border-destructive' : 'border-input'
              }`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            <label
              htmlFor="phone"
              className="absolute left-9 top-1.5 text-[11px] font-medium text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:translate-y-0"
            >
              Số điện thoại *
            </label>
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-xs text-destructive">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Meeting Type */}
        <div className="relative">
          <label
            htmlFor="meetingType"
            className="block text-[11px] font-medium text-muted-foreground mb-1"
          >
            Hình thức gặp mặt *
          </label>
          <select
            id="meetingType"
            name="meetingType"
            value={formData.meetingType}
            onChange={handleChange}
            className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
              errors.meetingType ? 'border-destructive' : 'border-input'
            }`}
            aria-invalid={!!errors.meetingType}
            aria-describedby={errors.meetingType ? 'meetingType-error' : undefined}
          >
            <option value="">Chọn hình thức</option>
            {meetingTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.meetingType && (
            <p id="meetingType-error" className="mt-1 text-xs text-destructive">
              {errors.meetingType}
            </p>
          )}
        </div>

        {/* Date & Time Row */}
<div className="grid gap-3 sm:grid-cols-2">
  {/* Date */}
  <div className="relative">
    <label htmlFor="date" className="block text-[11px] font-medium text-muted-foreground mb-1">
      Ngày *
    </label>
    <div className="relative">
      <Calendar className="hidden sm:block absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        min={new Date().toISOString().split('T')[0]}
        className={`w-full h-10 pl-3 sm:pl-9 pr-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
          errors.date ? 'border-destructive' : 'border-input'
        }`}
        aria-invalid={!!errors.date}
        aria-describedby={errors.date ? 'date-error' : undefined}
      />
    </div>
    {errors.date && (
      <p id="date-error" className="mt-1 text-xs text-destructive">
        {errors.date}
      </p>
    )}
  </div>

  {/* Time */}
  <div className="relative">
    <label htmlFor="time" className="block text-[11px] font-medium text-muted-foreground mb-1">
      Giờ
    </label>
    <div className="relative">
      <Clock className="hidden sm:block absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" />
      <input
        type="time"
        id="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="w-full h-10 pl-3 sm:pl-9 pr-3 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
    </div>
  </div>
</div>


        {/* Notes */}
        <div className="relative">
          <label htmlFor="notes" className="block text-[11px] font-medium text-muted-foreground mb-1">
            Ghi chú
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            placeholder="Thông tin bổ sung..."
            className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        data-analytics="hero.cta.submit"
        className="w-full bg-primary text-primary-foreground h-10 px-4 rounded-md font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Đang xử lý...
          </>
        ) : (
          'Đặt lịch hẹn'
        )}
      </button>

      {/* Helper / Privacy (compact) */}
      <div className="text-center text-xs text-muted-foreground">
        Miễn phí – phản hồi trong 24h – bảo mật. Khi gửi, bạn đồng ý với Chính sách bảo mật.
      </div>
    </form>
  );
}
