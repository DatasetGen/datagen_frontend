import Title from "../../../../../../component_library/texts/Title.tsx";
import { useEditorCanvasStore} from "../../core/core.ts";
import EditorSidebarElement from "./EditorSidebarItem.tsx";
import EmptyLabels from '../../../../../../assets/emptyLabels.png'
import Paragraph from "../../../../../../component_library/texts/Paragraph.tsx";



function EditorSidebar() {
    const {annotations} = useEditorCanvasStore()

    return (
        <div className="absolute h-[100vh] right-0 w-[300px] bg-white pt-[65px] z-20 overflow-auto">
            <div className="p-4">
                <Title>
                    Labels
                </Title>
                <div className="grid gap-2 mt-5">
                    {
                        annotations.length < 1 &&
                        <div className="flex flex-col items-center">
                            <img src={EmptyLabels}/>
                            <Paragraph colorSchema="secondary">
                                <span className="text-gray-600 font-semibold mb-2">
                                    No annotations added jet
                                </span>
                            </Paragraph>
                            <Paragraph colorSchema="secondary" size="sm">
                                    Start adding using sidebar tools
                            </Paragraph>
                        </div>
                    }
                    {
                        annotations.map(x => (
                            <EditorSidebarElement key={x.id} annotation={x}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default EditorSidebar;