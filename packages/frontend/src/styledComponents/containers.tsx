import styled, { css } from 'styled-components';

const flex = css`
  display: flex;
`;

export const Container = styled.div`
  ${flex};
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ColumnContainer = styled.div`
  ${flex};
  height: 100%;
  flex-direction: column;
  justify-items: center;
  align-content: center;
`;

export const FullPageColor = styled.div`
  height: 100vh;
  width: 100vw;
`;

export const AppContainer = styled.div`
  height: 100vh;
  margin-left: 65px;
`;
