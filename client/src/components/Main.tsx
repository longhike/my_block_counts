import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Welcome from "./Welcome";
import { IState } from "../utils/typings/_interfaces";

const Main = () => {
  const username: string | null = useSelector((state:IState) => state.user.username)
  return (
    <>
      {username ? (
        <Dashboard
        />
      ) : (
        <Welcome />
      )}
    </>
  );
};

export default Main;
