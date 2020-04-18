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

export const FullPage = styled.div`
  height: 100vh;
`;
