import TextField from "../../../components/form/TextFields";
import Button from "../../../components/UI/Buttons";
import { TrashIcon, PlusIcon, PenIcon } from "../../../components/UI/Icons";

export default function TaskForm() {
    return (
        <form className="task-form">
            <TextField 
                beforeText="CREATE/"
                placeholder="TASK"
            />
            <Button squared={true}>
                <PlusIcon />
            </Button>
            <Button squared={true} variant="error">
                <TrashIcon />
            </Button>
        </form>
    )
}