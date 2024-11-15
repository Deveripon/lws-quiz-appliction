import { useRouteError } from "react-router-dom";

const NotFoundPage = () => {
    const error = useRouteError();
    console.error(error);

    return <div>404 Not Found</div>;
};

export default NotFoundPage;
