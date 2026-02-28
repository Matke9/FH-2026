const navItems = [
  { label: "O TAKMIČANJU", href: "#o-takmicenju" },
  { label: "AGENDA", href: "#agenda" },
  { label: "NAGRADE", href: "#nagrade" },
  { label: "ISKUSTVA", href: "#iskustva" },
  { label: "FAQ", href: "#faq" },
  { label: "ORGANIZACIONI TIM", href: "#tim" },
  { label: "PARTNERI", href: "#partneri" },
  { label: "PRAVILNIK", href: "#pravilnik" },
];
import logo from "../../assets/NavBar/logo.png";


export default  function NavBar(){
    return(
    <header>
        <div className="">
            <a href="/" className="flex items-center gap-2">
            
            <img
              src={logo}
              alt="FON hakaton"
              className="h-9 w-auto"
            />
          </a>


            
            <nav className="">
                {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className=""
                >
                {item.label}
                </a>
                ))}

                <a
                 href="#prijava"
              className=""
                >
                 PRIJAVI SE!
                 </a>
            </nav>
        </div>
    </header>
    )
}