import FooterPage from '@/Component/shared/Footer';
import Navbar from '@/Component/shared/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="bg-background">
        <div className="min-h-screen ">
          <Navbar />
          {children}
        </div>
        <div className="border-t border-border">
          <FooterPage />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
