import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-500 leading-normal mt-auto border-t border-gray-200">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:space-x-8 space-y-4 md:space-y-0">
          <div className="flex flex-col items-start">
            <img src={logo} alt="High Knowledge logo" className="h-5 self-start" />
            <h3 className="text-sm font-normal text-[#636363] mt-2">우리만의 무법지대</h3>
          </div>

          <div className="flex flex-col items-start space-y-1 text-sm text-gray-500 mt-2 md:mt-0">
            <span>대표: 홍지율</span>
            <span>문의: pjmin0923@gmail.com</span>
            <span>전화번호: 010-9242-7038</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
