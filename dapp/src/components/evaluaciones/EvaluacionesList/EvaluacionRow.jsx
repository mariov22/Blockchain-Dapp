

import {useReadContract} from 'wagmi'

import asignatura from "../../../Asignatura.json";


const EvaluacionRow = ({evaluacionIndex}) => {

    const {
        data: evaluacion,
        error,
        isError,
        isPending,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'evaluaciones',
        args: [evaluacionIndex]
    });

    return <tr key={"EVA-" + evaluacionIndex}>
        <th>E<sub>{evaluacionIndex}</sub></th>
        <td>{evaluacion?.[0]}</td>
        <td>{evaluacion?.[1] ? (new Date(1000 * Number(evaluacion[1]))).toLocaleString() : ""}</td>
        <td>{evaluacion?.[2]?.toString()}</td>
    </tr>;
};

export default EvaluacionRow;
