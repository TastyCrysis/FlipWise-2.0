import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import StyledCreateModal from "@/components/CreateModal";

const Navigation = styled.div`
  width: 650px;
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
`;

const NavList = styled.ul`
  display: flex;
  width: 420px;
  justify-content: space-between;
  padding: 0;
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
  transform: translateX(
    ${({ $active }) => {
      if ($active === "/") return "-8px";
      if (
        $active === "/archive" ||
        $active === `/collections/${undefined}/archive`
      )
        return "358px";
      if ($active?.includes("/archive")) return "358px";
      return "105px";
    }}
  );

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -22px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-top-right-radius: 20px;
    box-shadow: 0 -10px 0 0 #f9f9f9;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -22px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-top-left-radius: 20px;
    box-shadow: 0 -10px 0 0 #f9f9f9;
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

export default function Navbar({ handleCreateFlashcard }) {
  const router = useRouter();
  const pathname = router.pathname;
  const [active, setActive] = useState(pathname);
  const [isMounted, setIsMounted] = useState(false);

  const { id } = router.query;

  useEffect(() => {
    setActive(pathname);
    setIsMounted(true);
  }, [pathname]);

  // Prüfen, ob der aktive Pfad einer der Navigationspfade ist
  const navPath = active === "/" || active?.includes("/archive");

  return (
    <Navigation>
      <NavList>
        <ListItem $active={active === "/"}>
          <StyledLink href="/">
            <Icon>
              <Image src="/house.png" alt="home-logo" width={32} height={32} />
            </Icon>
            <Text>Home</Text>
          </StyledLink>
        </ListItem>
        <ModalWrapper>
          {isMounted && (
            <StyledCreateModal handleCreateFlashcard={handleCreateFlashcard} />
          )}
        </ModalWrapper>
        <ListItem $active={active?.includes("/archive")}>
          <StyledLink href={`/collections/${id}/archive`}>
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
        {navPath && <Indicator $active={active} />}
      </NavList>
    </Navigation>
  );
}
