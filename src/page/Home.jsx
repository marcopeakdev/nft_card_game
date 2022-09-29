import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { heroImg, logo } from '../assets';
import { useGlobalContext } from '../context';
import styles from '../styles';

const Home = () => {
  const { contract, metamaskAccount, gameData } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData.playerHasMetamaskAccount) navigate('/create-battle');
  }, [gameData]);

  const handleClick = async () => {
    if (playerName) {
      try {
        await contract.registerPlayer(playerName);

        navigate('/create-battle');
      } catch (error) {
        const regex = /(?:^|\W)reason(?:$|\W).+?(?=, method)/g;

        setErrorMessage(error.message.match(regex)[0].slice('reason: "execution reverted: '.length).slice(0, -1));
      }
    }
  };

  return (
    <div className="min-h-screen flex xl:flex-row flex-col">
      <div className="flex flex-1 justify-between bg-siteblack py-8 sm:px-12 px-8 flex-col">
        <img src={logo} alt="logo" className="w-[160px] h-[52px] object-contain" />

        <div className="flex-1 flex justify-center flex-col xl:mt-0 my-16">
          <div className="flex flex-row w-full">
            <div className="w-1 h-[120px] bg-siteViolet mr-3" />
            <h1 className={`${styles.headText} text-left`}>Welcome to Avax Gods <br /> a Web3 NFT Card Game</h1>
          </div>

          <div className="my-10">
            <p className="font-rajdhani font-normal text-[24px] text-siteWhite">Connect your Metamask wallet to start playing <br /> the ultimate Web3 Battle Card Game</p>
          </div>

          {metamaskAccount && (
            <div className="flex flex-col">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-rajdhani font-semibold text-2xl text-white mb-3">Name</label>
                <input
                  type="text"
                  placeholder="Enter your player name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-siteDimBlack text-white outline-none focus:outline-siteViolet p-4 rounded-md sm:max-w-[50%] max-w-full"
                />
              </div>
              {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
              <button type="button" className="mt-6 px-4 py-2 rounded-lg bg-siteViolet w-fit text-white font-rajdhani font-bold" onClick={handleClick}>Register</button>
            </div>
          )}
        </div>

        <p className="font-rajdhani font-medium text-base text-white">Made with 💜 by JavaScript Mastery</p>
      </div>

      <div className="flex flex-1">
        <img src={heroImg} alt="hero-img" className="w-full xl:h-full" />
      </div>
    </div>
  );
};

export default Home;
