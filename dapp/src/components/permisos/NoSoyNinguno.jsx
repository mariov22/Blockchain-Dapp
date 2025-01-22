import { useAccount, useReadContract } from "wagmi";
import asignatura from "../../Asignatura.json";

const NoSoyNinguno = ({ children }) => {
    const { address } = useAccount(); 

    const normalizedAddress = address?.toLowerCase();

    const { data: owner } = useReadContract({
        ...asignatura,
        functionName: "owner",
        args: [],
    });

    const { data: coordinador } = useReadContract({
        ...asignatura,
        functionName: "coordinador",
        args: [],
    });

    const { data: profesor } = useReadContract({
        ...asignatura,
        functionName: "datosProfesor",
        args: [normalizedAddress],
    });

    const { data: alumno } = useReadContract({
        ...asignatura,
        functionName: "datosAlumno",
        args: [normalizedAddress],
    });

    const show =
        normalizedAddress &&
        (!owner || owner.toLowerCase() !== normalizedAddress) &&
        (!coordinador || coordinador.toLowerCase() !== normalizedAddress) &&
        !profesor &&
        (!alumno || !alumno?.[0]); 

    return <>{show ? children : null}</>;
};

export default NoSoyNinguno;