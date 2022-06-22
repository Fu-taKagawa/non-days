import React from 'react';
import { useState } from 'react';


import styled from 'styled-components';

const Sample = () => {
    const defaultSrc =
    'https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png';

    return (
    <div>
        <div>
          <label htmlFor="avatar">ユーザー画像</label>
          <input
            type="file"
            name="avatar"
            id="avatar"
          />
        </div>
    </div>
    );
};

const SImg = styled.img`
  width: 100px;
  padding: 1em;
`;

const SDiv = styled.div`
  text-align: center;
`;

const Sbutton = styled.button`
  :hover {
    cursor: pointer;
  }
`;

export default Sample;
