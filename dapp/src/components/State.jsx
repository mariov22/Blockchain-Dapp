import {useAccount, useConnections, useConnect} from 'wagmi'

import App from './App.jsx';

const ganacheChainId = 1337; // "0x539"; // Ganache: es donde he desplegado el contrato

const State = () => {

  const connections = useConnections()
  const {connectors, connect, status, error, data} = useConnect()
  const account = useAccount();

  // console.log('*** ACCOUNT =', account.address);

  // Comprobar que hay algun conector.
  if (!connectors.length) {
    return (<main><h1>⚠️ Instale MetaMask.</h1></main>);
  }

  // Conectarse
  if (!connections.length) {
    return (
      <main>
        <h2>Conectarse</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({connector}, {onSuccess: () => console.log("Conectado")})}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>Status: {status}</div>
        <div>chainId: {data?.chainId}</div>
        <div>Error: {error?.message}</div>
      </main>
    );
  }


  if (account.chainId !== ganacheChainId) {
    return (<main><h1>⚠️ Conéctese a la red Ganache Chain</h1></main>);
  }

  return (
    <App/>
  );
};

export default State;