
import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";

const SoyAlguno = (props) => {

    const account = useAccount();

    const {data: owner} = useReadContract({
        ...asignatura,
        functionName: 'owner',
        args: []
    });

    const {data: coordinador} = useReadContract({
        ...asignatura,
        functionName: 'coordinador',
        args: []
    });

    const {data: profesor} = useReadContract({
        ...asignatura,
        functionName: 'datosProfesor',
        args: [account?.address?.toLowerCase()]
    });

    const {data: alumno} = useReadContract({
        ...asignatura,
        functionName: 'datosAlumno',
        args: [account.address?.toLowerCase()]
    });

    let show = false;

    if (props.owner && owner && owner === account.address) {
        show = true;
    } else if (props.coordinador && coordinador && coordinador.toLowerCase() === account.address?.toLowerCase()) {
        show = true;
    } else if (props.profesor && profesor) {
        show = true;
    } else if (props.alumno && alumno && alumno?.[0]) {
        show = true;
    } else if (props.noAlumno && alumno && !alumno?.[0]) {
        show = true;
    }
    return <>
        {show ? props.children : null}
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

export default SoyAlguno;
