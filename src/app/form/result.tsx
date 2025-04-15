import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function FormResult({ data }: { data: FormData }) {
  return (
    <Card mt="4">
      <Flex direction="column" gap="3">
        <Heading size="4">Form Submission</Heading>
        
        <Box>
          <Text weight="bold">Name:</Text>
          <Text>{data.name}</Text>
        </Box>
        
        <Box>
          <Text weight="bold">Email:</Text>
          <Text>{data.email}</Text>
        </Box>
        
        <Box>
          <Text weight="bold">Message:</Text>
          <Text>{data.message}</Text>
        </Box>
      </Flex>
    </Card>
  );
}
