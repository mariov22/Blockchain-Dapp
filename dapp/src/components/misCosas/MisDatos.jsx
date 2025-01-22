
import {useAccount, useReadContract} from 'wagmi'

import asignatura from "../../Asignatura.json";


const MisDatos = () => {

    const account = useAccount();

    const {
        data: yoComoAlumno
    } = useReadContract({
      ...asignatura,
        account: account.address,
        functionName: 'quienSoy',
        args: []
    });


    return (
      <article className="AppMisDatos">
          <h3>Mis Datos</h3>
          <ul>
              <li>Nombre: <span style={{color: "blue"}}>{yoComoAlumno?.[0]}</span></li>
              <li>Email: <span style={{color: "blue"}}>{yoComoAlumno?.[1]}</span></li>
          </ul>
      </article>);
};

export default MisDatos;
