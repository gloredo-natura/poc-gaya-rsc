'use client';

import { Box, Button, Callout, Flex, Text, TextField, TextArea } from '@radix-ui/themes';
import { useActionState } from 'react';
import { submitForm } from '../actions';

export default function ServerFormWithFeedback() {
  const [state, formAction, isPending] = useActionState(submitForm, {
    status: '',
    message: '',
    data: undefined
  });

  return (
    <>
      {state?.status === 'success' && (
        <Callout.Root color="green" role="status">
          <Callout.Icon>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Callout.Icon>
          <Callout.Text>{state.message}</Callout.Text>
        </Callout.Root>
      )}

      {state?.status === 'error' && (
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM7.49991 1.82704C6.97017 1.82704 6.61768 2.25658 6.64002 2.76489C6.66237 3.27319 6.97334 3.67535 7.49991 3.67535C8.02648 3.67535 8.33745 3.27319 8.3598 2.76489C8.38215 2.25658 8.02965 1.82704 7.49991 1.82704ZM6.07263 5.26639C6.02709 4.83091 6.37803 4.42545 6.81986 4.42545H8.17996C8.62179 4.42545 8.97273 4.83091 8.92719 5.26639L8.50396 9.03855C8.46452 9.41414 8.14817 9.70211 7.77015 9.70211H7.22967C6.85164 9.70211 6.5353 9.41414 6.49586 9.03855L6.07263 5.26639ZM6.64163 11.0237C6.64163 10.4751 7.00094 10.0237 7.49991 10.0237C7.99888 10.0237 8.3582 10.4751 8.3582 11.0237C8.3582 11.5722 7.99888 12.0237 7.49991 12.0237C7.00094 12.0237 6.64163 11.5722 6.64163 11.0237Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </Callout.Icon>
          <Callout.Text>Erro: {state.message}</Callout.Text>
        </Callout.Root>
      )}

      <form action={formAction}>
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
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Enviando...' : 'Enviar'}
            </Button>
            <Button type="reset" variant="soft" color="gray">Limpar Campos</Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
}
