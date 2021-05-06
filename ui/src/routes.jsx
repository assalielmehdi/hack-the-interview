import {Navigate} from "react-router";
import DashboardLayout from "./backoffice";
import Users from "./backoffice/components/Users";
import UserForm from "./backoffice/components/Users/UserForm";
import Topics from "./backoffice/components/Topics";
import TopicForm from "./backoffice/components/Topics/TopicForm";
import NewTopicForm from "./backoffice/components/Topics/NewTopicForm";
import NewLevelForm from "./backoffice/components/Levels/NewLevelForm";
import LevelForm from "./backoffice/components/Levels/LevelForm";
import NewQuestionForm from "./backoffice/components/Questions/NewQuestionForm";
import Tags from "./backoffice/components/Tags";
import NotFound from "./NotFound";
import Home from "./Home";
import QuestionForm from "./backoffice/components/Questions/QuestionForm";

const routes = [
  {
    path: "backoffice",
    element: <DashboardLayout/>,
    children: [
      {path: "users", element: <Users/>},
      {path: "users/:id", element: <UserForm/>},
      {path: "topics", element: <Topics/>},
      {path: "topics/add", element: <NewTopicForm/>},
      {path: "topics/:id", element: <TopicForm/>},
      {path: "topics/:id/levels", element: <TopicForm/>},
      {path: "topics/:topicId/add", element: <NewLevelForm/>},
      {path: "topics/:topicId/levels/:levelId", element: <LevelForm/>},
      {
        path: "topics/:topicId/levels/:levelId/questions",
        element: <LevelForm/>,
      },
      {
        path: "topics/:topicId/levels/:levelId/add",
        element: <NewQuestionForm/>,
      },
      {
        path: "topics/:topicId/levels/:levelId/questions/:questionId",
        element: <QuestionForm/>
      },
      {
        path: "tags",
        element: <Tags/>,
      },
    ],
  },
  {
    path: "/error",
    element: <NotFound/>,
  },
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "*",
    element: <Navigate to="/error"/>,
  },
];

export default routes;
