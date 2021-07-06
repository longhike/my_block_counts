import { Dispatch, SetStateAction, MouseEvent } from "react";

type TAssessmentDisplaySidebarProps = {
  sections: string[];
  idxState: number;
  setIdxState: Dispatch<SetStateAction<number>>;
};

const AssessmentDisplaySidebar = ({
  sections,
  idxState,
  setIdxState,
}: TAssessmentDisplaySidebarProps) => {
  return (
    <table className="sidebar-list">
      <tbody>
        {sections.map((el, i) => {
          return (
            <tr
              key={`${i}`}
              className={
                idxState === i
                  ? "sidebar-list-item active"
                  : "sidebar-list-item"
              }
              onClick={(e: MouseEvent<HTMLElement>) => {
                e.preventDefault();
                setIdxState((cur) => i);
              }}
              onMouseEnter={(e: MouseEvent<HTMLElement>) => {
                e.preventDefault();
                e.currentTarget.classList.add("hover");
              }}
              onMouseLeave={(e: MouseEvent<HTMLElement>) => {
                e.preventDefault();
                e.currentTarget.classList.remove("hover");
              }}
            >
              <td>{el}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AssessmentDisplaySidebar;
