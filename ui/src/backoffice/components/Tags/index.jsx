import { useState, useEffect } from "react";
import {
  Box,
  Container,
  LinearProgress,
  Alert,
  Chip,
  TextField,
  Button,
} from "@material-ui/core";
import DataLoader from "../DataLoader";
import { getTags, addTag, deleteTag } from "../../../api/tagApi";

const Tags = () => {
  const [tags, setTags] = useState([]);

  const [tagText, setTagText] = useState("");

  const [isFetchLoading, setFetchLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isFetchError, setFetchError] = useState(false);
  const [isError, setError] = useState(false);

  const onTagAdd = async (id) => {
    try {
      setLoading(true);
      await addTag({ name: tagText });
      setTagText("");
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onTagDelete = async (id) => {
    try {
      setLoading(true);
      await deleteTag(id);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags();
        setTags(tags);
      } catch (e) {
        setFetchError(true);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchTags();
  }, [isLoading]);

  return (
    <DataLoader
      isError={isFetchError}
      isLoading={isFetchLoading}
      onReload={() => {
        setError(false);
        setLoading(true);
      }}
    >
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
              An error occurred when trying to add or delete the resource!
            </Alert>
          </Box>
        )}
        <Container maxWidth={false} sx={{ py: 3 }}>
          <Box mb={3} display="flex" alignItems="flex-end">
            <TextField
              label="Tag"
              variant="standard"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
            />
            <Button sx={{ ml: 2, pb: 0 }} onClick={onTagAdd}>
              Add Tag
            </Button>
          </Box>
          <Box>
            {tags.map(({ id, name }) => (
              <Chip
                key={`tag-${id}`}
                sx={{ m: 1, backgroundColor: "background.paper" }}
                label={name}
                onDelete={() => onTagDelete(id)}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </DataLoader>
  );
};

export default Tags;
