import {useState} from "react";

export default function GoToTopButton() {

    const[visible, setVisible] = useState(false);

    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        setVisible(true);
    }

    const goToTop = () => {
        if(visible) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }

    return (
        <button onClick={() => goToTop()}>&uarr;</button>
    );
}
