import { levels } from './loggerConfig';

export const consoleMessageFormatter = (info: any): string => {
  let meta = '';

  if (info.metadata && Object.keys(info.metadata).length > 0) {
    meta = ` => ${JSON.stringify(info.metadata)}`;
  }

  return `[${info.level}] ${info.timestamp || ''} -> ${String(info.message)}${meta}`;
};

export const cloudWatchMessageFormatter = (info: any): string => {
  return `[${info.level.toUpperCase()}] ${info.timestamp || ''} ${JSON.stringify({
    pid: process.pid,
    level: levels[info.level as keyof typeof levels],
    timestamp: info.timestamp ? new Date(info.timestamp).getTime() : undefined,
    message: String(info.message),
    _log_type: 'application',
    extraInfo: {
      ...info.metadata
    }
  })}`;
};
