import {Dataset} from "../types";

interface DatasetCardProps {
    dataset: Dataset
}

function DatasetCard({dataset}: DatasetCardProps) {
    return (
        <div>
            {dataset.name}
        </div>
    );
}

export default DatasetCard;