import HeroMain from "./HeroMain";
import "./Hero.css"

function Hero(){
    return(
        <>
            <div className="hero-main">
                <nav className="nav-placeholder">
                    <h1>NAVIGATION PLACEHOLDER</h1>
                </nav>
                <HeroMain/>
            </div>
        </>
    );
};

export default Hero