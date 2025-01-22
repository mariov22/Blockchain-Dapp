import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import asignatura from "../../Asignatura.json"; 
import SoloAbierta from '../permisos/SoloAbierta';

const AlumnosAutomatricula = () => {

  const {data: hash, error, isPending, writeContract} = useWriteContract();

  const {isLoading, isSuccess} =
    useWaitForTransactionReceipt({
        hash,
    });

    async function automatricula() {
      writeContract({
        ...asignatura,
        functionName: 'automatricula',
        args: [nombre, dni, email],
      });
    }

  let { address } = useAccount(); 
  let [nombre, setNombre] = useState('');
  let [dni, setDni] = useState('');
  let [email, setEmail] = useState('');

  return (<article className="AppMisDatos">
    <SoloAbierta>
      <h3>Automatricular alumno</h3>
      <form>
        <p>
          Nombre:  &nbsp;
          <input
            key="nombre"
            type="text" 
            name="nombre"
            id="nombre" 
            value={nombre} 
            placeholder="Nombre del alumno"
            onChange={ev => setNombre(ev.target.value)}  
          />
        </p>
        <p>
          DNI:  &nbsp;
          <input 
            key="dni"
            type="text" 
            name="dni"
            value={dni} 
            placeholder="DNI del alumno"
            onChange={ev => setDni(ev.target.value)} 
          />
        </p>
        <p>
          Email:  &nbsp;
          <input
            key="email"
            type="text" 
            name="email"
            value={email} 
            placeholder="Email del alumno"
            onChange={ev => setEmail(ev.target.value)} 
          />
        </p>
        <button key="submit" className="pure-button" type="button"
                onClick={async ev => {
                    ev.preventDefault();

                    automatricula();
                }}>
              {isPending ? 'Esperando...' : 'Matricularme'}
        </button>
        <p>
          Última petición = &nbsp;
          {isLoading && <span>Esperando ...</span>}
          {isSuccess && <span>Alumno matriculado.</span>}
          {error && <span>Error: {error?.shortMessage || error.message}</span>}
        </p>
      </form>
    </SoloAbierta>
  </article>
  );
};

export default AlumnosAutomatricula;
