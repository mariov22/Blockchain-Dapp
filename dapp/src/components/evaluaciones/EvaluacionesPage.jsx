
import SoyCoordinador from "../permisos/SoyCoordinador.jsx";
import EvaluacionesForm from "./EvaluacionesForm.jsx";
import EvaluacionesList from "./EvaluacionesList/index.jsx";

const EvaluacionesPage = () => (
    <section className="AppEvaluaciones">
        <h2>Evaluaciones</h2>

        <EvaluacionesList/>

        <SoyCoordinador>
            <EvaluacionesForm />
        </SoyCoordinador>

    </section>
);

export default EvaluacionesPage;
