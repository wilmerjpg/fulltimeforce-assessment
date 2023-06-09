import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BackendAPI } from '../../api';
import { CommitType, Pagination } from '../../types';
import CommitDetail from '../CommitDetail';
import LoadMore from '../LoadMore';
import 'react-toastify/dist/ReactToastify.css';

const backendAPI = new BackendAPI();

export default function CommitsList() {
  const [commits, setCommits] = useState<CommitType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 5,
  });
  const [pendingCommits, setPendingCommits] = useState<boolean>(true);

  const handleClickLoadMore = () => {
    setPagination((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleErrorNotification = (errorMessage: string): void => {
    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await backendAPI.getCommits({
          signal: controller.signal,
          params: {
            ...pagination,
          },
        });

        if (response.length === 0 || response.length < pagination.pageSize) {
          setPendingCommits(false);
        } else {
          const updatedCommits = [...commits, ...response];
          setCommits(updatedCommits);
        }
      } catch (e) {
        let messageError = e;
        if (typeof e === 'object' && e !== null && 'message' in e) {
          messageError = e.message;
        }

        if (messageError !== 'canceled') {
          handleErrorNotification(messageError as string);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [pagination]);

  return (
    <div className="flex flex-col items-center border-collapse">
      <p className="mb-5 text-4xl font-bold">Commits List</p>
      {commits.map((record) => (
        <CommitDetail key={record.sha} record={record} />
      ))}
      {pendingCommits ? (
        <LoadMore isLoading={isLoading} onClick={handleClickLoadMore} />
      ) : (
        <p className="m-5 text-xl text-red-500">
          There are no more commits to be loaded
        </p>
      )}
      <ToastContainer />
    </div>
  );
}
