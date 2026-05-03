import ChatbotWidget from "./ChatbotWidget";
import Footer from "./Footer";
import Header from "./Header";
import SocialSidebar from "./SocialSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SocialSidebar />
      <ChatbotWidget />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
