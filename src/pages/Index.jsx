import React, { useState } from "react";
import { Box, Button, Input, VStack, Text, Container, Heading, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Message is empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    setInputValue("");

    // Here you would typically send the message to your backend or API
    // For demonstration, we simulate a bot response
    setTimeout(() => {
      setMessages((messages) => [...messages, { text: "This is a simulated response.", sender: "bot" }]);
    }, 1000);
  };

  return (
    <Container maxW="container.md" centerContent p={5}>
      <Heading mb={4}>Chatbot Interface</Heading>
      <Box w="100%" bg="gray.100" p={4} borderRadius="lg">
        <VStack spacing={4} align="stretch">
          {messages.map((message, index) => (
            <Box key={index} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}>
              <Text fontSize="md" p={2} bg={message.sender === "user" ? "blue.200" : "green.200"} borderRadius="lg">
                {message.text}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Box mt={4}>
        <Input placeholder="Type your message here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
        <Button leftIcon={<FaPaperPlane />} colorScheme="blue" onClick={handleSendMessage} mt={2}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default Index;
