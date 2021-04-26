import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Input,
  Button,
  LinearProgress,
  Alert,
  Slider,
  Typography,
  Grid,
  TextField,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Context } from "../../../context";

const NewQuestionForm = () => {
  const {
    _topicId,
    _levelId,
    topicId = +_topicId,
    levelId = +_levelId,
  } = useParams();

  const { addQuestion } = useContext(Context);

  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(5);
  const [content, setContent] = useState("");
  const [contentTab, setContentTab] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctAnswerTab, setCorrectAnswerTab] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const onQuestionAdd = async () => {
    try {
      setLoading(true);
      await addQuestion(topicId, levelId, {
        name,
        levelId,
        difficulty,
        content,
        correctAnswer,
      });
      navigate(`/backoffice/topics/${topicId}/levels/${levelId}`);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
      }}
    >
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      {isError && (
        <Box sx={{ width: "100%", p: 2 }}>
          <Alert severity="error" onClose={() => setError(false)}>
            An error occurred when trying to update or delete the resource!
          </Alert>
        </Box>
      )}
      <Container maxWidth={false} sx={{ py: 3 }}>
        <FormControl fullWidth sx={{ my: 2 }} variant="standard">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <Box mt={2} maxWidth={400}>
          <Typography variant="caption" color="text.secondary">
            Difficulty
          </Typography>
          <Slider
            value={difficulty}
            valueLabelDisplay="off"
            step={1}
            marks={Array.from(Array(11).keys())
              .slice(1)
              .map((value) => ({ value, label: value }))}
            min={1}
            max={10}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </Box>
        <Box>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{ my: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Content
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={contentTab}
                  onChange={(e, tab) => setContentTab(tab)}
                >
                  <Tab label="Raw" aria-controls="content-raw" />
                  <Tab label="Preview" aria-controls="content-preview" />
                </Tabs>
                <Box role="tabpanel" id="content-raw" hidden={contentTab !== 0}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={8}
                    variant="standard"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Box>
                <Box
                  role="tabpanel"
                  id="content-preview"
                  hidden={contentTab !== 1}
                  sx={{ minHeight: "208px", pt: "4px", pb: "5px", pl: "14px" }}
                >
                  <Typography>
                    <ReactMarkdown remarkPlugins={[gfm]}>
                      {content}
                    </ReactMarkdown>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ my: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Correct Answer
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={correctAnswerTab}
                  onChange={(e, tab) => setCorrectAnswerTab(tab)}
                >
                  <Tab label="Raw" aria-controls="correct-answer-raw" />
                  <Tab label="Preview" aria-controls="correct-answer-preview" />
                </Tabs>
                <Box
                  role="tabpanel"
                  id="correct-answer-raw"
                  hidden={correctAnswerTab !== 0}
                >
                  <TextField
                    fullWidth
                    multiline
                    minRows={8}
                    variant="standard"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                  />
                </Box>
                <Box
                  role="tabpanel"
                  id="correct-answer-preview"
                  hidden={correctAnswerTab !== 1}
                  sx={{ minHeight: "208px", pt: "4px", pb: "5px", pl: "14px" }}
                >
                  <Typography>
                    <ReactMarkdown remarkPlugins={[gfm]}>
                      {correctAnswer}
                    </ReactMarkdown>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onQuestionAdd}>Save</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NewQuestionForm;
