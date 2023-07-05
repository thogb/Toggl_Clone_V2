import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grow,
  TextField,
  alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TimeEntryInputExpand from "./TimeEntryInputExpand";
import TagsSelector from "../../scenes/timerPage/TagsSelector";
import TTPopper from "../ttPopper/TTPopper";
import TTDateCalender from "../TTDateCalender/TTDateCalender";
import { format } from "date-fns";
import { useTheme } from "@emotion/react";

// Using styled() to make a style component named StyledDialog with dialog
// also including theme

const StyledDialog = styled(Dialog)(({ theme }) => ({
  // Paper
  "& .MuiDialog-paper": {
    padding: theme.spacing(2),
    width: 360,
    overflow: "visible",
    // borderRadius: "8px",

    // DialogTitle
    "& .MuiDialogTitle-root": {
      padding: 0,
      paddingBottom: theme.spacing(1),
      fontSize: theme.typography.body2.fontSize,
      lineHeight: theme.typography.body2.lineHeight,
    },

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

    // DialogActions
    "& .MuiDialogActions-root": {
      padding: 0,
      justifyContent: "start",
    },

    "& .TimeEntryInputModal-close": {
      cursor: "pointer",
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      padding: theme.spacing(1 / 2),
    },
  },
}));

const TimeEntryInputModal = ({
  open,
  title,

  description = "",
  projectId = null,
  startDate,
  checkedTagList = [],

  tagList,

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

  //   useEffect(() => {
  //     setLocalCheckedTagList([...checkedTagList]);
  //   }, [checkedTagList]);

  useEffect(() => {
    if (open) {
      resetValues();
    }
  }, [open]);

  const resetValues = () => {
    setLocalDescription("");
    setLocalCheckedTagList(checkedTagList);
    setDateString(format(startDate, formatString));
    setLocalStartDate(startDate);
    setCalenderAnchorEl(null);
    setTagsAnchorEl(null);
  };

  const handleDescriptionChange = (e) => {
    setLocalDescription(e.target.value);
  };

  const handleSaveClick = () => {
    if (onSave) {
      onSave({
        description: localDescription,
        projectId: projectId,
        tags: localCheckedTagList,
        startDate: localStartDate,
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
    setLocalStartDate(newDate.getTime());
  };

  return (
    <StyledDialog
      transitionDuration={300}
      TransitionComponent={Grow}
      TransitionProps={{ easing: "cubic-bezier(0, 0, 0.2, 1)" }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          placeholder="New description..."
          value={localDescription}
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
      <CloseIcon className="TimeEntryInputModal-close" onClick={onClose} />
    </StyledDialog>
  );
};

export default TimeEntryInputModal;
