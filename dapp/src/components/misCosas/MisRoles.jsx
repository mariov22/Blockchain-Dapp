import SoyOwner from "../permisos/SoyOwner";
import SoyCoordinador from "../permisos/SoyCoordinador";
import SoyProfesor from "../permisos/SoyProfesor";
import SoyAlumno from "../permisos/SoyAlumno";
import NoSoyAlumno from "../permisos/NoSoyAlumno";
import NoSoyNinguno from "../permisos/NoSoyNinguno";

const MisRoles = () => {
    return (
        <article className="AppMisRoles">
            <h3>Mis Roles</h3>
            <ul>
                <SoyOwner>
                    <li>Soy Owner</li>
                </SoyOwner>
                <SoyCoordinador>
                    <li>Soy Coordinador</li>
                </SoyCoordinador>
                <SoyProfesor>
                    <li>Soy Profesor</li>
                </SoyProfesor>
                <SoyAlumno>
                    <li>Soy Alumno</li>
                </SoyAlumno>
                <NoSoyAlumno>
                    <li>No soy Alumno</li>
                </NoSoyAlumno>
                <NoSoyNinguno>
                    <li>No soy ninguno</li>
                </NoSoyNinguno>
            </ul>
        </article>
    );
};

export default MisRoles;