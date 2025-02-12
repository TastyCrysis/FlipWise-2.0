import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "@/components/Modal";
import FlashcardForm from "@/components/FlashcardForm";

const Navigation = styled.nav`
  width: min(650px, 95%);
  height: 70px;
  background: #6fb3ff;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  @media (max-width: 768px) {
    height: 60px;
    bottom: 10px;
  }
`;

const NavList = styled.ul`
  display: flex;
  width: min(420px, 90%);
  justify-content: space-between;
  padding: 0;
  position: relative;
`;

const Icon = styled.span`
  position: relative;
  display: block;
  line-height: 75px;
  font-size: 1.5em;
  text-align: center;
  transition: 0.5s;
  color: #222327;
`;

const Text = styled.span`
  position: absolute;
  color: #222327;
  font-weight: 400;
  font-size: 0.75em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  opacity: 0;
  transform: translateY(20px);
`;

const ListItem = styled.li`
  position: relative;
  list-style: none;
  width: 70px;
  height: 70px;
  z-index: 2;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  &:hover {
    ${Icon} {
      transform: translateY(-35px);
    }
    ${Text} {
      opacity: 1;
      transform: translateY(10px);
    }
  }

  ${({ $active }) =>
    $active &&
    `
    ${Icon} {
      transform: translateY(-32px);
    }
    ${Text} {
      opacity: 1;
      transform: translateY(10px);
    }
  `}
`;

const StyledLink = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  font-weight: 500;
`;

const Indicator = styled.div`
  position: absolute;
  top: -50%;
  height: 70px;
  width: 70px;
  background: #29fd53;
  border-radius: 50%;
  border: 6px solid #f9f9f9;
  transition: 0.5s;
  z-index: 1;
  display: ${({ $active }) => ($active ? "block" : "none")};
  left: ${({ $active }) => {
    if ($active === "/") return "-8px";
    if ($active === "/archive" || $active?.includes("/archive"))
      return "calc(100% - 62px)";
    return "calc(50% - 35px)";
  }};

  @media (max-width: 768px) {
    left: ${({ $active }) => {
      if ($active === "/") return "-12px";
      if ($active === "/archive" || $active?.includes("/archive"))
        return "calc(100% - 56px)";
      return "calc(50% - 30px)";
    }};
  }

  @media (max-width: 768px) {
    &::before,
    &::after {
      width: 15px;
      height: 15px;
    }
    &::before {
      left: -18px;
    }
    &::after {
      right: -18px;
    }
  }
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
`;

const OpenButton = styled.button`
  padding: 10px;
  width: 50px;
  height: 50px;
  background-color: #ff6f61;
  color: white;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default function Navbar({ handleCreateFlashcard }) {
  const router = useRouter();
  const { id } = router.query;
  const pathname = router.pathname;
  const navPath = pathname === "/" || pathname?.includes("/archive");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const archiveLink = id ? `/collections/${id}/archive` : "/archive";

  function handleSubmit(data) {
    handleCreateFlashcard(data);
    setIsModalOpen(false);
  }

  return (
    <Navigation>
      <NavList>
        <ListItem $active={pathname === "/"}>
          <StyledLink href="/">
            <Icon>
              <Image src="/house.png" alt="home-logo" width={32} height={32} />
            </Icon>
            <Text>Home</Text>
          </StyledLink>
        </ListItem>
        <ModalWrapper>
          <OpenButton onClick={() => setIsModalOpen(true)}>+</OpenButton>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Create a new Flashcard"
            needsPortal={true}
          >
            <FlashcardForm
              onSubmit={handleSubmit}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        </ModalWrapper>
        <ListItem $active={pathname?.includes("/archive")}>
          <StyledLink href={archiveLink}>
            <Icon>
              <Image
                src="/archive.png"
                alt="archive-logo"
                width={32}
                height={32}
              />
            </Icon>
            <Text>Archive</Text>
          </StyledLink>
        </ListItem>
        {navPath && <Indicator $active={pathname} />}
      </NavList>
    </Navigation>
  );
}
