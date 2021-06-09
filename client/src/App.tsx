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
import Loading from "./utils/Loading";
import { IUser, IState } from "./utils/typings/_interfaces";
import axios, { AxiosResponse } from "axios";
import PageNotFound from "./utils/PageNotFound";
import About from "./components/about_components/About";

const App = () => {
  const user: IUser = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const location = window.location.origin;

  const getUserAndHandleState = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.get(`${location}/auth`);
      const _user: IUser = response.data;
      if (_user._id) dispatch(setUser(_user));
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
      if (user._id !== null || user.username !== null || user.email !== null) {
        dispatch(unsetUser());
      }
      setLoading(false);
    }
  };

  const signOutUserAndHandleState = async (): Promise<void> => {
    setLoading(true);
    try {
      await axios.get("/auth/logout");
      getUserAndHandleState();
    } catch (error) {
      console.log(error.message);
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
