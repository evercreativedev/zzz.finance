import treausre from "assets/treasure.png";
import uniswap from "assets/uniswap.jpg";
import school from "assets/school.png";
type TLearn = {
  id?: string;
  title: string;
  text: string;
  image: any;
  link: string;
  color: string;
  linkText?: string;
};

const LearnBoxes: TLearn[] = [
  {
    title: "Basics",
    text: "The basics of liquidity providing and farming.",
    image: school,
    link: "https://www.youtube.com/watch?v=QcTk00eRhKI",
    color: "#138d75",
  },
  {
    title: "Staking on ZZZ.Finance",
    text: "How to stake on ZZZ.Finance",
    image: treausre,
    link: "https://www.youtube.com/watch?v=aSZGQPnfJ0k",
    color: "#7CD10F",
  },
  {
    id: "uni",
    title: "Risks of liquidity providing",
    text: "What is impermanent loss? How does automatic market making work?",
    image: uniswap,
    color: "#9c29ac",
    link: "https://www.youtube.com/watch?v=41WVTwmSPng",
  },
];
export default LearnBoxes;
