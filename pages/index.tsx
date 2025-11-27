import Head from 'next/head';
import HeroSection from '@/components/hero/HeroSection';
import Navbar from '@/components/navbar/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>TinNguyen | Premier - Kết nối tài chính toàn cầu</title>
        <meta name="description" content="Đồng hành cùng khách hàng quản lý tài sản xuyên biên giới, tận hưởng dịch vụ ưu tiên và những đặc quyền phong cách sống đỉnh cao." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <HeroSection />
    </>
  );
}
