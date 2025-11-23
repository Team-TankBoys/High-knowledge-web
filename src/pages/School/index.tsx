import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import NotFound from "../NotFound";

interface Post {
  id: number;
  title: string;
  date: string;
  views: string;
}

const School = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  // 학교가 존재하지 않으면 NotFound 페이지 표시
  if (!id || !schoolNames[id]) {
    return <NotFound type="school" />;
  }

  const schoolName = schoolNames[id];

  // 임시 게시물 데이터
  const [posts] = useState<Post[]>([
    { id: 1, title: "슬직히 10기", date: "2025.11.18.", views: "1500 ₩" },
    { id: 2, title: "슬직히 10기", date: "2025.11.18.", views: "10M ₩" },
  ]);

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleWriteClick = () => {
    navigate(`/write/${id}`);
  };

  return (
    <div className="grow">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 학교 정보 섹션 */}
        <div className=" p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {schoolName}
          </h1>
          <p className="text-gray-600 text-md">
            게시글 126 | 위치 대구광역시 달성군 구지면 창리로 11길 93
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
                  작성일
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                  현상금
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  className="hover:bg-gray-50 cursor-pointer transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-center">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-center">
                    {post.views}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default School;
