import { Link } from "react-router";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">📚</div>
            <h1 className="text-xl font-bold text-gray-800">High Knowledge</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              홈
            </Link>
            <Link
              to="/boards"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              게시판
            </Link>
            <Link
              to="/schools"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              학교 찾기
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              소개
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
              로그인
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
