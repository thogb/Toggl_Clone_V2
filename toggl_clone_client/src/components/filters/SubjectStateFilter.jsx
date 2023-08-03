import { Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { TTPopperHeading } from '../ttPopper/TTPopperHeading'
import { KeyboardArrowRight } from '@mui/icons-material';
import TTPopper, { TTPopperSizes } from '../ttPopper/TTPopper';
import TTPopperButton from '../ttPopper/TTPopperButton';
import TTPopperContainer from '../ttPopper/TTPopperContainer';

export default function SubjectStateFilter({subjectStates = [], currentSubjectState, onComplete, ...others}) {
  const theme = useTheme();

  const [popperAnchorEl, setPopperAnchorEl] = useState(null);

  const handleMouseEnter = (e) => {
    setPopperAnchorEl(e.currentTarget);
  }

  const handleMouseLeave = () => {
    setPopperAnchorEl(null);
  }

  const handleSubjectStateClick = (subjectState) => {
    if (onComplete) onComplete(subjectState);
    setPopperAnchorEl(null)
  }
  
    return (
    <Stack alignSelf={"stretch"} width={"100%"} px={theme.ttSpacings.popper.px} direction={"row"} alignItems={"center"} {...others}>
        <TTPopperHeading>show</TTPopperHeading>
        <Stack
        pl={1}
        ml={"auto"}
        alignSelf={"stretch"}
        direction={"row"}
        alignItems={"center"}
        style={{cursor: "pointer"}}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <Typography fontSize={"0.90rem"} mr={0.5}>Active</Typography>
            <KeyboardArrowRight style={{fontSize: "0.85rem"}}/>
            <TTPopper
            disableBackDrop
            size='xs'
            offset={[0,0]}
            placement={"right"}
                anchorEl={popperAnchorEl}
                onClose={() => setPopperAnchorEl(null)}
            >
                <TTPopperContainer
                padding={theme.spacing(1)}>
                    {subjectStates.map((subjectState) => (
                        <TTPopperButton selected={currentSubjectState ===  subjectState} onClick={() => handleSubjectStateClick(subjectState)}>{subjectState}</TTPopperButton>
                    ))}
                </TTPopperContainer>
            </TTPopper>
        </Stack>
    </Stack>
  )
}
