const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">우리 학교만의 자유게시판</h1>
          <p className="text-xl mb-8 text-blue-100">
            같은 학교 친구들과 소통하고, 정보를 공유하세요
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
              시작하기
            </button>
            <button className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition border-2 border-white">
              학교 찾기
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            왜 High Knowledge인가요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                학교별 커뮤니티
              </h3>
              <p className="text-gray-600">
                우리 학교만의 독립적인 게시판에서 자유롭게 소통하세요
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                실시간 소통
              </h3>
              <p className="text-gray-600">
                궁금한 점을 물어보고, 정보를 나누며 함께 성장하세요
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                안전한 환경
              </h3>
              <p className="text-gray-600">
                학교 인증을 통한 안전하고 건전한 커뮤니티 문화를 만들어요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Schools Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            인기 학교 게시판
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "대구소프트웨어고등학교",
              "○○고등학교",
              "△△고등학교",
              "□□고등학교",
            ].map((school, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg hover:bg-blue-50 transition cursor-pointer border-2 border-transparent hover:border-blue-300"
              >
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  {school}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  게시글 {Math.floor(Math.random() * 500 + 100)}개
                </p>
                <span className="text-blue-600 text-sm font-semibold">
                  바로가기 →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
          <p className="text-xl mb-8 text-blue-100">
            우리 학교 친구들과 함께하는 특별한 공간
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg">
            회원가입하고 시작하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
