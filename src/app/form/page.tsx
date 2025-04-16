import { Box, Button, Card, Container, Flex, Heading, Text, TextField, TextArea, Callout } from '@radix-ui/themes';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { submitForm, clearForm } from '../actions';
import ClientThemeButton from '../components/client-theme-button';
import ServerFormThemeWrapper from '../components/server-form-theme-wrapper';

export default async function FormPage() {

  // Get the current theme from cookies
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme');
  const theme = themeCookie?.value || 'light';

  return (
    <Container size="2" py="9">
      <Card>
        <Flex direction="column" gap="5">
          <Heading size="6" align="center">Formulário Lado Servidor</Heading>

          <Flex justify="center">
            <Link href="/form-client" passHref>
              <Button variant="outline" color="gray">
                Alternar para Formulário Lado Cliente
              </Button>
            </Link>
          </Flex>

          <Callout.Root color="blue">
            <Callout.Icon>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </Callout.Icon>
            <Callout.Text>
              <strong>Implementação 100% Servidor</strong><br />
              Este formulário utiliza Server Components e Server Actions do Next.js.
              Toda validação e processamento ocorre no servidor, sem JavaScript no cliente.
            </Callout.Text>
          </Callout.Root>
          <form action={submitForm}>
            <Flex direction="column" gap="4">
              <Box>
                <Text as="label" size="2" mb="1" htmlFor="name">Nome</Text>
                <TextField.Root id="name" name="name" placeholder="Digite seu nome" required />
              </Box>

              <Box>
                <Text as="label" size="2" mb="1" htmlFor="email">Email</Text>
                <TextField.Root id="email" name="email" type="email" placeholder="Digite seu email" required />
              </Box>

              <Box>
                <Text as="label" size="2" mb="1" htmlFor="message">Mensagem</Text>
                <TextArea id="message" name="message" placeholder="Digite sua mensagem" required />
              </Box>

              <Flex gap="3">
                <Button type="submit">Enviar</Button>
                <Button type="reset" variant="soft" color="gray">Limpar Campos</Button>
              </Flex>
            </Flex>
          </form>

          <Flex justify="center" gap="3" mt="4">
            <form method="post" action="/api/toggle-theme">
              <Button type="submit" variant="soft">
                Alternar para Tema {theme === 'light' ? 'Escuro' : 'Claro'} (Server)
              </Button>
            </form>
            <ClientThemeButton />
            <form action={clearForm}>
              <Button type="submit" variant="soft" color="red">
                Limpar Formulário
              </Button>
            </form>
          </Flex>

          <Box mt="2">
            <Text size="1" align="center">Tema atual (server-side): {theme === 'light' ? 'claro' : 'escuro'}</Text>
            <ServerFormThemeWrapper />
          </Box>

          <Box mt="4">
            <Callout.Root color="gray">
              <Callout.Icon>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 1.5C4.5 1.5 2 4 2 7s2.5 5.5 5.5 5.5S13 10 13 7s-2.5-5.5-5.5-5.5zm.5 4.75h-1v-3h1v3zm0 3h-1v-1h1v1z" fill="currentColor" />
                </svg>
              </Callout.Icon>
              <Callout.Text>
                Explicação dos Botões:
              </Callout.Text>
            </Callout.Root>

            <Box mt="2" pl="6">
              <Text as="div" size="2" mb="1"><strong>Alternar para Tema (Server)</strong>: Usa uma rota de API para alternar o tema, recarregando a página.</Text>
              <Text as="div" size="2" mb="1"><strong>Alternar para Tema</strong>: Usa JavaScript no cliente para alternar o tema sem recarregar a página.</Text>
              <Text as="div" size="2" mb="1"><strong>Limpar Campos</strong>: Limpa apenas os campos do formulário (botão reset padrão do HTML).</Text>
              <Text as="div" size="2"><strong>Limpar Formulário</strong>: Ação do servidor que redireciona para uma nova página, limpando todo o estado.</Text>
            </Box>
          </Box>
        </Flex>
      </Card>
    </Container>
  );
}
