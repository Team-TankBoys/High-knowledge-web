import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import NotFound from "../NotFound";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  upvote: number;
  downvote: number;
}

interface SchoolData {
  name: string;
  address: string;
}

const School = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchSchoolData = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const schoolRef = doc(db, "schools", id);
        const schoolSnap = await getDoc(schoolRef);

        if (schoolSnap.exists()) {
          const data = schoolSnap.data() as SchoolData;
          setSchoolData(data);

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
            });
          });
          setPosts(postsData);
        } else {
          setNotFound(true);
        }
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
      <div className="grow flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl">⏳</div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 학교가 존재하지 않으면 NotFound 페이지 표시
  if (notFound || !schoolData) {
    return <NotFound type="school" />;
  }

  return (
    <div className="grow">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 학교 정보 섹션 */}
        <div className=" p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {schoolData.name}
          </h1>
          <p className="text-gray-600 text-md">
            게시글 {posts.length} | 위치 {schoolData.address}
          </p>
        </div>

        {/* 글쓰기 버튼 */}
        <div className="mb-4">
          <button
            onClick={handleWriteClick}
            className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
          >
            글쓰기
          </button>
        </div>

        {/* 게시물 목록 */}
        <div className=" overflow-hidden">
          <table className="w-full">
            <thead className=" border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  제목
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                  현상금
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="hover:bg-gray-50 cursor-pointer transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">
                      {post.upvote - post.downvote}₩
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    게시글이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default School;
