import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import Input from "../../components/Input";

const Write = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  // 학교 이름 매핑
  const schoolNames: { [key: string]: string } = {
    "1": "대구소프트웨어마이스터고등학교",
    "2": "대덕소프트웨어마이스터고등학교",
    "3": "대구경일고등학교",
    "4": "대구남대비마이스터고등학교",
    "5": "대구문화고등학교",
    "6": "대구대륜고등학교",
    "7": "대구능인고등학교",
    "8": "경북대사범대부설고등학교",
    "9": "XXX고등학교",
    "10": "AAA고등학교",
    "11": "BBB고등학교",
    "12": "CCC고등학교",
    "13": "DDD고등학교",
  };

  const schoolName = schoolNames[schoolId || "1"] || "알 수 없는 학교";

  const handleCancel = () => {
    navigate(`/school/${schoolId}`);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }
    if (!password.trim()) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }
    if (!content.trim()) {
      alert("본문을 입력해 주세요.");
      return;
    }

    // 여기에 게시물 등록 로직 추가
    console.log({ title, password, content, schoolId });
    
    // 게시 후 학교 페이지로 이동
    navigate(`/school/${schoolId}`);
  };

  return (
    <div className="grow">
      <div className="max-w-5xl px-4 py-8 mx-auto">
        {/* 학교 이름 */}
        <h1 className="mb-8 text-2xl font-bold text-gray-900">
          {schoolName}
        </h1>

        {/* 작성 폼 */}
        <div className="py-8 border-t border-black">
          {/* 제목과 비밀번호 입력 */}
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <Input
                placeholder="제목을 입력해 주세요."
                value={title}
                setValue={setTitle}
              />
            </div>
            <div>
              <Input
                placeholder="사용할 비밀번호를 입력해 주세요."
                value={password}
                setValue={setPassword}
              />
            </div>
          </div>

          {/* 본문 입력 */}
          <div className="mb-6">
            <textarea
              placeholder="본문 내용을 입력해 주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded resize-none h-96 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-8 py-3 font-medium text-gray-700 transition bg-gray-200 rounded hover:bg-gray-300"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 font-medium text-white transition bg-black rounded hover:bg-gray-800"
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
