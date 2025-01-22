import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import asignatura from '../../Asignatura.json';
import SoyCoordinador from '../permisos/SoyCoordinador';

const CambiarAsignaturaEstado = () => {
    const { data: hash, error, isPending, writeContract } = useWriteContract();
    const { isLoading, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const cambiarAsignaturaEstado = async () => {
        writeContract({
            ...asignatura,
            functionName: 'cerrar',
        });
    };

    return (
        <SoyCoordinador>
            <div>
                <h3>Cerrar Asignatura</h3>
                <button
                    className="pure-button"
                    type="button"
                    onClick={cambiarAsignaturaEstado}
                    disabled={isPending || isLoading}
                >
                    {isPending ? 'Procesando...' : 'Cerrar Asignatura'}
                </button>
                {isLoading && <p>Esperando confirmación de la transacción...</p>}
                {isSuccess && <p>La asignatura ha sido cerrada correctamente.</p>}
                {error && <p>Error: {error?.shortMessage || error.message}</p>}
            </div>
        </SoyCoordinador>
    );
};

export default CambiarAsignaturaEstado;
