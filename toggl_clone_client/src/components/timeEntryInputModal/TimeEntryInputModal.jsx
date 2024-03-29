import styled from "@emotion/styled";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TimeEntryInputExpand from "./TimeEntryInputExpand";
import TagsSelector from "../tagSelector/TagsSelector";
import TTPopper from "../ttPopper/TTPopper";
import TTDateCalender from "../TTDateCalender/TTDateCalender";
import { differenceInSeconds, format } from "date-fns";
import { useTheme } from "@emotion/react";
import { listUtil } from "../../utils/listUtil";
import { withDataFromTimeEntries } from "./withDataFromTimeEntries";
import TTDialog from "../ttDialog/TTDialog";

const StyledDialog = styled(TTDialog)(({ theme }) => ({
  // Paper
  "& .MuiDialog-paper": {
    // DialogContent
    // DialogContent
    "& .MuiDialogContent-root": {
      padding: 0,
      marginBottom: theme.spacing(8),
      minHeight: 200, // to be removed
      overflow: "visible",

      "& .MuiFormControl-root": {
        // padding: theme.spacing(0, 1.5),
        marginBottom: theme.spacing(1.5),
        width: "100%",
        height: "40px",
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: theme.shape.borderRadius,
        // overflow: "hidden",
        // position: "relative",
        // display: "flex",
        "& .MuiInputBase-root": {
          height: "40px",
          "& .MuiInputBase-input": {
            fontSize: theme.typography.body2.fontSize,
            fontWeight: 500,
            padding: theme.spacing(0, 1.5),
          },
          //   border: "1px solid red"
          "& fieldset": {
            border: "none",
          },
        },

        "&:has(.Mui-focused),&:has(.Mui-expanded)": {
          //   backgroundColor: theme.palette.grey[200],
          backgroundColor: alpha(
            theme.palette.action.focus,
            theme.palette.action.hoverOpacity
          ),
        },
      },
    },
  },
}));

const getInputModalDataDifferent = (initialValues, currentValues) => {
  const changed = {};
  if (initialValues === null) {
    return changed;
  }
  if (initialValues.description !== currentValues.description) {
    changed.description = currentValues.description;
  }
  if (initialValues.projectId !== currentValues.projectId) {
    changed.projectId = currentValues.projectId;
  }
  if (!listUtil.isListEqual(initialValues.tags, currentValues.tags)) {
    changed.tags = currentValues.tags;
  }
  if (
    differenceInSeconds(initialValues.startDate, currentValues.startDate) !== 0
  ) {
    changed.startDate = currentValues.startDate;
  }
  return changed;
};

const TimeEntryInputModal = ({
  open,
  title,

  description = "",
  projectId = null,
  startDate,
  checkedTagList = [],

  tagList,

  onOpen,
  onSave,
  onClose,
}) => {
  const formatString = "MM/dd/yyyy";

  const theme = useTheme();

  const [localDescription, setLocalDescription] = useState(description);
  const [localCheckedTagList, setLocalCheckedTagList] =
    useState(checkedTagList);
  const [tagsAnchorEl, setTagsAnchorEl] = useState(null);
  const [dateString, setDateString] = useState(format(startDate, formatString));
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [calenderAnchorEl, setCalenderAnchorEl] = useState(null);
  const [initialValues, setInitialValues] = useState(null);

  //   useEffect(() => {
  //     setLocalCheckedTagList([...checkedTagList]);
  //   }, [checkedTagList]);

  useEffect(() => {
    if (open) {
      resetValues();
      setInitialValues(getIntialValues());
    }
  }, [description, projectId, checkedTagList, startDate.getTime()]);

  useEffect(() => {
    if (open) {
      resetValues();
      setInitialValues(getIntialValues());
      if (onOpen) onOpen();
    }
  }, [open]);

  const resetValues = () => {
    const justDate = new Date(startDate.toDateString());
    setLocalDescription(description);
    setLocalCheckedTagList(checkedTagList);
    setDateString(format(justDate, formatString));
    setLocalStartDate(justDate);
    setCalenderAnchorEl(null);
    setTagsAnchorEl(null);
  };

  const handleDescriptionChange = (e) => {
    setLocalDescription(e.target.value);
  };

  const getIntialValues = () => {
    return {
      description: description,
      projectId: projectId,
      tags: checkedTagList,
      startDate: new Date(startDate.toDateString()),
    };
  };

  const getCurrentValues = () => {
    return {
      description: localDescription,
      projectId: projectId,
      tags: localCheckedTagList,
      startDate: localStartDate,
    };
  };

  const handleSaveClick = () => {
    if (onSave) {
      const finalValues = getCurrentValues();
      onSave({
        initialValues: initialValues,
        finalValues: finalValues,
        changed: getInputModalDataDifferent(initialValues, finalValues),
      });
    }
    onClose();
  };

  const handleDateStringChange = (e) => {
    setDateString(e.target.value);
  };

  const handleCalenderInputBlur = (e) => {
    const newDate = Date.parse(e.target.value);
    if (isNaN(newDate)) {
      setDateString(format(localStartDate, formatString));
    } else {
      setLocalStartDate(newDate);
    }
  };

  const handleCalenderChange = (newDate) => {
    setDateString(format(newDate, formatString));
    // setLocalStartDate(newDate.getTime());
    setLocalStartDate(newDate);
  };

  return (
    <StyledDialog
      // transitionDuration={300}
      // TransitionComponent={Grow}
      // TransitionProps={{ easing: "cubic-bezier(0, 0, 0.2, 1)" }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          placeholder="New description..."
          value={localDescription}
          onBlur={(e) => {
            setLocalDescription(e.target.value.trim());
          }}
          onChange={handleDescriptionChange}
        ></TextField>
        <FormControl>
          <TimeEntryInputExpand placeholder="Select project" />
        </FormControl>
        <FormControl>
          <TagsSelector
            tagList={tagList}
            tagCheckedList={localCheckedTagList}
            popperAnchorEl={tagsAnchorEl}
            onClose={() => setTagsAnchorEl(null)}
            // disableTrigerComponent={true}
            placement={"bottom-start"}
            sameWidthAsTrigger={true}
            offset={[0, 10]}
            triggerComponent={
              // <FormControl>
              <TimeEntryInputExpand
                placeholder="Add tags"
                text={localCheckedTagList.join(", ")}
                expanded={Boolean(tagsAnchorEl)}
                onClick={(e) => setTagsAnchorEl(e.currentTarget)}
              />
              // </FormControl>
            }
            onSelectionComplete={(checkedList) => {
              setLocalCheckedTagList([...checkedList]);
            }}
          />
        </FormControl>

        <TextField
          variant="outlined"
          onFocus={(e) => {
            if (!Boolean(calenderAnchorEl))
              setCalenderAnchorEl(e.currentTarget);
          }}
          value={dateString}
          onChange={handleDateStringChange}
          onBlur={handleCalenderInputBlur}
          style={{
            ...(Boolean(calenderAnchorEl)
              ? { zIndex: theme.zIndex.modal + 100 }
              : {}),
          }}
        ></TextField>
        <TTPopper
          anchorEl={calenderAnchorEl}
          onClose={() => setCalenderAnchorEl(null)}
          placement={"bottom"}
          offset={[0, 10]}
        >
          <TTDateCalender
            value={localStartDate}
            onChange={handleCalenderChange}
          />
        </TTPopper>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleSaveClick}>
          Save
        </Button>
      </DialogActions>
      {/* <CloseIcon className="TimeEntryInputModal-close" onClick={onClose} /> */}
    </StyledDialog>
  );
};

export default TimeEntryInputModal;
export const TEInputModalFromTEs = withDataFromTimeEntries(TimeEntryInputModal);
