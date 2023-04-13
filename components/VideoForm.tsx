import {ChangeEvent, FC, FormEvent, FormEventHandler, useState} from 'react';
import * as Form from '@radix-ui/react-form';
import { styled } from '@stitches/react';
import { purpleDark } from '@radix-ui/colors';

type FormControllType = typeof Form.Control;
type FormSubmitType = typeof Form.Submit;
type Props = {
  onSubmitHandler: (videoURl: string) => void
  isProcessing: boolean
}

const Control: FormControllType = Form.Control;
const Submit: FormSubmitType = Form.Submit;

const FormRoot = styled(Form.Root, {
  margin: 'auto'
});

const FormField = styled(Form.Field, {
  display: 'grid',
  marginBottom: 10,
});

const FormLabel = styled(Form.Label, {
  fontSize: 15,
  fontWeight: 500,
  fontFamily: '$system',
  lineHeight: '35px',
  color: 'Navy',
});

const FormMessage = styled(Form.Message, {
  fontSize: 13,
  fontFamily: '$system',
  color: 'red',
  opacity: 0.8,
});

const Flex = styled('div', {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
});

const inputStyles = {
  all: 'unset',
  boxSizing: 'border-box',
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  fontFamily: '$system',
  fontSize: 15,
  color: '$foreground',
  backgroundColor: '$gray300',
  boxShadow: `0 0 0 1px $gray400`,
  '&:hover': { boxShadow: `0 0 0 1px $gray600` },
  '&:focus': { boxShadow: `0 0 0 2px ${purpleDark.purple6}` },
  '&::selection': { backgroundColor: '$gray600', color: 'white' },
};

const Input = styled('input', {
  ...inputStyles,
  height: 35,
  lineHeight: 1,
  padding: '0 10px',
});

const Button = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  fontFamily: '$system',
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  width: '100%',
  backgroundColor: `${purpleDark.purple5}`,
  color: 'white',
  boxShadow: `0 2px 10px $gray400`,
  '&:not(:disabled):hover': { backgroundColor: `${purpleDark}` },
  '&:not(:disabled):focus': { boxShadow: `0 0 0 2px black` },
});

export const VideoForm: FC<Props> = ({onSubmitHandler, isProcessing}) => {
  const [videoURL, setVideoURL] = useState<string>("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!videoURL) return;
    onSubmitHandler(videoURL);
  }
return (
  <FormRoot onSubmit={handleSubmit}>
    <FormField name="videoURL">
      <Flex>
        <FormLabel>Video URL</FormLabel>
        <FormMessage match="valueMissing">Video URL nuk mund te jet bosh!</FormMessage>
        <FormMessage match="typeMismatch">Ju lutem fusni nje URL te sakte !</FormMessage>
        <FormMessage match="patternMismatch">Ju lutem fusni nje URL te sakte !</FormMessage>
      </Flex>
      <Control asChild>
        <Input 
            type="url" 
            required 
            name="videoUrl"
            value={videoURL}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setVideoURL(e.target.value)}
            placeholder='https://www.youtube.com/watch?v='
          />
      </Control>
    </FormField>
    <Submit asChild>
      <Button css={{ marginTop: 10 }} disabled={isProcessing}>
          {isProcessing ? 'Vidjo po perkthehet ..' : 'Perkthe'}
        </Button>
    </Submit>
  </FormRoot>
)
};

