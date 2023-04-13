import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';
import { transferChildProcessOutput } from '../../utils/shell';
import { log } from 'console';

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  const video_id: string = req.query.video_id as string;
  if (typeof video_id !== 'string') {
    res.status(400).json({ error: 'Invalid Video ID !' });
    return res.end();
  }
  log('Generating transcript ...')
  const cmd = spawn('python3', [
    path.join(process.cwd(), 'scripts/transcribe.py'),
    video_id || ''
  ]);

  transferChildProcessOutput(cmd, res);
}
