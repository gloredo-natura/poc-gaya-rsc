/**
 * IMPLEMENTAÇÃO DE FORMULÁRIO LADO CLIENTE
 *
 * Esta é uma implementação 100% client-side do formulário usando React hooks e manipuladores de eventos.
 * Demonstra a abordagem client-side para manipulação de formulários no Next.js App Router.
 *
 * Características principais:
 * - Gerenciamento de estado com useState
 * - Efeitos colaterais com useEffect
 * - Manipuladores de eventos (onClick, onChange, onFocus, onBlur)
 * - Validação de formulário no cliente
 * - Atualizações dinâmicas da UI
 * - Logs no console do navegador
 */

'use client'; // This directive marks this as a Client Component

import { useState, useEffect } from 'react';
import { Box, Button, Card, Container, Flex, Heading, Text, TextField, TextArea, Callout, Theme } from '@radix-ui/themes';
import Link from 'next/link';

export default function ClientFormPage() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Form validation state
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Form touched state (to show validation only after user interaction)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Client-side counter demonstration
  const [counter, setCounter] = useState(0);

  // Update counter every second to demonstrate client-side reactivity
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Load theme from cookie on initial render
  useEffect(() => {
    const savedTheme = document.cookie
      .split('; ')
      .find(row => row.startsWith('theme='))
      ?.split('=')[1];

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  // Validate a single field
  const validateField = (name: string, value: string): string => {
    console.log(`Client-side validation for ${name} with value: ${value}`);

    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        return '';

      case 'email':
        if (!value.trim()) return 'Email é obrigatório';
        // Validação simples de email com regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Por favor, digite um email válido';
        return '';

      case 'message':
        if (!value.trim()) return 'Mensagem é obrigatória';
        if (value.trim().length < 10) return 'Mensagem deve ter pelo menos 10 caracteres';
        return '';

      default:
        return '';
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };

    setValidationErrors(errors);
    console.log('Client-side form validation results:', errors);

    // Form is valid if there are no error messages
    return !Object.values(errors).some(error => error !== '');
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field on change if it's been touched
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setValidationErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  // Handle field blur (mark as touched and validate)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Field ${name} blurred (client-side)`);

    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    const error = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };


  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission event triggered');

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true
    });

    // Validate entire form
    const isValid = validateForm();

    if (!isValid) {
      console.log('Client-side form validation failed');
      setFormError('Por favor, corrija os erros no formulário');
      return;
    }

    // Clear any previous errors
    setFormError('');
    setIsSubmitting(true);
    console.log('Setting isSubmitting to true');

    // Simulate form submission
    console.log('Starting submission simulation...');
    setTimeout(() => {
      console.log('Form submitted (client-side):', formData);
      setIsSubmitting(false);
      setFormSubmitted(true);
      console.log('Form submission complete');

      // Reset form after 3 seconds
      console.log('Will clear success message in 3 seconds...');
      setTimeout(() => {
        setFormSubmitted(false);
        console.log('Success message cleared');
      }, 3000);
    }, 1000);
  };

  // Handle form reset (clears form fields but keeps the form on screen)
  const handleReset = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      console.log('Reset button clicked - clearing form fields only');
    }

    // Reset form data
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Reset validation state
    setValidationErrors({
      name: '',
      email: '',
      message: ''
    });

    // Reset touched state
    setTouched({
      name: false,
      email: false,
      message: false
    });

    // Clear any form-level errors
    setFormError('');
    setFormSubmitted(false);
    console.log('Form fields reset complete (client-side)');
  };

  // Handle clear form (completely clears the form and any state/messages)
  const handleClearForm = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Clear form button clicked - clearing all form state');

    // Reset all form state
    handleReset();

    // Additional reset actions specific to Clear Form
    setCounter(0);
    console.log('Form completely cleared including counter (client-side)');
  };

  // Toggle theme
  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Theme toggle clicked');

    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log(`Changing theme from ${theme} to ${newTheme} (client-side)`);
    setTheme(newTheme);

    // Save theme to cookie
    document.cookie = `theme=${newTheme};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    console.log('Theme cookie updated');
  };

  return (
    <Theme appearance={theme}>
      <Container size="2" py="9">
        <Card size="3" style={{ boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)' }}>
          <Flex direction="column" gap="6">
            <Box py="2">
              <Heading size="6" align="center" mb="2">Formulário Lado Cliente</Heading>
              <Text as="p" align="center" size="2" color="gray">
                Demonstração de formulário usando React Hooks e manipuladores de eventos
              </Text>
            </Box>

            <Flex justify="center">
              <Link href="/form" passHref>
                <Button variant="outline" color="blue">
                  Alternar para Formulário Lado Servidor
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
                  <Text as="p" weight="bold" size="3" mb="1" style={{ color: 'var(--info-text)' }}>Implementação 100% Cliente</Text>
                  <Text as="p" size="2">
                    Este formulário utiliza React Hooks e manipuladores de eventos no cliente.
                    Possui validação em JavaScript puro (sem atributos HTML5).
                    Tente enviar dados inválidos para ver a validação client-side em ação.
                  </Text>
                </Box>
              </Flex>
            </Box>

            {formError && (
              <Callout.Root color="red" role="alert">
                <Callout.Icon>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Callout.Icon>
                <Callout.Text>Erro: {formError}</Callout.Text>
              </Callout.Root>
            )}

            {formSubmitted && (
              <Callout.Root color="green" role="status">
                <Callout.Icon>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </Callout.Icon>
                <Callout.Text>Formulário enviado com sucesso!</Callout.Text>
              </Callout.Root>
            )}

            <Box p="4" style={{ backgroundColor: 'var(--form-bg)', borderRadius: '8px', border: '1px solid var(--form-border)' }}>
              <form onSubmit={handleSubmit}>
                <Flex direction="column" gap="4">
                  <Box>
                    <Text as="label" size="2" mb="1" weight="bold" htmlFor="name">Nome</Text>
                    <TextField.Root
                      id="name"
                      name="name"
                      placeholder="Digite seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => console.log('Name field focused (client-side)')}
                      onBlur={handleBlur}
                      color={touched.name && validationErrors.name ? 'red' : undefined}
                      size="3"
                    />
                    {touched.name && validationErrors.name && (
                      <Text size="1" color="red" mt="1">{validationErrors.name}</Text>
                    )}
                  </Box>

                  <Box>
                    <Text as="label" size="2" mb="1" weight="bold" htmlFor="email">Email</Text>
                    <TextField.Root
                      id="email"
                      name="email"
                      placeholder="Digite seu email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => console.log('Email field focused (client-side)')}
                      onBlur={handleBlur}
                      color={touched.email && validationErrors.email ? 'red' : undefined}
                      size="3"
                    />
                    {touched.email && validationErrors.email && (
                      <Text size="1" color="red" mt="1">{validationErrors.email}</Text>
                    )}
                  </Box>

                  <Box>
                    <Text as="label" size="2" mb="1" weight="bold" htmlFor="message">Mensagem</Text>
                    <TextArea
                      id="message"
                      name="message"
                      placeholder="Digite sua mensagem"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => console.log('Message field focused (client-side)')}
                      onBlur={handleBlur}
                      color={touched.message && validationErrors.message ? 'red' : undefined}
                      size="3"
                      style={{ minHeight: '120px' }}
                    />
                    {touched.message && validationErrors.message && (
                      <Text size="1" color="red" mt="1">{validationErrors.message}</Text>
                    )}
                  </Box>

                  <Flex gap="3" mt="2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={() => {
                        console.log('Submit button clicked (client-side)');
                        // The form's onSubmit handler will be called automatically
                      }}
                      size="3"
                      style={{ flex: 1 }}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </Button>
                    <Button
                      type="button"
                      variant="soft"
                      color="gray"
                      onClick={(e) => handleReset(e)}
                      size="3"
                    >
                      Limpar Campos
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </Box>

            <Box mt="4" p="4" style={{ backgroundColor: 'var(--actions-bg)', borderRadius: '8px', border: '1px solid var(--actions-border)' }}>
              <Text as="p" size="2" weight="bold" mb="3" align="center">Ações Adicionais</Text>

              <Flex justify="center" gap="3" direction={{ initial: 'column', sm: 'row' }} align="stretch">
                <Box style={{ width: '100%' }}>
                  <Button
                    onClick={toggleTheme}
                    variant="soft"
                    color="indigo"
                    size="2"
                    style={{ width: '100%' }}
                    onMouseEnter={() => console.log('Theme button hover (client-side)')}
                  >
                    <Box mr="1">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0 7.5C0 7.22386 0.223858 7 0.5 7H2.5C2.77614 7 3 7.22386 3 7.5C3 7.77614 2.77614 8 2.5 8H0.5C0.223858 8 0 7.77614 0 7.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </Box>
                    Alternar para Tema {theme === 'light' ? 'Escuro' : 'Claro'}
                  </Button>
                </Box>

                <Box style={{ width: '100%' }}>
                  <Button
                    onClick={handleClearForm}
                    variant="soft"
                    color="red"
                    size="2"
                    style={{ width: '100%' }}
                    onMouseEnter={() => console.log('Clear button hover (client-side)')}
                  >
                    <Box mr="1">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H3.5C3.22386 4 3 3.77614 3 3.5ZM0 8C0 6.89543 0.895431 6 2 6H13C14.1046 6 15 6.89543 15 8V13C15 14.1046 14.1046 15 13 15H2C0.895431 15 0 14.1046 0 13V8ZM2 7C1.44772 7 1 7.44772 1 8V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V8C14 7.44772 13.5523 7 13 7H2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </Box>
                    Limpar Formulário
                  </Button>
                </Box>
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
                      <Text as="div" size="2" style={{ color: 'var(--card-text)' }}>Envia o formulário para processamento no cliente.</Text>
                    </Box>

                    <Box style={{ backgroundColor: 'var(--card-bg)', padding: '10px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
                      <Text as="div" size="2" weight="bold" mb="1" style={{ color: 'var(--card-title)' }}>Limpar Campos</Text>
                      <Text as="div" size="2" style={{ color: 'var(--card-text)' }}>Limpa apenas os campos do formulário, mantendo o contador e outros estados.</Text>
                    </Box>

                    <Box style={{ backgroundColor: 'var(--card-bg)', padding: '10px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
                      <Text as="div" size="2" weight="bold" mb="1" style={{ color: 'var(--card-title)' }}>Alternar Tema</Text>
                      <Text as="div" size="2" style={{ color: 'var(--card-text)' }}>Alterna entre os temas claro e escuro da aplicação.</Text>
                    </Box>

                    <Box style={{ backgroundColor: 'var(--card-bg)', padding: '10px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
                      <Text as="div" size="2" weight="bold" mb="1" style={{ color: 'var(--card-title)' }}>Limpar Formulário</Text>
                      <Text as="div" size="2" style={{ color: 'var(--card-text)' }}>Reinicia completamente todo o estado do formulário, incluindo o contador e validação.</Text>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>

            <Box mt="4" p="4" style={{ backgroundColor: 'var(--counter-bg)', borderRadius: '8px', border: '1px solid var(--counter-border)' }}>
              <Flex direction="column" align="center" gap="2">
                <Text weight="bold">Contador: {counter}</Text>
                <Text size="1">(Atualiza a cada segundo para demonstrar reatividade client-side)</Text>
                <Flex gap="2" mt="2">
                  <Button
                    size="1"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Counter incremented manually');
                      setCounter(prev => prev + 10);
                    }}
                  >
                    +10
                  </Button>
                  <Button
                    size="1"
                    variant="soft"
                    color="red"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Counter reset');
                      setCounter(0);
                    }}
                  >
                    Zerar
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Card>
      </Container>
    </Theme>
  );
}
