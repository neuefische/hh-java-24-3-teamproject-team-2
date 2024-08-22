import "./Summary.css";
import {Book, SummaryInfo} from "../../../../types/types.ts";
import {getSizeOfData} from "../../../../utils/utilFunctions.ts";

type SummaryProps = {
    data: Book[]
}

export default function Summary({data}: SummaryProps) {

    const summaryInfo: SummaryInfo[] = [
        {
            title: "All",
            numberOfBooks: data.length
        },
        {
            title: "To Be Read",
            numberOfBooks: getSizeOfData(data, "TO_BE_READ")
        },
        {
            title: "Reading",
            numberOfBooks: getSizeOfData(data, "READING")
        },
        {
            title: "Read",
            numberOfBooks: getSizeOfData(data, "READ")
        }
    ]

    return (
        <div className={"dashboard-statistics"}>
            <h2 className={"section-title"}>Current Library Info</h2>
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