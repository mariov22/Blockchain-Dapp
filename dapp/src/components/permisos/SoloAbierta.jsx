
import {useAccount, useReadContract, useWatchContractEvent} from 'wagmi'

import asignatura from "../../Asignatura.json";

const SoloAbierta = ({children}) => {

    const account = useAccount();

    const {
        data: cerrada,
        error,
        isError,
        isPending,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'cerrada',
    });

    useWatchContractEvent({
        ...asignatura,
        eventName: 'AsignaturaCerrada',
        onLogs(logs) {
            refetch();
        }
    });

    if (cerrada == false) {
        return <>
            {children}
        </>
    }

    return null;



/*

    const {asignatura, myAddr} = useContext(StateContext);

    const [soyAlumno, setSoyAlumno] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const datos = await asignatura.methods.datosAlumno(myAddr).call();
                setSoyAlumno(datos.nombre);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);   // [] -> Sin dependencias. Solo se llama a useEffect una vez.

    if (!soyAlumno) {
        return null
    }
    return <>
        {children}
    </>


 */
};

export default SoloAbierta;
