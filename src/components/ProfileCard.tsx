import { useEffect, useState } from "react";
import { useWeb3 } from "@/context/web3Context";
import {
  ButtonBase,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import Image from "next/image";
import React from "react";
import { formatAddress } from "@/utils/helpers";

function ProfileCard() {
  const { identity, address } = useWeb3();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [poaps, setPoaps] = useState<any>();
  const [nfts, setNfts] = useState<any>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetch(`https://api.poap.xyz/actions/scan/${address}`);
      let response;
      if (res.status === 200) {
        response = await res.json();
      }
      setPoaps(response);
      setIsLoading(false);
    })();
  }, [address]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}/getNFTs/?owner=${address}`,
      );
      let response;
      if (res.status === 200) {
        response = await res.json();
      }
      setNfts(response.ownedNfts);
      setIsLoading(false);
    })();
  }, [address]);

  return (
    <div className="border border-gray-600 rounded-lg p-3">
      <Typography>ProfileCard</Typography>
      {identity && (
        <div className="flex flex-col text-left">
          <div className="flex flex-row items-center">
            <div>
              {identity.avatar ? (
                <a
                  rel="noreferrer"
                  href={
                    "https://app.cyberconnect.me/address/" + identity?.address
                  }
                  target={"_blank"}
                >
                  <Image
                    src={identity.avatar}
                    alt={""}
                    width={50}
                    height={50}
                    className=""
                  />
                </a>
              ) : (
                <a
                  rel="noreferrer"
                  href={
                    "https://app.cyberconnect.me/address/" + identity?.address
                  }
                  target={"_blank"}
                >
                  <Image
                    src={"/Sample_User_Icon.png"}
                    alt={""}
                    width={50}
                    height={50}
                    className=""
                  />
                </a>
              )}
            </div>

            <div className="">
              {identity.ens ? (
                <Typography
                  variant="h6"
                  sx={{
                    margin: "10px 20px",
                    fontFamily: "Outfit",
                  }}
                >
                  {identity.ens}
                </Typography>
              ) : (
                <Typography variant="h4"></Typography>
              )}
              <Typography
                variant="h6"
                paddingLeft={2}
                sx={{ color: "gray", fontFamily: "Outfit" }}
              >
                {formatAddress(identity?.address)}
              </Typography>
            </div>
          </div>

          {/* follower following counts */}
          <div className="flex justify-around">
            <div className="flex flex-col">
              <Typography variant="h6">{identity.followerCount}</Typography>
              <Typography color={"#989898"}>Followers</Typography>
            </div>
            <div className="flex flex-col">
              <Typography variant="h6">{identity.followingCount}</Typography>
              <Typography color={"#989898"}>Followers</Typography>
            </div>
          </div>

          {/* NFT */}
          <div>
            <Typography>NFTs</Typography>
            <div className="flex flex-row">
              {isLoading ? (
                <CircularProgress />
              ) : nfts?.length ? (
                nfts.map((nft: any) => (
                  <div key={nft.id} className="p-2">
                    <Tooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <Typography className="">
                            {nft.metadata.name}
                          </Typography>
                        </>
                      }
                    >
                      <ButtonBase>
                        {nft.metadata.image ? (
                          <img
                            src={nft.metadata.image}
                            className="w-10 "
                            alt={name}
                          />
                        ) : (
                          <ImageNotSupportedIcon
                            style={{
                              color: "FFFFFF",
                              fontSize: "40px",
                              width: "64px",
                            }}
                          />
                        )}
                      </ButtonBase>
                    </Tooltip>
                  </div>
                ))
              ) : (
                <Typography className="">No NFTS :(</Typography>
              )}
            </div>
          </div>

          {/* Poaps */}
          <div>
            <Typography>POAPs</Typography>
            <div className="flex flex-row">
              {isLoading ? (
                <CircularProgress />
              ) : poaps?.length ? (
                poaps.map((poap: any) => (
                  <div key={poap.tokenId} className="p-2">
                    <Tooltip
                      placement="top"
                      arrow
                      title={
                        <>
                          <Typography className="">
                            {poap.event.name}
                          </Typography>
                        </>
                      }
                    >
                      <ButtonBase>
                        {poap.event.image_url ? (
                          <img
                            src={poap.event.image_url}
                            className="w-10 "
                            alt={name}
                          />
                        ) : (
                          <ImageNotSupportedIcon
                            style={{
                              color: "FFFFFF",
                              fontSize: "40px",
                              width: "64px",
                            }}
                          />
                        )}
                      </ButtonBase>
                    </Tooltip>
                  </div>
                ))
              ) : (
                <Typography className="">No POAPS :(</Typography>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
