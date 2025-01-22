import SoloAbierta from "../permisos/SoloAbierta";
import Coordinador from "./Coordinador";
import Owner from "./Owner";
import CambiarCoordinador from "../coordinador/CambiarCoordinador";
import AsignaturaEstado from "../asignatura/AsignaturaEstado";
import CambiarAsignaturaEstado from "../asignatura/CambiarAsignaturaEstado"

const HomePage = () => {
    return <div>
            <p>Página Home de la Asignatura Full</p>
            <Owner />
            <Coordinador />
            <AsignaturaEstado />
            <SoloAbierta>
                <CambiarCoordinador />
                <CambiarAsignaturaEstado />
            </SoloAbierta>
        </div>
    ;
}

export default HomePage;
