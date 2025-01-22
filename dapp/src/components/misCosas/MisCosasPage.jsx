import MiCuenta from "./MiCuenta.jsx";
import MisDatos from "./MisDatos.jsx";
import MisNotas from "./MisNotas.jsx";
import SoyAlumno from "../permisos/SoyAlumno.jsx";
import MisRoles from "./MisRoles.jsx";

const MisCosasPage = () => {

    return <section className="AppMisCosas">
        <h2>Mis Cosas</h2>
        <MisRoles/>
        <MiCuenta/>

        <SoyAlumno>
            <MisDatos/>
            <MisNotas/>
        </SoyAlumno>

    </section>;
}

export default MisCosasPage;

