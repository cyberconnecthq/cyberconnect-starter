import type { NextPage } from 'next';
import styles from './index.module.css';
import { WalletConnectButton } from '@/components';
import { followings } from '@/utils/query';
import { useWeb3 } from '@/context/web3Context';
import { useState } from 'react';

const Home: NextPage = () => {
  const { connectWallet, address, ens, cyberConnect } = useWeb3();

  const [pageInfo, setPageInfo] = useState<any>({});

  const query = async () => {
    const resp = await followings({
      address: '0x8ddD03b89116ba89E28Ef703fe037fF77451e38E',
      url: 'https://api.cybertino.io/connect/',
      first: 10,
      after: pageInfo.endCursor,
    });

    console.log('rest: ', resp);
    setPageInfo(resp.followings.pageInfo);
    // if (cyberConnect) {
    //   const resp = await cyberConnect.connect(
    //     '0x8ddd03b89116ba89e28ef703fe037ff77451e38e'
    //   );

    //   console.log(resp);
    // }
  };

  return (
    <div className={styles.container}>
      <WalletConnectButton />
      <button onClick={query}>Query</button>
    </div>
  );
};

export default Home;
