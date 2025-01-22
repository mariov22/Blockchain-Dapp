

import {useReadContract, useWatchContractEvent} from 'wagmi'

import asignatura from "../../../Asignatura.json";

import CalificacionItem from "./CalificacionItem.jsx";

const CalificacionRow = ({alumnoIndex}) => {

    const {
        data: alumnoAddr
    } = useReadContract({
        ...asignatura,
        functionName: 'matriculas',
        args: [alumnoIndex]
    });

    const {
        data: alumnoDatos
    } = useReadContract({
        ...asignatura,
        functionName: 'datosAlumno',
        args: [alumnoAddr]
    });

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


    let notas = [];
    for (let ei = 0; ei < evaluacionesLength; ei++) {
        notas.push(<CalificacionItem key={'CI'+alumnoAddr+ei}
                                     alumnoAddress={alumnoAddr}
                                     evaluacionIndex={ei} />);
    }

    return <tr key={"d" + alumnoIndex}>
        <th>A<sub>{alumnoIndex}</sub></th>
        <td>{alumnoDatos?.[0]}</td>
        {notas}
    </tr>;
};

export default CalificacionRow;
