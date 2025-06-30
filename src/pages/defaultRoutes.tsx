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
import DatasetHomePage from "./App/pages/DatasetDetailed/pages/Home/DatasetHomePage.tsx";
import EditorPage from "./App/pages/EditorPage/EditorPage.tsx";
import DatasetLabelling from "./App/pages/DatasetDetailed/pages/Labelling/DatasetLabelling.tsx";
import FetchLayout from "../component_library/layouts/FetchLayout";
import BatchDetailed from "./App/pages/DatasetDetailed/pages/BatchDetailed/BatchDetailed.tsx";
import DataWorkbench from './App/pages/DatasetDetailed/pages/DataWorkbench/DataWorkbench.tsx';
import UploadFilesPage from './App/pages/DatasetDetailed/pages/UploadFiles/UploadFilesPage.tsx';
import DataWorkbenchDetailed from './App/pages/DatasetDetailed/pages/DataWorkbench/pages/DataWorkbenchDetailed.tsx';
import DataAugmentation from './App/pages/DataAugmentation/DataAugmentation.tsx';
import DataGen from './App/pages/DatasetDetailed/pages/DataGen/DataGen.tsx';
import DatasetsSnapshotsPage from './App/pages/DatasetDetailed/pages/Snapshots/DatasetsSnapshotsPage.tsx';

const OnlyAuthenticated = ({ children }: {children : React.ReactNode}) => {
    const { data, isLoading, isError } = useAuth();
    if (isLoading) return <div>Loading...</div>;
    if (isError || !data?.authenticated) return <Navigate to="/auth"/>
    return <>{children}</>;
};

const NotAuthenticatedOnly = ({ children }: {children : React.ReactNode}) => {
    const { data, isError } = useAuth();
    if (isError || data?.authenticated) return <Navigate to="/app/"/>
    return <>{children}</>;
};

function DefaultRoutes() {

    const {data, status}=useAuth();

    return (
        <FetchLayout status={status}>
            <Routes>
                <Route path="*" element={<Navigate to={!data?.authenticated ? "/auth/" : "/app/"}/>}/>
                <Route path="/auth" element={<NotAuthenticatedOnly><AuthPage/></NotAuthenticatedOnly>}>
                    <Route index element={<SignInPage/>}></Route>
                    <Route path="signup" element={<SignUpPage/>}></Route> </Route>
                <Route path="/app" element={<OnlyAuthenticated><AppPage/></OnlyAuthenticated>}>
                    <Route index element={<Navigate to="datasets"/>} />
                    <Route path="home" element={<HomePage/>}/>
                    <Route path="models" element={<ModelsPage/>}/>
                    <Route path="datasets" element={<DatasetsPage/>}>
                    </Route>
                    <Route path="datasets/:dataset_id/batch/:batch_id" element={<BatchDetailed/>}/>
                    <Route path="datasets/:dataset_id" element={<DatasetDetailedPage/>}>
                        <Route index element={<Navigate to="dataset_general"/>}></Route>
                        <Route path="dataset_general" element={<DatasetHomePage/>}></Route>
                        <Route path="dataset_snapshots" element={<DatasetsSnapshotsPage/>}></Route>
                            <Route path="dataset_configuration" element={<DatasetConfigurationPage/>}></Route>
                        <Route path="dataset_data" element={<DatasetDataPage/>}></Route>
                        <Route path="dataset_generation" element={<DataGen/>}></Route>
                        <Route path="dataset_jobs" element={<DatasetLabelling/>}/>
                        <Route path="dataset_workbench" element={<DataWorkbench/>}>
                        </Route>
                        <Route path="dataset_workbench/:batch_id" element={<DataWorkbenchDetailed/>}/>
                        <Route path="dataset_upload" element={<UploadFilesPage/>}/>
                    </Route>
                    <Route path="configuration" element={<ConfigurationPage/>}>
                    </Route>
                    <Route path="datasets/:dataset_id/dataset_workbench/:batch_id/data_augmentation" element={<OnlyAuthenticated><DataAugmentation/></OnlyAuthenticated>}>
                    </Route>
                </Route>
                <Route path="/app/datasets/:dataset_id/job/:job_id/image/:image_id" element={<OnlyAuthenticated><EditorPage/></OnlyAuthenticated>}>
                </Route>
            </Routes>
        </FetchLayout>
    );
}
export default DefaultRoutes;