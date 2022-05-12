import styled, { css, keyframes } from 'styled-components';

const lightBlue = '#eaf6fa';
const gray200 = '#fafafa';
const gray300 = '#e9eced';

const smallGap = 8;
const headerHeight = 30;
const lineHeight = smallGap * 2;

const fading = keyframes`
  from {
    background-color: ${lightBlue};
  }
  to {
    background-color: white;
  }
`;

const fadingAnimation = css`
  ${fading} 1s linear;
`;

export const Container = styled.div`
  position: relative;
  height: 100%;
  background-color: white;
`;

export const CounterPill = styled.div`
  position: absolute;
  top; ${smallGap}px;
  right: ${smallGap}px;
`;

export const DataContainer = styled.div`
  padding-left: ${smallGap}px;
`;

export const DataHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: ${smallGap}px;
`;

export const DataText = styled.span`
  line-height: ${lineHeight}px;
`;
export const Header = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: ${headerHeight}px;
  gap: ${smallGap}px;
  padding: ${smallGap}px ${smallGap}px 12px ${smallGap}px;
  background-color: ${gray200};
  border-bottom: 1px solid ${gray300};
`;

export const LogContainer = styled.div`
  background-color: white;
  padding-top: ${headerHeight + lineHeight * 2}px;
  width: 100%;
  min-height: 100%;
  overflow-wrap: break-word;
  overflow: auto;
`;
export const PingContainer = styled.div<{ active?: boolean }>`
  animation: ${({ active }) => (active ? fadingAnimation : null)};
`;
