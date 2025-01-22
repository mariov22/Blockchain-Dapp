import {useReadContract, useWatchContractEvent} from 'wagmi'

import asignatura from "../../../Asignatura.json";

import CalificacionRow from "./CalificacionRow.jsx";


const CalificacionesBody = () => {

  const {
    data: matriculasLength,
    error,
    isError,
    isPending,
    refetch
  } = useReadContract({
    ...asignatura,
    functionName: 'matriculasLength'
  });

  useWatchContractEvent({
    ...asignatura,
    eventName: 'MatriculaCreada',
    onLogs(logs) {
      refetch()
    },
  });

  let rows = [];
  for (let i = 0; i < matriculasLength; i++) {
    rows.push(<CalificacionRow key={i} alumnoIndex={i}/>);
  }

  return <tbody>{rows}</tbody>;
};

export default CalificacionesBody;
