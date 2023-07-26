import React from "react";
import TTDialog from "../ttDialog/TTDialog";
import * as yup from "yup";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  Switch,
  TextField,
  Typography,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import { Visibility } from "@mui/icons-material";
import ColourSelector, {
  ColourButton,
  colourSelectorColours,
} from "../colourSelector/ColourSelector";

const ProjectNameTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    "&.Mui-focused": {},
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  minHeight: "46px",
  padding: theme.spacing(1, 1.5),
  color: alpha(theme.palette.primary.main, 0.75),
  border: "1px solid",
  borderColor: alpha(theme.palette.primary.main, 0.2),
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(1, 0),
}));

const FormControlLeft = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  flexBasis: "30%",
}));

const FormControlRight = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  flexBasis: "70%",
}));

const FormControlTitle = styled("span")(({ theme }) => ({
  textTransform: "uppercase",
  fontSize: "0.7rem",
  fontWeight: 500,
  marginLeft: 8,
}));

const projectScheme = yup.object().shape({
  name: yup.string().required("Please enter a Project name"),
  private: yup.bool(),
});

const intialValues = {
  name: "",
  private: true,
};

const CreateProjectModal = ({
  open,
  onClose,
  currentWorkspace,
  workspaces,
  onComplete,
}) => {
  const theme = useTheme();

  const [selectedWorkspace, setSelectedWorkspace] =
    React.useState(currentWorkspace);
  const [selectedColour, setSelectedColour] = React.useState(
    colourSelectorColours[0]
  );
  const [colourSelectorAEl, setColourSelectorAEl] = React.useState(null);

  const handleFormikSubmit = (values, formikhelpers) => {
    console.log({ ...values, colour: selectedColour });
  };

  const handleColourSelect = (colour) => {
    setSelectedColour(colour);
  };

  const handleColourClick = (e) => {
    setColourSelectorAEl(e.currentTarget);
  };

  return (
    <TTDialog width={"520px"} open={open} onClose={onClose}>
      <DialogTitle>Create new project</DialogTitle>
      <Formik
        initialValues={intialValues}
        onSubmit={handleFormikSubmit}
        validationSchema={projectScheme}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent style={{ padding: theme.spacing(1.5) }}>
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <ColourButton
                  style={{
                    backgroundColor: selectedColour,
                    outlineWidth: 5,
                  }}
                  onClick={handleColourClick}
                />
                <ColourSelector
                  placement="bottom"
                  selectedColour={selectedColour}
                  anchorEl={colourSelectorAEl}
                  onClose={() => setColourSelectorAEl(null)}
                  onComplete={handleColourSelect}
                />
                <ProjectNameTextField
                  //   autoFocus={true}
                  fullWidth
                  placeholder="Project name"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={Boolean(touched.name) && errors.name}
                  inputProps={{
                    style: { fontWeight: 500, padding: theme.spacing(1, 2) },
                  }}
                />
              </Stack>
              <StyledFormControl>
                <FormControlLeft>
                  <Visibility fontSize="small" />
                  <FormControlTitle>Privacy</FormControlTitle>
                </FormControlLeft>
                <FormControlRight>
                  <Switch
                    size="small"
                    color="secondary"
                    name="private"
                    checked={values.private}
                    onChange={handleChange}
                  />
                  <Typography ml={2} variant="caption" color={"primary"}>
                    Private, visible only to project members
                  </Typography>
                </FormControlRight>
              </StyledFormControl>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
              >
                Create project
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </TTDialog>
  );
};

export default CreateProjectModal;
