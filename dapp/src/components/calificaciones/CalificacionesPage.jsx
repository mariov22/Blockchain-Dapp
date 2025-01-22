import SoyAlguno from "../permisos/SoyAlguno.jsx";
import SoyAlumno from "../permisos/SoyAlumno.jsx";
import SoyCoordinador from "../permisos/SoyCoordinador.jsx";
import CalificacionesTotal from "./CalificacionesTotal/index.jsx";
import Calificar from "./Calificar.jsx";

const CalificacionesPage = () => {

    return (
        <section className="AppCalificaciones">
            <h2>Calificaciones</h2>
          <SoyAlguno coordinador profesor>
            <CalificacionesTotal/>
          </SoyAlguno>

          <Calificar/>

        </section>
    );
};

export default CalificacionesPage;
/*
return (
        <section className="AppCalificaciones">
            <h2>Calificaciones</h2>

          <SoyAlguno coordinador profesor>
            <CalificacionesTotal/>
          </SoyAlguno>

          <SoyCoordinador>
            <NotasFinales/>
          </SoyCoordinador>

          <Calificar/>

          <SoyAlumno>
            <MisCalificaciones/>
          </SoyAlumno>
        </section>
    );
*/