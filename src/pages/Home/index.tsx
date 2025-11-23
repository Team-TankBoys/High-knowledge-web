import SchoolList from "../../components/home/SchoolList";
import Banner from "../../assets/vertical-meme.webp";

const Home = () => {
  
  return (
    <div className="self-stretch px-36 py-6 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
      <div className="self-stretch py-5 flex flex-col justify-start items-start gap-5">
        <div className="justify-start text-label-normal text-3xl font-extrabold font-['Pretendard']">
          👋 우리만의 무법지대, 고지식에 오신 걸 환영합니다!
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <div className="justify-start text-label-assistive text-2xl font-bold font-['Pretendard']">
            교내 익명 게시판에서 마음껏 대화해 보세요.
          </div>
          <div className="justify-start text-label-neutral text-xl font-normal font-['Pretendard']">
            당신의 이름, 성별, 나이 등에 관여하지 않습니다.
            <br />
            정보를 요구하지 않습니다.
            <br />
            하고 싶은 말을 모두 할 수 있습니다.
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
