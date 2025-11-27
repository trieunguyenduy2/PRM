'use client';

import { Calendar, MessageCircle, HelpCircle } from 'lucide-react';
import Tabs from './Tabs';
import AppointmentForm from './forms/AppointmentForm';
import ConsultForm from './forms/ConsultForm';
import SupportTicketForm from './forms/SupportTicketForm';

export default function RightActionCard() {
  const tabDescriptions = {
    appointment: 'Chọn thời gian phù hợp nhất với bạn',
    consult: 'Nhận tư vấn chuyên nghiệp trực tuyến',
    support: 'Gửi yêu cầu và nhận hỗ trợ nhanh chóng'
  };

  const tabs = [
    {
      id: 'appointment',
      label: 'Đặt lịch hẹn',
      content: <AppointmentForm />
    },
    {
      id: 'consult',
      label: 'Tư vấn trực tuyến',
      content: <ConsultForm />
    },
    {
      id: 'support',
      label: 'Gửi yêu cầu hỗ trợ',
      content: <SupportTicketForm />
    }
  ];

  return (
    <div id="hero-appointment" className="w-full h-full">
      <div className="bg-card rounded-3xl shadow-2xl ring-1 ring-black/5 backdrop-blur-sm p-4 lg:p-4 border border-border/50 flex flex-col h-full">
        <Tabs 
          tabs={tabs} 
          defaultTabId="appointment"
          descriptions={tabDescriptions}
        />
      </div>
    </div>
  );
}
