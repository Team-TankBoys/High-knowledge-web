const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              High Knowledge
            </h3>
            <p className="text-sm">
              고등학교별 자유게시판 커뮤니티
              <br />
              학생들의 소통과 지식 공유 플랫폼
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  공지사항
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">문의하기</h3>
            <p className="text-sm">
              이메일: support@highknowledge.com
              <br />
              운영시간: 평일 09:00 - 18:00
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 High Knowledge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
