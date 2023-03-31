export type Commit = {
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
  sha: string;
  html_url: string;
};
