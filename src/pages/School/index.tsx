import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import NotFound from "../NotFound";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import axios, { type AxiosResponse } from "axios";
import Banner from "../../assets/nyan-cat.gif";

interface Post {
  id: string;
  title: string;
  upvote: number;
  downvote: number;
  createdAt: string;
}

interface SchoolData {
  name: string;
  address: string;
}

type HeadResult = {
  RESULT: {
    CODE: string;
    MESSAGE: string;
  };
};

type Row = {
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
  LCTN_SC_NM: string | null;
  ORG_RDNMA: string | null;
};

type SchoolResponseType = {
  schoolInfo: [
    { head: [{ list_total_count: number }, HeadResult] },
    { row: Row[] }
  ];
};

const School = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { t } = useTranslation();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
      return num.toString();
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}.`;
  };

  useEffect(() => {
    const fetchSchoolData = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        // 1. Firebase에서 학교 정보 조회
        const schoolRef = doc(db, "schools", id);
        const schoolSnap = await getDoc(schoolRef);

        let schoolInfo: SchoolData | null = null;

        if (schoolSnap.exists()) {
          schoolInfo = schoolSnap.data() as SchoolData;
        } else {
          // 2. Firebase에 없으면 NEIS API에서 조회
          try {
            const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=e693965987434503a8e3a70210211b25&Type=json&pIndex=1&pSize=1&SCHUL_KND_SC_NM=고등학교&SD_SCHUL_CODE=${id}`;
            const res: AxiosResponse<SchoolResponseType | HeadResult> =
              await axios.get(url);

            if (
              "schoolInfo" in res.data &&
              res.data.schoolInfo[1].row.length > 0
            ) {
              const schoolData = res.data.schoolInfo[1].row[0];
              schoolInfo = {
                name: schoolData.SCHUL_NM,
                address:
                  schoolData.ORG_RDNMA ||
                  schoolData.LCTN_SC_NM ||
                  "주소 정보 없음",
              };

              // Firebase에 저장
              await setDoc(doc(db, "schools", id), schoolInfo);
            } else {
              setNotFound(true);
              setLoading(false);
              return;
            }
          } catch (apiError) {
            console.error("Error fetching from NEIS API:", apiError);
            setNotFound(true);
            setLoading(false);
            return;
          }
        }

        setSchoolData(schoolInfo);

        // 해당 학교의 게시물 가져오기
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("schoolId", "==", id));
        const querySnapshot = await getDocs(q);

        const postsData: Post[] = [];
        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          postsData.push({
            id: doc.id,
            title: postData.title,
            upvote: postData.upvote || 0,
            downvote: postData.downvote || 0,
            createdAt: postData.createdAt || new Date().toISOString(),
          });
        });

        // 최신순으로 정렬
        postsData.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching school data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  }, [id]);

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const handleWriteClick = () => {
    navigate(`/write/${id}`);
  };

  // 로딩 중
  if (loading) {
    return (
      <div className="grow flex items-center justify-center bg-bg-normal">
        <div className="text-center">
          <div className="text-2xl">⏳</div>
          <p className="mt-4 text-label-neutral">{t("school.loading")}</p>
        </div>
      </div>
    );
  }

  // 학교가 존재하지 않으면 NotFound 페이지 표시
  if (notFound || !schoolData) {
    return <NotFound type="school" />;
  }

  return (
    <div className="grow bg-bg-normal">
      <div className="px-4 md:px-12 lg:px-36 py-8 flex gap-5">
        <div className="flex-1 min-w-0">
          {/* 학교 정보 섹션 */}
          <div className="pb-6 mb-6">
            <h1
              className="text-xl md:text-2xl font-bold text-label-normal mb-2 cursor-pointer hover:text-label-assistive transition break-words"
              onClick={() => navigate("/")}
            >
              {schoolData.name}
            </h1>
            <p className="text-sm md:text-md">
              <span className="text-label-neutral">
                {t("school.labels.posts")}
              </span>{" "}
              <span className="text-label-normal pr-3 md:pr-5">
                {posts.length}
              </span>
              <span className="text-label-neutral">
                {t("school.labels.location")}
              </span>{" "}
              <span className="text-label-normal break-words">
                {schoolData.address}
              </span>
            </p>
          </div>

          {/* 글쓰기 버튼 */}
          <div className="mb-4">
            <button
              onClick={handleWriteClick}
              className="px-4 md:px-6 py-2 text-sm md:text-base bg-label-normal text-white rounded hover:bg-label-assistive transition"
            >
              {t("school.buttons.write")}
            </button>
          </div>

          {/* 게시물 목록 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-line-normal">
                <tr>
                  <th className="px-3 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-label-assistive">
                    {t("school.table.title")}
                  </th>
                  <th className="px-3 md:px-6 py-3 text-center text-xs md:text-sm font-medium text-label-assistive whitespace-nowrap">
                    {t("school.table.date")}
                  </th>
                  <th className="px-3 md:px-6 py-3 text-center text-xs md:text-sm font-medium text-label-assistive whitespace-nowrap">
                    {t("school.table.reward")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-normal">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <tr
                      key={post.id}
                      onClick={() => handlePostClick(post.id)}
                      className="hover:bg-fill-neutral cursor-pointer transition"
                    >
                      <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-label-normal">
                        {post.title}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-label-normal text-center whitespace-nowrap">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-label-normal text-center whitespace-nowrap">
                        {formatNumber(post.upvote - post.downvote)}₩
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-label-alter text-sm"
                    >
                      {t("school.no_posts")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 배너 */}
        <a
          href="https://www.youtube.com/watch?v=q1ULJ92aldE"
          className="hidden lg:block w-[20%] h-min flex-shrink-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Banner} alt="" className="w-full" />
        </a>
      </div>
    </div>
  );
};

export default School;
