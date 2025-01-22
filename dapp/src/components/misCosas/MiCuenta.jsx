
import {useAccount, useBalance} from 'wagmi'

const MiCuenta = () => {

  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

    return (
        <article className="AppMiCuenta">
            <h3>Mi Cuenta</h3>
            <ul>
                <li>Dirección: <span style={{color: "blue"}}>{address}</span></li>
            </ul>
            <ul>
                <li>Balance: <span style={{color: "blue"}}>{balance ? `${balance.formatted} ${balance.symbol}` : "..."}</span></li>
            </ul>
        </article>);
};

export default MiCuenta;
