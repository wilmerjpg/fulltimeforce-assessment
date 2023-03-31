import React from 'react';
import dayjs from 'dayjs';
import { CommitType } from '../../types';

type CommitDetail = {
  record: CommitType;
};

const CommitDetail = (props: CommitDetail) => {
  const { record } = props;
  const { commit, sha, html_url } = record;
  const {
    author: { name, date },
    message,
  } = commit;
  const shorterSHA = sha.slice(0, 7);
  const formattedDate = dayjs(date).format('MMM DD, YYYY');

  const handleCopyToClipboard = (): void => {
    navigator.clipboard.writeText(sha);
  };

  return (
    <div className="flex flex-wrap w-full my-0.5 border border-blue-300 overflow-wrapper rounded-xl bg-slate-50">
      <div className="px-6 py-4 grow">
        <a
          href={html_url}
          target="_blank"
          className="text-base font-bold text-blue-800"
          rel="noreferrer"
        >
          {message}
        </a>

        <p className="text-base text-gray-700">
          <span className="font-bold">{name} </span>
          <span className="">committed </span>
          {formattedDate}
        </p>
      </div>
      <div className="flex items-center px-6 py-4">
        <button
          type="button"
          className="inline-flex items-center px-2 py-1 mr-2 text-xs font-medium text-center text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
          onClick={handleCopyToClipboard}
        >
          Copy
        </button>
        <a
          href={html_url}
          target="_blank"
          className="w-24 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          rel="noreferrer"
        >
          {shorterSHA}
        </a>
      </div>
    </div>
  );
};

export default React.memo(CommitDetail);
