import "./ButtonSignUp.css"
import hourglass from '../../assets/hero/hourglass.png'

function ButtonSignUp(){
    return (
        <button className="btn-sign-up">
            <span>PRIJAVI SE!</span>
            <img src={hourglass} alt='hourglass'/>
        </button>
    );
}

export default ButtonSignUp;