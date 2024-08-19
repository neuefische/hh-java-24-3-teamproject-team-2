import "./StarRating.css"
import {Rating} from "@mui/material";
import {Dispatch, SetStateAction} from "react";

type BookRatingProps = {
    editable: boolean
    ratingValue: number | null
    setRatingValue: Dispatch<SetStateAction<number | null>>
}

export default function StarRating(props: Readonly<BookRatingProps>) {

    return(
        <div className={"rating-container"}>
            <p>Rating:</p>
            <Rating name={"Rating"}
                    size={"large"}
                    value={props.ratingValue}
                    onChange={(_event, newValue) => {props.setRatingValue(newValue)}}
                    readOnly={!props.editable}

            />
        </div>
    )

}

