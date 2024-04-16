
import Header from './Header';


export default function TopHeaderWrapper({ children }: any) {
    return (
      <div className="flex flex-col h-screen overflow-auto">
        <Header />
        {/* <MobileHeader /> */}
        {children}
      </div>
    );
  }