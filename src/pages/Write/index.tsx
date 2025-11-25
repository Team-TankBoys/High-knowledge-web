import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import { useTranslation } from "react-i18next";
import { db } from "../../firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";

const Write = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [schoolName, setSchoolName] = useState("로딩 중...");
  const { t } = useTranslation();

  // Firebase에서 학교 이름 가져오기
  useEffect(() => {
    const fetchSchoolName = async () => {
      if (!schoolId) {
        setSchoolName(t('write.unknown_school'));
        return;
      }

      try {
        const schoolRef = doc(db, "schools", schoolId);
        const schoolSnap = await getDoc(schoolRef);

          if (schoolSnap.exists()) {
          const schoolData = schoolSnap.data();
          setSchoolName(schoolData.name || t('write.unknown_school'));
        } else {
          setSchoolName(t('write.unknown_school'));
        }
      } catch (error) {
        console.error("Error fetching school name:", error);
        setSchoolName("알 수 없는 학교");
      }
    };

    fetchSchoolName();
  }, [schoolId, t]);

  const handleCancel = () => {
    navigate(`/school/${schoolId}`);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert(t('write.alerts.title_required'));
      return;
    }
    if (!password.trim()) {
      alert(t('write.alerts.password_required'));
      return;
    }
    if (!content.trim()) {
      alert(t('write.alerts.content_required'));
      return;
    }

    try {
      // Firebase에 게시물 등록
      await addDoc(collection(db, "posts"), {
        schoolId: schoolId,
        title: title,
        content: content,
        password: password,
        upvote: 0,
        downvote: 0,
        createdAt: new Date().toISOString(),
      });

      alert(t('write.alerts.post_created'));
      // 게시 후 학교 페이지로 이동
      navigate(`/school/${schoolId}`);
    } catch (error) {
      console.error("Error adding post:", error);
      alert(t('write.alerts.post_failed'));
    }
  };

  return (
    <div className="grow">
      <div className="max-w-5xl px-4 py-8 mx-auto">
        {/* 학교 이름 */}
        <h1 className="mb-8 text-2xl font-bold text-gray-900">{schoolName}</h1>

        {/* 작성 폼 */}
        <div className="py-8 border-t border-black">
          {/* 제목과 비밀번호 입력 */}
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
                <Input
                placeholder={t('write.placeholders.title')}
                value={title}
                setValue={setTitle}
              />
            </div>
            <div>
              <Input
                placeholder={t('write.placeholders.password')}
                value={password}
                setValue={setPassword}
              />
            </div>
          </div>

          {/* 본문 입력 */}
          <div className="mb-6">
            <textarea
              placeholder={t('write.placeholders.content')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded resize-none h-96 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-8 py-3 font-medium text-gray-700 transition bg-gray-200 rounded hover:bg-gray-300"
            >
              {t('write.buttons.cancel')}
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 font-medium text-white transition bg-black rounded hover:bg-gray-800"
            >
              {t('write.buttons.submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
