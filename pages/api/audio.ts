import type {NextApiRequest, NextApiResponse} from 'next';
import {spawn} from 'child_process';
import path from 'path';
import { transferChildProcessOutput } from '../../utils/shell';

export default function GET(req: NextApiRequest, res: NextApiResponse){
  const video_id: string = req.query.video_id as string;
  if(typeof video_id !== 'string'){
    res.status(400).json({error: 'Invalid Video ID !'});
    return res.end();
  }
  const cmd = spawn(path.join(process.cwd(), 'scripts/download-audio.sh'), [
    video_id || ''
  ]);

  transferChildProcessOutput(cmd, res);
}
