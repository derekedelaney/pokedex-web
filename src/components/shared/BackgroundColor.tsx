import styled from "styled-components";

export const BackgroundColor = styled.div<{ color: string }>`
  background-color: ${props => props.color};
`;