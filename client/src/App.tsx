import { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, unsetUser } from "./redux/actions";
import { Container } from "react-bootstrap";
import FadeIn from "react-fade-in";
import Navigator from "./components/navigator_components/Navigator";
import Login from "./components/auth_components/Login";
import Signup from "./components/auth_components/Signup";
import UpdateProfile from "./components/auth_components/UpdateProfile";
import ForgotPassword from "./components/auth_components/ForgotPassword";
import Main from "./components/Main";
import Assessment from "./components/assessment_components/Assessment";
import UserAssessments from "./components/user_assessment_components/UserAssessments";
import DataMain from "./components/data_components/DataMain";
import DataByAddress from "./components/data_components/DataByAddress";
import MyData from "./components/data_components/MyData";
import Loading from "./utils/Loading";
import { IUser, IState } from "./utils/typings/_interfaces";
import { logout, getUserIfAuthenticated } from "./api/AuthRoutes";
import PageNotFound from "./utils/PageNotFound";
import About from "./components/about_components/About";
import DataMap from "./components/data_components/DataMap";

const App = () => {
  const user: IUser = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const getUserAndHandleState = async (): Promise<void> => {
    try {
      const response: IUser = await getUserIfAuthenticated();
      if (!response._id) {
        throw response;
      }
      dispatch(setUser(response));
      setLoading(false);
    } catch (error: any) {
      const { status } = error.response;
      switch (status) {
        case 401:
          console.log("no user logged in");
          break;
        case 500:
          console.log("server error");
          break;
        default:
          console.log("something went wrong, not 401 or 500");
          console.log(error.message);
      }
      dispatch(unsetUser());
      setLoading(false);
    }
  };

  const signOutUserAndHandleState = async (): Promise<void> => {
    setLoading(true);
    try {
      const success = await logout();
      if (success) {
        getUserAndHandleState();
      } else {
        throw new Error("failed");
      }
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAndHandleState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Navigator signOutUserAndHandleState={signOutUserAndHandleState} />
      <div className="main">
        <Container fluid>
          {loading ? (
            <Loading />
          ) : (
            <>
              <FadeIn>
                <Switch>
                  <Route exact path="/">
                    <Main />
                  </Route>
                  <Route exact path="/about">
                    <About />
                  </Route>
                  <Route exact path="/login">
                    {user._id !== null ? <Redirect to="/" /> : <Login />}
                  </Route>
                  <Route exact path="/signup">
                    {user._id !== null ? <Redirect to="/" /> : <Signup />}
                  </Route>
                  <Route exact path={"/forgot-password/:id"}>
                    {user._id !== null ? (
                      <Redirect to="/" />
                    ) : (
                      <ForgotPassword />
                    )}
                  </Route>
                  <Route exact path={"/forgot-password"}>
                    {user._id !== null ? (
                      <Redirect to="/" />
                    ) : (
                      <ForgotPassword />
                    )}
                  </Route>
                  <Route exact path={"/update-profile"}>
                    {user._id !== null ? (
                      <UpdateProfile
                        getUserAndHandleState={getUserAndHandleState}
                      />
                    ) : (
                      <Redirect to="/" />
                    )}
                  </Route>
                  <Route exact path="/assessment/:assessment_id">
                    {user._id !== null ? <Assessment /> : <Redirect to="/" />}
                  </Route>
                  <Route exact path="/assessment">
                    {user._id !== null ? <Assessment /> : <Redirect to="/" />}
                  </Route>
                  <Route exact path="/user-assessments">
                    {user._id !== null ? (
                      <UserAssessments />
                    ) : (
                      <Redirect to="/" />
                    )}
                  </Route>
                  <Route exact path="/data">
                    <DataMain />
                  </Route>
                  <Route exact path="/data/by-address">
                    <DataByAddress />
                  </Route>
                  <Route exact path="/data/map">
                    <DataMap />
                  </Route>
                  <Route exact path="/data/my-data">
                    {user._id !== null ? <MyData /> : <Redirect to="/data" />}
                  </Route>
                  <Route exact path="*">
                    <PageNotFound />
                  </Route>
                </Switch>
              </FadeIn>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default App;
