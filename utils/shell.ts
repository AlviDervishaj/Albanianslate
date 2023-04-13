import { ChildProcessWithoutNullStreams } from "child_process";
import { NextApiResponse } from "next";

export function transferChildProcessOutput(
  cmd: ChildProcessWithoutNullStreams,
  res: NextApiResponse
){
  cmd.on('close', (code: number | null) => {
    console.log('FINISHED.\nCODE : ', code)
  });

  cmd.stderr.on('data', (chunk) => {
    const chunkString = chunk.toString('utf-8');
    console.log('ERROR : ', chunkString);
    res.write(chunkString.split('\n')
      .map((line: string) => '[ERROR] ' + line)
      .join('\n'))
  })

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'no-cache',
    'Content-Encoding': 'none'
  })

  cmd.stdout.pipe(res);
}
