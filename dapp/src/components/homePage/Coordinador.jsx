
import {useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";    

const Coordinador = () => {

    const {
        data: coordinador
    } = useReadContract({
        ...asignatura,
        functionName: 'coordinador'
    });

    return (
            <p>
                Coordinador: <b>{coordinador}</b>
            </p>
    );
};

export default Coordinador;
