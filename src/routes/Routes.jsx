import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/user/HomePage";
import QuizPage from "../pages/user/QuizPage";
import ResultPage from "../pages/user/ResultPage";
import LeaderBoardPage from "../pages/user/LeaderBoardPage";
import LoginPage from "../pages/auth/LoginPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import DashboardPage from "../pages/admin/DashboardPage";
import QuizSetAddPage from "../pages/admin/QuizSetAddPage";
import QuestionAddPage from "../pages/admin/QuestionAddPage";
import UsersPageLayout from "../pages/layouts/UsersPageLayout";
import AdminPageLayout from "../pages/layouts/AdminPageLayout";
import NotFoundPage from "../pages/error/NotFoundPage";
import ErrorPage from "../pages/error/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='*' element={<NotFoundPage />} />
            <Route
                path='/'
                errorElement={ErrorPage}
                element={<UsersPageLayout />}>
                <Route index element={<HomePage />} />
                <Route element={<PrivateRoute />}>
                    <Route path='/quiz/:quizsetId' element={<QuizPage />} />
                    <Route path='/result/:quizsetId' element={<ResultPage />} />
                </Route>

                <Route
                    path='/leaderboard/:quizsetId'
                    element={<LeaderBoardPage />}
                />
            </Route>

            <Route
                path='/login'
                errorElement={<ErrorPage />}
                element={<LoginPage />}
            />
            <Route
                path='/register'
                errorElement={<ErrorPage />}
                element={<RegistrationPage />}
            />

            <Route
                errorElement={<ErrorPage />}
                path='/admin'
                element={<AdminPageLayout />}>
                <Route path='/admin/dashboard' element={<DashboardPage />} />
                <Route path='/admin/quizset/add' element={<QuizSetAddPage />} />
                <Route
                    path='/admin/quizset/:quizsetId'
                    element={<QuestionAddPage />}
                />
            </Route>
        </>
    )
);

const Routes = () => <RouterProvider router={router} />;
export default Routes;
