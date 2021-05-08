import DashboardLayout from "./components";
import Users from "./components/Users";
import UserForm from "./components/Users/UserForm";
import Topics from "./components/Topics";
import TopicForm from "./components/Topics/TopicForm";
import NewTopicForm from "./components/Topics/NewTopicForm";
import NewLevelForm from "./components/Levels/NewLevelForm";
import LevelForm from "./components/Levels/LevelForm";
import NewQuestionForm from "./components/Questions/NewQuestionForm";
import Tags from "./components/Tags";
import NotFound from "./NotFound";
import QuestionForm from "./components/Questions/QuestionForm";

const routes = [
  {
    path: "/",
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
    path: "*",
    element: <NotFound/>,
  },
];

export default routes;
