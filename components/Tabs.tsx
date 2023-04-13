import * as Tab from "@radix-ui/react-tabs";
import { styled } from "@stitches/react";

export const TabsRoot = styled(Tab.Root, {
  display: 'flex',
  maxHeight: '25em',
  flexDirection: 'column',
  marginTop: '1.5rem',
  minHeight: 0,
});

export const TabsList = styled(Tab.List, {
  flexShrink: 0,
  display: 'flex',
  borderBottom: `1px solid $gray400`
})

export const TabsTrigger = styled(Tab.Trigger, {
  all: 'unset',
  fontFamily: '$system',
  backgroundColor: 'white',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  color: "$foreground",
  userSelect: 'none',
  '&:first-child': { borderTopLeftRadius: 6 },
  '&:last-child': { borderTopLeftRadius: 6 },
  '&:hover': { color: '$purple600' },
  '&[data-state="active"]': {
    color: '$purple600' ,
    boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
  },
  '&:focus': { position: 'relative', boxShadow: '0 0 0 2px black' }
})

export const TabsContent = styled(Tab.Content, {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  flexGrow: 1,
  paddingTop: 1,
  backgroundcolor: 'white',
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: 'none',
})

