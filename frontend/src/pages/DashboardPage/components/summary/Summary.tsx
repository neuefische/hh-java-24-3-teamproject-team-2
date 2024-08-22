import "./Summary.css";

export default function Summary() {

    const summaryInfo = [
        {
            title: "All",
            numberOfBooks: 13
        },
        {
            title: "To Be Read",
            numberOfBooks: 9
        },
        {
            title: "Reading",
            numberOfBooks: 3
        },
        {
            title: "Read",
            numberOfBooks: 1
        }
    ]

    return (
        <div className={"dashboard-statistics"}>
            {summaryInfo.map(info => (
                <div className={"summary-box"}>
                    <div className={"summary-title"}>
                        <p>{info.title}</p>
                    </div>
                    <div className={"summary-number"}>{info.numberOfBooks}</div>
                </div>
                )
            )}
        </div>
    )
}