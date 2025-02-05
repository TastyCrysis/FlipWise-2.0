import ArchiveList from "@/components/ArchiveList";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default function archive() {
  return (
    <>
      <Container>
        <h1>Flipwise App</h1>
        <h2>Archive</h2>
        <Link href="/">Home</Link>
      </Container>
      <ArchiveList />
    </>
  );
}
