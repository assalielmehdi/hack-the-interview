import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import {deleteQuestion, getQuestion, updateQuestion} from "../../api/questionApi";
import {addQuestionTags, getQuestionTags} from "../../api/tagApi.js";
import {getTags} from "../../api/tagApi";
import DataLoader from "../DataLoader";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {addQuestionChoice, deleteChoice, getQuestionChoices} from "../../api/choiceApi";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const QuestionForm = () => {
  const {topicId, levelId, questionId} = useParams();

  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(5);
  const [content, setContent] = useState("");
  const [contentTab, setContentTab] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctAnswerTab, setCorrectAnswerTab] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [choices, setChoices] = useState([]);
  const [choiceText, setChoiceText] = useState("");
  const [choiceChecked, setChoiceChecked] = useState(false);

  const [isFetchLoading, setFetchLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isFetchError, setFetchError] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const onQuestionUpdate = async () => {
    try {
      setLoading(true);
      await updateQuestion(questionId, {
        name,
        difficulty,
        content,
        correctAnswer
      });
      await addQuestionTags(
        questionId,
        tags.filter(({name}) => selectedTags.includes(name))
      );
      choices
        .filter(({id}) => !id)
        .forEach(async ({checked, text}) => {
          await addQuestionChoice(questionId, {correct: checked, content: text});
        });
      navigate(`/topics/${topicId}/levels/${levelId}`);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const onQuestionDelete = async () => {
    try {
      setLoading(true);
      await deleteQuestion(questionId);
      navigate(`/topics/${topicId}/levels/${levelId}`);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const onChoiceAdd = () => {
    setChoices([
      ...choices,
      {
        checked: choiceChecked,
        text: choiceText
      }
    ])
    setChoiceText("");
    setChoiceChecked(false);
  };

  const onChoiceDelete = async (idx, id) => {
    console.log(id);
    try {
      setLoading(true);
      if (id) {
        await deleteChoice(id);
      }
      setChoices([
        ...choices.slice(0, idx),
        ...choices.slice(idx + 1)
      ]);

    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const {name, difficulty, content, correctAnswer} = await getQuestion(questionId);
        const tags = await getTags();
        const selectedTags = await getQuestionTags(questionId);
        const choices = await getQuestionChoices(questionId);
        setName(name);
        setDifficulty(difficulty);
        setContent(content);
        setCorrectAnswer(correctAnswer);
        setTags(tags);
        setSelectedTags(selectedTags.map(({name}) => name));
        setChoices(choices.map(({id, correct, content}) => ({id, checked: correct, text: content})));
      } catch (e) {
        setFetchError(true);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchQuestion();
  }, [isFetchLoading, questionId]);

  return (
    <DataLoader
      isError={isFetchError}
      isLoading={isFetchLoading}
      onReload={() => {
        setFetchError(false);
        setFetchLoading(true);
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
        }}
      >
        {isLoading && (
          <Box sx={{width: "100%"}}>
            <LinearProgress/>
          </Box>
        )}
        {isError && (
          <Box sx={{width: "100%", p: 2}}>
            <Alert severity="error" onClose={() => setError(false)}>
              An error occurred when trying to update or delete the resource!
            </Alert>
          </Box>
        )}
        <Container maxWidth={false} sx={{py: 3}}>
          <FormControl variant="standard" fullWidth sx={{my: 2}}>
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
                .map((value) => ({value, label: value}))}
              min={1}
              max={10}
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </Box>
          <FormControl sx={{my: 2, minWidth: 300, maxWidth: 600}}>
            <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={selectedTags}
              onChange={(e) => setSelectedTags(e.target.value)}
              input={<Input label="Tags"/>}
              renderValue={(selected) => (
                <div
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {selected.map((value) => (
                    <Chip
                      key={`chip-${value}`}
                      label={value}
                      sx={{backgroundColor: "background.paper", m: 1}}
                    />
                  ))}
                </div>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                  },
                },
              }}
            >
              {tags.map(({name}) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6} sx={{my: 2}}>
                <Typography variant="caption" color="text.secondary">
                  Content
                </Typography>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                  <Tabs
                    value={contentTab}
                    onChange={(e, tab) => setContentTab(tab)}
                  >
                    <Tab label="Raw" aria-controls="content-raw"/>
                    <Tab label="Preview" aria-controls="content-preview"/>
                  </Tabs>
                  <Box
                    role="tabpanel"
                    id="content-raw"
                    hidden={contentTab !== 0}
                  >
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
                    sx={{
                      minHeight: "208px",
                      pt: "4px",
                      pb: "5px",
                      pl: "14px",
                    }}
                  >
                    <Typography>
                      <ReactMarkdown remarkPlugins={[gfm]}>
                        {content}
                      </ReactMarkdown>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} sx={{my: 2}}>
                <Typography variant="caption" color="text.secondary">
                  Correct Answer
                </Typography>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                  <Tabs
                    value={correctAnswerTab}
                    onChange={(e, tab) => setCorrectAnswerTab(tab)}
                  >
                    <Tab label="Raw" aria-controls="correct-answer-raw"/>
                    <Tab
                      label="Preview"
                      aria-controls="correct-answer-preview"
                    />
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
                    sx={{
                      minHeight: "208px",
                      pt: "4px",
                      pb: "5px",
                      pl: "14px",
                    }}
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
          <Box my={2}>
            <Typography variant="caption" color="text.secondary">
              Choices
            </Typography>
            <Box mt={2}>
              <Box>
                <Checkbox sx={{mr: 2}} checked={choiceChecked} onChange={() => setChoiceChecked(!choiceChecked)}
                          color="default"/>
                <TextField variant="standard" sx={{mr: 2, minWidth: 500}} value={choiceText}
                           onChange={(e) => setChoiceText(e.target.value)}/>
                <Button onClick={onChoiceAdd}>Add Choice</Button>
              </Box>
              <Stack spacing={1} sx={{maxWidth: 600, mt: 3}}>
                {choices.map(({id, checked, text}, idx) => (
                  <Paper elevation={2}>
                    <List dense sx={{p: 0}}>
                      <ListItem>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked}
                            tabIndex={-1}
                            disableRipple
                            disabled
                          />
                        </ListItemIcon>
                        <ListItemText sx={{overflow: "hidden"}}>{text}</ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton edge="end" sx={{color: "text.primary"}} onClick={() => onChoiceDelete(idx, id)}>
                            <DeleteOutlineIcon/>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={onQuestionUpdate}>Update</Button>
            <Button
              sx={{ml: 2}}
              color="secondary"
              onClick={onQuestionDelete}
            >
              Delete
            </Button>
          </Box>
        </Container>
      </Box>
    </DataLoader>
  );
};

export default QuestionForm;
