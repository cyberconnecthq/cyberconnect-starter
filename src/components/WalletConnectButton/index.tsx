import { useState, useCallback } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useWeb3 } from '@/context/web3Context';
import { formatAddress } from '@/utils';

export const WalletConnectButton: React.FC = () => {
  const { connectWallet, address, ens } = useWeb3();
  const [loading, setLoading] = useState<boolean>(false);

  const connect = useCallback(async () => {
    setLoading(true);
    await connectWallet();
    setLoading(false);
  }, [connectWallet]);

  return (
    <>
      {!address ? (
        <LoadingButton loading={loading} onClick={connect}>
          Connect Wallet
        </LoadingButton>
      ) : (
        <div>{ens || formatAddress(address)}</div>
      )}
    </>
  );
};

WalletConnectButton.displayName = 'WalletConnectButton';
