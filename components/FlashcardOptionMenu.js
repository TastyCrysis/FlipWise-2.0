import { useState } from "react";
import styled from "styled-components";
import MenuThreePoint from "@/components/Elements/Menu_threePoint";

export default function FlashcardOptionMenu() {
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  function toggleOptionMenu() {
    setIsOptionMenuOpen(!isOptionMenuOpen);
  }
  return (
    <>
      <MenuThreePoint />
    </>
  );
}
