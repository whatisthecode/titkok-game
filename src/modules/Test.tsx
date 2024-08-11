
const Test = () => {
    return <div className="w-dvw min-h-dvh relative overflow-hidden">
        <iframe src={`/?version=${new Date()}`} className="w-dvw h-[200vh]"></iframe>
    </div>
}

export default Test;