import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const schools = [
    { id: "1", name: "대구소프트웨어마이스터고등학교" },
    { id: "2", name: "대덕소프트웨어마이스터고등학교" },
    { id: "3", name: "대구경일고등학교" },
    { id: "4", name: "대구남대비마이스터고등학교" },
    { id: "5", name: "대구문화고등학교" },
    { id: "6", name: "대구대륜고등학교" },
    { id: "7", name: "대구능인고등학교" },
    { id: "8", name: "경북대사범대부설고등학교" },
    { id: "9", name: "XXX고등학교" },
    { id: "10", name: "AAA고등학교" },
    { id: "11", name: "BBB고등학교" },
    { id: "12", name: "CCC고등학교" },
    { id: "13", name: "DDD고등학교" },
  ];

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSchoolClick = (schoolId: string) => {
    navigate(`/school/${schoolId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-white py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <span className="text-4xl">👋</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              우리만의 무차지대! 고지식에 오신 걸 환영합니다!
            </h1>
            <p className="text-gray-600 mb-2">
              교내 익명 게시판에서 마음껏 대화해 보세요.
            </p>
            <p className="text-gray-500 text-sm mb-4">
              당신의 의견, 성별, 나이 등에 관여하지 않습니다.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              전부는 요구하지 않습니다.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              하고 싶은 말을 모두 할 수 있습니다.
            </p>

            {/* Search Box */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="학교 이름으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Schools List Section */}
        <section className="py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm">
              {filteredSchools.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredSchools.map((school) => (
                    <button
                      key={school.id}
                      onClick={() => handleSchoolClick(school.id)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex items-center justify-between group"
                    >
                      <span className="text-gray-900 font-medium">
                        {school.name}
                      </span>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-12 text-center text-gray-500">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
