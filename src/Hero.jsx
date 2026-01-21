import HeroMain from "./HeroMain";

function Hero(){
    return(
        <>
            <nav style={{
                width:'100%',
                height: '100px',
                backgroundColor: '#2e2d2d',
                color: 'white',
                textAlign: 'center'
            }}>
                <h1>NAVIGATION PLACEHOLDER</h1>
            </nav>
            <HeroMain/>
        </>
    );
};

export default Hero