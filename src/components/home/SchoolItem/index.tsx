import { Link } from "react-router";
import Arrow from "../../../assets/right-arrow.svg?react";
type Props = {
  name: string;
  id: string;
}

const SchoolItem = ({ name, id }: Props) => {
  return (
    <Link to={`/school/${id}`} className="self-stretch w-full h-12 p-4 border-b border-line-normal inline-flex justify-between items-center cursor-pointer hover:bg-fill-transparents">
      <div className="justify-start text-label-normal text-base font-normal font-['Cafe24_PRO_UP']">
        {name}
      </div>
      <Arrow />
    </Link>
  );
};

export default SchoolItem;
