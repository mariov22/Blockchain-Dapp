
import {useState} from "react";

import {useWriteContract, useWaitForTransactionReceipt} from 'wagmi'

import asignatura from "../../Asignatura.json";


import SoyProfesor from "../permisos/SoyProfesor.jsx";


const Calificar = () => {

    const {data: hash, error, isPending, writeContract} = useWriteContract();

    const {isLoading, isSuccess} =
      useWaitForTransactionReceipt({
          hash,
      });

    async function califica() {
        writeContract({
            ...asignatura,
            functionName: 'califica',
            args: [alumnoAddr, indexEval, tipo, calificacion],
        })
    }

    // Conservar los valores metidos en el formulario
    let [alumnoAddr, setAlumnoAddr] = useState("");
    let [indexEval, setEvalIndex] = useState("");
    let [tipo, setTipo] = useState("");
    let [calificacion, setCalificacion] = useState("");


    return (<article className="AppMisDatos">
        <SoyProfesor>
        <h3>Calificar</h3>

<form>
    <p>
        Dirección del Alumno:  &nbsp;
        <input key="alumno" type="text" name="alumno" value={alumnoAddr} placeholder="Dirección del alumno"
               onChange={ev => setAlumnoAddr(ev.target.value)}/>
    </p>
    <p>
        Índice de la Evaluación:  &nbsp;
        <input key="evaluacion" type="number" name="evaluacion" value={indexEval}
               placeholder="Índice de la evaluación"
               onChange={ev => setEvalIndex(ev.target.value)}/>
    </p>
    <p>
        Tipo: (0=Pendiente 1=N.P. 2=Normal):  &nbsp;
        <input key="tipo" type="number" name="tipo" value={tipo} placeholder="Tipo de nota"
               onChange={ev => setTipo(ev.target.value)}/>
    </p>
    <p>
        Nota (x100):  &nbsp;
        <input key="calificacion" type="number" name="calificacion" value={calificacion} placeholder="Nota"
               onChange={ev => setCalificacion(ev.target.value)}/>
    </p>

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

export default Calificar;
