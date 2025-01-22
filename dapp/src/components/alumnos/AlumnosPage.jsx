import SoyAlguno from "../permisos/SoyAlguno.jsx";
import AlumnosList from "./AlumnosList/index.jsx";
import AlumnosAutomatricula from "./AlumnosAutomatricula.jsx";
import NoSoyNinguno from "../permisos/NoSoyNinguno.jsx";

const AlumnosPage = () => (
    <section className="AppAlumnos">
        <h2>Alumnos</h2>
        <SoyAlguno owner coordinador profesor>
            <AlumnosList/>
        </SoyAlguno>
        <h3>Auto Matricula</h3>
        <NoSoyNinguno>
            <AlumnosAutomatricula/>
        </NoSoyNinguno>
    </section>
);

export default AlumnosPage;
