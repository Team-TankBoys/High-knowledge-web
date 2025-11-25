import logo from "../../assets/logo.svg";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white text-label-neutral leading-normal mt-auto border-t border-gray-200 px-4 md:px-12 lg:px-36 py-6 md:py-8">
      <div className="flex flex-col md:flex-row items-start md:space-x-8 space-y-4 md:space-y-0">
        <div className="flex flex-col items-start">
          <img
            src={logo}
            alt={t("header.logo_alt")}
            className="h-4 md:h-5 self-start"
          />
          <h3 className="text-xs md:text-sm font-normal text-label-neutral mt-2">
            {t("footer.tagline")}
          </h3>
        </div>

        <div className="flex flex-col items-start space-y-1 text-xs md:text-sm text-label-neutral mt-2 md:mt-0">
          <span>{t("footer.contact.owner")}</span>
          <span>{t("footer.contact.email")}</span>
          <span>{t("footer.contact.phone")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
