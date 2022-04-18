import React from 'react';
import { useFileUpload } from 'use-file-upload';

import styled from 'styled-components';

const Sample = () => {
    const defaultSrc =
    'https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png';

    const [files, selectFiles] = useFileUpload();
    return (
    <div>
        <SImg src={files?.source || defaultSrc} alt="preview" />
        <SDiv>
            <Sbutton
              onClick={() =>
                  selectFiles(
                  { accept: 'image/*' },
                  ({ name, size, source, file }) => {
                      console.log('Files Selected', { name, size, source, file });
                  }
                )
              }
            >
            画像をアップ
            </Sbutton>
        </SDiv>
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
