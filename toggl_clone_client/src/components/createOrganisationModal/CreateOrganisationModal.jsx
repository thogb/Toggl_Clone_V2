import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import TTDialog from "../ttDialog/TTDialog";
import { object, string } from "yup";
import { Formik } from "formik";
import { useAddOrganisationMutation } from "../../state/organisationSlice";

const CreateOrganisationModal = ({ open, onClose, onComplete, ...others }) => {
  const [addOrganisation] = useAddOrganisationMutation();

  const orgScheme = object().shape({
    name: string().required("Please choose a name"),
    workspaceName: string().required("Please choose a workspace name"),
  });

  const initialValues = {
    name: "",
    workspaceName: "",
  };

  const handleSubmit = (values, _) => {
    if (onComplete) onComplete(values);
    onClose();
    addOrganisation({
      name: values.name,
      workspaceName: values.workspaceName,
    });
  };

  return (
    <TTDialog open={open} onClose={onClose} {...others}>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={orgScheme}
        initialValues={initialValues}
      >
        {({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <>
            <DialogTitle>Create new organisation</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                name="name"
                placeholder="Organisation name..."
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.name) && Boolean(errors.name)}
                helperText={Boolean(touched.name) && errors.name}
                style={{ height: "60px" }}
                inputProps={{
                  style: {
                    fontSize: "0.875rem",
                    padding: "8px 12px",
                  },
                }}
              />
              <TextField
                fullWidth
                name="workspaceName"
                placeholder="Workspace name..."
                value={values.workspaceName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  Boolean(touched.workspaceName) &&
                  Boolean(errors.workspaceName)
                }
                helperText={
                  Boolean(touched.workspaceName) && errors.workspaceName
                }
                style={{ height: "60px" }}
                inputProps={{
                  style: {
                    fontSize: "0.875rem",
                    padding: "8px 12px",
                  },
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
                Create Organisation
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </TTDialog>
  );
};

export default CreateOrganisationModal;
