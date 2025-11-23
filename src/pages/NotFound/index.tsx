import { useNavigate } from "react-router";

interface NotFoundProps {
  type?: "school" | "post";
}

const NotFound = ({ type }: NotFoundProps) => {
  const navigate = useNavigate();

  const getMessage = () => {
    switch (type) {
      case "school":
        return {
          title: "학교를 찾을 수 없습니다",
          description: "존재하지 않는 학교입니다.",
        };
      case "post":
        return {
          title: "게시물을 찾을 수 없습니다",
          description: "존재하지 않는 게시물이거나 삭제된 게시물입니다.",
        };
      default:
        return {
          title: "페이지를 찾을 수 없습니다",
          description: "요청하신 페이지가 존재하지 않습니다.",
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
            이전 페이지로
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium cursor-pointer"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
