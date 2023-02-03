import React from "react";
import { Banner } from "../Components/Banner";
import { Cards } from "../Components/Cards";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Cards />
      <Footer />
    </>
  );
}
