import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import NotFound from "../NotFound";
import Input from "../../components/Input";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  deleteDoc,
} from "firebase/firestore";
import { verifyPassword } from "../../utils/password";

interface PostData {
  title: string;
  content: string;
  schoolId: string;
  upvote: number;
  downvote: number;
  createdAt: string;
  passwordHash: string;
}

interface SchoolData {
  name: string;
  address: string;
}

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [passwordInput, setPasswordInput] = useState("");
  const [postData, setPostData] = useState<PostData | null>(null);
  const [schoolName, setSchoolName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { t } = useTranslation();
  const [pendingUpvotes, setPendingUpvotes] = useState(0);
  const [pendingDownvotes, setPendingDownvotes] = useState(0);
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

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

  // Debounced vote submission
  useEffect(() => {
    const submitVotes = async () => {
      if (!id || (pendingUpvotes === 0 && pendingDownvotes === 0)) return;

      try {
        const postRef = doc(db, "posts", id);
        const updates: any = {};

        if (pendingUpvotes > 0) {
          updates.upvote = increment(pendingUpvotes);
        }
        if (pendingDownvotes > 0) {
          updates.downvote = increment(pendingDownvotes);
        }

        await updateDoc(postRef, updates);

        // Reset pending votes after successful submission
        setPendingUpvotes(0);
        setPendingDownvotes(0);
      } catch (error) {
        console.error("Error updating votes:", error);
        alert("현상금 업데이트에 실패했습니다.");
      }
    };

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (pendingUpvotes > 0 || pendingDownvotes > 0) {
      const timer = setTimeout(() => {
        submitVotes();
      }, 1000);
      setDebounceTimer(timer);
    }

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [pendingUpvotes, pendingDownvotes, id]);

  // 로딩 중
  if (loading) {
    return (
      <div className="grow flex items-center justify-center bg-bg-normal">
        <div className="text-center">
          <div className="text-2xl">⏳</div>
          <p className="mt-4 text-label-neutral">{t("post.loading")}</p>
        </div>
      </div>
    );
  }

  // 게시물이 존재하지 않으면 NotFound 페이지 표시
  if (notFound || !postData) {
    return <NotFound type="post" />;
  }

  const reward = postData.upvote - postData.downvote;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
      return num.toString();
    }
  };

  const handleDelete = async () => {
    if (!id || !postData) return;

    if (!passwordInput.trim()) {
      alert(t("post.alerts.password_required"));
      return;
    }

    try {
      // 입력한 비밀번호를 저장된 해시와 비교 (타이밍 공격 방지)
      const isValid = await verifyPassword(
        passwordInput,
        postData.passwordHash
      );

      if (!isValid) {
        alert(t("post.alerts.password_mismatch"));
        setPasswordInput("");
        return;
      }

      // 비밀번호가 일치하면 삭제
      const postRef = doc(db, "posts", id);
      await deleteDoc(postRef);
      alert(t("post.alerts.deleted"));
      navigate(`/school/${postData.schoolId}`);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(t("post.alerts.delete_failed"));
    }
  };

  const handleBackToSchool = () => {
    navigate(`/school/${postData.schoolId}`);
  };

  const handleUpvote = async () => {
    if (!id) return;

    // 로컬에서 즉시 UI 업데이트
    setPostData((prev) => (prev ? { ...prev, upvote: prev.upvote + 1 } : null));

    // 대기 중인 upvote 카운트 증가
    setPendingUpvotes((prev) => prev + 1);
  };

  const handleDownvote = async () => {
    if (!id || !postData) return;

    // 현상금이 0 이하로 내려가지 않도록 방지
    const currentReward = postData.upvote - postData.downvote;
    if (currentReward <= 0) return;

    // 로컬에서 즉시 UI 업데이트
    setPostData((prev) =>
      prev ? { ...prev, downvote: prev.downvote + 1 } : null
    );

    // 대기 중인 downvote 카운트 증가
    setPendingDownvotes((prev) => prev + 1);
  };

  return (
    <div className="h-full grow flex bg-bg-normal">
      <div className="grow px-4 md:px-12 lg:px-36 py-8 mx-auto gap-5">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col">
            <span
              className="mb-8 text-xl md:text-2xl font-bold text-label-normal transition hover:text-label-assistive cursor-pointer break-words"
              onClick={handleBackToSchool}
            >
              {schoolName}
            </span>
            <div className="flex-1 flex flex-col">
              {/* 게시물 상세 */}
              <div className="flex-1 p-4 md:p-8 pl-0 border-t border-line-alter flex flex-col">
                {/* 제목 */}
                <div className="pl-3 md:pl-5 pb-6 mb-6 border-b border-line-normal">
                  <h1 className="mb-3 text-xl md:text-2xl font-bold text-label-normal break-words">
                    {postData.title}
                  </h1>
                  <p className="text-xs md:text-sm text-label-neutral">
                    {new Date(postData.createdAt).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* 내용 */}
                <div className="flex-1 pl-3 md:pl-5 mb-8 overflow-auto">
                  <p className="text-sm md:text-base text-label-assistive whitespace-pre-wrap break-words">
                    {postData.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 댓글 입력 영역 */}
          <div className="pt-6 border-t border-line-normal flex flex-col justify-center items-center">
            <div className="flex gap-2 md:gap-3 w-full max-w-2xl">
              <div className="flex-1">
                <Input
                  placeholder="비밀번호를 입력해 주세요."
                  value={passwordInput}
                  setValue={setPasswordInput}
                />
              </div>
              <button
                onClick={handleDelete}
                className="px-4 md:px-6 py-3 text-sm md:text-base font-medium text-white transition bg-red-400 rounded hover:bg-red-500"
              >
                삭제하기
              </button>
            </div>

            {/* 현상금 표시 */}
            <div className="flex items-center justify-center gap-3 md:gap-4 py-6">
              <button
                onClick={handleUpvote}
                className={`p-2 md:p-3 transition rounded-full bg-fill-neutral hover:bg-fill-alter`}
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-label-neutral"
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
                <p className="mb-1 text-xs md:text-sm text-label-neutral">
                  {t("post.labels.bounty")}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-label-normal">
                  {formatNumber(reward)}₩
                </p>
              </div>
              <button
                onClick={handleDownvote}
                disabled={reward <= 0}
                className={`p-2 md:p-3 transition rounded-full ${
                  reward <= 0
                    ? "bg-fill-alter cursor-not-allowed opacity-50"
                    : "bg-fill-neutral hover:bg-fill-alter"
                }`}
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-label-neutral"
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
    </div>
  );
};

export default Post;
