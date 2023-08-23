import useSWR from 'swr';
import { useAuthContext } from '../Hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function Log() {
  const { user } = useAuthContext();
  const fetcher = (...args) => fetch(...args).then((response) => response.json());
  const { data, error, isLoading } = useSWR('/api/action/Log', fetcher);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <h1 className='text-xl p-2'>Deposit</h1>
      <div className='hidden lg:block '>
        <div className='flex flex-col  justify-center bg-white  text-zinc-700 px-4 py-3 rounded shadow'>
          <div className='lg:flex-row flex'>
            <p className='lg:w-1/3'>Old Amount</p>
            <p className='lg:w-1/3'>New Amount</p>
            <p className='lg:w-1/3'>Date</p>
          </div>
        </div>
      </div>

      {data && data.depositLogs.length > 0 ? (
        data.depositLogs.map((d) => (
          <div
            key={d._id}
            className='  justify-center bg-white text-zinc-700 px-4 py-3 rounded shadow mb-4'
          >
            <div className='lg:flex-row flex flex-col'>
              <p className='lg:hidden font-bold'> Old Amount: </p>
              <p className='lg:w-1/3'>{d.oldAmount}</p>
              <p className='lg:hidden font-bold'> New Amount: </p>
              <p className='lg:w-1/3'>{d.newAmount}</p>
              <p className='lg:hidden font-bold'>Date: </p>
              <p className='lg:w-1/3'>
                {formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className='p-2'>No Log available.</p>
      )}

      <h1 className='text-xl p-2'>Withdraw</h1>
      <div className='hidden lg:block '>
        <div className='flex flex-col  justify-center bg-white  text-zinc-700 px-4 py-3 rounded shadow'>
          <div className='lg:flex-row flex'>
            <p className='lg:w-1/3'>Old Amount</p>
            <p className='lg:w-1/3'>New Amount</p>
            <p className='lg:w-1/3'>Date</p>
          </div>
        </div>
      </div>
      {data && data.withdrawalLogs.length > 0 ? (
        data.withdrawalLogs.map((d) => (
          <div
            key={d._id}
            className=' justify-center bg-white text-zinc-700 px-4 py-3 rounded shadow mb-8'
          >
            <div className='lg:flex-row flex flex-col'>
              <p className='lg:hidden font-bold'> Old Amount: </p>
              <p className='lg:w-1/3'>{d.oldAmount}</p>
              <p className='lg:hidden font-bold'> New Amount: </p>
              <p className='lg:w-1/3'>{d.newAmount}</p>
              <p className='lg:hidden font-bold'>Date: </p>
              <p className='lg:w-1/3'>
                {formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className='p-2'>No Log available.</p>
      )}
    </>
  );
}
