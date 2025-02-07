import styled from "styled-components";
import Link from "next/link";
import UpdateFlashcard from "@/components/UpdateFlashcard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Edit({ handleUpdateFlashcard }) {
  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>Edit</h2>
        <Link href="/">Home</Link>
      </Container>
      <UpdateFlashcard handleUpdateFlashcard={handleUpdateFlashcard} />
    </>
  );
}
