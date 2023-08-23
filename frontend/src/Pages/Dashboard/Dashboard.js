import GetAmount from '../../Components/GetAmount';
import Log from '../../Components/Log';
import Transactions from '../../Components/Transactions';
import { useAuthContext } from '../../Hooks/useAuthContext';
export default function Dashboard() {
  const { UserId } = useAuthContext();
  return (
    <div className='overflow-auto'>
      <GetAmount />
      <div className='bg-white my-4 text-zinc-700 px-4 py-3 text-xl rounded shadow'>
        <p>Account Number : {UserId} </p>
      </div>
      <Transactions />
      <Log />
    </div>
  );
}
