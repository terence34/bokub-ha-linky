import { readFileSync } from 'fs';

export type UserConfig = {
  consumption?: {
    prm: string;
    token: string;
    name: string;
    action: 'sync' | 'reset';
  };
};

export function getUserConfig(): UserConfig {
  try {
    const parsed: {
      'consumption PRM'?: string;
      'consumption token'?: string;
      'consumption name'?: string;
      'consumption action'?: string;
    } = JSON.parse(readFileSync('/data/options.json', 'utf8'));

    return {
      consumption:
        parsed['consumption PRM'] && parsed['consumption token']
          ? {
              prm: parsed['consumption PRM'],
              token: parsed['consumption token'],
              name: parsed['consumption name'] || 'Linky consumption',
              action: parsed['consumption action'] === 'reset' ? 'reset' : 'sync',
            }
          : undefined,
    };
  } catch (e) {
    throw new Error('Cannot read user configuration: ' + e.toString());
  }
}
