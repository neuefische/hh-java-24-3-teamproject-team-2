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
            <p className={"greeting-message"}>Current Library Info</p>
            <div className={"summary-box-container"}>
                {summaryInfo.map(info => (
                    <div className={"summary-box"}>
                        <div className={"summary-number"}>
                            <p>{info.numberOfBooks}</p>
                        </div>
                        <div className={"summary-title"}>{info.title}</div>
                    </div>
                    )
                )}
            </div>
        </div>
    )
}