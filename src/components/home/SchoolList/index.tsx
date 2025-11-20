import { useState } from "react";
import Input from "../../Input";
import SchoolItem from "../SchoolItem";

type School = {
  name: string;
  id: string;
}
const SchoolList = () => {
  const [searchSchool, setSearchSchool] = useState("");
  const [schoolData, setSchoolData] = useState<School[]>([
    {
      name: "대구소마고",
      id: "DGSW",
    },
    {
      name: "대덕소마고",
      id: "DSSM",
    },
    {
      name: "경신고등학교",
      id: "aaaaaaaa",
    },
    {
      name: "AAA고등학교",
      id: "bbbbbbb",
    },
    {
      name: "BBB고등학교",
      id: "ccccccc",
    },
  ]);


  return (
    <div className="w-[720px] flex flex-col gap-5">
      <Input value={searchSchool} setValue={setSearchSchool} placeholder="고등학교 이름으로 검색..."/>
      <div>
        {schoolData.map((item) => (<SchoolItem name={item.name} id={item.id} />))}
      </div>
    </div>
  );
};

export default SchoolList;
