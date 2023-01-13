export const errToString = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message;
  } else {
    return String(err);
  }
};

export const delay = (time: number) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(1);
    }, time)
  );
};
