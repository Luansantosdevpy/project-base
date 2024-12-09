const buildErrorMessage = (msg: string, details?: unknown): string => {
  return `${msg} ${details ? JSON.stringify(details) : ''}`.trim();
};

export default class NotFoundError extends Error {
  constructor(msg: string, details?: unknown) {
    super(buildErrorMessage(msg, details));

    this.details = details;
  }

  details: unknown;
}
