type ProgressCallback = (output: string) => void;

export const extractVideoIdFromURL = (videoUrl: string) => {
  return new URL(videoUrl).searchParams.get('v');
}

export const processVideo = async (
  videoId: string,
  callback: ProgressCallback,
): Promise<string | false> => {
  callback(`\n[ INFO ] Duke shkarkuar audion e vidjos me ID : ${videoId}\n`);
  await downloadAudio(videoId, callback);
  callback('\n[ INFO ] Duke gjeneruar transkriptin e audios.\n');
  callback('[ INFO ] Mund te vonohet gjenerimi deri ne 30 sekonda ...\n');
  const srt = await transcribe(videoId, callback);
  if(srt){
    callback('\n[ INFO ] Duke perkthyer tekstin .\n')
    const result = await translate(srt, callback);
    callback('\n[ INFO ] Teksti u perkthye .\n');
    return result
  }

  return false;
}

export const translate = async (
  srtData: string,
  onProgress: ProgressCallback
): Promise<string | false> => {
  const response: Response = await fetch(
    '/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      },
      body: srtData,
    }
  )
  const reader = response.body?.getReader(); 
  if(reader) { 
    const result = await streamResponse(reader, onProgress);
    return result.split('\n').filter((line) => {
      return !line.startsWith('[Error]')
    }).join('\n')
  }
  else return false;
}
export const transcribe = async (
  videoId: string,
  onProgress: ProgressCallback
): Promise<string | false> => {
  const response: Response = await fetch(`/api/transcript?${new URLSearchParams({ video_id: videoId })}`, {})
  const reader = response.body?.getReader(); 
  if(reader) return streamResponse(reader, onProgress);
  else return false;
}

export const downloadAudio = async (
  videoId: string,
  onProgress: ProgressCallback,
) => {
  const result: Response = await fetch(
    `/api/audio?${new URLSearchParams({
      video_id: videoId
    })}`,
    {}
  );
  const reader = result.body?.getReader();
  if (reader) {
    return streamResponse(reader, onProgress);
  }
  else {
    return false;
  }
}

export const streamResponse = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onProgress: (output: string) => void,
): Promise<string> => {
  return new Promise(resolve => {
    const decoder: TextDecoder = new TextDecoder();
    let result = '';
    const readChunk = ({
      done,
      value
    }: ReadableStreamReadResult<Uint8Array>) => {
      if (done) {
        resolve(result);
        return;
      }

      const output = decoder.decode(value);
      result += output;
      onProgress(output);
      reader.read().then(readChunk);
    }
    reader.read().then(readChunk);
  });
}

