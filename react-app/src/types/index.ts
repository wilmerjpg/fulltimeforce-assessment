export type CommitType = {
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

export type Pagination = {
  page: number;
  pageSize: number;
};
