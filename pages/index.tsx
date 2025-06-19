import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Progress,
  List,
  ListItem,
  ListIcon,
  Badge,
  useToast,
  Link,
  Icon,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  useBreakpointValue,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import TermsModal from "@/components/TermsModal";
import { GradientText } from "@/components/GradientText";

const Home = () => {
  const allBots = [
    "LOBBY.MOM.ZQXR",
    "LOBBY.MOM.XVNL",
    "LOBBY.MOM.Q8TY",
    "LOBBY.MOM.JY3F",
    "LOBBY.MOM.WKRP",
    "LOBBY.MOM.NX7Q",
    "LOBBY.MOM.ML4Z",
    "LOBBY.MOM.RDU2",
    "LOBBY.MOM.HCVE",
    "LOBBY.MOM.TL9K",
    "LOBBY.MOM.VGEX",
    "LOBBY.MOM.KYND",
    "LOBBY.MOM.PW8R",
    "LOBBY.MOM.BAZQ",
    "LOBBY.MOM.C3LN",
    "LOBBY.MOM.VFJ5",
  ];

  const [bots, setBots] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(10);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const toast = useToast();

  // Responsive values
  const cardDirection = useBreakpointValue({ base: "column", md: "row" });
  const botImageSize = useBreakpointValue({ base: "32px", md: "48px" });
  const badgeDirection = useBreakpointValue({ base: "column", md: "row" });
  const timerText = useBreakpointValue({
    base: `Next: ${countdown}s`,
    md: `Next bots in ${countdown} seconds..`,
  });

  useEffect(() => {
    // Simulate loading with delay
    const loadingTimer = setTimeout(() => {
      getRandomBots();
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    // Set up countdown timer
    let timer: NodeJS.Timeout;

    if (!isLoading) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            getRandomBots();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoading]);

  useEffect(() => {
    // Update progress bar
    setProgress(100 - (countdown / 10) * 100);
  }, [countdown]);

  const getRandomBots = () => {
    const shuffled = [...allBots].sort(() => Math.random() - 0.5);
    setBots(shuffled.slice(0, 5));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Bot name copied!",
      status: "success",
      isClosable: true,
      duration: 2000,
      position: "bottom",
    });
  };

  return (
    <Box
      bg="linear-gradient(90deg, rgb(11, 33, 36) 0%, rgb(0, 0, 0) 100%)"
      color="white"
      minH="100vh"
      px={{ base: 3, md: 8 }}
      py={{ base: 4, md: 8 }}
    >
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      <Grid
        templateColumns={{ base: "1fr", lg: "7fr 5fr" }}
        gap={{ base: 6, md: 8 }}
        maxW="1400px"
        mx="auto"
        pt={{ base: 4, md: 8 }}
      >
        {/* Left Column */}
        <GridItem>
          <Flex direction="column" gap={{ base: 4, md: 6 }}>
            {/* Title */}
            {isLoading ? (
              <Skeleton
                height="40px"
                width={{ base: "250px", md: "400px" }}
                mb={4}
              />
            ) : (
              <Image
                src="https://lobby.mom/awso/assets/title.svg"
                alt="LOBBYMOM"
                maxW={{ base: "250px", md: "400px" }}
                mb={4}
                loading="lazy"
                decoding="async"
              />
            )}

            {/* Subtitle */}
            {isLoading ? (
              <SkeletonText noOfLines={3} spacing="3" skeletonHeight="4" />
            ) : (
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                fontWeight={600}
                lineHeight={1.2}
              >
                Get instant access to
                <GradientText>Free</GradientText>
                <Image
                  src="https://lobby.mom/awso/assets/Fortnite.svg"
                  display="inline-block"
                  mx={2}
                  h={{ base: "1.2em", md: "1.5em" }}
                  verticalAlign="middle"
                  loading="lazy"
                  decoding="async"
                />
                lobby bots!
                <br />
                Copy <GradientText>bot names</GradientText> to invite them to
                your lobby.
                <br />
                The list refreshes every <GradientText>10 seconds</GradientText>
                with new bots.
              </Text>
            )}

            {/* Game Mode Cards */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              {/* Build Mode */}
              {isLoading ? (
                <Skeleton height="100px" borderRadius="lg" />
              ) : (
                <Card
                  bg="linear-gradient(90deg, rgb(28, 223, 230) 0%, rgb(211, 26, 211) 100%)"
                  color="white"
                  borderRadius="lg"
                >
                  <CardBody display="flex" alignItems="center">
                    <Image
                      src="https://lobby.mom/awso/assets/build.png"
                      boxSize={{ base: "40px", md: "48px" }}
                      mr={3}
                      loading="lazy"
                      decoding="async"
                    />
                    <Box>
                      <Text
                        sx={{
                          textTransform: "uppercase",
                          fontWeight: 700,
                          letterSpacing: "1.8px",
                          fontSize: "11px",
                          fontFamily:
                            "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        SUPPORTED GAME MODE
                      </Text>

                      <Text
                        sx={{
                          color: "#fff",
                          fontWeight: "725",
                          lineHeight: "1.2",
                          fontFamily: "HeadingNowVariable, sans-serif",
                          fontVariationSettings: '"wdth" 650, "wght" 725',
                          fontSize: { base: "12px", md: "14px" },
                        }}
                      >
                        Battle Royale w/ Building
                      </Text>
                    </Box>
                  </CardBody>
                </Card>
              )}

              {/* Zero Build Mode */}
              {isLoading ? (
                <Skeleton height="100px" borderRadius="lg" />
              ) : (
                <Card
                  bg="linear-gradient(90deg, rgba(209, 230, 28, 1) 0%, rgba(73, 117, 7, 1) 100%)"
                  color="black"
                  borderRadius="lg"
                >
                  <CardBody display="flex" alignItems="center">
                    <Image
                      src="https://lobby.mom/awso/assets/zerobuild.png"
                      boxSize={{ base: "40px", md: "48px" }}
                      mr={3}
                      loading="lazy"
                      decoding="async"
                    />
                    <Box>
                      <Text
                        sx={{
                          textTransform: "uppercase",
                          fontWeight: 700,
                          letterSpacing: "1.8px",
                          fontSize: "11px",
                          fontFamily:
                            "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        SUPPORTED GAME MODE
                      </Text>
                      <Text
                        sx={{
                          color: "#000",
                          fontWeight: "725",
                          lineHeight: "1.2",
                          fontFamily: "HeadingNowVariable, sans-serif",
                          fontVariationSettings: '"wdth" 650, "wght" 725',
                          fontSize: { base: "12px", md: "14px" },
                        }}
                      >
                        Battle Royale: Zero Build
                      </Text>
                    </Box>
                  </CardBody>
                </Card>
              )}
            </SimpleGrid>

            {/* Unsupported Modes */}
            {isLoading ? (
              <Skeleton height="100px" borderRadius="lg" />
            ) : (
              <Card
                bg="linear-gradient(90deg, rgb(119, 25, 25) 0%, rgb(56, 18, 18) 100%)"
                color="white"
                borderRadius="lg"
              >
                <CardBody display="flex" alignItems="center">
                  <Image
                    src="https://lobby.mom/awso/assets/error.png"
                    boxSize={{ base: "40px", md: "48px" }}
                    mr={3}
                    loading="lazy"
                    decoding="async"
                  />
                  <Box>
                    <Text
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 700,
                        letterSpacing: "1.8px",
                        fontSize: "11px",
                        fontFamily:
                          "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      NOT SUPPORTED GAME MODES
                    </Text>
                    <Text
                      sx={{
                        color: "#fff",
                        fontWeight: "650",
                        lineHeight: "1.2",
                        fontFamily: "HeadingNowVariable, sans-serif",
                        fontVariationSettings: '"wdth" 650, "wght" 725',
                        fontSize: { base: "12px", md: "14px" },
                      }}
                    >
                      Due to Epic Games limitations, OG and Reload is not
                      supported.
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            )}

            {/* Discord Card */}
            {isLoading ? (
              <Skeleton height="100px" borderRadius="lg" mt={4} />
            ) : (
              <Card
                bg="linear-gradient(90deg, #5865f2 0%, #4953c2 100%)"
                color="white"
                borderRadius="lg"
                mt={4}
              >
                <CardBody
                  display="flex"
                  flexDirection={{ base: "column", md: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Flex align="center" mb={{ base: 3, md: 0 }}>
                    <Image
                      src="https://lobby.mom/awso/assets/discord.png"
                      boxSize={{ base: "40px", md: "48px" }}
                      mr={3}
                      loading="lazy"
                      decoding="async"
                    />
                    <Box>
                      <Text
                        sx={{
                          textTransform: "uppercase",
                          fontWeight: 700,
                          letterSpacing: "1.8px",
                          fontSize: "11px",
                          fontFamily:
                            "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        OFFICIAL DISCORD
                      </Text>
                      <Text
                        sx={{
                          color: "#fff",
                          fontWeight: "650",
                          lineHeight: "1.2",
                          fontFamily: "HeadingNowVariable, sans-serif",
                          fontVariationSettings: '"wdth" 650, "wght" 725',
                          fontSize: { base: "12px", md: "14px" },
                        }}
                      >
                        Need help? New bot drops? Join us!
                      </Text>
                    </Box>
                  </Flex>
                  <Button
                    size="sm"
                    variant="primary"
                    className="heading-font"
                    w={{ base: "full", md: "auto" }}
                  >
                    Join Discord
                  </Button>
                </CardBody>
              </Card>
            )}
          </Flex>
        </GridItem>

        {/* Right Column */}
        <GridItem mt={{ base: 0, lg: 0 }}>
          <Flex direction="column" gap={4}>
            {/* Bot Counter */}
            {isLoading ? (
              <Skeleton height="90px" borderRadius="lg" />
            ) : (
              <Card
                bg="rgba(0, 0, 0, 0.5)"
                bgImage="url(https://lobby.mom/awso/assets/blue-plain.gif)"
                bgSize="cover"
                border="1px solid"
                borderColor="gray.700"
                color="white"
                borderRadius="lg"
              >
                <CardBody display="flex" alignItems="center">
                  <Image
                    src="https://lobby.mom/awso/assets/LOBBYMOM.png"
                    boxSize={{ base: "40px", md: "48px" }}
                    mr={3}
                    loading="lazy"
                    decoding="async"
                  />
                  <Box>
                    <Text
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 700,
                        letterSpacing: "1.8px",
                        fontSize: "11px",
                        fontFamily:
                          "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                      }}
                    >
                      BOTS AVAILABLE
                    </Text>
                    <Text
                      sx={{
                        color: "#fff",
                        fontWeight: "650",
                        lineHeight: "1.2",
                        fontFamily: "HeadingNowVariable, sans-serif",
                        fontVariationSettings: '"wdth" 650, "wght" 725',
                        fontSize: { base: "12px", md: "14px" },
                      }}
                    >
                      We have currently{" "}
                      <span className="bot-counter">{allBots.length}</span> bots
                      ready to serve you!
                    </Text>
                  </Box>
                </CardBody>
              </Card>
            )}

            {/* Bot List */}
            {isLoading ? (
              <Skeleton height="400px" borderRadius="lg" />
            ) : (
              <Card
                bg="rgba(0, 0, 0, 0.5)"
                backdropFilter="blur(5px)"
                border="1px solid"
                borderColor="gray.700"
                borderRadius="lg"
                p={4}
              >
                <List spacing={3}>
                  {bots.map((bot) => (
                    <ListItem
                      key={bot}
                      display="flex"
                      flexDirection={{ base: "column", sm: "row" }}
                      alignItems={{ base: "flex-start", sm: "center" }}
                      justifyContent="space-between" // Add this
                      p={3}
                      bg="rgba(0, 0, 0, 0.5)"
                      borderRadius="md"
                      gap={{ base: 2, sm: 0 }} // Add gap for mobile
                    >
                      {/* Left side - Bot info */}
                      <Flex align="center" flex="1" minW="0">
                        <Image
                          src="https://static.wikia.nocookie.net/fortnite_gamepedia/images/1/15/RemedyVsToxin.png"
                          boxSize={botImageSize}
                          borderRadius="full"
                          border="2px solid #00a261"
                          loading="lazy"
                          decoding="async"
                          mr={3}
                        />
                        <Box minW="0">
                          <Text
                            sx={{
                              color: "#fff",
                              fontWeight: "650",
                              lineHeight: "1.2",
                              fontFamily: "HeadingNowVariable, sans-serif",
                              fontVariationSettings: '"wdth" 650, "wght" 725',
                              fontSize: { base: "12px", md: "14px" },
                            }}
                          >
                            {bot}
                          </Text>
                          <Flex mt={2} gap={2} flexWrap="wrap">
                            <Badge
                              colorScheme="green"
                              display="flex"
                              alignItems="center"
                              fontSize={{ base: "xs", md: "sm" }}
                            >
                              <Image
                                src="https://lobby.mom/awso/assets/user-status.png"
                                boxSize={{ base: "12px", md: "16px" }}
                                mr={1}
                              />
                              ONLINE
                            </Badge>
                            <Badge
                              colorScheme="blue"
                              display="flex"
                              alignItems="center"
                              fontSize={{ base: "xs", md: "sm" }}
                            >
                              <Image
                                src="https://lobby.mom/awso/assets/available.png"
                                boxSize={{ base: "12px", md: "16px" }}
                                mr={1}
                              />
                              AVAILABLE
                            </Badge>
                          </Flex>
                        </Box>
                      </Flex>

                      {/* Right side - Copy button */}

<Button
  size={{ base: "xs", md: "sm" }}
  variant="primary"
  leftIcon={
    <Box 
      as="span"
      display="inline-block"
      width="16px"
      height="16px"
      position="relative"
    >
      <Image
        src="https://i.imgur.com/ovue4Vo.png"
        alt="Copy"
        sizes="16px"
        style={{
          objectFit: 'contain',
          width: '100%',
          height: '100%'
        }}
      />
    </Box>
  }
  onClick={() => copyToClipboard(bot)}
  mt={{ base: 2, sm: 0 }}
  ml={{ sm: 4 }}
>
  Copy
</Button>
                    </ListItem>
                  ))}
                </List>

                {/* Timer */}
                <Box mt={6}>
                  <Button
                    isDisabled
                    w="full"
                    leftIcon={
                      <Image
                        src="https://lobby.mom/awso/assets/timer.png"
                        boxSize={{ base: "16px", md: "24px" }}
                        loading="lazy"
                        decoding="async"
                      />
                    }
                    mb={2}
                    className="heading-font"
                    fontSize={{ base: "sm", md: "md" }}
                    py={{ base: 3, md: 2 }}
                  >
                    {timerText}
                  </Button>
                  <Progress
                    value={progress}
                    size="xs"
                    colorScheme="green"
                    hasStripe
                    isAnimated
                    sx={{
                      "& > div": {
                        transition: "width 0.4s ease",
                      },
                    }}
                  />
                </Box>
              </Card>
            )}
          </Flex>
        </GridItem>
      </Grid>

      {/* Footer */}
      <Flex
        justify="space-between"
        align="center"
        flexDirection={{ base: "column", md: "row" }}
        maxW="1400px"
        mx="auto"
        mt={8}
        pt={4}
        pb={2}
        borderTop="1px solid"
        borderColor="gray.700"
      >
        {isLoading ? (
          <Skeleton height="24px" width="200px" mb={{ base: 3, md: 0 }} />
        ) : (
          <Text
            display="flex"
            alignItems="center"
            className="heading-font"
            mb={{ base: 3, md: 0 }}
          >
            <span
              style={{
                marginRight: "8px",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "1.4px",
              }}
            >
              Powered by
            </span>
            <Image
              src="https://lobby.mom/awso/assets/LOBBYMOM.png"
              boxSize={{ base: "24px", md: "24px" }}
              mr={3}
              loading="lazy"
              decoding="async"
            />
          </Text>
        )}

        {isLoading ? (
          <Skeleton height="24px" width="150px" />
        ) : (
          <Flex>
            <Link
              mx={2}
              display="flex"
              alignItems="center"
              className="no-underline"
              onClick={() => setIsTermsModalOpen(true)}
              cursor="pointer"
              fontSize={{ base: "sm", md: "md" }}
            >
              Terms of Service
            </Link>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Home;
