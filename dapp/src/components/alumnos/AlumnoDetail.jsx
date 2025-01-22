
import {useReadContract} from 'wagmi'

import {useParams, Link} from "react-router-dom";

import asignatura from "../../Asignatura.json";


const AlumnoDetail = () => {

    let {addr} = useParams();

    const {
        data: alumnoDatos
    } = useReadContract({
        ...asignatura,
        functionName: 'datosAlumno',
        args: [addr]
    });

    return <>
        <header className="AppAlumno">
            <h2>Alumno Info</h2>
        </header>
        <ul>
            <li><b>Nombre:</b> {alumnoDatos?.[0] ?? "Desconocido"}</li>
            <li><b>Email:</b> {alumnoDatos?.[1] ?? "Desconocido"}</li>
            <li><b>Address:</b> {addr}</li>
        </ul>
        <Link to="/alumnos">Volver</Link>
    </>
};

export default AlumnoDetail;