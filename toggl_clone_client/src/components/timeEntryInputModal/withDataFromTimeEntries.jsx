import { useEffect, useState } from "react";
import { findCommonValueInObjs } from "../../utils/otherUtil";

export const withDataFromTimeEntries =
  (Component) =>
  ({
    open,

    startDate,

    timeEntries = [],

    tagList = [],

    onSave,
    onClose,
  }) => {
    const [description, setDescription] = useState("");
    const [checkedTagList, setCheckedTagList] = useState([]);

    useEffect(() => {
      if (open) {
        handleOpen();
      }
    }, [open]);

    const handleOpen = () => {
      if (timeEntries.length === 1) {
        setDescription(timeEntries[0].description);
        setCheckedTagList(timeEntries[0].tags);
      } else {
        const commonTags = [];
        let ind = 0;
        let tagName;
        while (ind === 0 || tagName != null) {
          tagName = timeEntries[0].tags[ind];
          for (let te of timeEntries) {
            if (te.tags.length === ind || te.tags[ind] !== tagName) {
              tagName = null;
              break;
            }
          }
          if (tagName != null) {
            commonTags.push(tagName);
          }
          ind++;
        }
        console.log(findCommonValueInObjs(timeEntries, "description"));
        setDescription(findCommonValueInObjs(timeEntries, "description") ?? "");
        setCheckedTagList(commonTags);
      }
    };

    const entriesCount = timeEntries?.length ?? 0;

    return (
      <Component
        open={open}
        title={`Bulk edit ${entriesCount} time ${
          entriesCount > 1 ? "entries" : "entry"
        }`}
        description={description}
        tagList={tagList}
        checkedTagList={checkedTagList}
        startDate={startDate}
        onSave={onSave}
        onClose={onClose}
      />
    );
  };
