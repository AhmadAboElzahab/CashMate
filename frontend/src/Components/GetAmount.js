import useSWR from 'swr';

export default function GetAmount() {
  const fetcher = (...args) => fetch(...args).then((response) => response.json());
  const { data, error, isLoading } = useSWR('/api/action/amount', fetcher);

  if (isLoading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className='bg-white my-4 text-zinc-700 px-4 py-3 text-xl rounded shadow'>
      <p>{data} $</p>
    </div>
  );
}
