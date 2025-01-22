
import {useReadContract} from 'wagmi'

import {Link} from "react-router-dom";

import asignatura from "../../../Asignatura.json";

const AlumnoRow = ({alumnoIndex}) => {

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

    return <tr key={"ALU-" + alumnoIndex}>
        <th>A<sub>{alumnoIndex}</sub></th>
        <td>{alumnoDatos?.[0]}</td>
        <td>{alumnoDatos?.[1]}</td>
        <td><Link to={`/alumnos/${alumnoAddr}`}>Info</Link></td>
    </tr>;
};

export default AlumnoRow;
