import {useState} from "react";

import {useWriteContract, useWaitForTransactionReceipt} from 'wagmi'

import asignatura from "../../Asignatura.json";



const EvaluacionesForm = () => {

    const {data: hash, error, isPending, writeContract} = useWriteContract();

    const {isLoading, isSuccess} =
      useWaitForTransactionReceipt({
          hash,
      });

      async function creaEvaluacion() {
        const fecha = Math.floor(new Date(fechaCreada).getTime() / 1000); // Convertir a UNIX timestamp
        writeContract({
            ...asignatura,
            functionName: 'creaEvaluacion',
            args: [nombre, fecha, parseInt(porcentaje), parseInt(notaMin)],
        });
    }
    

    // Conservar los valores metidos en el formulario
    let [nombre, setNombre] = useState("");
    let [fechaCreada, setFechaCreada] = useState("");
    let [porcentaje, setPorcentaje] = useState("");
    let [notaMin, setNotaMin] = useState("");


    return (<article className="AppMisDatos">
            <h3>Crear Nueva Evaluación</h3>

            <form>
                <p>
                    Nombre de la evaluación  &nbsp;
                    <input key="evaluacion" type="text" name="evaluacion" value={nombre} placeholder="Nombre de la evaluación"
                           onChange={ev => setNombre(ev.target.value)}/>
                </p>
                <p>
                    Fecha:  &nbsp;
                    <input key="fecha" type="date" name="fecha" value={fechaCreada}
                           placeholder="Fecha de la creación"
                           onChange={ev => setFechaCreada(ev.target.value)}/>
                </p>
                <p>
                    Porcentaje:  &nbsp;
                    <input key="porcentaje" type="number" name="porcentaje" value={porcentaje} placeholder="Porcentaje de la evaluación"
                           onChange={ev => setPorcentaje(ev.target.value)}/>
                </p>
                <p>
                    Nota minima(x100):  &nbsp;
                    <input key="notamin" type="number" name="notamin" value={notaMin} placeholder="Nota mínima"
                           onChange={ev => setNotaMin(ev.target.value)}/>
                </p>

                <button key="submit" className="pure-button" type="button"
                        onClick={async ev => {
                            ev.preventDefault();

                            creaEvaluacion();

                            //  const r = await asignatura.methods.califica(alumnoAddr, indexEval, tipo, calificacion).send({from: myAddr});
                            //   setResult(r.status ? 'La transacción fue exitosa.' : 'La transacción falló.');


                        }}>
                    {isPending ? 'Esperando...' : 'Crear Evaluación'}
                </button>
                <p>
                    Última petición = &nbsp;
                    {isLoading && <span>Esperando ...</span>}
                    {isSuccess && <span>Evaluación creada.</span>}
                    {error && <span>Error: {error?.shortMessage || error.message}</span>}
                </p>
            </form>
    </article>);
};

export default EvaluacionesForm;