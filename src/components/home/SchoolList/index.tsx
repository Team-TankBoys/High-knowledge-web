import { useState } from "react";
import Input from "../../Input";
import SchoolItem from "../SchoolItem";

const SchoolList = () => {
  const [searchSchool, setSearchSchool] = useState("");

  return (
    <div className="w-[720px] flex flex-col gap-5">
      <Input value={searchSchool} setValue={setSearchSchool} placeholder="고등학교 이름으로 검색..."/>
      <div>
        {Array.from({length: 25}).map(_ => (<SchoolItem name="대구소마고" id="fawf2f43f01"/>))}
      </div>
    </div>
  );
};

export default SchoolList;
