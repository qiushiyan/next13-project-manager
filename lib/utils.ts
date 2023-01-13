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

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
