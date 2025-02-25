import styled from "styled-components";
import Link from "next/link";

const ModeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 72px;
`;

const ModeItem = styled.li`
  width: 100%;
  height: 300px;
  max-width: 550px;
  margin: 48px auto;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  border: none;
  list-style: none;
  box-shadow: ${({ theme }) => theme.boxShadowCollectionCard};
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
    box-shadow: ${({ theme }) => theme.boxShadowCollectionCardHover};
  }
`;

const BaseLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.collectionCardText};
`;

const StyledCardLink = styled(BaseLink)`
  height: 100%;
  position: relative;
`;

const ModeArticle = styled.article`
  height: 100%;
  background: ${({ theme }) => theme.collectionCard};
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const StyledStatsItem = styled.p`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 1.3rem;
  margin-top: 4px;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 54px;
  }
`;
const StyledStatsItemSpan = styled.span`
  font-weight: 700;
  background: ${({ theme }) => theme.collectionCardText};
  color: ${({ theme }) => theme.collectionCard};
  padding: 4px 8px;
  border-radius: 8px;
`;

export default function Homepage({}) {
  return (
    <>
      <ModeList>
        <ModeItem>
          <StyledCardLink href="/collections">
            <ModeArticle>
              <StyledTitle>Learning Mode</StyledTitle>
              <StyledStatsItem>
                Description:
                <StyledStatsItemSpan>
                  This is the learning Mode. Here you can find a list of
                  collections. In each collection you can find a list of
                  flashcards with questions and answers to the topic of the
                  collection. Also you can create new cards and collections,
                  edit and delete existing ones.
                </StyledStatsItemSpan>
              </StyledStatsItem>
            </ModeArticle>
          </StyledCardLink>
        </ModeItem>
      </ModeList>
    </>
  );
}
