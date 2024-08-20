import "./StarRating.css"
import {Rating} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React, {Dispatch, SetStateAction} from "react";

type BookRatingProps = {
    editable: boolean
    ratingValue: number | null
    setRatingValue?: Dispatch<SetStateAction<number | null>>
    size: "large" | "medium" | "small"
}

export default function StarRating(props: Readonly<BookRatingProps>) {

   const setRating = (_event: React.SyntheticEvent, newValue: number | null) => {
       if(props.setRatingValue) {
           props.setRatingValue(newValue)
       }
   }

    return(
        <div className={"rating-container"}>
            <Rating name={"rating"}
                    size={props.size}
                    value={props.ratingValue}
                    onChange={setRating}
                    readOnly={!props.editable}
                    emptyIcon={ <StarBorderIcon fontSize="inherit" style={{color: 'white'}}/>}
            />
        </div>
    )
}

