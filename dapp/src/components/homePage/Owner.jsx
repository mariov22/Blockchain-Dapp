
import {useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";    

const Owner = () => {

    const {
        data: owner
    } = useReadContract({
        ...asignatura,
        functionName: 'owner'
    });

    return (
            <p>
                Owner: <b>{owner}</b>
            </p>
    );
};

export default Owner;
