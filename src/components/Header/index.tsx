import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import style from './index.module.css';
import { useWeb3 } from '@/context/web3Context';
import { WalletConnectButton } from '..';

export const Header: React.FC = () => {
  return (
    <div className={style.container}>
      <div className=""></div>
      <WalletConnectButton />
    </div>
  );
};

Header.displayName = 'Header';
