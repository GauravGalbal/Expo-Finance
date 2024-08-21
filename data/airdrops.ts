import { images } from "@/constants";

const airdropsArray = [
  {
    id: "1",
    name: "Doge verse",
    description: "$400 worth of Dogecoin to 100 lucky winners",
    image: images.airdropLogo,
    expiryDate: "12/06/2025",
    timeLeft: "12:52:12",
  },
  {
    id: "2",
    name: "StarkNet",
    description: "$400 worth of Dogecoin to 100 lucky winners",
    image: images.airdropLogo2,
    expiryDate: "12/06/2025",
    timeLeft: "12:52:12",
  },
  {
    id: "3",
    name: "Doge verse",
    description: "$400 worth of Dogecoin to 100 lucky winners",
    image: images.airdropLogo,
    expiryDate: "12/06/2025",
    timeLeft: "12:52:12",
  },
  {
    id: "4",
    name: "StarkNet",
    description: "$400 worth of Dogecoin to 100 lucky winners",
    image: images.airdropLogo2,
    expiryDate: "12/06/2025",
    timeLeft: "12:52:12",
  },
  {
    id: "5",
    name: "Doge verse",
    description: "$400 worth of Dogecoin to 100 lucky winners",
    image: images.airdropLogo,
    expiryDate: "12/06/2025",
    timeLeft: "12:52:12",
  },
  {
    id: "6",
    name: "StarkNet",
    description: "$400 worth of Dogecoin to 100 lucky winners",
    image: images.airdropLogo2,
    expiryDate: "12/06/2025",
    timeLeft: "12:52:12",
  },
];
export const fetchAllAirdrops = () => {
  return airdropsArray;
};

export const fetchAirdrop = (airdropId: string | string[] | undefined) => {
  const singleAirdrop = airdropsArray.find(
    (airdrop) => airdrop.id === airdropId
  );
  if (singleAirdrop) {
    return singleAirdrop;
  }
};
