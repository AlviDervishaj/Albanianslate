import { styled } from "@stitches/react";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import Image from "next/image";


const Box = styled('div', {
  height: '7rem',
  variants: {
    size: {
      1: {
        maxWidth: '300px',
      },
      2: {
        maxWidth: '585px',
      },
      3: {
        maxWidth: '1265px',
      },
    },
  }
});

export const Logo = () => {
  return (
    <Box
      css={{
        width: '100%',
        borderRadius: 6,
        overflow: 'hidden',
        margin: 'auto',
      }}
      size={{ '@initial': '1', '@md': '2', '@lg': '3' }}
    >
      <AspectRatio.Root ratio={16 / 9}>
        <Image
          src="/static/images/logos/logo-black-no-bg.png"
          fill
          priority={true}
          style={{ objectFit: 'contain' }}
          alt="Logo"
        />
      </AspectRatio.Root>
    </Box>
  )
}
