import GetAmount from './GetAmount';
import { useAuthContext } from '../Hooks/useAuthContext';
export default function Dashboard() {
  const { UserId } = useAuthContext();
  return (
    <div>
      <GetAmount />
      <div className='bg-white my-4 text-zinc-700 px-4 py-3 text-xl rounded shadow'>
        <p>Account Number : {UserId} </p>
      </div>
    </div>
  );
}
