import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="container px-36 h-20 flex items-center justify-start">
        <img src={logo} alt="High Knowledge logo" className="h-6" />
      </div>
    </header>
  );
};

export default Header;
