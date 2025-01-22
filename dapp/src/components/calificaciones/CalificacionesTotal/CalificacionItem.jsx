import { Link } from 'react-router-dom';
import {useReadContract, useWatchContractEvent} from 'wagmi'
import SoloAbierta from '../../permisos/SoloAbierta';
import asignatura from "../../../Asignatura.json";

const CalificacionItem = ({alumnoAddress, evaluacionIndex}) => {

  const {
    data: nota,
    error,
    isError,
    isPending,
    refetch
  } = useReadContract({
    ...asignatura,
    functionName: 'calificaciones',
    args: [alumnoAddress, evaluacionIndex]
  });

  useWatchContractEvent({
    ...asignatura,
    eventName: 'Calificacion',
    onLogs(logs) {
      for (const log of logs) {
        if (log.args.alumno.toLowerCase() === alumnoAddress.toLowerCase()) {
          refetch();
          return;
        }
      }
    },
  });

  return <td key={"p2-" + alumnoAddress + "-" + evaluacionIndex}>
    {nota?.[0].toString() === "0" ? "" : ""}
    {nota?.[0].toString() === "1" ? "N.P." : ""}
    {nota?.[0].toString() === "2" ? (Number(nota?.[1]) / 100).toFixed(2) : ""}
    <SoloAbierta>
      &nbsp;
      <Link to={`/calificaciones/${alumnoAddress}/${evaluacionIndex}`}>...</Link>
    </SoloAbierta>
  </td>
};

export default CalificacionItem;
