import "./ButtonSignUp.css"
import hourglass from '../../assets/hero/hourglass.png'
import {Link} from "react-router-dom";

function ButtonSignUp(){
    return (
        <Link className="btn-sign-up" to={"/prijava"}>
            <span>PRIJAVI SE!</span>
            <img src={hourglass} alt='hourglass'/>
        </Link>
    );
}

export default ButtonSignUp;