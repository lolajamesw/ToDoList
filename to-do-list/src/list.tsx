import { Square, SquareCheckBig } from 'lucide-react';
import { useState } from 'react';

export type Task = {
    task: string;
    priority: number;
}

export default function TaskList() {
    const [taskList, setTaskList] = useState<Array<Task>>([]);
    const [unusedPriorities, setUnusedPriorities] = useState<Array<number>>([]);
    const [newTask, setNewTask] = useState<string>("");
    const [newPriority, setNewPriority] = useState<number>(1);

    let updatePriorities = (tasks: Array<Task>) => {
        if (tasks.length === 0) {
            setUnusedPriorities([]);
            return;
        }
        let priorities = []
        let task_index = 0;
        let i=1;
        while (i<tasks[tasks.length-1].priority) {
            if (i > tasks[task_index].priority) task_index++;
            else if (i < tasks[task_index].priority) priorities.push(i++);
            else i++;
        }
        console.log(priorities);
        setUnusedPriorities(priorities);
    }

    let addTask = () => {
        let task = { task: newTask, priority: newPriority };
        setNewTask("");
        setNewPriority(newPriority+1);
        let list = [...taskList];
        let i = 0;
        let currTask = task;
        let temp: Task = currTask;
        while (i < list.length) {
            if (currTask.priority < list[i].priority) {
                temp = list[i];
                list[i] = currTask;
                currTask = temp;
            }
            i++;
        }
        list.push(currTask);
        setTaskList(list);
        updatePriorities(list);
    }

    let finishTask = (i: number) => {
        let list = [...taskList];
        for (let j=i; j<list.length-1; j++) {
            list[j] = list[j+1];
        }
        list.pop();
        setTaskList(list);
        updatePriorities(list);
        setNewPriority(list[list.length - 1].priority+1);
    }

    return (
        <div className="flex-1 min-h-0 bg-lime-50 rounded-md p-5 mb-5 shadow-lg flex flex-col justify-between h-full">
            <div className="border-2 border-amber-900 rounded-md p-3 mb-7 flex-1 min-h-0 flex flex-col gap-y-3 overflow-y-auto">
                {taskList.length > 0 ? 
                    taskList.map((task, index) => (
                        <div 
                            className="flex justify-between border border-emerald-950 shadow-md rounded-md p-2 hover:shadow-lg"
                            onClick={() => {finishTask(index)}}
                            >
                            <div className="flex gap-x-2">
                                <div className="group">
                                    <Square className="block group-hover:hidden text-emerald-950"/>
                                    <SquareCheckBig className="hidden group-hover:block text-emerald-800 scale-110"/>
                                </div>
                                <h3 className="font-semibold">{task.task}</h3>
                            </div>
                            <p>{`Priority: ${task.priority}`}</p>
                        </div>
                    )) :
                    <p className="text-amber-900 font-bold mx-auto">You're all done!</p>
                }
            </div>
            <div>
                <div className="flex gap-x-5">
                    <input
                        className="border-b-2 border-amber-900 w-3/4 focus:outline-0 px-2"
                        placeholder="Write your next task here"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <input
                        className="border-b-2 border-amber-900 w-1/10 px-2 focus:outline-0"
                        type="number"
                        min='1'
                        value={newPriority}
                        onChange={(e) => setNewPriority(Number(e.target.value))}
                    />
                    <button
                        className="w-30 bg-amber-900 rounded-md text-white shadow-sm 
                        hover:bg-orange-900 hover:scale-103 active:scale-98 disabled:bg-stone-400 disabled:scale-100"
                        disabled={newTask.length === 0 || newPriority < 1}
                        onClick={addTask}
                        >
                            Add Task
                    </button>
                </div>
                <div className='pt-2 pl-2 text-amber-900 font-medium'>
                    <p>{`Unused Priority values: ${String(unusedPriorities)}`}</p>
                </div>
            </div>
        </div>
    )
}