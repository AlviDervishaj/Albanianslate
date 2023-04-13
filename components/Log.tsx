import { FC, RefObject, useEffect, useRef } from "react"
import { styled } from "@stitches/react"

type Props = {
  children: string | undefined
}

const Box = styled('div', {})

const Pre = styled('pre', {
  margin: '1em',
  fontSize: '1.2em',
  whiteSpace: 'pre-wrap'
})

export const Log: FC<Props> = ({ children }) => {
  const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box: HTMLDivElement | null = ref.current;
    if(box){
      // scroll to log
      box.scrollTop = box.scrollHeight;
    }
  }, [children])
  return (
    <Box
      ref={ref}
      css={{ flex: 1, overflow: 'auto' }}
      className="output-container"
    >
      <Pre>{children}</Pre>
    </Box>
  )
}
