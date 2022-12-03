import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import FooterComponent from "../../components/footer";
import HeadComponent from "../../components/head";
import HeaderComponent from "../../components/header";
import MainComponent from "../../components/main";
import { AuthContext } from "../../contexts/AuthContext";
import { parseCookies } from 'nookies';
import { getAPIClient } from "../../services/axios";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // api.get('/profile');
    }, [])

    return (
        <>
            <HeadComponent title="Dashboard" description="dashboard smartvaga" />

            <HeaderComponent>
                <span>{user?.name}</span>
            </HeaderComponent>

            <MainComponent hideFooter={false}>
                <h1>Dashboard...</h1>
            </MainComponent>

            <FooterComponent />
        </>
    );
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getAPIClient(ctx);
    const { 'smartvaga.token': token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    await apiClient.get('/profile');

    return {
        props: {}
    }
}