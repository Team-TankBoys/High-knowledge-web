import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const changeLanguage = (lng: "en" | "ko") => {
    i18n.changeLanguage(lng);
  };
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 ">
      <div className="w-full px-4 md:px-12 lg:px-36 h-16 md:h-20 justify-between flex items-center">
        <Link to={"/"}>
          <img src={logo} alt={t("header.logo_alt")} className="h-5 md:h-6" />
        </Link>
        <div className="flex gap-2 md:flex-col md:gap-1">
          <button
            onClick={() => changeLanguage("en")}
            className="text-xs md:text-sm px-2 py-1 hover:text-label-assistive transition"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("ko")}
            className="text-xs md:text-sm px-2 py-1 hover:text-label-assistive transition"
          >
            한국어
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
