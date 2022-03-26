import React from "react";
import styled from "styled-components";
import { Header } from "../../components/header/Header";
import ProfileMain from "./ProfileMain";

const Profile = () => {
    return (
        <SContainer className="Profile">
            <Header />
            <SProfileMain>
            <ProfileMain />
            </SProfileMain>
        </SContainer>
    );
};

export default Profile
const SContainer = styled.div``;

const SProfileMain = styled.div`
  height: 85%;
`;
