import TaskList from './list'

function App() {
    console.log("Hello")
  return (
    <div className="mx-auto w-screen h-screen flex flex-col bg-emerald-950 px-5 items-center">
      <h1 className='mx-auto my-5 text-4xl font-bold text-green-400'>To Do List</h1>
      <TaskList />
    </div>
  )
}

export default App