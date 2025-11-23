import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface NotFoundProps {
  type?: "school" | "post";
}

const NotFound = ({ type }: NotFoundProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getMessage = () => {
    switch (type) {
      case "school":
        return {
          title: t('notFound.school.title'),
          description: t('notFound.school.description'),
        };
      case "post":
        return {
          title: t('notFound.post.title'),
          description: t('notFound.post.description'),
        };
      default:
        return {
          title: t('notFound.default.title'),
          description: t('notFound.default.description'),
        };
    }
  };

  const message = getMessage();

  return (
    <div className="grow flex items-center justify-center px-36">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <span className="text-8xl">😕</span>
        </div>
        <h1 className="text-3xl font-bold text-label-normal mb-4">
          {message.title}
        </h1>
        <p className="text-label-assistive mb-8">{message.description}</p>
        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 bg-fill-normal text-label-normal rounded-lg hover:bg-fill-alter transition font-medium cursor-pointer"
          >
            {t('notFound.buttons.back')}
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium cursor-pointer"
          >
            {t('notFound.buttons.home')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
