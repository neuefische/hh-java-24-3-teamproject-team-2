import "./StarRating.css"

type StarRatingProps = {
    rating: number
}

export default function StarRating(props: Readonly<StarRatingProps>) {

    return(
        <>
            {props.rating}
        </>
    )
}

