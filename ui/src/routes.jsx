import { Navigate } from "react-router";
import NotFound from "./NotFound";
import DashboardLayout from "./backoffice";
import Users from "./backoffice/components/Users";
import UserForm from "./backoffice/components/Users/UserForm";
import Topics from "./backoffice/components/Topics";
import TopicForm from "./backoffice/components/Topics/TopicForm";
import NewTopicForm from "./backoffice/components/Topics/NewTopicForm";
import NewLevelForm from "./backoffice/components/Levels/NewLevelForm";

const routes = [
  {
    path: "backoffice",
    element: <DashboardLayout />,
    children: [
      { path: "users", element: <Users /> },
      { path: "users/:_id", element: <UserForm /> },
      { path: "topics", element: <Topics /> },
      { path: "topics/add", element: <NewTopicForm /> },
      { path: "topics/:_id", element: <TopicForm /> },
      { path: "topics/:_id/levels/add", element: <NewLevelForm /> },
    ],
  },
  {
    path: "/",
    element: <Navigate to="backoffice" />,
  },
  {
    path: "/error",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/error" />,
  },
];

export default routes;
