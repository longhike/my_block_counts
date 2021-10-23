import { Dispatch, SetStateAction, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { setCurrentAssessment } from "../../redux/actions";

type TAssessmentListItemProps = {
  _id?: string;
  st_address?: string;
  city?: string;
  state?: string;
  zip?: string;
  key: number;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const AssessmentListItem = ({
  _id,
  st_address,
  city,
  state,
  zip,
  setShow,
}: TAssessmentListItemProps) => {
  const dispatch = useDispatch();
  const showDetail = (_id: string, st_address: string) => {
    dispatch(setCurrentAssessment({ _id, st_address }));
    setShow(true);
  };
  return (
    <tr
      onClick={(e: MouseEvent<HTMLTableRowElement>) =>
        showDetail(_id!, st_address!)
      }
    >
      <td>{st_address}</td>
      <td>{city}</td>
      <td>{state}</td>
      <td>{zip}</td>
    </tr>
  );
};

export default AssessmentListItem;
