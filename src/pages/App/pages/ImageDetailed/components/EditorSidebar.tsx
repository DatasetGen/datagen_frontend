import Title from "../../../../../component_library/texts/Title.tsx";

function EditorSidebar() {
    return (
        <div className="absolute h-[100vh] right-0 w-[260px] bg-white pt-[65px] z-20">
            <div className="p-4">
                <Title>
                    Labels
                </Title>
            </div>
        </div>
    )
}

export default EditorSidebar;