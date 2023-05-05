import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    Flex,
    Image,
    Grid,
    Box,
} from '@chakra-ui/react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const WalletConnector = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { wallets, connect } = useWallet();

    const onWalletSelect = (walletName) => {
        connect(walletName);
        onClose();
    };

    return (
        <>
            <Button
                variant="hamburger"
                onClick={onOpen}
            >
                Connect Wallet
            </Button>
            <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent p="15px 10px">
                    <ModalHeader>Connect Wallet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid gap="10px">
                            {
                                wallets.map((wallet) => (
                                    <Flex
                                        key={wallet.name}
                                        justifyContent="space-between"
                                        alignItems="center"
                                        bg="rgb(228, 228, 231)"
                                        _hover={{
                                            bg: 'rgba(0, 0, 0, 0.04)',
                                        }}
                                        p="1rem 2rem"
                                        h="4rem"
                                        borderRadius="10px"
                                        rowGap="20px"
                                    >
                                        <Image w="32px" h="32px" src={wallet.icon} alt={wallet.name} />
                                        <Text as="span" w="38%" textAlign="left">
                                            {wallet.name}
                                        </Text>
                                        <Box w="40%">
                                            {
                                                wallet.readyState === 'Installed' || wallet.readyState === 'Loadable' ? (
                                                    <Button variant="lightGray" h="70%" onClick={() => onWalletSelect(wallet.name)}>
                                                        connect
                                                    </Button>
                                                ) : (
                                                    <Button variant="ghost" h="70%" onClick={() => window.open(wallet.url)}>
                                                        Install
                                                    </Button>
                                                )
                                            }
                                        </Box>
                                    </Flex>
                                ))
                            }

                        </Grid>
                        {/* <Text fontWeight="bold" mb="1rem">
                            You can scroll the content behind
                            the modal
                        </Text> */}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default WalletConnector;