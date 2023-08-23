import useSWR from 'swr';
import { useAuthContext } from '../Hooks/useAuthContext';
export default function Transactions() {
  const { user } = useAuthContext();
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
      <p>Transactions</p>

      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
          </tr>
        </thead>
        
      </table>
    </div>
  );
}
