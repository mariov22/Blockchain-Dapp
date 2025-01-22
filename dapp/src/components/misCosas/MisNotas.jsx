import {useReadContracts, useReadContract, useWatchContractEvent, useAccount} from 'wagmi'

import asignatura from "../../Asignatura.json";

import CalificacionItem from "../calificaciones/CalificacionesTotal/CalificacionItem.jsx";

const MisNotas = () =>
    <section className="AppMisNotas">
        <h3>Mis Notas</h3>
        <table>
            <MisNotasHead/>
            <MisNotasBody/>
        </table>
    </section>;

const MisNotasHead = () =>
    <thead>
    <tr>
        <th>Evaluación</th>
        <th>Nota</th>
    </tr>
    </thead>;

const MisNotasBody = () => {

  const account = useAccount();

  const {
    data: evaluacionesLength,
    error,
    isError,
    isPending,
    refetch
  } = useReadContract({
    ...asignatura,
    functionName: 'evaluacionesLength'
  });

  useWatchContractEvent({
    ...asignatura,
    eventName: 'EvaluacionCreada',
    onLogs(logs) {
      refetch()
    },
  });

  const items = [];

  for (let ei = 0; ei < evaluacionesLength; ei++) {
    items.push(<MisNotasItem key={'MNI-'+ei}
                                 alumnoAddress={account?.address}
                                 evaluacionIndex={ei} />);
  }

  return <tbody>{items}</tbody>;
};


const MisNotasItem = ({alumnoAddress, evaluacionIndex}) => {

  const account = useAccount();

  const {
    data,
    error,
    isError,
    isPending,
    refetch
  } = useReadContracts({
    contracts: [
      {...asignatura, functionName: 'evaluaciones', args: [evaluacionIndex]},
      {...asignatura, account: account.address, functionName: 'miNota', args: [evaluacionIndex]}
    ]
  });


  useWatchContractEvent({
    ...asignatura,
    eventName: 'Calificacion',
    onLogs(logs) {
      console.log("*** TODO: Refetch SOLO SI ME AFECTA **");
      console.log(logs);
      refetch()
    },
  });


  const evaluacion = data?.[0].result;
  const nota = data?.[1].result;

  return <tr>
    <td>
      {evaluacion?.[0]}
    </td>
    <td>
      {nota?.[0].toString() === "0" ? "" : ""}
      {nota?.[0].toString() === "1" ? "N.P." : ""}
      {nota?.[0].toString() === "2" ? (Number(nota?.[1]) / 100).toFixed(2) : ""}
    </td>
  </tr>
};

export default MisNotas;
