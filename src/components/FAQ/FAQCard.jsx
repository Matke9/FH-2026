import "./FAQCard.css";
import cardFront from "../assets/FAQ/FAQKarticaNapred.svg";
import cardBack from "../assets/FAQ/FAQKarticaNazad.svg";

export default function FAQCard({ question, answer, isFlipped, onFlip }) {
  return (
    <div
      className="faq-card-wrapper"
      onClick={(e) => {
        e.stopPropagation();
        onFlip();
      }}
    >
      <div className={`faq-card-inner ${isFlipped ? "flipped" : ""}`}>

        <div className="faq-card-front">
          <img src={cardFront} alt="" className="card-bg" />
          <span className="card-text">{question}</span>
        </div>

        <div className="faq-card-back">
          <img src={cardBack} alt="" className="card-bg" />
          <span className="card-text">{answer}</span>
        </div>

      </div>
    </div>
  );
}