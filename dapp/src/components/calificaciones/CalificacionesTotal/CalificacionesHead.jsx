
import {useReadContract, useWatchContractEvent} from 'wagmi'

import asignatura from "../../../Asignatura.json";

const CalificacionesHead = () => {

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

    let thead = [];
    thead.push(<th key={"chae"}>A-E</th>);
    thead.push(<th key={"chn"}>Nombre</th>);

    for (let i = 0; i < evaluacionesLength; i++) {
       thead.push(<th key={"chev-" + i}>E<sub>{i}</sub></th>);
    }

    return <thead><tr>{thead}</tr></thead>;
};

export default CalificacionesHead;
