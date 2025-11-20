import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import NotFound from "../NotFound";
import Input from "../../components/Input";

interface Comment {
  id: number;
  content: string;
  date: string;
}

interface PostData {
  id: string;
  schoolId: string;
  schoolName: string;
  title: string;
  content: string;
  date: string;
  reward: string;
}

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  // 임시 게시물 데이터베이스
  const postsDatabase: { [key: string]: PostData } = {
    "1": {
      id: "1",
      schoolId: "1",
      schoolName: "대구소프트웨어마이스터고등학교",
      title: "솔직히 10기",
      content: "너무 귀엽다.",
      date: "2025. 11. 18. 22:56:30",
      reward: "1₩",
    },
    "2": {
      id: "2",
      schoolId: "1",
      schoolName: "대구소프트웨어마이스터고등학교",
      title: "솔직히 10기",
      content: "정말 귀여운 것 같아요!",
      date: "2025. 11. 18. 20:30:15",
      reward: "10M ₩",
    },
  };

  // 게시물이 존재하지 않으면 NotFound 페이지 표시
  if (!id || !postsDatabase[id]) {
    return <NotFound type="post" />;
  }

  const post = postsDatabase[id];

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        content: commentInput,
        date: new Date().toLocaleString("ko-KR"),
      };
      setComments([...comments, newComment]);
      setCommentInput("");
    }
  };

  const handleBackToSchool = () => {
    navigate(`/school/${post.schoolId}`);
  };

  return (
    <div className="h-full grow flex">
      <div className="grow max-w-5xl px-4 py-8 mx-auto flex flex-col justify-between">
        <div className="flex flex-col">
          <span
            className="mb-8 text-2xl font-bold text-gray-900 transition hover:text-gray-700 cursor-pointer"
            onClick={handleBackToSchool}
          >
            {post.schoolName}
          </span>
          <div className="flex-1 flex flex-col">
            {/* 게시물 상세 */}
            <div className="flex-1 p-8 border-t border-[#5E5E5E] flex flex-col">
              {/* 제목과 날짜 */}
              <div className="pb-6 mb-6 border-b border-gray-200">
                <h1 className="mb-3 text-2xl font-bold text-gray-900">
                  {post.title}
                </h1>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>

              {/* 내용 */}
              <div className="flex-1 mb-8 overflow-auto">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 댓글 입력 영역 */}
        <div className="pt-6 border-t border-gray-200 flex flex-col justify-center items-center">
          <div className="flex gap-3 max-w-2xl">
            <div className="flex-1">
              <Input
                placeholder="비밀번호를 입력해 주세요."
                value={commentInput}
                setValue={setCommentInput}
              />
            </div>
            <button
              onClick={handleCommentSubmit}
              className="px-6 py-3 font-medium text-white transition bg-red-400 rounded hover:bg-red-500"
            >
              삭제하기
            </button>
          </div>

          {/* 현상금 표시 */}
          <div className="flex items-center justify-center gap-4 py-6">
            <button className="p-3 transition bg-gray-100 rounded-full hover:bg-gray-200">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <div className="text-center">
              <p className="mb-1 text-sm text-gray-600">현상금</p>
              <p className="text-3xl font-bold text-gray-900">{post.reward}</p>
            </div>
            <button className="p-3 transition bg-gray-100 rounded-full hover:bg-gray-200">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
