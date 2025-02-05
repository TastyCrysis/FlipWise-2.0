import FlashcardList from "@/components/FlashcardList";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default function index() {
  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <Link href="/archive">Archive</Link>
      </Container>
      <FlashcardList />
    </>
  );
}
