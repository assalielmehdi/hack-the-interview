import { Navigate } from "react-router";
import DashboardLayout from "./backoffice";
import Users from "./backoffice/components/Users";
import UserForm from "./backoffice/components/Users/UserForm";

const NotFound = () => <div>Not Found</div>;

const routes = [
  {
    path: "backoffice",
    element: <DashboardLayout />,
    children: [
      { path: "users", element: <Users /> },
      { path: "users/:email", element: <UserForm /> },
      { path: "topics", element: <NotFound /> },
      { path: "levels", element: <NotFound /> },
      { path: "questions", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/",
    element: <Navigate to="backoffice" />,
  },
];

export default routes;
