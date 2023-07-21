import React from "react";
import TTPopper from "../../components/ttPopper/TTPopper";
import TTPopperContainer from "../../components/ttPopper/TTPopperContainer";
import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { orange } from "@mui/material/colors";
import TTPopperDivider from "../../components/ttPopper/TTPopperDivider";
import TTPopperButton from "../../components/ttPopper/TTPopperButton";
import { authActions } from "../../state/authSlice";

const ProfilePopper = ({ onClose, ...others }) => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth.user);

  const onLogOutClick = () => {
    dispatch(authActions.logout());
    if (onClose) onClose();
  };

  return (
    <TTPopper size="sm" onClose={onClose} {...others}>
      <TTPopperContainer padding={"8px 4px"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack px={1}>
            <Typography color={"primary.light"} variant="subtitle2">
              Name
            </Typography>
            <Typography color={"primary.light"} variant="caption">
              {email}
            </Typography>
          </Stack>
          <AccountCircleIcon
            // fontSize="large"
            sx={{ color: orange[400], fontSize: "2.75rem" }}
          />
        </Stack>
        <TTPopperDivider spacing={8} />
        <TTPopperButton>Profile settings</TTPopperButton>
        <TTPopperButton>Keyboard shortcuts</TTPopperButton>
        <TTPopperDivider spacing={8} />
        <TTPopperButton onClick={onLogOutClick}>Log out</TTPopperButton>
      </TTPopperContainer>
    </TTPopper>
  );
};

export default ProfilePopper;
