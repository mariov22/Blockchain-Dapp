
import {useState} from "react";
import { useParams } from "react-router-dom";
import {useWriteContract, useWaitForTransactionReceipt, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";


import SoyProfesor from "../permisos/SoyProfesor.jsx";


const CalificarItem = () => {

    const {alumnoAddress, evalIndex} = useParams();

    const {data: alumnoDatos} = useReadContract({
        ...asignatura,
        functionName: 'datosAlumno',
        args: [alumnoAddress]
    });

    const {data: nota, isPending} = useReadContract({
        ...asignatura,
        functionName: 'calificaciones',
        args: [alumnoAddress, evalIndex]
        });

    if (isPending) {
        return "..."
    }

    return <FormCalificarItem alumnoName={alumnoDatos?.[0]}
                              alumnoAddress={alumnoAddress}
                              evalIndex={evalIndex}
                              nota={nota}/>
};

const FormCalificarItem = ({alumnoName, alumnoAddress, evalIndex, nota}) => {

    const {data: hash, error, isPending, writeContract} = useWriteContract();

    const {isLoading, isSuccess} =
      useWaitForTransactionReceipt({
          hash,
      });

    async function califica() {
        writeContract({
            ...asignatura,
            functionName: 'califica',
            args: [alumnoAddress, evalIndex, tipo, calificacion]
        })
    }

    let [tipo, setTipo] = useState(nota?.[0]);
    let [calificacion, setCalificacion] = useState((Number(nota?.[1]) ?? 0));

    return (<article className="AppMisDatos">
        <SoyProfesor>
        <h3>Calificar E {evalIndex} a {alumnoName}</h3> 

<form>
    <p>
        Dirección del Alumno:  &nbsp; {alumnoAddress}
    </p>
    <p>
        Índice de la Evaluación:  &nbsp; {evalIndex}
    </p>

    <ul>
        <li>
            <input key="k1" type="radio" name="tipo" checked={tipo === 0}
                   onChange={ev => ev.target.value && setTipo(0)}/>
            Borrar
        </li>

        <li>
            <input key="k2" type="radio" name="tipo" checked={tipo === 1}
                   onChange={ev => ev.target.value && setTipo(1)}/>
            N.P.
        </li>

        <li>
            <input key="k3" type="radio" name="tipo" checked={tipo === 2}
                   onChange={ev => ev.target.value && setTipo(2)}/>
            Nota (x100):  &nbsp;
            <input key="normal" type="number" name="calificacion" 
                    value={calificacion} 
                    placeholder="Nota"
                    onChange={ev => void setCalificacion(ev.target.value)}/>
        </li>
    </ul>

    <button key="submit" className="pure-button" type="button"
            onClick={async ev => {
                ev.preventDefault();

                califica();

                //  const r = await asignatura.methods.califica(alumnoAddr, indexEval, tipo, calificacion).send({from: myAddr});
                //   setResult(r.status ? 'La transacción fue exitosa.' : 'La transacción falló.');


            }}>
        {isPending ? 'Esperando...' : 'Calificar'}
    </button>
    <p>
        Última petición = &nbsp;
        {isLoading && <span>Esperando ...</span>}
        {isSuccess && <span>Calificación terminada.</span>}
        {error && <span>Error: {error?.shortMessage || error.message}</span>}
    </p>
</form>
        </SoyProfesor>
    </article>);
};

export default CalificarItem;
