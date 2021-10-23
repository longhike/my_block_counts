import { useHistory } from "react-router-dom"

type TBackButtonProps = {
    prev: string;
}

const BackButton = ({prev}:TBackButtonProps) => {
    const history = useHistory();
    return (
        <div className={"previous"} onClick={() => history.push(`/${prev}`)}>
            &#8249;
        </div>
    )
}

export default BackButton;