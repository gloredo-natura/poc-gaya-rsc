import { Box, Button, Card, Container, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <Container size="2" py="9">
      <Card size="3" style={{ boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)' }}>
        <Flex direction="column" gap="6" align="center" p="4">
          <Box style={{ color: 'var(--success-color, #2e7d32)' }}>
            <svg width="48" height="48" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Box>

          <Heading size="6" align="center" style={{ color: 'var(--success-color, #2e7d32)' }}>Formulário Enviado com Sucesso!</Heading>

          <Box p="4" style={{ backgroundColor: 'var(--success-bg, #f0f9f0)', borderRadius: '8px', border: '1px solid var(--success-border, #d0e8d0)', width: '100%' }}>
            <Text as="p" align="center" size="3">
              Obrigado pelo seu envio. Entraremos em contato em breve.
            </Text>
          </Box>

          <Flex justify="center" mt="2">
            <Link href="/form" passHref>
              <Button size="3" color="green">
                <Box mr="1">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Box>
                Voltar ao Formulário
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Card>
    </Container>
  );
}
