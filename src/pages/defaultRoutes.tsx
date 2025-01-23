import {Routes, Route, Navigate} from "react-router";
import AuthPage from "./Auth/AuthPage.tsx";
import SignInPage from "./Auth/pages/Signin/SignInPage.tsx";
import SignUpPage from "./Auth/pages/Signup/SignUpPage.tsx";
import DatasetsPage from "./App/pages/Datasets/DatasetsPage.tsx";
import DatasetConfigurationPage from "./App/pages/DatasetDetailed/pages/Configuration/DatasetConfigurationPage.tsx";
import DatasetDataPage from "./App/pages/DatasetDetailed/pages/Data/DatasetDataPage.tsx";
import ConfigurationPage from "./App/pages/Configuration/ConfigurationPage.tsx";
import AppPage from "./App/AppPage.tsx";
import DatasetDetailedPage from "./App/pages/DatasetDetailed/DatasetDetailedPage.tsx";
import HomePage from "./App/pages/Home/HomePage.tsx";
import ModelsPage from "./App/pages/Models/ModelsPage.tsx";

import React from "react";
import {useAuth} from "../api/auth/useAuth.ts";

const OnlyAuthenticated = ({ children }: {children : React.ReactNode}) => {
    const { data, isLoading, isError } = useAuth();
    if (isLoading) return <div>Loading...</div>;
    if (isError || !data?.authenticated) return <Navigate to="/auth"/>
    return <>{children}</>;
};

const NotAuthenticatedOnly = ({ children }: {children : React.ReactNode}) => {
    const { data, isLoading, isError } = useAuth();
    if (isLoading) return <div>Loading...</div>;
    if (isError || data?.authenticated) return <Navigate to="/app/"/>
    return <>{children}</>;
};

function DefaultRoutes() {

    const {data, status}=useAuth();
    if(status === "pending") return <div>Loading...</div>;

    return (
        <Routes>
            <Route path="*" element={<Navigate to={!data?.authenticated ? "/auth/" : "/app/"}/>}/>
            <Route path="/auth" element={<NotAuthenticatedOnly><AuthPage/></NotAuthenticatedOnly>}>
                <Route index element={<SignInPage/>}></Route>
                <Route path="signup" element={<SignUpPage/>}></Route> </Route>
            <Route path="/app" element={<OnlyAuthenticated><AppPage/></OnlyAuthenticated>}>

                <Route index element={<HomePage/>}/>
                <Route path="models" element={<ModelsPage/>}/>
                <Route path="datasets" element={<DatasetsPage/>}>
                    <Route path=":dataset_id" element={<DatasetDetailedPage/>}>
                        <Route path="configuration" element={<DatasetConfigurationPage/>}></Route>
                        <Route index element={<DatasetDataPage/>}></Route>
                    </Route>
                </Route>
                <Route path="configuration" element={<ConfigurationPage/>}>
                </Route>
            </Route>
        </Routes>
    );
}
export default DefaultRoutes;