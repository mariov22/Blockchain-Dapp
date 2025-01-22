
import {useReadContract, useWatchContractEvent} from 'wagmi'

import EvaluacionRow from "./EvaluacionRow.jsx";

import asignatura from "../../../Asignatura.json";


const EvaluacionesBody = () => {

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

    let rows = [];
    for (let i = 0; i < evaluacionesLength; i++) {
        rows.push(<EvaluacionRow key={i} evaluacionIndex={i}/>);
    }
    return <tbody>{rows}</tbody>;
};

export default EvaluacionesBody;
