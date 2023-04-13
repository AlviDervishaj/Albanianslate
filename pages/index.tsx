import Head from 'next/head'
import { VideoForm } from '../components/VideoForm';
import { Logo } from "../components/Logo";
import { Log } from "../components/Log";
import { styled } from '../stitches.config'
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';
import { useState } from 'react';
import { extractVideoIdFromURL, processVideo } from '../utils/api-client';

const Box = styled('div', {})

const Text = styled('p', {
  fontFamily: '$system',
  color: '$hiContrast',
  textAlign: 'center',
})

const Link = styled('a', {
  fontFamily: '$system',
  textDecoration: 'none',
  color: '$purple600',
})

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginY: 0,
  marginX: 'auto',
  paddingX: '$3',
  paddingY: 0,
  variants: {
    size: {
      1: {
        maxWidth: '300px',
      },
      2: {
        maxWidth: '585px',
      },
      3: {
        maxWidth: '865px',
      },
    },
  },
})

export default function Home() {
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [progressOutput, setProgressOutput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('progress');
  const [resultTranscript, setResultTranscript] = useState<string>('');
  const onSubmit = async (videoUrl: string) => {
    const vId: string | null = extractVideoIdFromURL(videoUrl);
    if(typeof vId === 'string'){
      setResultTranscript('');
      setProcessing(true);
      const transcriptVideo = await processVideo(vId, message => {
        setProgressOutput(prev => prev + message);
      })

      if(transcriptVideo) setResultTranscript(transcriptVideo);
      
      setProcessing(false);
      setActiveTab('result');
    }
    return;
  }
  return (
    <Box css={{ paddingY: '$6' }}>
      <Head>
        <title>Transcribe, translate and download videos with OpenAi</title>
      </Head>
      <Container size={{ '@initial': '1', '@sm': '2' }}>
        <Logo />
        <Text as={'h1'}>Perkthimi Vidjove nga Youtube ne Shqip.</Text>
        <VideoForm onSubmitHandler={onSubmit} isProcessing={isProcessing} />
        <TabsRoot value={activeTab} onValueChange={setActiveTab}>
          <TabsList aria-label='Output'>
            <TabsTrigger value='progress'>
              Progress
            </TabsTrigger>
            <TabsTrigger value='result'>
              Result
            </TabsTrigger>
          </TabsList>
          <TabsContent value='progress'>
            <Log>{progressOutput}</Log>
          </TabsContent>
          <TabsContent value='result'>
            <Log>{resultTranscript}</Log>
          </TabsContent>
        </TabsRoot>
      </Container>
    </Box>
  )
}
