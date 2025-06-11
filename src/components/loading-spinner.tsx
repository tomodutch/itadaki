import { Triangle } from "react-loader-spinner";

export function LoadingSpinner() {
    return (
        <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />)
}