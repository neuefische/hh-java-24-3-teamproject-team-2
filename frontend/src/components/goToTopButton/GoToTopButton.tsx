import {useState} from "react";
import "./GoToTopButton.css"

export default function GoToTopButton() {

    const[visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;

        if (scrolled > 2) {
            setVisible(true)
        } else if (scrolled <= 2) {
            setVisible(false)
        }
    };

    const scrollToTop =  () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div className="goToTop-Button-container">
            {visible && <button className="goToTop-Button" onClick={scrollToTop}>&uarr;</button>}
        </div>
    );
}
