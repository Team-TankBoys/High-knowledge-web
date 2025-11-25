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
      <div className="w-full px-36 h-20 justify-between flex items-center">
        <Link to={"/"}>
          <img src={logo} alt={t("header.logo_alt")} className="h-6" />
        </Link>
        <div className="flex flex-col">
          <button onClick={() => changeLanguage("en")}>English</button>
          <button onClick={() => changeLanguage("ko")}>한국어</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
