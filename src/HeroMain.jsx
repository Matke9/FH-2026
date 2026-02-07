import ButtonSignUp from './ButtonSignUp';
import './HeroMain.css'
import fonisLogo from './assets/hero/fonisLogo.png'

function HeroMain(){
    return(
        <>
            <div class="main-content">
                <h1 class="main-title">
                    <span>FON </span>
                    <span>HAKATON </span>
                    <span>2026</span>
                </h1>
                <h2 class="secondary-title">
                    <span>Use your &lt;code&gt; to change </span>
                    <span>the =road=</span> 
                </h2>
                <ButtonSignUp/>
                <div class="powered-by">
                    Powered by:<br/>
                    <img src={fonisLogo}/>
                </div>
            </div>
        </>
    );
};

export default HeroMain