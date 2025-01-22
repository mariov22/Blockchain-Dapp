import { useReadContract } from 'wagmi';
import asignatura from '../../Asignatura.json';

const AsignaturaEstado = () => {
    const { data: cerrada, isLoading } = useReadContract({
        ...asignatura,
        functionName: 'cerrada',
    });

    if (isLoading) {
        return <p>Consultando el estado de la asignatura...</p>;
    }

    return (
        <div>
            <p>
                Estado de la Asignatura: &nbsp;
                {cerrada ? 'Cerrada' : 'Abierta'}
            </p>
        </div>
    );
};

export default AsignaturaEstado;
