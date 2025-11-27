// Basic validation functions for forms

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Basic Vietnamese phone number validation
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function isDateTodayOrFuture(date: string): boolean {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
}

export function validateAppointment(data: any) {
  const errors: any = {};

  if (!data.name?.trim()) {
    errors.name = 'Vui lòng nhập họ và tên';
  }

  if (!data.phone?.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ';
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Email không hợp lệ';
  }

  if (!data.meetingType) {
    errors.meetingType = 'Vui lòng chọn hình thức gặp mặt';
  }

  if (!data.date) {
    errors.date = 'Vui lòng chọn ngày';
  } else if (!isDateTodayOrFuture(data.date)) {
    errors.date = 'Ngày phải từ hôm nay trở đi';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateConsult(data: any) {
  const errors: any = {};

  if (!data.name?.trim()) {
    errors.name = 'Vui lòng nhập họ và tên';
  }

  // At least one of email or phone is required
  if (!data.email?.trim() && !data.phone?.trim()) {
    errors.email = 'Vui lòng nhập email hoặc số điện thoại';
    errors.phone = 'Vui lòng nhập email hoặc số điện thoại';
  } else {
    if (data.email && !isValidEmail(data.email)) {
      errors.email = 'Email không hợp lệ';
    }
    if (data.phone && !isValidPhone(data.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateSupportTicket(data: any) {
  const errors: any = {};

  if (!data.name?.trim()) {
    errors.name = 'Vui lòng nhập họ và tên';
  }

  if (!data.email?.trim()) {
    errors.email = 'Vui lòng nhập email';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Email không hợp lệ';
  }

  if (!data.title?.trim()) {
    errors.title = 'Vui lòng nhập tiêu đề';
  }

  if (!data.description?.trim()) {
    errors.description = 'Vui lòng nhập mô tả chi tiết';
  } else if (data.description.trim().length < 20) {
    errors.description = 'Mô tả phải có ít nhất 20 ký tự';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}