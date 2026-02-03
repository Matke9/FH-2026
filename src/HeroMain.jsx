import ButtonSignUp from './ButtonSignUp';
import './HeroMain.css'
import fonisLogo from './assets/hero/fonisLogo.png'

function HeroMain(){
    return(
        <>
            <div class="main-content">
                <h1 class="main-title">FON HAKATON 2026</h1>
                <h2 class="secondary-title">Use your &lt;code&gt; to change the =road=</h2>
                <ButtonSignUp/>
                <div class="powered-by">
                    Powered by:
                    <img src={fonisLogo}/>
                </div>
            </div>
        </>
    );
};

export default HeroMain