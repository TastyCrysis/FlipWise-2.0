import StyledCard from "@/components/StyledCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default function index() {
  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
      </Container>
      <StyledCard />
    </>
  );
}
