// components/TermsModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="#000" color="white">
        <ModalHeader>Terms of Service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={6}>
            <Text
                      sx={{
                        color: "#fff",
                        fontWeight: "650",
                        lineHeight: "1.2",
                        textAlign: "center",
                        fontFamily: "HeadingNowVariable, sans-serif",
                        fontVariationSettings: '"wdth" 650, "wght" 725',
                        fontSize: "24px",
                      }}
                    >
              Welcome to LOBBYMOM
            </Text>
            <Text>
              By using our service, you agree to the following terms and
              conditions:
            </Text>
          </Box>

          <Box mb={6}>
            <Text
                      sx={{
                        color: "#fff",
                        fontWeight: "650",
                        lineHeight: "1.2",
                        fontFamily: "HeadingNowVariable, sans-serif",
                        fontVariationSettings: '"wdth" 650, "wght" 725',
                        fontSize: "14px",
                      }}
                    >
              1. Service Usage
            </Text>
            <Text>
              Our service provides free Fortnite lobby bots. You may use these
              bots for personal, non-commercial purposes only.
            </Text>
          </Box>

          <Box mb={6}>
            <Text
                      sx={{
                        color: "#fff",
                        fontWeight: "650",
                        lineHeight: "1.2",
                        fontFamily: "HeadingNowVariable, sans-serif",
                        fontVariationSettings: '"wdth" 650, "wght" 725',
                        fontSize: "14px",
                      }}
                    >
              2. Prohibited Activities
            </Text>
            <UnorderedList spacing={2}>
              <ListItem>Commercial use of our bots or service</ListItem>
              <ListItem>
                Attempting to reverse engineer or hack our service
              </ListItem>
              <ListItem>Using bots for cheating or unfair advantages</ListItem>
              <ListItem>Spamming or overloading our systems</ListItem>
              <ListItem>Sharing bot accounts with others</ListItem>
            </UnorderedList>
          </Box>

          <Box mb={6}>
            <Text
                      sx={{
                        color: "#fff",
                        fontWeight: "650",
                        lineHeight: "1.2",
                        fontFamily: "HeadingNowVariable, sans-serif",
                        fontVariationSettings: '"wdth" 650, "wght" 725',
                        fontSize: "14px",
                      }}
                    >
              3. Disclaimer
            </Text>
            <Text>
              We are not affiliated with Epic Games. Use our service at your own
              risk. We are not responsible for any account bans or penalties.
            </Text>
          </Box>

          <Box mb={6}>
            <Text
                      sx={{
                        color: "#fff",
                        fontWeight: "650",
                        lineHeight: "1.2",
                        fontFamily: "HeadingNowVariable, sans-serif",
                        fontVariationSettings: '"wdth" 650, "wght" 725',
                        fontSize: "14px",
                      }}
                    >
              4. Changes to Terms
            </Text>
            <Text>
              We may update these terms at any time. Continued use of our
              service constitutes acceptance of the updated terms.
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={onClose}>
            I Understand
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TermsModal;
