export const Tile = ({text, isDone, updateDone, remove}) => {
    return (
        <div style={{
            height: "50px", 
            width: "100%", 
            backgroundColor: "teal", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            padding: "0 10px"
        }}>
            <div style={{display: "flex", alignItems: "center", gap: "3px"}}>
                <input checked={isDone} onChange={(e)=>updateDone()} type="checkbox" style={{width: "20px", height: "20px", cursor: "pointer"}} />
                <span>{text}</span>
            </div>
            <span onClick={remove} style={{color: "red", cursor: "pointer"}}>X</span>
        </div>
    )
}