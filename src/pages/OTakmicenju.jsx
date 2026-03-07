  import React from "react";
  import InfoCard from "../components/Infocard";
  import '../styles/OTakmicenju.css';

  const OTakmicenju = () =>{

    const fonTekstovi = [
      "FON Hakaton je prestižno programersko takmičenje koje pruža jedinstvenu priliku mladim programerima iz zemlje i regiona, uzrasta od 16 do 26 godina, da tokom 24 sata razviju softversko rešenje na zadatu temu i predstave ga stručnom žiriju. Takmičari nisu ograničeni po pitanju tehnologija koje žele da koriste, a takođe mogu samostalno da izaberu kakav tip rešenja žele da kreiraju – veb-sajt, aplikacija, video igrica i slično.",
      "U finalu takmičenja učestvuje najboljih 10 timova, u sastavu od tri ili četiri člana, koji su ostvarili najbolje rezultate tokom procesa selekcije. Tokom izrade rešenja imaju priliku da na stručnim konsultacijama dobiju smernice za kreiranje njihovih rešenja. Nakon isteka 24 sata, timovi sastavljeni od najtalentovanijih mladih programera prezentuju svoja inovativna rešenja, nakon čega žiri bira pobedničke timove.",
      "[Pokrovitelj] je pokrovitelj ovogodišnjeg FON Hakatona. Tema hakatona biće zvanično otkrivena na svečanom otvaranju takmičenja, a učesnici će imati priliku da svoje ideje razvijaju uz podršku mentora."
    ];

    const blockchainTekstovi = [
      "FON Hakaton – Web4 Challenge 2026 pruža studentima priliku da pokažu svoje veštine, kreativnost i viziju u brzo razvijajućem pejzažu Web4 i dubokih tehnologija. Učesnici su pozvani da razviju inovativna i održiva rešenja koja kombinuju nove tehnologije kao što su blokčejn, veštačka inteligencija, IoT, digitalni blizanci, pametni sistemi i decentralizovane infrastrukture, uz predlaganje novih e-poslovnih ekosistema i modela.",
      "Kroz praktičan razvoj projekata, učesnici će steći dragoceno praktično iskustvo u dizajniranju i implementaciji prototipova iz stvarnog sveta, digitalnih proizvoda i tehnološki zasnovanih poslovnih koncepata. U zavisnosti od odabranog izazova, timovi mogu raditi sa pametnim ugovorima, inteligentnom automatizacijom, povezanim uređajima, platformama zasnovanim na podacima ili drugim naprednim tehnologijama i okvirima.",
      "Benefiti za sve učesnike uključuju program mentorstva, mogućnosti umrežavanja sa drugim studentima i celokupnim akademskim okruženjem, praktično iskustvo rada u oblasti dubokih tehnologija, priliku da pokažete svoje znanje i veštine, mogućnost razvoja i lansiranja novih Web4 rešenja, kolaborativno okruženje koje podstiče kreativnost i rešavanje problema, nagrade za prva tri nominovana projekta od strane stručnog žirija, kao i posebne finansijske nagrade i nagrade sponzora za najbolje nominovane projekte iz različitih kategorija."
    ];

    const gameJamTekstovi = [
      "Game Jam je izazov u okviru FON Hakatona gde timovi od tri ili četiri člana imaju priliku da za 24 sata kreiraju video igru na zadatu temu. Tema Game Jam izazova biće otkrivena na brifingu nakon otvaranja takmičenja.",
      "Takmičari nisu ograničeni po pitanju tehnologija i alata koje žele da koriste za izradu igre. Tokom izrade rešenja, timovi imaju priliku da na stručnim konsultacijama dobiju smernice za kreiranje svojih igara.",
      "Nakon isteka 24 sata, timovi prezentuju svoje kreacije stručnom žiriju koji bira pobedničke timove. Pravo učešća imaju svi stariji od 16 i mlađi od 26 godina iz Srbije."
    ];

    return(
      <div className = "stranica-kontejner pt-8 md:pt-32 px-4 md:px-20 flex flex-col items-center">
        <h1 className = "glavni-naslov font-dune text-4xl md:text-7xl mt-10 mb-12 md:mb-48  ">
          O TAKMICENJU
        </h1>

        <div className = "w-full max-w-7xl flex flex-col mt-20">
          {/* Prva kartica - FON HAKATON */}
          <div className="w-full flex justify-start mb-40">
            <InfoCard
              naslovIznad="FON"
              naslovIspod="HAKATON"
              bojaOkvir="fon-hackathon"
              tekstovi={fonTekstovi}
            />
          </div>

          {/* Druga kartica - BLOCKCHAIN CHALLENGE */}
          <div className="w-full flex justify-end mb-40">
            <InfoCard
              naslovIznad="WEB4"
              naslovIspod="CHALLENGE"
              bojaOkvir="blockchain-challenge"
              tekstovi={blockchainTekstovi}
            />
          </div>

          {/* Treća kartica - GAME JAM */}
          <div className="w-full flex justify-start mb-40">
            <InfoCard
              naslovIznad="GAME"
              naslovIspod="JAM"
              bojaOkvir="gamejam"
              tekstovi={gameJamTekstovi}
            />
          </div>
        </div>
      </div>
    );
  };

  export default OTakmicenju;