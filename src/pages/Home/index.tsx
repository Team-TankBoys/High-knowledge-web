import { useTranslation } from "react-i18next";
import SchoolList from "../../components/home/SchoolList";
import Banner from "../../assets/vertical-meme.webp";

const Home = () => {
  
  const { t } = useTranslation();

  return (
    <div className="self-stretch px-36 py-6 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
      <div className="self-stretch py-5 flex flex-col justify-start items-start gap-5">
        <div className="justify-start text-label-normal text-3xl font-extrabold font-['Pretendard']">
          {t('home.title')}
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <div className="justify-start text-label-assistive text-2xl font-bold font-['Pretendard']">
            {t('home.subtitle')}
          </div>
          <div className="justify-start text-label-neutral text-xl font-normal font-['Pretendard']">
            {t('home.bullet.one')}
            <br />
            {t('home.bullet.two')}
            <br />
            {t('home.bullet.three')}
          </div>
        </div>
      </div>
      <div className="flex gap-5 w-full">
        <SchoolList />
        <a
          href="https://youtu.be/yH88qRmgkGI?si=6IwEPZvOlfkk1Ogv"
          className="h-min w-[30%]"
          target="_blank"
        >
          <img src={Banner} alt="" className="w-full" />
        </a>
      </div>
    </div>
  );
};

export default Home;
