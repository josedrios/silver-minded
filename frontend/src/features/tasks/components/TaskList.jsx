import Button from "../../../components/UI/Buttons"
import { FilterIcon } from "../../../components/UI/Icons"

export default function TaskList() {
    return (
        <div className="task-list">
            <div className="task-list-header">
                <p>/TASKS</p>
                <Button squared={true} variant="gray">
                    <FilterIcon />
                </Button>
            </div>
        </div>
    )
}