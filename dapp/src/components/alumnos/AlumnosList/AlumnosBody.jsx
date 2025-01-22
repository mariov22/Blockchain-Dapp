
import {useReadContract, useWatchContractEvent} from 'wagmi'

import AlumnoRow from "./AlumnoRow.jsx";

import asignatura from "../../../Asignatura.json";

const AlumnosBody = () => {

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
       rows.push(<AlumnoRow key={"ab-"+i} alumnoIndex={i}/>);
    }

    return <tbody>{rows}</tbody>;
};

export default AlumnosBody;
