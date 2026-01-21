import './HeroMain.css'
import hourglass from './assets/hero/hourglass.png'

function HeroMain(){
    return(
        <>
            <div class="main-content">
                <h1 class="main-title">FON HAKATON 2026</h1>
                <h2 class="secondary-title">Use your &lt;code&gt; to change the =road=</h2>
                <button class="btn-sign-up">
                    <span>PRIJAVI SE!</span>
                <   img src={hourglass} alt='hourglass'/>
                </button>
            </div>
        </>
    );
};

export default HeroMain