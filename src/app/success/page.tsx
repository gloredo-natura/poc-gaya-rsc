import { Box, Button, Card, Container, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <Container size="2" py="9">
      <Card>
        <Flex direction="column" gap="5" align="center">
          <Heading size="6" align="center">Formulário Enviado com Sucesso!</Heading>

          <Text>Obrigado pelo seu envio. Entraremos em contato em breve.</Text>

          <Box mt="4">
            <Link href="/form" passHref>
              <Button>Voltar ao Formulário</Button>
            </Link>
          </Box>
        </Flex>
      </Card>
    </Container>
  );
}
