import "./ReadingGoal.css";
import {Box, CircularProgress, Typography} from "@mui/material";

type ReadingGoalProps = {
    readBooks: number
    goalDate: string,
    readingGoal: number
}

export default function ReadingGoal({readBooks, goalDate, readingGoal}: ReadingGoalProps) {
    const parsedGoalDate = new Date(goalDate);
    const booksToRead = readingGoal - readBooks;
    return (
        <section className={"reading-goal"}>
            <h3>Reading Goal</h3>
            <Box sx={{position: 'relative', display: 'inline-flex', justifyContent: 'center'}}>
                <div className={"circle"}/>
                <CircularProgress size={200} thickness={10} color="warning" variant={"determinate"}
                                  value={(readBooks / readingGoal) * 100}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="body1" component="div" color="#5b84ea" align={"center"}>
                        <span className="material-symbols-outlined">auto_stories</span>
                        <div className={"highlight"}>{readBooks}/{readingGoal}</div>
                    </Typography>

                </Box>
            </Box>
            <p>You have to read <span className={"highlight"}>{booksToRead >= 0 ? booksToRead : "0"} more {booksToRead != 1 ? "books" : "book"}</span> until <span className={"highlight"}>{parsedGoalDate.toLocaleDateString()}</span> to reach your goal.</p>
        </section>
    )
}