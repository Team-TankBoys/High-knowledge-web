import { useEffect, useRef, useState } from "react";
import Input from "../../Input";
import SchoolItem from "../SchoolItem";
import axios, { type AxiosResponse } from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

type School = {
  name: string;
  id: string;
};

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
};

type SchoolResponseType = {
  schoolInfo: [
    { head: [{ list_total_count: number }, HeadResult] },
    { row: Row[] }
  ];
};

const SchoolList = () => {
  const [searchSchool, setSearchSchool] = useState("");
  const [schoolData, setSchoolData] = useState<School[]>([]);
  const [dataIndex, setDataIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const didMount = useRef(false);

  const fetchData = async (isNewSearch = false) => {
    try {
      const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=e693965987434503a8e3a70210211b25&Type=json&pIndex=${dataIndex}&pSize=20&SCHUL_KND_SC_NM=고등학교&SCHUL_NM=${searchSchool}`;

      const res: AxiosResponse<SchoolResponseType | HeadResult> =
        await axios.get(url);

      if (!("schoolInfo" in res.data)) {
        setHasMore(false);
        return;
      }

      const rows = res.data.schoolInfo[1].row;

      if (rows.length === 0) {
        setHasMore(false);
        return;
      }

      const mapped = rows.map((item) => ({
        name: `${item.SCHUL_NM} - ${item.LCTN_SC_NM ?? ""}`,
        id: item.SD_SCHUL_CODE,
      }));

      setSchoolData((prev) => (isNewSearch ? mapped : [...prev, ...mapped]));
    } catch (e) {
      setHasMore(false);
    }
  };

  // 페이지가 바뀌면 fetch
  useEffect(() => {
    if (!didMount.current) {
      fetchData();
      didMount.current = true
    }
    if (dataIndex !== 1) fetchData();
  }, [dataIndex]);

  const handleSearch = async () => {
    setSchoolData([]);
    setDataIndex(1);
    setHasMore(true);
    await fetchData(true); // 새로운 검색
  };

  return (
    <div className="w-[720px] flex flex-col gap-5">
      <Input
        value={searchSchool}
        setValue={setSearchSchool}
        placeholder="고등학교 이름으로 검색..."
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-black text-white rounded"
      >
        검색
      </button>
      <div>
        <InfiniteScroll
          dataLength={schoolData.length}
          next={() => setDataIndex((prev) => prev + 1)}
          style={{ display: "flex", flexDirection: "column" }}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>데이터가 없습니다.</p>}
        >
          {schoolData.map((item) => (
            <SchoolItem key={item.id} name={item.name} id={item.id} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SchoolList;
