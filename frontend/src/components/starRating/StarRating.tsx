import "./StarRating.css"

type StarRatingProps = {
    rating: number
}

export default function StarRating(props: StarRatingProps) {

    return(
        <>
            {props.rating}
        </>
    )
}

