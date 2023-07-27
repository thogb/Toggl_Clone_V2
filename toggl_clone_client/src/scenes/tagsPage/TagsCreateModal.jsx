import React from "react";
import TTDialog from "../../components/ttDialog/TTDialog";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { object, string } from "yup";
import { Formik } from "formik";
import { useAddTagMutation } from "../../state/tagSlice";

const TagsCreateModal = ({ open, onClose, workspaceId, tags, ...others }) => {
  const [addTag] = useAddTagMutation();

  const tagSchema = object().shape({
    name: string()
      .required("Tag name is required")
      .test("unique", "Tag already exists", (value) => {
        return !tags.some((tag) => tag.name === value);
      }),
  });

  const initialValues = {
    name: "",
  };

  const handleSubmit = (values) => {
    addTag({ tagName: values.name, workspaceId: workspaceId });
    onClose();
  };

  return (
    <TTDialog open={open} onClose={onClose} {...others}>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={tagSchema}
        initialValues={initialValues}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <>
            <DialogTitle>New Tag</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                placeholder="Tag name..."
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.name) && Boolean(errors.name)}
                helperText={Boolean(touched.name) && errors.name}
                style={{ height: "60px" }}
                inputProps={{
                  style: {
                    fontSize: "0.875rem",
                    padding: "8px 12px",
                  },
                }}
                onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     handleSubmit();
                  //     onClose();
                  //   }
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Create
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </TTDialog>
  );
};

export default TagsCreateModal;
