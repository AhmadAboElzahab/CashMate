import useSWR from 'swr';
import { useAuthContext } from '../Hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function Transactions() {
  const { user } = useAuthContext();
  const fetcher = (...args) => fetch(...args).then((response) => response.json());
  const { data, error, isLoading } = useSWR('/api/action/transaction', fetcher);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <h1 className='text-4xl'>Transactions</h1>
      <h1 className='text-2xl'>From You</h1>
      <div className='hidden lg:block '>
        <div className='flex flex-col  justify-center bg-white  text-zinc-700 px-4 py-3 text-xl rounded shadow'>
          <div className='lg:flex-row flex'>
            <p className='lg:w-1/3'>To</p>
            <p className='lg:w-1/3'>Amount</p>
            <p className='lg:w-1/3'>Date</p>
          </div>
        </div>
      </div>

      {data && data.transactionsFromUser.length > 0 ? (
        data.transactionsFromUser.map((d) => (
          <div
            key={d._id}
            className='  justify-center bg-white text-zinc-700 px-4 py-3 text-xl rounded shadow'
          >
            <div className='lg:flex-row flex flex-col'>
              <p className='lg:hidden font-bold'> To: </p>
              <p className='lg:w-1/3'>{d.to}</p>
              <p className='lg:hidden font-bold'> Amount: </p>
              <p className='lg:w-1/3'>{d.amount}</p>
              <p className='lg:hidden font-bold'>Date: </p>
              <p className='lg:w-1/3'>
                {formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No transactions available.</p>
      )}

      <h1 className='text-2xl'>To You</h1>
      <div className='hidden lg:block '>
        <div className='flex flex-col  justify-center bg-white  text-zinc-700 px-4 py-3 text-xl rounded shadow'>
          <div className='lg:flex-row flex'>
            <p className='lg:w-1/3'>From</p>
            <p className='lg:w-1/3'>Amount</p>
            <p className='lg:w-1/3'>Date</p>
          </div>
        </div>
      </div>

      {data && data.transactionsToUser.length > 0 ? (
        data.transactionsFromUser.map((d) => (
          <div
            key={d._id}
            className=' justify-center bg-white text-zinc-700 px-4 py-3 text-xl rounded shadow'
          >
            <div className='lg:flex-row flex flex-col'>
              <p className='lg:hidden font-bold'> To: </p>
              <p className='lg:w-1/3'>{d.to}</p>
              <p className='lg:hidden font-bold'> Amount: </p>
              <p className='lg:w-1/3'>{d.amount}</p>
              <p className='lg:hidden font-bold'>Date: </p>
              <p className='lg:w-1/3'>
                {formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No transactions available.</p>
      )}
    </>
  );
}
