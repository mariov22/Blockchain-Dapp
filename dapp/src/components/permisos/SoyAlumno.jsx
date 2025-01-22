
import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

const SoyAlumno = ({children}) => {

    const account = useAccount();

    const {
        data: alumno,
        error,
        isError,
        isPending,
        refetch
    } = useReadContract({
        ...asignatura,
        functionName: 'datosAlumno',
        args: [account.address?.toLowerCase()]
    });

    if (!alumno?.[0]) { 
        return null
    }
    return <>
        {children}
    </>



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

export default SoyAlumno;
