import { Box, Button, Card, Container, Flex, Heading, Text, TextField, TextArea } from '@radix-ui/themes';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { submitForm, clearForm } from '../actions';

export default async function FormPage() {

  // Get the current theme from cookies
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme');
  const theme = themeCookie?.value || 'light';

  return (
    <Container size="2" py="9">
      <Card size="3" style={{ boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)' }}>
        <Flex direction="column" gap="6">
          <Box py="2">
            <Heading size="6" align="center" mb="2">Formulário Lado Servidor</Heading>
            <Text as="p" align="center" size="2" color="gray">
              Demonstração de formulário usando Server Components do Next.js
            </Text>
          </Box>

          <Flex justify="center">
            <Link href="/form-client" passHref>
              <Button variant="outline" color="blue">
                Alternar para Formulário Lado Cliente
              </Button>
            </Link>
          </Flex>

          <Box p="4" style={{ backgroundColor: 'var(--info-bg)', borderRadius: '8px', border: '1px solid var(--info-border)' }}>
            <Flex gap="3" align="center">
              <Box style={{ color: 'var(--info-text)' }}>
                <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Box>
              <Box>
                <Text as="p" weight="bold" size="3" mb="1" style={{ color: 'var(--info-text)' }}>Implementação 100% Servidor</Text>
                <Text as="p" size="2">
                  Este formulário utiliza Server Components e Server Actions do Next.js.
                  Toda validação e processamento ocorre no servidor, sem JavaScript no cliente.
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box p="4" style={{ backgroundColor: 'var(--form-bg)', borderRadius: '8px', border: '1px solid var(--form-border)' }}>
            <form action={submitForm}>
              <Flex direction="column" gap="4">
                <Box>
                  <Text as="label" size="2" mb="1" weight="bold" htmlFor="name">Nome</Text>
                  <TextField.Root id="name" name="name" placeholder="Digite seu nome" required size="3" />
                </Box>

                <Box>
                  <Text as="label" size="2" mb="1" weight="bold" htmlFor="email">Email</Text>
                  <TextField.Root id="email" name="email" type="email" placeholder="Digite seu email" required size="3" />
                </Box>

                <Box>
                  <Text as="label" size="2" mb="1" weight="bold" htmlFor="message">Mensagem</Text>
                  <TextArea id="message" name="message" placeholder="Digite sua mensagem" required size="3" style={{ minHeight: '120px' }} />
                </Box>

                <Flex gap="3" mt="2">
                  <Button type="submit" size="3" style={{ flex: 1 }}>Enviar</Button>
                  <Button type="reset" variant="soft" color="gray" size="3">Limpar Campos</Button>
                </Flex>
              </Flex>
            </form>
          </Box>

          <Box mt="4" p="4" style={{ backgroundColor: 'var(--actions-bg)', borderRadius: '8px', border: '1px solid var(--actions-border)' }}>
            <Text as="p" size="2" weight="bold" mb="3" align="center">Ações Adicionais</Text>

            <Flex justify="center" gap="3" direction={{ initial: 'column', sm: 'row' }} align="stretch">
              <form method="post" action="/api/toggle-theme" style={{ width: '100%' }}>
                <Button type="submit" variant="soft" color="indigo" size="2" style={{ width: '100%' }}>
                  <Box mr="1">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0 7.5C0 7.22386 0.223858 7 0.5 7H2.5C2.77614 7 3 7.22386 3 7.5C3 7.77614 2.77614 8 2.5 8H0.5C0.223858 8 0 7.77614 0 7.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Box>
                  Alternar para Tema {theme === 'light' ? 'Escuro' : 'Claro'}
                </Button>
              </form>

              <form action={clearForm} style={{ width: '100%' }}>
                <Button type="submit" variant="soft" color="red" size="2" style={{ width: '100%' }}>
                  <Box mr="1">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H3.5C3.22386 4 3 3.77614 3 3.5ZM0 8C0 6.89543 0.895431 6 2 6H13C14.1046 6 15 6.89543 15 8V13C15 14.1046 14.1046 15 13 15H2C0.895431 15 0 14.1046 0 13V8ZM2 7C1.44772 7 1 7.44772 1 8V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V8C14 7.44772 13.5523 7 13 7H2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Box>
                  Limpar Formulário
                </Button>
              </form>
            </Flex>

            <Box mt="3">
              <Text size="1" align="center" color="gray">Tema atual: {theme === 'light' ? 'claro' : 'escuro'}</Text>
            </Box>
          </Box>

          <Box mt="4" p="4" style={{ backgroundColor: 'var(--help-bg)', borderRadius: '8px', border: '1px solid var(--help-border)' }}>
            <Flex gap="3" align="start">
              <Box style={{ color: 'var(--help-icon)', marginTop: '2px' }}>
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 1.5C4.5 1.5 2 4 2 7s2.5 5.5 5.5 5.5S13 10 13 7s-2.5-5.5-5.5-5.5zm.5 4.75h-1v-3h1v3zm0 3h-1v-1h1v1z" fill="currentColor" />
                </svg>
              </Box>
              <Box>
                <Text as="p" weight="bold" size="2" mb="2">Explicação dos Botões:</Text>

                <Flex direction="column" gap="3">
                  <Box style={{ backgroundColor: 'var(--card-bg)', padding: '10px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
                    <Text as="div" size="2" weight="bold" mb="1" style={{ color: 'var(--card-title)' }}>Enviar</Text>
                    <Text as="div" size="2" style={{ color: 'var(--card-text)' }}>Envia o formulário para processamento no servidor.</Text>
                  </Box>

                  <Box style={{ backgroundColor: 'var(--card-bg)', padding: '10px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
                    <Text as="div" size="2" weight="bold" mb="1" style={{ color: 'var(--card-title)' }}>Limpar Campos</Text>
                    <Text as="div" size="2" style={{ color: 'var(--card-text)' }}>Limpa apenas os campos do formulário (botão reset padrão do HTML).</Text>
                  </Box>

                  <Box style={{ backgroundColor: 'var(--card-bg)', padding: '10px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
                    <Text as="div" size="2" weight="bold" mb="1" style={{ color: 'var(--card-title)' }}>Alternar Tema</Text>
                    <Text as="div" size="2" style={{ color: 'var(--card-text)' }}>Alterna entre os temas claro e escuro da aplicação.</Text>
                  </Box>

                  <Box style={{ backgroundColor: 'var(--card-bg)', padding: '10px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
                    <Text as="div" size="2" weight="bold" mb="1" style={{ color: 'var(--card-title)' }}>Limpar Formulário</Text>
                    <Text as="div" size="2" style={{ color: 'var(--card-text)' }}>Ação do servidor que redireciona para uma nova página, limpando todo o estado.</Text>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Card>
    </Container>
  );
}
