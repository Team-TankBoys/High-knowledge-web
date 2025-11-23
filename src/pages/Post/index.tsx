import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import NotFound from "../NotFound";
import Input from "../../components/Input";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

interface Comment {
  id: number;
  content: string;
  date: string;
}

interface PostData {
  title: string;
  content: string;
  schoolId: string;
  upvote: number;
  downvote: number;
}

interface SchoolData {
  name: string;
  address: string;
}

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [postData, setPostData] = useState<PostData | null>(null);
  const [schoolName, setSchoolName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const postRef = doc(db, "posts", id);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
          const data = postSnap.data() as PostData;
          setPostData(data);

          // 학교 정보 가져오기
          const schoolRef = doc(db, "schools", data.schoolId);
          const schoolSnap = await getDoc(schoolRef);

          if (schoolSnap.exists()) {
            const schoolData = schoolSnap.data() as SchoolData;
            setSchoolName(schoolData.name);
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  // 로딩 중
  if (loading) {
    return (
      <div className="grow flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl">⏳</div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 게시물이 존재하지 않으면 NotFound 페이지 표시
  if (notFound || !postData) {
    return <NotFound type="post" />;
  }

  const reward = postData.upvote - postData.downvote;

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
    navigate(`/school/${postData.schoolId}`);
  };

  return (
    <div className="h-full grow flex">
      <div className="grow max-w-5xl px-4 py-8 mx-auto flex flex-col justify-between">
        <div className="flex flex-col">
          <span
            className="mb-8 text-2xl font-bold text-gray-900 transition hover:text-gray-700 cursor-pointer"
            onClick={handleBackToSchool}
          >
            {schoolName}
          </span>
          <div className="flex-1 flex flex-col">
            {/* 게시물 상세 */}
            <div className="flex-1 p-8 border-t border-[#5E5E5E] flex flex-col">
              {/* 제목 */}
              <div className="pb-6 mb-6 border-b border-gray-200">
                <h1 className="mb-3 text-2xl font-bold text-gray-900">
                  {postData.title}
                </h1>
              </div>

              {/* 내용 */}
              <div className="flex-1 mb-8 overflow-auto">
                <p className="text-gray-800 whitespace-pre-wrap">
                  {postData.content}
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
              <p className="text-3xl font-bold text-gray-900">{reward}₩</p>
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
