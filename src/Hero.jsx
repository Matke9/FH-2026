import HeroMain from "./HeroMain";
import "./Hero.css"

function Hero(){
    return(
        <>
            <div class="hero-main">
                    <nav style={{
                        width:'100%',
                        height: '100px',
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        <h1>NAVIGATION PLACEHOLDER</h1>
                    </nav>
                    <HeroMain/>
            </div>
        </>
    );
};

export default Hero