import { ActivityType } from 'discord.js';

export interface Status {
  name: string;
  type: ActivityType;
}

export const statuses: Status[] = [
  {
    name: 'you suck at Valorant',
    type: ActivityType.Watching
  },
  {
    name: 'ur mum lol',
    type: ActivityType.Playing
  },
  {
    name: 'VALORANT',
    type: ActivityType.Playing
  },
  {
    name: 'your shit gameplay',
    type: ActivityType.Watching
  },
  {
    name: 'you cry',
    type: ActivityType.Listening
  },
  {
    name: 'you bottom frag',
    type: ActivityType.Watching
  },
  {
    name: 'you be hard stuck in gold',
    type: ActivityType.Watching
  }
];
