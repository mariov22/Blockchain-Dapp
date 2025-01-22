import {useState} from "react";
import {useWriteContract, useWaitForTransactionReceipt} from 'wagmi';
import asignatura from "../../Asignatura.json";
import SoyOwner from "../permisos/SoyOwner.jsx";
import SoloAbierta from "../permisos/SoloAbierta.jsx";

const CambiarCoordinador = () => {

    const {data: hash, error, isPending, writeContract} = useWriteContract();

    const {isLoading, isSuccess} =
      useWaitForTransactionReceipt({
          hash,
      });

    async function setCoordinador() {
        writeContract({
            ...asignatura,
            functionName: 'setCoordinador',
            args: [coordinadorAddr],
        })
    }

    // Conservar los valores metidos en el formulario
    let [coordinadorAddr, setCoordinadorAddr] = useState("");

    return (<article className="AppMisDatos">
        <SoyOwner>
        <SoloAbierta>
            <h3>Cambiar Coordinador</h3>

            <form>
                <p>
                    Dirección del Coordinador:  &nbsp;
                    <input key="coordinador" type="text" name="coordinador" value={coordinadorAddr} placeholder="Dirección del coordinador"
                           onChange={ev => setCoordinadorAddr(ev.target.value)}/>
                </p>

                <button key="submit" className="pure-button" type="button"
                        onClick={async ev => {
                            ev.preventDefault();

                            setCoordinador();

                            //  const r = await asignatura.methods.califica(alumnoAddr, indexEval, tipo, calificacion).send({from: myAddr});
                            //   setResult(r.status ? 'La transacción fue exitosa.' : 'La transacción falló.');


                        }}>
                    {isPending ? 'Esperando...' : 'Cambiar Coordinador'}
                </button>
                <p>
                    Última petición = &nbsp;
                    {isLoading && <span>Esperando ...</span>}
                    {isSuccess && <span>Cambio de coordinador terminado.</span>}
                    {error && <span>Error: {error?.shortMessage || error.message}</span>}
                </p>
            </form>
        </SoloAbierta>  
        </SoyOwner>
    </article>);
};

export default CambiarCoordinador;
